import BusinessObject from './BusinessObject';

export default class TeilnahmeChatBO extends BusinessObject{

	constructor(ateilnehmer, astatus, akonversation){
        super();
        this.teilnehmer = ateilnehmer;
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

