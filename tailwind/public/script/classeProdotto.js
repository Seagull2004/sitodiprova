class Prodotto
{

    // Attributi --------------------------------------------

    #nomeProdotto
    #prezzoSenzaIva
    #categoria // tastiera, monitor, mouse, schede video, schede madre, banchi RAM, cablaggio, unità di archiviazione
    #descrizioneProdotto
    #quantita

    // Costruttori --------------------------------------------

    constructor(nomeProdotto, prezzoSenzaIva, categoria, descrizioneProdotto, quantita)
    {
        this.#nomeProdotto = nomeProdotto
        this.#categoria = categoria
        this.#prezzoSenzaIva = prezzoSenzaIva
        this.#descrizioneProdotto = descrizioneProdotto
        this.#quantita = quantita
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
}