class Utente
{

  // Attributi ------------------------------------------------------------------------------------------------------------------------------------------------

  username
  password
  email

  carrello

  nomeAzienda
  indirizzoAzienda
  partitaIva
  codiceFiscale
  
  // Costruttori e metodi statici ------------------------------------------------------------------------------------------------------------------------------------------------
  
  constructor(username, email, password, carrello, nomeAzienda, indirizzoAzienda, partitaIva, codiceFiscale)
  {
    this.username = username
    this.password = password
    this.email = email

    this.carrello = carrello

    this.nomeAzienda = nomeAzienda
    this.indirizzoAzienda = indirizzoAzienda
    this.partitaIva = partitaIva
    this.codiceFiscale = codiceFiscale
  }

  // se voglio creare un utente con solo alcune informazioni faccio = Utente.informazioniBase(username, email, password)
  static informazioniBase(username, email, password)
  {
    return new Utente(username, email, password, carrelloVuoto(), "", "", "", "")
  }

  // attraverso le informazioni di un oggetto ne crea uno di tipo Utente
  static toUtente(oggetto)
  {
    return new Utente(oggetto.username, oggetto.email, oggetto.password, oggetto.carrello, oggetto.nomeAzienda, oggetto.indirizzoAzienda, oggetto.partitaIva, oggetto.codiceFiscale)
  }


  // Getter ------------------------------------------------------------------------------------------------------------------------------------------------

  get username()
  {
		  return this.username   	
  }

  get password()
  {
		return this.password   	
  }

  get nomeAzienda()
  {
		return this.nomeAzienda   	
  }

  get indirizzoAzienda()
  {
  	return this.indirizzoAzienda
  }

  get partitaIva()
  {
    return this.partitaIva
  }

  get codiceFiscale()
  {
    return this.codiceFiscale
  }

  get email()
  {
    return this.email
  }

  get carrello()
  {
    return this.carrello
  }

  // Setter ------------------------------------------------------------------------------------------------------------------------------------------------

  set email(email)
  {
    this.email = email
  }

  set username(username)
  {
    this.username = username
  }

  // Metodi ------------------------------------------------------------------------------------------------------------------------------------------------

  toString()
  {
    var out =  "username: " + this.username + "\n"
    out += "password: " + this.password + "\n"
    out += "email: " + this.email + "\n"
    out += "carrello:\n" + this.carrello.toString() + "\n"
    out += "nome dell'azienda: " + this.nomeAzienda + "\n"
    out += "indirizzo dell'azienda: " + this.indirizzoAzienda + "\n"
    out += "codice partita IVA: " + this.partitaIva + "\n"
    out += "codice fiscale: " + this.codiceFiscale + "\n"
    return out
  }
}