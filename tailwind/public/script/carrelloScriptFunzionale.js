var magazzino
var utenteAccesso
var casellaRicerca

window.onload = caricamentoPagina

function caricamentoPagina()
{
    /* Nascondo parti dell'html che verranno visualizzate in un secondo momento*/
    $('#bottoneAggiungiProdotto').hide()
    $('#informazioniCliente').hide()

    /* converto l'oggetto e i suoi figli negli oggetti specifici */
    magazzino = Magazzino.parse(magazzinoJSON)

    casellaRicerca = document.getElementById('casellaRicerca')
    casellaRicerca.addEventListener("input",function(){
      avviaRicerca()
    })


    /* vado a inserire ogni prodotto nell'html */
    utenteAccesso = Utente.parse(localStorage.getItem('utenteAccesso'))
    if(utenteAccesso.carrello.arrayProdotti.length > 0)
    {
        utenteAccesso.carrello.arrayProdotti.forEach((item, i) => 
        {
            $('#areaArticoli').append(item.toHTML())
        })

        $ ('#areaTotaleOrdine').append(
            `
            <div 
            class="text-white mt-10 text-3xl flex flex-col"
            >
                <span>Totale imponibile: ` + utenteAccesso.carrello.totaleSenzaIva.toFixed(2) + ` €</span>
                <button
                class="w-full mt-5 btn text-white bg-green-600 md:border-2 hover:bg-white hover:text-green-600 transition ease-out duration-500" 
                onclick="avviaOrdineTotlale()"
                >
                    <i class="fas fa-money-check mr-2"></i>
                    Procedi all'ordine
                </button>
            </div>
            `
        )
    }
    else
    {
        $ ('#areaArticoli').append(
            `
            <div 
            class="w-full flex items-center text-white mt-10"
            >
                <span>Non hai ancora nessun prodotto nel carrello!</span>
                <i class="fas fa-sad-tear ml-3 text-yellow-500 text-3xl"></i>
            </div>
            `
        )
    }
    

    /* memorizzo in utenteAccesso le informazioni sull'utente che ha eseguito l'accesso */
    utenteAccesso = Utente.parse(localStorage.getItem('utenteAccesso'))

    /* nasconde le descrizioni dei prodotti */
    mostraNascondiDescrizione()
    

    /* Creo un elemento che attiva delle impostazioni avanzati e lo aggiungo solo se l'utente che ha fatto l'accesso è un admin */
    var opzioniAdmin = `<li class="items-center">
                        <a
                            class="text-blueGray-700 hover:text-blueGray-500 text-xs uppercase py-3 font-bold block cursor-pointer"
                            onclick = "aggiungiOpzioniAdmin()"
                            id ="opzioniAdmin"
                            >
                            <i class="fas fa-tools text-blueGray-400 mr-2 text-sm"></i>
                            Opzioni
                            </a>
                        </li>`
    if(utenteAccesso instanceof Amministratore)
    {
        $("#ulMenu").append(opzioniAdmin)
    }
    else
    {
        aggiungiOpzioniUtente()
    }
    
    /* Aggiungo il saluto all'utente nella pagina in base all'utenteAccesso */
    document.getElementById('spanSaluto').innerHTML = utenteAccesso.username


    /* Aggiorno il numero massimo disponibile dello spinner di ogni prodotto */
    $(".spinnerProdotto").each(function()
    {
        var nomeProdottoCorrente = this.parentNode.parentNode.children[0].children[0].children[1].innerHTML
        var disponibilitaProdottoCorrente = magazzino.prodotti[magazzino.trovaIndice(nomeProdottoCorrente)].quantita
        
        $(this).attr("max", disponibilitaProdottoCorrente)
    })




    /* Genero sfumatura al caricamento della pagina */
    $(function()
    {
        $('body').fadeIn(500)
        
        setTimeout(function()
        {
            $('body').fadeOut(1000, function()
            {
                ricarica()
            })
        }, 60000)
    })
}

