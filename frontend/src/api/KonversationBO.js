import NamedBusinessObject from './NamedBusinessObject';

export default class KonversationBO extends NamedBusinessObject{

	constructor(aanfragestatus){
		super();
		this.anfragestatus = aanfragestatus
		
    }

	/*
	erhalten des Anfragestatus
	*/
    getanfragestatus(){
        return this.anfragestatus;
    }
    /*
	setzen des Anfragestatus
	*/
    setanfragestatus(aanfragestatus){
        this.anfragestatus = aanfragestatus;
    }

	/**
	 * Gibt ein Array von KonversationBO aus einer gegebenen JSON-Struktur zurück
	 */
    static fromJSON(konversationen) {
		let results = null;
		if (Array.isArray(konversationen)) {
			results = [];
			konversationen.forEach((x) => {
				Object.setPrototypeOf(x, KonversationBO.prototype);
				results.push(x);
			})
		} else {
			let x = konversationen;
			Object.setPrototypeOf(x, KonversationBO.prototype);
			results = x;
		}
		return results;
	}
}