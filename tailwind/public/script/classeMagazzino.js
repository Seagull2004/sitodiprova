class Magazzino
{
    //Attributi ------------------------------------------------------------------------------------------------------------------------------------------------

    #prodotti

    //Costruttori e metodi statici ------------------------------------------------------------------------------------------------------------------------------------------------

    constructor(prodotti)
    {
       this.#prodotti = prodotti
    }

    // attraverso le informazioni di un oggetto ne crea uno di tipo Magazzino
    static toMagazzino(oggetto)
    {
        oggetto.prodotti = oggetto.prodotti.map(function(item, i)
        {
          return Prodotto.toProdotto(item);
        })

        return new Magazzino(oggetto.prodotti)
    }

    //Getter ------------------------------------------------------------------------------------------------------------------------------------------------

    get prodotti()
    {
        return this.#prodotti;
    }

    //Metodi ------------------------------------------------------------------------------------------------------------------------------------------------

      
    toString()
    {
        var out = "Prodotti contenuti nel magazzino: \n\n"
        
        this.#prodotti.forEach((p, i)=>
        {
            out += p.toString()  + "\n-------------------\n"
        })

        return out;
    }

    /*Mette in vendita un nuovo prodotto*/
    aggiungiProdottoAlMagazzino(prodotto)
    {
        this.#prodotti.push(prodotto);
    }

    /*Dato il nome del prodotto cercato restituisce l'indice del prodotto nell'array del magazzino o -1 se non lo trova*/
    trovaIndice(nomeProdottoCercato)
    {
        var indice = -1
        
        this.#prodotti.forEach((p, i) => 
        { 
            if(p.nomeProdotto == nomeProdottoCercato)
            {
                indice = i;
            }
        })

        return indice;
    }

    /*Toglie dal negozio un prodotto*/
    eliminaProdottoDalMagazzino(nomeProdottoEliminato)
    {
        let indice = this.trovaIndice(nomeProdottoEliminato)

        if(indice != -1)
        {
            this.#prodotti.splice(indice, 1);
        }
        else
        {
            console.error("prodotto non trovato in magazzino")
        }
    }

    /*Incrementa di 1 la quantità di un prodotto disponibile in magazzino*/
    incrementaQuantita(nomeProdottoAggiunto)
    {
        let indice = this.trovaIndice(nomeProdottoAggiunto)

        if(indice != -1)
        {
            this.#prodotti[indice].quantita++;
        } 
        else
        {
            console.error("prodotto non trovato, aggiungere il prodotto al magazzino")
        }
    }

    /*Decrementa di 1 la quantità di un prodotto disponibile in magazzino*/
    decrementaQuantita(nomeProdottoEstratto)
    {
        let indice = this.trovaIndice(nomeProdottoEstratto)

        if(indice != -1 && this.#prodotti[indice].quantita > 0)
        {
            this.#prodotti[indice].quantita--;
        }
        else
        {
            console.error("prodotto non trovato o esaurito")
        }   
    }

    stringify()
    {
        return JSON.stringify(
            {        
                ['prodotti']: this.#prodotti.map((item) => {return item.stringify()})
            }
        )
    }

    static parse(oggetto)
    {
        oggetto = JSON.parse(oggetto)

        oggetto.prodotti = oggetto.prodotti.map((item) => 
        {
            return JSON.parse(item)
        })
        //oggetto.quantitaMagazzino = oggetto.quantitaMagazzino.map((item) => {return JSON.parse(item)})
        
        oggetto = Magazzino.toMagazzino(oggetto)
        
        return oggetto
    }

}