class Prodotto
{

    // Attributi ------------------------------------------------------------------------------------------------------------------------------------------------

    #nomeProdotto
    #prezzoSenzaIva
    #categoria // tastiera, monitor, mouse, schede video, schede madre, banchi RAM, cablaggio, unità di archiviazione
    #descrizioneProdotto

    // Costruttori e metodi statici ------------------------------------------------------------------------------------------------------------------------------------------------

    constructor(nomeProdotto, prezzoSenzaIva, categoria, descrizioneProdotto)
    {
        this.#nomeProdotto = nomeProdotto
        this.#categoria = categoria
        this.#prezzoSenzaIva = prezzoSenzaIva
        this.#descrizioneProdotto = descrizioneProdotto
    }

    // attraverso le informazioni di un oggetto ne crea uno di tipo Prodotto
    static toProdotto(oggetto)
    {
        return new Prodotto(oggetto.nomeProdotto, oggetto.prezzoSenzaIva, oggetto.categoria, oggetto.descrizioneProdotto)
    }
    
    // Getter ------------------------------------------------------------------------------------------------------------------------------------------------

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

    // Setter ------------------------------------------------------------------------------------------------------------------------------------------------

    set prezzoSenzaIva(prezzoSenzaIva)
    {
        this.#prezzoSenzaIva = prezzoSenzaIva
    }

    //Metodi------------------------------------------------------------------------------------------------------------------------------------------------

    toString()
    {
        var out =  "nome prodotto: " + this.#nomeProdotto + " \n"
        out += "prezzo senza iva: " + this.#prezzoSenzaIva + " \n"
        out += "categoria: " + this.#categoria + " \n"
        out += "descrizione: " + this.#descrizioneProdotto + " \n"
        return out
    }
    
    stringify()
    {
        return JSON.stringify(
            {
                ['nomeProdotto']: this.#nomeProdotto,
                ['prezzoSenzaIva']: this.#prezzoSenzaIva,
                ['categoria']: this.#categoria,
                ['descrizioneProdotto']: this.#descrizioneProdotto
            }
        )
    }
}