import BusinessObject from './BusinessObject';

export default class NachrichtBO extends BusinessObject{

	constructor(ainhalt, aperson, aprofil, akonversation){
        super();
        this.inhalt = ainhalt;
        this.person = aperson;
        this.profil = aprofil;
        this.koversation = akonversation;
    }


    /*
	erhalte 
	*/
    getinhalt(){
        return this.inhalt;
    }
    /*
	setze 
	*/
    setinhalt(ainhalt){
        this.inhalt = ainhalt;
    }

      /*
	erhalte 
	*/
    getperson(){
        return this.person;
    }

    /*
	setze 
	*/
    setperson(aperson){
        this.person = aperson;
    }
    
      /*
	erhalte 
	*/
    getprofil(){
        return this.profil;
    }
    /*
	setze 
	*/
    setprofil(aprofil){
        this.profil = aprofil;
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

