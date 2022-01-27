class Carrello 
{
  // Attributi --------------------------------------------

  #numeroProdotti
  #totaleSenzaIva
  #totaleConIva
  #cronologiaAcquisti // array di prodotti
  #arrayProdotti
  
  // Costruttori --------------------------------------------

  constructor()
  {
    this.#numeroProdotti = 0
    this.#totaleSenzaIva = 0.0
    this.#totaleConIva = 0.0
    this.#arrayProdotti = new Prodotto()[0]
    this.#cronologiaAcquisti = new Prodotto()[0]
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

  // Metodi --------------------------------------------
  
  aggiungiProdotto(prodotto)
  {
    this.#numeroProdotti++;
    //da continuare
  }
  
  eliminaProdotto(prodotto)
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
        out += this.#cronologiaAcquisti[i] + "\n"
    out += "prodotti presenti nel carrello:\n"
    for(var i = 0 ; i < this.#numeroProdotti ; i++ )
        out += this.#arrayProdotti[i] + "\n"
    return out;
  }

}