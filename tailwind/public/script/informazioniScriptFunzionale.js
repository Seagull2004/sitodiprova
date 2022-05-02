window.onload = mostraInformazioni

var utenteAccesso = localStorage.getItem('utenteAccesso')
utenteAccesso = Utente.parse(utenteAccesso)

function mostraInformazioni()
{

    if(utenteAccesso.username != "")
        document.getElementById('nomeUtente').innerHTML = utenteAccesso.username
    if(utenteAccesso.email != "")
        document.getElementById('indirizzoEmail').innerHTML = utenteAccesso.email
    if(utenteAccesso.nomeAzienda != "")
        document.getElementById('nomeAzienda').innerHTML = utenteAccesso.nomeAzienda
    if(utenteAccesso.indirizzoAzienda != "")
        document.getElementById('indirizzoAzienda').innerHTML = utenteAccesso.indirizzoAzienda
    if(utenteAccesso.partitaIva != "")
        document.getElementById('partitaIVA').innerHTML = utenteAccesso.partitaIva
    if(utenteAccesso.codiceFiscale != "")
        document.getElementById('codiceFiscale').innerHTML = utenteAccesso.codiceFiscale
    


    utenteAccesso.carrello.cronologiaAcquisti.forEach(function(item, i)
    {
        if(i == 0)
        {
            document.getElementById('cronologiaAcquisti').innerHTML = ""
        }

        $('#cronologiaAcquisti').append('<option>' + item.nomeProdotto + ' (x' + item.quantita + '), ' + (item.prezzoSenzaIva *  item.quantita  * 1.22).toFixed(2) + '€</option>')
    });

    $('#cronologiaAcquisti').attr("size", utenteAccesso.carrello.cronologiaAcquisti.length)

    /*var tBody = '<tr>'
    tBody +=        '<th>Nome utente: '+utenteAccesso.username+'</th>'
    tBody +=    '</tr>'
    tBody +=    '<tr>'
    tBody +=        '<th>Indirizzo email: '+utenteAccesso.email+'</th>'
    tBody +=    '</tr>'
    tBody +=    '<tr>'
    tBody +=        '<th>Nome azienda: '+utenteAccesso.nomeAzienda+'</th>'
    tBody +=    '</tr>'
    tBody +=    '<tr>'
    tBody +=        '<th>Indirizzo azienda: '+utenteAccesso.indirizzoAzienda+'</th>'
    tBody +=    '</tr>'
    tBody +=    '<tr>'
    tBody +=        '<th>Partita IVA: '+utenteAccesso.partitaIva+'</th>'
    tBody +=    '</tr>'
    tBody +=    '<tr>'
    tBody +=        '<th>Codice fiscale: '+utenteAccesso.codiceFiscale+'</th>'
    tBody +=    '</tr>'

    $('#infoUtente tbody').append(tBody);*/

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

    /* Aggiungo il saluto all'utente nella pagina in base all'utenteAccesso */
    document.getElementById('spanSaluto').innerHTML = utenteAccesso.username
}

function disconnetti()
{
  localStorage.removeItem('utenteAccesso')

  if(confirm("Stai per disconetterti. Continuare?"))
  {
    window.location = "index.html"
  }
}