import BusinessObject from './BusinessObject';

export default class NachrichtBO extends BusinessObject{

	constructor(anachricht_inhalt, aperson_id, akonversation_id){
        super();
        this.nachricht_inhalt = anachricht_inhalt;
        this.person_id = aperson_id;
        this.konversation_id = akonversation_id;
    }
    /*
	erhalte 
	*/
    getnachricht_inhalt(){
        return this.nachricht_inhalt;
    }
    /*
	setze 
	*/
    setnachricht_inhalt(anachricht_inhalt){
        this.nachricht_inhalt = anachricht_inhalt;
    }

      /*
	erhalte 
	*/
    getperson_id(){
        return this.person_id;
    }

    /*
	setze 
	*/
    setperson_id(aperson_id){
        this.person_id = aperson_id;
    }
    
    /*
	erhalte 
	*/
    getkonversation_id(){
        return this.konversation_id;
    }
    /*
	setze 
	*/
    setkonversation_id(akonversation_id){
        this.konversation_id = akonversation_id;
    }

    static fromJSON(nachrichten) {
		let results = null;
		if (Array.isArray(nachrichten)) {
			results = [];
			nachrichten.forEach((c) => {
				Object.setPrototypeOf(c, NachrichtBO.prototype);
				results.push(c);
			})
		} else {
			// Es gibt wohl nur ein Objekt
			let c = nachrichten;
			Object.setPrototypeOf(c, NachrichtBO.prototype);
			results = c;
		}
		return results;
	}
} 

