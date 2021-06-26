import BusinessObject from './BusinessObject';

export default class VorschlagBO extends BusinessObject{

	constructor(amain_person_id, amatch_quote, alernfaecher_id, amatch_profil_id){
		super();
		this.main_person_id = amain_person_id;
		this.match_quote = amatch_quote;
		this.lernfaecher_id = alernfaecher_id;
		this.match_profil_id = amatch_profil_id;
		
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
	getlernfaecher_id(){
		return this.lernfaecher_id;
	}
	/*
	setze 
	*/
	setlernfaecher_id(alernfaecher_id){
		this.lernfaecher_id = alernfaecher_id;
	}
    /*
	erhalte 
	*/
    getmatch_profil_id(){
        return this.match_profil_id;
    }
    /*
	setze 
	*/
    setperson_id(amatch_profil_id){
        this.match_profil_id = amatch_profil_id;
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