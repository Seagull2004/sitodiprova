class Carrello 
{
  // Attributi ------------------------------------------------------------------------------------------------------------------------------------------------

  numeroProdotti
  totaleSenzaIva
  totaleConIva
  cronologiaAcquisti // array di prodotti
  arrayProdotti
  arrayQuantità
  arrayQuantitàCronologia
  
  // Costruttori e metodi statici ------------------------------------------------------------------------------------------------------------------------------------------------

  constructor(numeroProdotti, totaleSenzaIva, totaleConIva, cronologiaAcquisti, arrayProdotti, arrayQuantità, arrayQuantitàCronologia)
  {
    this.numeroProdotti = numeroProdotti
    this.totaleSenzaIva = totaleSenzaIva
    this.totaleConIva = totaleConIva
    this.cronologiaAcquisti = cronologiaAcquisti
    this.arrayProdotti = arrayProdotti
    this.arrayQuantità = arrayQuantità
    this.arrayQuantitàCronologia = arrayQuantitàCronologia
  }


  // se voglio creare un carrello senza nessuna informazione faccio = Carrello.carrelloVuoto()
  static carrelloVuoto()
  {
    return new Carrello(0, 0.0, 0.0,[], [], 0, 0)
  }

  // attraverso le informazioni di un oggetto ne crea uno di tipo Prodotto
  static toCarrello(oggetto)
  {
      return new Carrello(oggetto.numeroProdotti, oggetto.totaleSenzaIva, oggetto.totaleConIva, oggetto.cronologiaAcquisti, oggetto.arrayProdotti, oggetto.arrayQuantità, oggetto.arrayQuantitàCronologia)
  }

  // Getter ------------------------------------------------------------------------------------------------------------------------------------------------
  
  get numeroProdotti()
  {
    return this.numeroProdotti
  }

  get totaleSenzaIva()
  {
    return this.totaleSenzaIva
  }

  get totaleConIva()
  {
    return this.totaleConIva
  }

  get cronologiaAcquisti()
  {
    return this.cronologiaAcquisti 
  }

  get arrayProdotti()
  {
    return this.arrayProdotti
  }

  get arrayQuantità()
  {
    return this.arrayQuantità
  }

  get arrayQuantitàCronologia()
  {
    return this.arrayQuantitàCronologia
  }

  // Metodi ------------------------------------------------------------------------------------------------------------------------------------------------
  
  /*Aggiunge "quantità" pezzi di un prodotto dato al carrello*/
  aggiungiProdotto(nomeProdotto, quantità, magazzino)
  {
    let indice = magazzino.trovaIndice(nomeProdotto)


    // il prodotto è disponibile in magazzino
    if(indice != -1 && quantità > 0 && magazzino.quantitàMagazzino[indice] >= quantità) 
    {
      magazzino.quantitàMagazzino[indice] -= quantità;
      this.numeroProdotti += quantità
      this.totaleSenzaIva += magazzino.prodotti[indice].prezzoSenzaIva * quantità
      this.totaleConIva = this.totaleSenzaIva * 1.22


      // il prodotto è già nel carrello, quindi aumento solo la quantità corrispondente
      if(this.arrayProdotti.includes(magazzino.prodotti[indice]))
      {
        indice = this.arrayProdotti.indexOf(magazzino.prodotti[indice])
        this.arrayQuantità[indice] += quantità
      }
      // aggiungo all'array di prodotti il prodotto, stessa cosa per l'array con le quantità
      else 
      {
        this.arrayProdotti.push(magazzino.prodotti[indice])
        this.arrayQuantità.push(quantità)
      }
    }
    else
    {
      console.error("Errore: prodotto non esistente o esaurito")
    }
  }
  
  /*Elimina "quantità" pezzi di prodotto dal carrello */
  eliminaProdotto(nomeProdotto, magazzino, quantità)
  {
    let indice = magazzino.trovaIndice(nomeProdotto)
    let prodotto = magazzino.prodotti[indice]
    let indiceCarrello = this.arrayProdotti.indexOf(prodotto)

    //il prodotto è disponibile e la quantità che si sta cercando di eliminare non supera quella presente nel carrello
    if(indice != -1 && this.arrayProdotti.includes(prodotto)
       && this.arrayQuantità[indiceCarrello] >= quantità) 
    {
      this.arrayQuantità[indiceCarrello] -= quantità

      //la quantità nel carrello dopo l'eliminazione è 0, viene dunque rimosso il prodotto dal carrello
      if(this.arrayQuantità[indiceCarrello] == 0)
      {
        this.arrayProdotti.splice(indiceCarrello, 1);
        this.arrayQuantità.splice(indiceCarrello, 1);
      }

      this.numeroProdotti -= quantità
      this.totaleSenzaIva -= prodotto.prezzoSenzaIva * quantità
      this.totaleConIva = this.totaleSenzaIva * 1.22
      magazzino.quantitàMagazzino[indice] += quantità
    }
    else
      console.error("Errore: prodotto non esistente, non presente nel carrello o la quantità di prodotto che si sta cercando di rimuovere è troppo alta")
  }

  toString()
  {
    var out =  "numero di prodotti: " + this.numeroProdotti + "\n"
    out += "totale senza iva: " + this.totaleSenzaIva + "\n"
    out += "totale con iva: " + this.totaleConIva + "\n"
    out += "cronologia acquisti:\n"
    for(var i = 0 ; i < this.cronologiaAcquisti.length() ; i++)
        out += this.cronologiaAcquisti[i] + "quantità: "+this.arrayQuantitàCronologia[i]+"\n"
    out += "prodotti presenti nel carrello:\n"
    for(var i = 0 ; i < this.numeroProdotti ; i++ )
        out += this.arrayProdotti[i] + "quantità"+ this.arrayQuantità +"\n"
    return out;
  }
}