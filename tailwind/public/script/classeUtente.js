class Utente
{
    #username
    #password
    #nomeAzienda
    #indirizzoAzienda
    #partitaIva
    #codiceFiscale

    constructor(username, password)
    {
      this.#username = username;
      this.#password = password;
    }

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

    set username(username)
    {
    	this.#username = username;
    }
}