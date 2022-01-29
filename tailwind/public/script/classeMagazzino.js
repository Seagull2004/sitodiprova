class Magazzino
{
    //Attributi--------------------------------

    #prodotti
    #quantitàMagazzino

    //Costruttori------------------------------

    constructor()
    {
       
    }

    //Getter-----------------------------------

    get prodotti()
    {
        return this.#prodotti();
    }

    get quantitàMagazzino()
    {
        return this.#quantitàMagazzino;
    }

    //Setter----------------------------------

    //Metodi----------------------------------

    aggiungiProdottoAlMagazzino(prodotto, quantitàMagazzino)
    {
        this.#prodotti.push(prodotto);
        this.#prodotti.push(quantitàMagazzino);
    }

    trovaIndice(nomeProdottoCercato)
    {
        this.#prodotti.forEach((p, i) => { if(p.nomeProdotto==nomeProdottoCercato) return i;})
        return -1;
    }

    eliminaProdottoDalMagazzino(nomeProdottoEliminato)
    {
        let indice = this.trovaIndice(nomeProdottoEliminato)

        if(indice != -1)
        {
            this.#prodotto.splice(0, indice);
            this.#quantitàMagazzino.splice(0, indice)
        }
        else
            console.error("prodotto non trovato in magazzino")
    }

    incrementaQuantità(prodottoAggiunto)
    {
        let indice = this.trovaIndice(prodottoAggiunto)

        if(indice != -1)
            this.#quantitàMagazzino[indice]++;
        else
            console.error("prodotto non trovato, aggiungere il prodotto al magazzino")
    }

    decrementaQuantità(prodottoEstratto)
    {
        let indice = this.trovaIndice(prodottoAggiunto)

        if(indice != -1 && this.#quantitàMagazzino[indice] > 0)
            this.#quantitàMagazzino[indice]--;
        else
            console.error("prodotto non trovato o esaurito")
    }

    decrementaQuantità(prodottoEstratto)
    {
        let indice = this.trovaIndice(prodottoAggiunto)

        if(indice != -1 && this.#quantitàMagazzino[indice] > 0)
            this.#quantitàMagazzino[indice]--;
        else
            console.error("prodotto non trovato o esaurito")
    }

    toString()
    {
        out = "Prodotti contenuti nel magazzino: \n"
        this.#prodotti.forEach((p, i)=>{out += p.toString() + "quantità: " + this.#quantitàMagazzino[i] + "\n-------------------\n"})

        return out;
    }
}