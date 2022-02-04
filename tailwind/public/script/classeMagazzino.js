class Magazzino
{
    //Attributi ------------------------------------------------------------------------------------------------------------------------------------------------

    prodotti
    quantitàMagazzino //Array parallelo a quello dei prodotti, contiene la quantità del prodotto con posizione corrispondente nell'array di prodotti

    //Costruttori e metodi statici ------------------------------------------------------------------------------------------------------------------------------------------------

    constructor(prodotti, quantitàMagazzino)
    {
       this.prodotti = prodotti
       this.quantitàMagazzino = quantitàMagazzino
    }

    // attraverso le informazioni di un oggetto ne crea uno di tipo Magazzino
    static toMagazzino(oggetto)
    {
        return new Magazzino(oggetto.prodotti, oggetto.quantitàMagazzino)
    }

    //Getter ------------------------------------------------------------------------------------------------------------------------------------------------

    get prodotti()
    {
        return this.prodotti();
    }

    get quantitàMagazzino()
    {
        return this.quantitàMagazzino;
    }

    //Metodi ------------------------------------------------------------------------------------------------------------------------------------------------

    /*Mette in vendita un nuovo prodotto*/
    aggiungiProdottoAlMagazzino(prodotto, quantitàMagazzino)
    {
        this.prodotti.push(prodotto);
        this.prodotti.push(quantitàMagazzino);
    }

    /*Dato il nome del prodotto cercato restituisce l'indice del prodotto nell'array del magazzino o -1 se non lo trova*/
    trovaIndice(nomeProdottoCercato)
    {
        this.prodotti.forEach((p, i) => { if(p.nomeProdotto==nomeProdottoCercato) return i;})
        return -1;
    }

    /*Toglie dal negozio un prodotto*/
    eliminaProdottoDalMagazzino(nomeProdottoEliminato)
    {
        let indice = this.trovaIndice(nomeProdottoEliminato)

        if(indice != -1)
        {
            this.prodotto.splice(indice, 1);
            this.quantitàMagazzino.splice(indice, 1)
        }
        else
        {
            console.error("prodotto non trovato in magazzino")
        }
    }

    /*Incrementa di 1 la quantità di un prodotto disponibile in magazzino*/
    incrementaQuantità(prodottoAggiunto)
    {
        let indice = this.trovaIndice(prodottoAggiunto)

        if(indice != -1)
        {
            this.quantitàMagazzino[indice]++;
        } 
        else
        {
            console.error("prodotto non trovato, aggiungere il prodotto al magazzino")
        }
    }

    /*Decrementa di 1 la quantità di un prodotto disponibile in magazzino*/
    decrementaQuantità(prodottoEstratto)
    {
        let indice = this.trovaIndice(prodottoEstratto)

        if(indice != -1 && this.quantitàMagazzino[indice] > 0)
        {
            this.quantitàMagazzino[indice]--;
        }
        else
        {
            console.error("prodotto non trovato o esaurito")
        }   
    }

    
    toString()
    {
        var out = "Prodotti contenuti nel magazzino: \n\n"
        
        this.prodotti.forEach((p, i)=>
        {
            out += p.toString() + "quantità: " + this.quantitàMagazzino[i] + "\n-------------------\n"
        })

        return out;
    }
}