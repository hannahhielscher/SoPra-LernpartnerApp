import NamedBusinessObject from './NamedBusinessObject';

export default class KonversationBO extends NamedBusinessObject{

	constructor(aanfragestatus){
		super();
		this.anfragestatus = aanfragestatus
		
    }

	/*
	erhalte 
	*/
    getanfragestatus(){
        return this.anfragestatus;
    }
    /*
	setze 
	*/
    setanfragestatus(aanfragestatus){
        this.anfragestatus = aanfragestatus;
    }
    

    static fromJSON(konversationen) {
		let results = null;
		if (Array.isArray(konversationen)) {
			results = [];
			konversationen.forEach((x) => {
				Object.setPrototypeOf(x, KonversationBO.prototype);
				results.push(x);
			})
		} else {
			// Es gibt wohl nur ein Objekt
			let x = konversationen;
			Object.setPrototypeOf(x, KonversationBO.prototype);
			results = x;
		}
		return results;
	}
}