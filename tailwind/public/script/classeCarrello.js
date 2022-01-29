class Carrello 
{
  // Attributi --------------------------------------------

  #numeroProdotti
  #totaleSenzaIva
  #totaleConIva
  #cronologiaAcquisti // array di prodotti
  #arrayProdotti
  #arrayQuantità
  #arrayQuantitàCronologia
  
  // Costruttori --------------------------------------------

  constructor()
  {
    this.#numeroProdotti = 0
    this.#totaleSenzaIva = 0.0
    this.#totaleConIva = 0.0
    this.#arrayProdotti = new Prodotto()[0]
    this.#cronologiaAcquisti = new Prodotto()[0]
    this.#arrayQuantità = 0;
    this.#arrayQuantitàCronologia = 0
  }

  // Getter --------------------------------------------
  
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
    return this.arrayProdotti
  }

  get arrayQuantità()
  {
    return this.#arrayQuantità
  }

  get arrayQuantitàCronologia()
  {
    return this.#arrayQuantitàCronologia
  }

  // Metodi --------------------------------------------
  
  aggiungiProdotto(nomeProdotto, quantità, magazzino)
  {
    let indice = magazzino.trovaIndice(nomeProdotto)
    
    if(indice != -1 && magazzino.quantitàMagazzino[indice] >= quantità)
    {
      
    }

    
  }
  
  eliminaProdotto(nomeProdotto, magazzino)
  {
    if(this.#numeroProdotti > 0)
      this.#numeroProdotti--;
      // da continuare
    else
      console.error("errore: nessun prodotto da eliminare")
      // da continuare
  }

  toString()
  {
    out =  "numero di prodotti: " + this.#numeroProdotti + "\n"
    out += "totale senza iva: " + this.#totaleSenzaIva + "\n"
    out += "totale con iva: " + this.#totaleConIva + "\n"
    out += "cronologia acquisti:\n"
    for(var i = 0 ; i < this.#cronologiaAcquisti.length() ; i++)
        out += this.#cronologiaAcquisti[i] + "quantità: "+this.#arrayQuantitàCronologia[i]+"\n"
    out += "prodotti presenti nel carrello:\n"
    for(var i = 0 ; i < this.#numeroProdotti ; i++ )
        out += this.#arrayProdotti[i] + "quantità"+ this.#arrayQuantità +"\n"
    return out;
  }

}