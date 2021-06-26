import BusinessObject from './BusinessObject';

export default class LernfachBO extends BusinessObject{

	constructor(abezeichnung){
        super();
        this.bezeichnung = abezeichnung;
    }

    /*
	erhalte 
	*/
    getbezeichnung(){
        return this.bezeichnung;
    }
    /*
	setze 
	*/
    setbezeichnung(abezeichnung){
        this.bezeichnung = abezeichnung;
    }

    static fromJSON(lernfaecher) {
		let results = null;
		if (Array.isArray(lernfaecher)) {
			results = [];
			lernfaecher.forEach((c) => {
				Object.setPrototypeOf(c, LernfachBO.prototype);
				results.push(c);
			})
		} else {
			// Es gibt wohl nur ein Objekt
			let c = lernfaecher;
			Object.setPrototypeOf(c, LernfachBO.prototype);
			results = c;
		}
		return results;
	}
} 
