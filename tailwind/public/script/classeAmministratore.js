class Amministratore extends Utente
{

    // Attributi ------------------------------------------------------------------------------------------------------------------------------------------------
    #admin = true

    // Costruttori e metodi statici ------------------------------------------------------------------------------------------------------------------------------------------------

    constructor(username, email, password, carrello, nomeAzienda, indirizzoAzienda, partitaIva, codiceFiscale)
    {
        super(username, email, password, carrello, nomeAzienda, indirizzoAzienda, partitaIva, codiceFiscale)
    }


    static toAmministratore(oggetto)
    {
        oggetto.carrello = Carrello.toCarrello(oggetto.carrello)

        return new Amministratore(oggetto.username, oggetto.email, oggetto.password, oggetto.carrello, oggetto.nomeAzienda, oggetto.indirizzoAzienda, oggetto.partitaIva, oggetto.codiceFiscale)
    }
}