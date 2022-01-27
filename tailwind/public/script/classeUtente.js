class Utente
{

  // Attributi --------------------------------------------

  #username
  #password
  #email

  #carrello

  #nomeAzienda
  #indirizzoAzienda
  #partitaIva
  #codiceFiscale
  
  // Costruttori --------------------------------------------
  
  constructor(username, email, password)
  {
    this.#username = username;
    this.#password = password;
    this.#email = email

    this.#carrello = new Carrello()
  }

  // Getter --------------------------------------------

  get username()
  {
		  return this.#username   	
  }

  get password()
  {
		return this.#password   	
  }

  get nomeAzienda()
  {
		return this.#nomeAzienda   	
  }

  get indirizzoAzienda()
  {
  	return this.#indirizzoAzienda
  }

  get partitaIva()
  {
    return this.#partitaIva
  }

  get codiceFiscale()
  {
    return this.#codiceFiscale
  }

  get email()
  {
    return this.#email
  }

  get carrello()
  {
    return this.#carrello
  }

  // Setter --------------------------------------------

  set email(email)
  {

    this.#email = email
  }

  set username(username)
  {
    this.#username = username
  }

  // Metodi --------------------------------------------

  toString()
  {
    out =  "username: " + this.#username + "\n"
    out += "password: " + this.#password + "\n"
    out += "email: " + this.#email + "\n"
    out += "carrello:\n" + this.#carrello.toString() + "\n"
    out += "nome dell'azienda: " + this.#nomeAzienda + "\n"
    out += "indirizzo dell'azienda: " + this.#indirizzoAzienda + "\n"
    out += "codice partita IVA: " + this.#partitaIva + "\n"
    out += "codice fiscale: " + this.#codiceFiscale + "\n"
    return out
  }
}