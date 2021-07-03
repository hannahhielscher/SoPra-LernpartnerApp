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
	erhalte 
	*/
    getteilnehmer(){
        return this.teilnehmer;
    }
    /*
	setze 
	*/
    setteilnehmer(ateilnehmer){
        this.teilnehmer = ateilnehmer;
    }

    /*
	erhalte
	*/
    getanfrage_sender(){
        return this.teilnehmer;
    }
    /*
	setze
	*/
    setanfrage_sender(aanfrage_sender){
        this.anfrage_sender = aanfrage_sender;
    }

    /*
	erhalte
	*/
    getstatus(){
        return this.status;
    }

    /*
	setze
	*/
    setstatus(astatus){
        this.status = astatus;
    }

    /*
	erhalte 
	*/
    getkonversation(){
        return this.konversation;
    }

    /*
	setze 
	*/
    setkonversation(akonversation){
        this.konversation = akonversation;
    }
    

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

