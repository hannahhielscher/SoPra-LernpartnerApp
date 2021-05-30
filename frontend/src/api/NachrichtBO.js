import BusinessObject from '/.BusinessObject';

export default class NachrichtBO extends BusinessObject{

	constructor(ainhalt){
        super();
        this.inhalt = ainhalt;
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

