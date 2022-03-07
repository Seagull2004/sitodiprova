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

    /* generare un prodotto in base ai dati */
    toHTML()
    {
      var toHtmlString =  '<div class="w-full lg:w-6/12 xl:w-3/12 px-4 pt-6 transform hover:scale-105 hover:bg-opacity-100 transition ease-out duration-300">'
      toHtmlString +=       '<div class="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">'
      toHtmlString +=         '<div class="flex-auto p-4">'
      toHtmlString +=           '<div class="flex flex-wrap">'
      toHtmlString +=             '<div class="relative w-full pr-4 max-w-full flex-grow flex-1">'
      toHtmlString +=               '<h3 class="text-blueGray-400 uppercase font-bold text-xs">#'
      toHtmlString +=                 this.#categoria
      toHtmlString +=               '</h3>'
      toHtmlString +=               '<h5 class="text-black uppercase font-bold text-xl">'
      toHtmlString +=                 this.#nomeProdotto
      toHtmlString +=               '</h5>'
      toHtmlString +=               '<span class="mb-2 font-semibold text-xl text-blueGray-700">'
      toHtmlString +=                 this.#prezzoSenzaIva
      toHtmlString +=               '</span> €'
      toHtmlString +=             '</div>'
      toHtmlString +=             '<div class="relative w-auto pl-4 flex-initial">'
      
        // da vedere se sostituire con una immagine
      toHtmlString +=             '<div class="text-black p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-lightBlue-500">'
      
      if(this.#categoria.toLowerCase() == "mouse")
      {
        toHtmlString += '<i class="fas fa-mouse"></i>'
      }
      else if(this.#categoria.toLowerCase() == "tastiere")
      {
        toHtmlString += '<i class="fas fa-keyboard"></i>'
      }
      else if(this.#categoria.toLowerCase() == "monitor")
      {
        toHtmlString += '<img src="img/ico-monitor.svg">'
      }
      else if(this.#categoria.toLowerCase() == "archiviazione")
      {
        toHtmlString += '<i class="fas fa-database"></i>'
      }
      else if(this.#categoria.toLowerCase() == "cablaggio")
      {
        toHtmlString += '<i class="fas fa-network-wired"></i>'
      }
      else
      {
        toHtmlString += '<img src="img/ico-chip.png">'
      }
      
      toHtmlString +=             '</div>'
      
      toHtmlString +=           '</div>'
      toHtmlString +=         '</div>'
      toHtmlString +=         '<p class ="inputNumberAdmin"></p>'
      toHtmlString +=         '<p class="text-sm text-blueGray-400 mt-4">'
      toHtmlString +=           '<span class="text-l '
      toHtmlString +=             this.#quantita > 0 ? ('text-green-600') : ('text-red-500')
      toHtmlString +=            '">'
      toHtmlString +=              this.#quantita
      toHtmlString +=           '</span>'
      toHtmlString +=           '<span class="whitespace-nowrap">'
      toHtmlString +=            ' pezzi '
      toHtmlString +=          '</span>'
      toHtmlString +=         '</p>'
      
      toHtmlString +=         '<p class="utenteAggiungi flex justify-center flex-col"></p>'
      toHtmlString +=         '<ul class = "descrizione mt-5 font-bold">'
      toHtmlString +=           '<li class="freccia cursor-pointer hover:text-gray-600"> <i class="fas fa-arrow-circle-down"></i> Descrizione</li>'
      toHtmlString +=         '</ul>'
      toHtmlString +=       '<article class="art">'
      toHtmlString +=         this.#descrizioneProdotto
      toHtmlString +=       '.</article>'
      toHtmlString +=       '</div>'
      toHtmlString +=      '</div>'
      toHtmlString +=    '</div>'

      return toHtmlString
    }
}