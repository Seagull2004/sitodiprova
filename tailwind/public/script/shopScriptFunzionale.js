var magazzino
var utenteAccesso
var casellaRicerca

window.onload = caricamentoPagina

function caricamentoPagina()
{
  
  /* Nascondo parti dell'html che verranno visualizzate in un secondo momento*/
  $('#bottoneAggiungiProdotto').hide()
  $('#registraProdotto').hide()
  /* converto l'oggetto e i suoi figli negli oggetti specifici */
  magazzino = Magazzino.parse(magazzinoJSON)
  
  /* qua ci occupiamo della casella di ricerca */
  casellaRicerca = document.getElementById('casellaRicerca')
  casellaRicerca.addEventListener("input",function(){
    avviaRicerca()
  })

  /* vado a inserire ogni prodotto nell'html */
  magazzino.prodotti.forEach((item, i) => 
  {
    $('#areaArticoli').append(item.toHTML())
  })

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


function aggiungiOpzioniAdmin()
{
  /* se questa funzione viene chiamata con un utente loggato non Amministratore allora fallisce */
  if(!(utenteAccesso instanceof Amministratore))
  {
    return -1
  }

  /* modifico la funzione del bottone delle opzioni */
  $('#opzioniAdmin').attr("onclick", "togliOpzioniAdmin()")

  /* rendo visibile la casella per aggiungere un prodotto al magazzino */
  $("#bottoneAggiungiProdotto").toggle(500)

  /* aggiungo le opzioni di modifica sui singoli prodotti */
  $(".inputNumberAdmin").append
  (
    `
    <hr class="mt-5 mb-5 md:min-w-full" ></hr>
    <input 
      type="number" 
      class="btn mt-3"
      placeholder="Aggiungi o togli qtà"
    > 
    
    <button 
      class="btn text-blue-500 border-blue-500 md:border-2 hover:bg-blue-500 hover:text-white transition ease-out duration-500" 
      type="button" 
      onclick="cambiaQuantita(this)"
    >
       Applica
    </button>

    <button 
      class="btn mt-2 text-red-500 border-red-500 md:border-2 hover:bg-red-500 hover:text-white transition ease-out duration-500" 
      type="button"
      id = "bottoneCestino"
      onclick="confermaEliminaProdotto(this)"
    >
      <i class="fas fa-trash "></i>
    </button>
    `
  )


}

function confermaEliminaProdotto(obj)
{

  $(obj).toggle()
  $(obj.parentNode).append
  (
  `<button 
    class="btn mt-2 text-red-500 border-red-500 md:border-2 hover:bg-red-500 hover:text-white transition ease-out duration-500" 
    type="button"
    onclick = "annullaConfermaEliminaProdotto(this)"
  >
    Annulla
  </button>
  `
  )
  $(obj.parentNode).append
  (
  `<button 
    class="btn mt-2 text-green-500 border-green-500 md:border-2 hover:bg-green-500 hover:text-white transition ease-out duration-500" 
    type="button"
    onclick = "eliminaProdotto(this)"
  >
    Ok
  </button>
  `
  )
}

function annullaConfermaEliminaProdotto(obj)
{
  $(obj.previousElementSibling).toggle()
  $(obj.nextElementSibling).remove()
  $(obj).remove()
}


function eliminaProdotto(obj)
{
  var nomeProdottoCorrente = obj.parentNode.previousElementSibling.children[0].children[1].innerText;

  magazzino.eliminaProdottoDalMagazzino(nomeProdottoCorrente)

  
  /* apporto la modifica al file con php contenente le informazioni sul magazzino*/
  $.ajax({
    data: {"content" : magazzino.stringify()}, 
    url: "php/aggiornaMagazzino.php",
    type: "POST",
    success: function(data){
      console.log(data)
      console.log("Aggiornamento file riuscito")
      ricarica()
    }
  })
  
}


function aggiungiOpzioniUtente()
{
    $('.utenteAggiungi').append(
      
      `
      <button
      class="mt-5 btn text-white bg-green-600 ml-2 md:border-2 hover:bg-white hover:text-green-600 transition ease-out duration-500" 
      onclick="aggiungiAlCarrello(this)"
      >
        Aggiungi al carrello
      </button>

      <input
      type="number"
      min="1"
      step="1"
      value="1"
      class="spinnerProdotto mt-1 btn text-black ml-2 border-black md:border-2" 
      >

      </input>
      `
    )
}

function togliOpzioniAdmin()
{
  /* modifico la funzione del bottone delle opzioni */
  $('#opzioniAdmin').attr("onclick", "aggiungiOpzioniAdmin()")

  /* rimuovo tutte le opzioni che sono state create da aggiungiOpzioniAdmin */
  $('#bottoneAggiungiProdotto').toggle(500)
  $(".inputNumberAdmin").children().remove()
}

function cambiaQuantita(obj)
{
  var numeroInput = obj.previousElementSibling.value
  var nomeProdottoCorrente = obj.parentNode.previousElementSibling.children[0].children[1].innerText;

  if(numeroInput > 0)
  {
    for(var i = 0 ; i < numeroInput ; i++)
    {
      magazzino.incrementaQuantita(nomeProdottoCorrente)
    }
  }
  else
  {
    if(Math.abs(numeroInput) <= magazzino.prodotti[magazzino.trovaIndice(nomeProdottoCorrente)].quantita)
    {
      for(var i = 0 ; i < Math.abs(numeroInput) ; i++)
      {
        magazzino.decrementaQuantita(nomeProdottoCorrente)
      }
    }
    else
    {
      console.error("stai cercando di togliere troppi pezzi")
      alert("stai cercando di togliere troppi pezzi")
      obj.previousElementSibling.value = null
      return -1
    }
  }

  
  /* apporto la modifica al file con php con le informzioni sul magazzino */
  $.ajax({
    data: {"content" : magazzino.stringify()}, 
    url: "php/aggiornaMagazzino.php",
    type: "POST",
    success: function(data){
      console.log(data)
      console.log("Aggiornamento file riuscito")            
    }
  })

  
  ricarica()
  
}

function aggiungiProdotto()
{
  window.scrollTo(0,140)
  $('#prodottiPagina').toggle()
  $('#registraProdotto').toggle()
  
  document.formProdotto.nomeProdotto.focus()
}

function chiudiCreazioneProdotto()
{
  $('#registraProdotto').toggle()
  $('#prodottiPagina').toggle()
  window.scrollTo(0,0)
}

function checkProdotto()
{
  let nomeProdotto = document.formProdotto.nomeProdotto.value.toUpperCase()
  let prezzoSenzaIva = document.formProdotto.prezzoSenzaIva.value
  let categoria = document.formProdotto.categoria.value
  let descrizioneProdotto = document.formProdotto.descrizione.value
  let quantita = document.formProdotto.quantita.value
  
  if(magazzino.prodotti.some((item) => {return item.nomeProdotto == nomeProdotto }))
  {
    console.error("E' già presente un prodotto con questo nome")
  }
  else
  {
    var nuovoProdotto = new Prodotto(nomeProdotto, prezzoSenzaIva, categoria, descrizioneProdotto, quantita)
    magazzino.prodotti.push(nuovoProdotto)
    document.formProdotto.reset()
    window.scrollTo(0,0)
    document.formProdotto.nomeProdotto.focus()
    $.ajax({
      data: {"content" : magazzino.stringify()}, 
      url: "php/aggiornaMagazzino.php",
      type: "POST",
      success: function(data){
        console.log(data)
        console.log("Aggiornamento file riuscito")
        setTimeout(1500)
        window.location = "shop.html"
      }
    })

  }
}

function disconnetti()
{
  localStorage.removeItem('utenteAccesso')

  if(confirm("Stai per disconetterti. Continuare?"))
  {
    window.location = "index.html"
  }
}

function aggiungiAlCarrello(obj)
{
  var nomeProdottoCorrente = obj.parentNode.parentNode.children[0].children[0].children[1].innerHTML
  var quantitaProdottoCorrente = obj.nextElementSibling.value

  utenteAccesso.carrello.aggiungiProdotto(nomeProdottoCorrente, parseInt(quantitaProdottoCorrente), magazzino)
  /* leggo l'oggetto che contiene tutti gli utenti */
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


  /* adesso salvo i database e il local storage */
  
  localStorage.setItem('utenteAccesso', utenteAccesso.stringify())

  utenti = utenti.map(function(item, i)
  {
    return item.stringify()
  })
  
  $.ajax({
    data: {"content" : JSON.stringify(utenti)}, 
    url: "php/aggiornaListaUtenti.php",
    type: "POST",
    success: function(data){
      console.log("Registrazione eseguita con successo!")
    }
  })

  
  ricarica()
}

function avviaRicerca()
{
  // code here
  var indizio = casellaRicerca.value
  
  var prodottiFiltrati = magazzino.prodotti

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
    magazzino.prodotti.forEach((item, i) => 
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
  else
  {
    if(document.getElementById('bottoneAggiungiProdotto').style.display == "")
    {
      /* aggiungo le opzioni di modifica sui singoli prodotti */
      $(".inputNumberAdmin").append
      (
        `
        <hr class="mt-5 mb-5 md:min-w-full" ></hr>
        <input 
          type="number" 
          class="btn mt-3"
          placeholder="Aggiungi o togli qtà"
        > 
        
        <button 
          class="btn text-blue-500 border-blue-500 md:border-2 hover:bg-blue-500 hover:text-white transition ease-out duration-500" 
          type="button" 
          onclick="cambiaQuantita(this)"
        >
          Applica
        </button>

        <button 
          class="btn mt-2 text-red-500 border-red-500 md:border-2 hover:bg-red-500 hover:text-white transition ease-out duration-500" 
          type="button"
          id = "bottoneCestino"
          onclick="confermaEliminaProdotto(this)"
        >
          <i class="fas fa-trash "></i>
        </button>
        `
      )
    }
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