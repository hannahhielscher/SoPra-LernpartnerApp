import BusinessObject from './BusinessObject';

export default class TeilnahmeChatBO extends BusinessObject{

	constructor(ateilnehmer, akonversation){
        super();
        this.teilnehmer = ateilnehmer;
        this.koversation = akonversation;
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
				Object.setPrototypeOf(c, TeilnahmeChatsBO.prototype);
				results.push(c);
			})
		} else {
			// Es gibt wohl nur ein Objekt
			let c = teilnahmeChats;
			Object.setPrototypeOf(c, TeilnahmeChatsBO.prototype);
			results = c;
		}
		return results;
	}
} 

