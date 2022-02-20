class Carrello 
{
  // Attributi ------------------------------------------------------------------------------------------------------------------------------------------------

  #numeroProdotti
  #totaleSenzaIva
  #totaleConIva
  #cronologiaAcquisti // array di prodotti
  #arrayProdotti
  #arrayQuantita
  #arrayQuantitaCronologia
  
  // Costruttori e metodi statici ------------------------------------------------------------------------------------------------------------------------------------------------

  constructor(numeroProdotti, totaleSenzaIva, totaleConIva, cronologiaAcquisti, arrayProdotti, arrayQuantita, arrayQuantitaCronologia)
  {
    this.#numeroProdotti = numeroProdotti
    this.#totaleSenzaIva = totaleSenzaIva
    this.#totaleConIva = totaleConIva
    this.#cronologiaAcquisti = cronologiaAcquisti
    this.#arrayProdotti = arrayProdotti
    this.#arrayQuantita = arrayQuantita
    this.#arrayQuantitaCronologia = arrayQuantitaCronologia
  }

  // se voglio creare un carrello senza nessuna informazione faccio = Carrello.carrelloVuoto()
  static carrelloVuoto()
  {
    return new Carrello(0, 0.0, 0.0,[], [], [], [])
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

      return new Carrello(oggetto.numeroProdotti, oggetto.totaleSenzaIva, oggetto.totaleConIva, oggetto.cronologiaAcquisti, oggetto.arrayProdotti, oggetto.arrayQuantita, oggetto.arrayQuantitaCronologia)
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

  get arrayQuantita()
  {
    return this.#arrayQuantita
  }

  get arrayQuantitaCronologia()
  {
    return this.#arrayQuantitaCronologia
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
  
  /*Aggiunge "quantita" pezzi di un prodotto dato al carrello*/
  aggiungiProdotto(nomeProdotto, quantita, magazzino)
  {
    let indice = magazzino.trovaIndice(nomeProdotto)

    
    // il prodotto è disponibile in magazzino
    if(indice != -1 && quantita > 0 && magazzino.quantitaMagazzino[indice] >= quantita) 
    {
      magazzino.quantitaMagazzino[indice] -= quantita;
      this.#numeroProdotti += quantita
      this.#totaleSenzaIva += magazzino.prodotti[indice].prezzoSenzaIva * quantita
      this.#totaleConIva = this.#totaleSenzaIva * 1.22


      // il prodotto è già nel carrello, quindi aumento solo la quantita corrispondente
      if(this.#arrayProdotti.includes(magazzino.prodotti[indice]))
      {
        indice = this.#arrayProdotti.indexOf(magazzino.prodotti[indice])
        this.#arrayQuantita[indice] += quantita
      }
      // aggiungo all'array di prodotti il prodotto, stessa cosa per l'array con le quantita
      else 
      {
        this.#arrayProdotti.push(magazzino.prodotti[indice])
        this.#arrayQuantita.push(quantita)
      }
    }
    else
    {
      console.error("Errore: prodotto non esistente o esaurito")
    }
  }
  
  /*Elimina "quantita" pezzi di prodotto dal carrello */
  eliminaProdotto(nomeProdotto, quantita, magazzino)
  {
    let indice = magazzino.trovaIndice(nomeProdotto)
    let prodotto = magazzino.prodotti[indice]
    let indiceCarrello = this.#arrayProdotti.indexOf(prodotto)

    //il prodotto è disponibile e la quantita che si sta cercando di eliminare non supera quella presente nel carrello
    if(indice != -1 && this.#arrayProdotti.includes(prodotto)
       && this.#arrayQuantita[indiceCarrello] >= quantita) 
    {
      this.#arrayQuantita[indiceCarrello] -= quantita

      //la quantita nel carrello dopo l'eliminazione è 0, viene dunque rimosso il prodotto dal carrello
      if(this.#arrayQuantita[indiceCarrello] == 0)
      {
        this.#arrayProdotti.splice(indiceCarrello, 1);
        this.#arrayQuantita.splice(indiceCarrello, 1);
      }

      this.#numeroProdotti -= quantita
      this.#totaleSenzaIva -= prodotto.prezzoSenzaIva * quantita
      this.#totaleConIva = this.#totaleSenzaIva * 1.22
      magazzino.quantitaMagazzino[indice] += quantita
    }
    else
      console.error("Errore: prodotto non esistente, non presente nel carrello o la quantita di prodotto che si sta cercando di rimuovere è troppo alta")
  }

  toString()
  {
    var out =  "numero di prodotti: " + this.#numeroProdotti + "\n"
    out += "totale senza iva: " + this.#totaleSenzaIva + "\n"
    out += "totale con iva: " + this.#totaleConIva + "\n"
    out += "cronologia acquisti:\n"
    for(var i = 0 ; i < this.#cronologiaAcquisti.length ; i++)
        out += this.#cronologiaAcquisti[i] + "quantita: "+this.#arrayQuantitaCronologia[i]+"\n"
    out += "prodotti presenti nel carrello:\n"
    for(var i = 0 ; i < this.#numeroProdotti ; i++ )
        out += this.#arrayProdotti[i] + "quantita"+ this.#arrayQuantita +"\n"
    return out;
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

                
            ['arrayQuantita']: this.#arrayQuantita,
            ['arrayQuantitaCronologia']: this.#arrayQuantitaCronologia
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