class Prodotto
{

    // Attributi ------------------------------------------------------------------------------------------------------------------------------------------------

    #nomeProdotto
    #prezzoSenzaIva
    #categoria // tastiera, monitor, mouse, schede video, schede madre, ram, cablaggio, archiviazione
    #descrizioneProdotto
    #quantita

    // Costruttori e metodi statici ------------------------------------------------------------------------------------------------------------------------------------------------

    constructor(nomeProdotto, prezzoSenzaIva, categoria, descrizioneProdotto, quantita)
    {
        this.#nomeProdotto = nomeProdotto
        this.#categoria = categoria
        this.#prezzoSenzaIva = prezzoSenzaIva
        this.#descrizioneProdotto = descrizioneProdotto
        this.#quantita = quantita
    }

    // attraverso le informazioni di un oggetto ne crea uno di tipo Prodotto
    static toProdotto(oggetto)
    {
        return new Prodotto(oggetto.nomeProdotto, oggetto.prezzoSenzaIva, oggetto.categoria, oggetto.descrizioneProdotto, oggetto.quantita)
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

    get quantita()
    {
        return this.#quantita
    }

    // Setter ------------------------------------------------------------------------------------------------------------------------------------------------

    set prezzoSenzaIva(prezzoSenzaIva)
    {
        this.#prezzoSenzaIva = prezzoSenzaIva
    }

    set quantita(quantita)
    {
        this.#quantita = quantita
    }

    //Metodi------------------------------------------------------------------------------------------------------------------------------------------------

    toString()
    {
        var out =  "nome prodotto: " + this.#nomeProdotto + " \n"
        out += "prezzo senza iva: " + this.#prezzoSenzaIva + " \n"
        out += "categoria: " + this.#categoria + " \n"
        out += "descrizione: " + this.#descrizioneProdotto + " \n"
        out += "quantità: " + this.#quantita + " \n"
        return out
    }
    
    stringify()
    {
        return JSON.stringify(
            {
                ['nomeProdotto']: this.#nomeProdotto,
                ['prezzoSenzaIva']: this.#prezzoSenzaIva,
                ['categoria']: this.#categoria,
                ['descrizioneProdotto']: this.#descrizioneProdotto,
                ['quantita']: this.#quantita
            }
        )
    }
}