function aggiungiOpzioniUtente()
{
    console.log("ciao")
    $('.utenteAggiungi').append(
        `
        <button
        class="w-full mt-5 btn text-white bg-green-600 md:border-2 hover:bg-white hover:text-green-600 transition ease-out duration-500" 
        onclick="avviaAcquistoProdottoSingolo(this)"
        >
            <i class="fas fa-money-check mr-2"></i>
            Acquista prodotto
        </button>

        <button
        class="w-full mt-5 btn text-white bg-red-600 md:border-2 hover:bg-white hover:text-red-600 transition ease-out duration-500" 
        onclick="rimuovi(this)"
        >
            <i class="fas fa-trash mr-2"></i>
            Rimuovi prodotto
        </button>
        `
    )
}



function disconnetti()
{
    localStorage.removeItem('utenteAccesso')

    if(confirm("Stai per disconetterti. Continuare?"))
    {
        window.location = "index.html"
    }
}

function rimuovi(obj)
{
    let nomeProdottoCorrente = obj.parentNode.parentNode.children[0].children[0].children[1].innerText;
    let quantitaProdottoCorrente = utenteAccesso.carrello.arrayProdotti[utenteAccesso.carrello.trovaIndice(nomeProdottoCorrente)].quantita
    
    utenteAccesso.carrello.eliminaProdotto(nomeProdottoCorrente, quantitaProdottoCorrente, magazzino)
    
    /* Salvo le modifiche sui database */
    localStorage.setItem('utenteAccesso', utenteAccesso.stringify())


    aggiornaDatabaseUtenti()
    
    $.ajax({
        data: {"content" : magazzino.stringify()}, 
        url: "php/aggiornaMagazzino.php",
        type: "POST",
        success: function(data){
            console.log("modifica file eseguita")
        }
    })

    ricarica()
}

function avviaAcquistoProdottoSingolo(obj)
{
    var nomeProdottoCorrente = obj.parentNode.parentNode.children[0].children[0].children[1].innerText;
    
    if(controllaPresenzaInformazioni())
    {
        var indiceCarrelloProdotto = utenteAccesso.carrello.trovaIndice(nomeProdottoCorrente)
        var arrayProdotti = [utenteAccesso.carrello.arrayProdotti[indiceCarrelloProdotto]]
        var numeroFattura = JSON.parse(ordiniJSON).length + 1
        
        
        
        var ordine = new Ordine(arrayProdotti, new Date(), utenteAccesso, numeroFattura)
        
        localStorage.setItem('ordine', ordine.stringify())

        /*Rimuovo l'articolo acquistato dal carrello e lo metto nel vettore cronologiaAcquis*/
        utenteAccesso.carrello.acquistaProdotto(nomeProdottoCorrente)

        localStorage.setItem('utenteAccesso', utenteAccesso.stringify())

        aggiornaDatabaseUtenti()
        
        setTimeout(function(){window.location = "fattura.html"}, 1000)
    }
    else
    {
        $('#informazioniCliente').toggle()
        $('#prodottiPagina').hide()
        window.scrollTo(0,140)
    }
}

function avviaOrdineTotlale()
{
    if(controllaPresenzaInformazioni())
    {
        var arrayProdotti = utenteAccesso.carrello.arrayProdotti
        var numeroFattura = JSON.parse(ordiniJSON).length + 1 
        var nProdotti = utenteAccesso.carrello.arrayProdotti.length
        var nomiProdotti = []
        arrayProdotti.forEach((item) => {nomiProdotti.push(item.nomeProdotto)})
        
        var ordine = new Ordine(arrayProdotti, new Date(), utenteAccesso, numeroFattura)
        
        localStorage.setItem('ordine', ordine.stringify())
        
        for(var i = 0 ; i < nProdotti ; i++)
            utenteAccesso.carrello.acquistaProdotto(nomiProdotti[i])


        localStorage.setItem('utenteAccesso', utenteAccesso.stringify())
        //utenteAccesso.carrello.arrayProdotti = []

        aggiornaDatabaseUtenti()
        
        setTimeout(function(){window.location = "fattura.html"}, 1000)
    }
    else
    {
        $('#informazioniCliente').toggle()
        $('#prodottiPagina').hide()
        window.scrollTo(0,140)
    }
}



