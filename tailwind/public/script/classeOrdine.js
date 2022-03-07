class Ordine
{
    #prodottiOrdinati
    #dataOrdine
    #cliente
    #numeroFattura
    #totaleSenzaIva

    constructor(prodottiOrdinati, dataOrdine, cliente, numeroFattura, totaleSenzaIva)
    {
        this.#prodottiOrdinati = prodottiOrdinati;
        this.#dataOrdine = dataOrdine;
        this.#cliente = cliente;
        this.#numeroFattura = numeroFattura;
        this.#totaleSenzaIva = 0;
        this.#prodottiOrdinati.forEach((item) => {this.#totaleSenzaIva += item.prezzoSenzaIva * item.quantita})
    }

    static toOrdine(oggetto)
    {
        oggetto.prodottiOrdinati = oggetto.prodottiOrdinati.map((item) => { return Prodotto.toProdotto(item)})

        return new Ordine(oggetto.prodottiOrdinati, oggetto.dataOrdine, oggetto.cliente, oggetto.numeroFattura)
    }

    //Getter ----------------------------------------------------------------------------------------

    get prodottiOrdinati()
    {
        return this.#prodottiOrdinati
    }

    get dataOrdine()
    {
        return this.#dataOrdine
    }

    get cliente()
    {
        return this.#cliente
    }

    get numeroFattura()
    {
        return this.#numeroFattura
    }

    get totaleSenzaIva()
    {
        return this.#totaleSenzaIva
    }

    //Setter ----------------------------------------------------------------------------------------

    set totaleSenzaIva(totaleSenzaIva)
    {
        this.#totaleSenzaIva = totaleSenzaIva
    }

    //Metodi----------------------------------------------------------------------------------------
    
    toString()
    {
        var out = "Ordine del cliente: \n" +
        this.#cliente.toString() + "\n" +
        "Prodotti ordinati: \n";
        this.#prodottiOrdinati.forEach((item) => {out += item.toString()+"\n"})
        out += "Data ordine: " + this.#dataOrdine + "\n" +
        "Totale senza Iva: " + this.#totaleSenzaIva + "\n" +
        "Numero fattura: " + this.#numeroFattura
        
        return out
    }

    stringify()
    {
        return JSON.stringify(
            {
                ['prodottiOrdinati']: this.#prodottiOrdinati.map((item) => {return item.stringify()}),
                ['dataOrdine']: this.#dataOrdine,
                ['cliente']: this.cliente.stringify(),
                ['numeroFattura']: this.#numeroFattura,
                ['totaleSenzaIva']: this.#totaleSenzaIva,
            }
        )
    }

    static parse(oggetto)
    {
        oggetto = JSON.parse(oggetto);

        oggetto.prodottiOrdinati = oggetto.prodottiOrdinati.map((item) => {return JSON.parse(item)})

        oggetto.cliente = Utente.parse(oggetto.cliente)
        
        oggetto = Ordine.toOrdine(oggetto)
        
        return oggetto;
    }
}