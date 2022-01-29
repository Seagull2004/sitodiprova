class Prodotto
{

    // Attributi --------------------------------------------

    #nomeProdotto
    #prezzoSenzaIva
    #categoria // tastiera, monitor, mouse, schede video, schede madre, banchi RAM, cablaggio, unità di archiviazione
    #descrizioneProdotto

    // Costruttori --------------------------------------------

    constructor(nomeProdotto, prezzoSenzaIva, categoria, descrizioneProdotto)
    {
        this.#nomeProdotto = nomeProdotto
        this.#categoria = categoria
        this.#prezzoSenzaIva = prezzoSenzaIva
        this.#descrizioneProdotto = descrizioneProdotto
    }
    
    // Getter --------------------------------------------

    get nomeProdotto()
    {
        return this.#nomeProdotto
    }

    get prezzoSenzaIva()
    {
        return this.#prezzoSenzaIva
    }

    get categoria()
    {
        return this.#categoria
    }

    get descrizioneProdotto()
    {
        return this.#descrizioneProdotto
    }

    // Setter --------------------------------------------

    set prezzoSenzaIva(prezzoSenzaIva)
    {
        this.#prezzoSenzaIva = prezzoSenzaIva
    }

    //Metodi---------------------------------------------

    toString()
    {
        out =  "nome prodotto: " + this.#nomeProdotto + "\n"
        out += "prezzo senza iva: " + this.#prezzoSenzaIva + "\n"
        out += "categoria: " + this.#categoria + "\n"
        out += "descrizione: " + this.#descrizioneProdotto + "\n"
    
        return out
    }
}