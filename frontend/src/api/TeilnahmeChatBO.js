import BusinessObject from './BusinessObject';

export default class TeilnahmeChatBO extends BusinessObject{

	constructor(ateilnehmer, aanfrage_sender, astatus, akonversation){
        super();
        this.teilnehmer = ateilnehmer;
        this.anfrage_sender = aanfrage_sender
        this.status = astatus;
        this.konversation = akonversation;
    }

    /*
	erhalte Teilnehmer
	*/
    getteilnehmer(){
        return this.teilnehmer;
    }
    /*
	setze Teilnehmer
	*/
    setteilnehmer(ateilnehmer){
        this.teilnehmer = ateilnehmer;
    }

    /*
	erhalte Sender
	*/
    getanfrage_sender(){
        return this.teilnehmer;
    }
    /*
	setze Sender
	*/
    setanfrage_sender(aanfrage_sender){
        this.anfrage_sender = aanfrage_sender;
    }

    /*
	erhalte Anfragestatus
	*/
    getstatus(){
        return this.status;
    }

    /*
	setze Anfragestatus
	*/
    setstatus(astatus){
        this.status = astatus;
    }

    /*
	erhalte Konversation
	*/
    getkonversation(){
        return this.konversation;
    }

    /*
	setze Konversation
	*/
    setkonversation(akonversation){
        this.konversation = akonversation;
    }

    /**
     * Gibt ein Array von TeilnahmeChatsBO aus einer gegebenen JSON-Struktur zurück
     */
    static fromJSON(teilnahmeChats) {
		let results = null;
		if (Array.isArray(teilnahmeChats)) {
			results = [];
			teilnahmeChats.forEach((c) => {
				Object.setPrototypeOf(c, TeilnahmeChatBO.prototype);
				results.push(c);
			})
		} else {
			// Es gibt wohl nur ein Objekt
			let c = teilnahmeChats;
			Object.setPrototypeOf(c, TeilnahmeChatBO.prototype);
			results = c;
		}
		return results;
	}
} 