function chiudiAcquistoProdotto()
{
    $('#informazioniCliente').toggle()
    $('#prodottiPagina').toggle()
    window.scrollTo(0,0)
}

function controllaPresenzaInformazioni()
{
    if(utenteAccesso.nomeAzienda == "")
    {
        return false
    }
    else
    {
        return true
    }
}

function checkAzienda()
{
    var nomeAziendaCliente = document.formInformazioniAzienda.nomeAzienda.value
    var indirizzoAziendaCliente = document.formInformazioniAzienda.indirizzoAzienda.value
    var partitaIVAAziendaCliente = document.formInformazioniAzienda.partitaIva.value
    var codiceFiscaleCliente = document.formInformazioniAzienda.codiceFiscale.value


    utenteAccesso.nomeAzienda = nomeAziendaCliente
    utenteAccesso.indirizzoAzienda = indirizzoAziendaCliente
    utenteAccesso.partitaIva = partitaIVAAziendaCliente
    utenteAccesso.codiceFiscale = codiceFiscaleCliente

    console.log(nomeAziendaCliente)

    localStorage.setItem('utenteAccesso', utenteAccesso.stringify())
    
    aggiornaDatabaseUtenti()

    ricarica()
    
}
function aggiornaDatabaseUtenti()
{
    var utenti = JSON.parse(utentiJSON)
    utenti = utenti.map((item) => 
    {
        return Utente.parse(item)
    })
    utenti = utenti.map(function(item, i)
    {
        if(item.username == utenteAccesso.username)
        {
            return utenteAccesso
        }
        else
        {
            return item
        }
    })
    scriviDatabaseUtenti(utenti)
}

function scriviDatabaseUtenti(utenti)
{
    utenti = utenti.map(function(item, i)
    {
        return item.stringify()
    })
    $.ajax({
        data: {"content" : JSON.stringify(utenti)}, 
        url: "php/aggiornaListaUtenti.php",
        type: "POST",
        success: function(data){
            console.log("modifica file eseguita")
        }
    })
}

function avviaRicerca()
{
  // code here
  var indizio = casellaRicerca.value
  
  var prodottiFiltrati = utenteAccesso.carrello.arrayProdotti

  prodottiFiltrati = prodottiFiltrati.map(function(item, i)
  {
    if(item.categoria.toLowerCase().includes(indizio.toLowerCase()) || item.nomeProdotto.toLowerCase().includes(indizio.toLowerCase()))
      return item
  })

  document.getElementById('areaArticoli').innerHTML = ""
  if(indizio != "")
  {
    prodottiFiltrati.forEach((item, i) => 
    {
      if(item != undefined)
        $('#areaArticoli').append(item.toHTML())
    })
  }
  else
  {
    utenteAccesso.carrello.arrayProdotti.forEach((item, i) => 
    {
      if(item != undefined)
        $('#areaArticoli').append(item.toHTML())
    })
  }

  mostraNascondiDescrizione()

  if(!(utenteAccesso instanceof Amministratore))
  {
    aggiungiOpzioniUtente()
  }


  /* Aggiorno il numero massimo disponibile dello spinner di ogni prodotto */
  $(".spinnerProdotto").each(function()
  {
    var nomeProdottoCorrente = this.parentNode.parentNode.children[0].children[0].children[1].innerHTML
    var disponibilitaProdottoCorrente = magazzino.prodotti[magazzino.trovaIndice(nomeProdottoCorrente)].quantita
    
    $(this).attr("max", disponibilitaProdottoCorrente)
  })
}

function ricarica()
{
    setTimeout(function(){window.location.href = window.location.href
      window.location.replace(window.location.href) }, 1000)
}