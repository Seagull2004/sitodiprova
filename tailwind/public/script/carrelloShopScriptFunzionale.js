/* funzione per jQuery che ricava la classList di un elemento */
$.fn.classList = function()
{
  return this[0].classList
}



/* Nav menù responsive */
function toggleNavbar(collapseID) 
{
  $('#' + collapseID).classList().toggle("hidden")
  $('#' + collapseID).classList().toggle("bg-white")
  $('#' + collapseID).classList().toggle("m-2")
  $('#' + collapseID).classList().toggle("py-3")
  $('#' + collapseID).classList().toggle("px-6")
}

/* Menù a tendina per icona utente */
function apriUserMenu(event, dropdownID) 
{
  let element = event.target

  while (element.nodeName !== "A") 
  {
    element = element.parentNode
  }

  var popper = Popper.createPopper(element, document.getElementById(dropdownID),
  {
    placement: "bottom-end"
  })

  $('#' + dropdownID).classList().toggle("hidden")
  $('#' + dropdownID).classList().toggle("block")
}


/*funzione per far comparire/scomparire la descrizione dei prodotti*/
function mostraNascondiDescrizione()
{
  $(".art").hide();
  $(".descrizione").click(function() // anche se clicco sulla scritta e non sulla freccia l'articolo si apre
  {
    if($(this).next().css("display") == "none")
    {
      $(".freccia").children().attr("class", "fas fa-arrow-circle-up")
    }
    else
    {
      $(".freccia").children().attr("class", "fas fa-arrow-circle-down")
    }
    $(this).next().toggle(250)
  })
}