import BusinessObject from '/.BusinessObject';

export default class VorschlagBO extends BusinessObject{

	constructor(aperson, amatch){
        super();
        this.person = aperson;
        this.match = amatch;
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
    getmatch(){
        return this.match;
    }
    /*
	setze 
	*/
    setmatch(amatch){
        this.match = amatch;
    }

    static fromJSON(vorschlaege) {
		let results = null;
		if (Array.isArray(vorschlaege)) {
			results = [];
			vorschlaege.forEach((c) => {
				Object.setPrototypeOf(c, VorschlagBO.prototype);
				results.push(c);
			})
		} else {
			// Es gibt wohl nur ein Objekt
			let c = vorschlaege;
			Object.setPrototypeOf(c, VorschlagBO.prototype);
			results = c;
		}
		return results;
	}
}