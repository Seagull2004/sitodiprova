class Carrello 
{
  // Attributi ------------------------------------------------------------------------------------------------------------------------------------------------

  #numeroProdotti
  #totaleSenzaIva
  #totaleConIva
  #cronologiaAcquisti // array di prodotti
  #arrayProdotti
  
  // Costruttori e metodi statici ------------------------------------------------------------------------------------------------------------------------------------------------

  constructor(numeroProdotti, totaleSenzaIva, totaleConIva, cronologiaAcquisti, arrayProdotti)
  {
    this.#numeroProdotti = numeroProdotti
    this.#totaleSenzaIva = totaleSenzaIva
    this.#totaleConIva = totaleConIva
    this.#cronologiaAcquisti = cronologiaAcquisti
    this.#arrayProdotti = arrayProdotti
  }

  // se voglio creare un carrello senza nessuna informazione faccio = Carrello.carrelloVuoto()
  static carrelloVuoto()
  {
    return new Carrello(0, 0.0, 0.0,[], [])
  }

  // attraverso le informazioni di un oggetto ne crea uno di tipo Prodotto
  static toCarrello(oggetto)
  {
      oggetto.cronologiaAcquisti = oggetto.cronologiaAcquisti.map(function(item, i)
      {
        return Prodotto.toProdotto(item);
      })
      oggetto.arrayProdotti = oggetto.arrayProdotti.map(function(item, i)
      {
        return Prodotto.toProdotto(item)
      })

      return new Carrello(oggetto.numeroProdotti, oggetto.totaleSenzaIva, oggetto.totaleConIva, oggetto.cronologiaAcquisti, oggetto.arrayProdotti)
  }

  // Getter ------------------------------------------------------------------------------------------------------------------------------------------------
  
  get numeroProdotti()
  {
    return this.#numeroProdotti
  }

  get totaleSenzaIva()
  {
    return this.#totaleSenzaIva
  }

  get totaleConIva()
  {
    return this.#totaleConIva
  }

  get cronologiaAcquisti()
  {
    return this.#cronologiaAcquisti 
  }

  get arrayProdotti()
  {
    return this.#arrayProdotti
  }


  // Setter ------------------------------------------------------------------------------------------------------------------------------------------------


  set cronologiaAcquisti(cronologiaAcquisti)
  {
      this.#cronologiaAcquisti = cronologiaAcquisti
  }

  set arrayProdotti(arrayProdotti)
  {
      this.#arrayProdotti = arrayProdotti
  }




  // Metodi ------------------------------------------------------------------------------------------------------------------------------------------------
  
  toString()
  {
    var out =  "numero di prodotti: " + this.#numeroProdotti + "\n"
    out += "totale senza iva: " + this.#totaleSenzaIva + "\n"
    out += "totale con iva: " + this.#totaleConIva + "\n"
    out += "cronologia acquisti:\n"
    for(var i = 0 ; i < this.#cronologiaAcquisti.length ; i++)
        out += this.#cronologiaAcquisti[i] + "\n"
    out += "prodotti presenti nel carrello:\n"
    for(var i = 0 ; i < this.#numeroProdotti ; i++ )
        out += this.#arrayProdotti[i] + "\n"
    return out;
  }

  /*Dato il nome del prodotto cercato restituisce l'indice del prodotto nell'array del carrello o -1 se non lo trova*/
  trovaIndice(nomeProdottoCercato)
  {     
    var indice = -1
        
    this.#arrayProdotti.forEach((p, i) => 
    { 
      if(p.nomeProdotto == nomeProdottoCercato)
      {
        indice = i;
      }
    })

    return indice;
  }

  /*Aggiunge "quantita" pezzi di un prodotto dato al carrello*/
  aggiungiProdotto(nomeProdotto, quantita, magazzino)
  {
    let indice = magazzino.trovaIndice(nomeProdotto)
    let indiceCarrello = this.trovaIndice(nomeProdotto)
    
    // il prodotto è disponibile in magazzino e la quantita che si sta cercando di inserire e' positiva
    if(indice != -1 && quantita > 0 && magazzino.prodotti[indice].quantita >= quantita) 
    {
      magazzino.prodotti[indice].quantita -= quantita;
      this.#numeroProdotti += parseInt(quantita)
      this.#totaleSenzaIva += magazzino.prodotti[indice].prezzoSenzaIva * quantita
      this.#totaleConIva = this.#totaleSenzaIva * 1.22


      // il prodotto è già nel carrello, quindi aumento solo la quantita corrispondente
      if(indiceCarrello != -1)
      {
        this.#arrayProdotti[indiceCarrello].quantita += quantita
      }
      // aggiungo all'array di prodotti il prodotto, cambio l'attributo quantità affinchè combaci con la quantità inserita
      else 
      {
        this.#arrayProdotti.push(Prodotto.toProdotto(JSON.parse(magazzino.prodotti[indice].stringify()))) //clono l'oggetto di tipo prodotto nel carrello
        this.#arrayProdotti[this.#arrayProdotti.length-1].quantita = quantita
      }

      /* apporto la modifica al file con php con le informzioni sul magazzino */
			$.ajax({
				data: {"content" : magazzino.stringify()}, 
				url: "php/aggiornaMagazzino.php",
				type: "POST",
				success: function(data){
          console.log(data)
          console.log("Aggiornamento file riuscito")            
        }
      })
      
    }
    else
    {
      console.error("Errore: prodotto non esistente o esaurito o quantita' non valida")
    }
  }
  
  /*Elimina "quantita" pezzi di prodotto dal carrello */
  eliminaProdotto(nomeProdotto, quantita, magazzino)
  {
    let indice = magazzino.trovaIndice(nomeProdotto)
    let indiceCarrello = this.trovaIndice(nomeProdotto)

    //il prodotto è disponibile e la quantita che si sta cercando di eliminare non supera quella presente nel carrello ed e' positiva
    if(indice != -1 
        && indiceCarrello != -1
        && this.#arrayProdotti[indiceCarrello].quantita >= quantita 
        && quantita > 0) 
    {
      this.#arrayProdotti[indiceCarrello].quantita -= quantita
      this.#numeroProdotti -= quantita
      this.#totaleSenzaIva -= this.#arrayProdotti[indiceCarrello].prezzoSenzaIva * quantita
      this.#totaleConIva = this.#totaleSenzaIva * 1.22
      magazzino.prodotti[indice].quantita += quantita
      
      //console.log(magazzino.prodotti[indice].quantita)

      //la quantita nel carrello dopo l'eliminazione è 0, viene dunque rimosso il prodotto dal carrello
      if(this.#arrayProdotti[indiceCarrello].quantita == 0)
      {
        this.#arrayProdotti.splice(indiceCarrello, 1);
      }
    }
    else
    {
      console.error("Errore: prodotto non esistente, non presente nel carrello o la quantita di prodotto che si sta cercando di rimuovere è troppo alta")
    }
      
  }

  stringify()
  {
      return JSON.stringify(
          {
            ['numeroProdotti'] : this.#numeroProdotti,
            ['totaleSenzaIva']: this.#totaleSenzaIva,
            ['totaleConIva']: this.#totaleConIva,
            
            
            ['cronologiaAcquisti']: this.#cronologiaAcquisti.map((item) => {return item.stringify()}),
            ['arrayProdotti']: this.#arrayProdotti.map((item) => {return item.stringify()}),
          }
      )
  }

  static parse(oggetto)
  {
    oggetto = JSON.parse(oggetto)

    oggetto.arrayProdotti = oggetto.arrayProdotti.map((item) => {return JSON.parse(item)})
    oggetto.cronologiaAcquisti = oggetto.cronologiaAcquisti.map((item) => {return JSON.parse(item)})
    

    oggetto = Carrello.toCarrello(oggetto)
    return oggetto
  }
}