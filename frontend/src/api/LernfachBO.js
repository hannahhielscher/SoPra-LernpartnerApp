import BusinessObject from './BusinessObject';

export default class LernfachBO extends BusinessObject{

	constructor(abezeichnung){
        super();
        this.bezeichnung = abezeichnung;
    }

    /*
	erhalten der Lernfach Bezeichnung
	*/
    getbezeichnung(){
        return this.bezeichnung;
    }
    /*
	setzen der Lernfach Bezeichnung
	*/
    setbezeichnung(abezeichnung){
        this.bezeichnung = abezeichnung;
    }


	/**
	 * Gibt ein Array von LernfachBO aus einer gegebenen JSON-Struktur zurück
	 */
    static fromJSON(lernfaecher) {
		let results = null;
		if (Array.isArray(lernfaecher)) {
			results = [];
			lernfaecher.forEach((c) => {
				Object.setPrototypeOf(c, LernfachBO.prototype);
				results.push(c);
			})
		} else {
			let c = lernfaecher;
			Object.setPrototypeOf(c, LernfachBO.prototype);
			results = c;
		}
		return results;
	}
} 
