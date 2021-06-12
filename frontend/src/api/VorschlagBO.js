import BusinessObject from './BusinessObject';

export default class VorschlagBO extends BusinessObject{

	constructor(amain_person_id, amatch_quote, alernfach, aperson_id){
		super();
		this.main_person_id = amain_person_id;
		this.match_quote = amatch_quote;
		this.lernfach = alernfach;
        this.person_id = aperson_id;
	}

	/*
	erhalte 
	*/
	getmain_person_id(){
		return this.main_person_id;
	}
	/*
	setze 
	*/
	setmain_person_id(amain_person_id){
		this.main_person_id = amain_person_id;
	}
	/*
	erhalte 
	*/
	getmatch_quote(){
		return this.match_quote;
	}
	/*
	setze 
	*/
	setmatch_quote(amatch_quote){
		this.match_quote = amatch_quote;
	}
	/*
	erhalte 
	*/
	getlernfach(){
		return this.lernfach;
	}
	/*
	setze 
	*/
	setlernfach(alernfach){
		this.mernfach = alernfach;
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