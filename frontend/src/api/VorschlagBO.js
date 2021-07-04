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
	erhalte Personen ID
	*/
	getmain_person_id(){
		return this.main_person_id;
	}
	/*
	setze Personen ID
	*/
	setmain_person_id(amain_person_id){
		this.main_person_id = amain_person_id;
	}
	/*
	erhalte Matches
	*/
	getmatch_quote(){
		return this.match_quote;
	}
	/*
	setze Matches
	*/
	setmatch_quote(amatch_quote){
		this.match_quote = amatch_quote;
	}
	/*
	erhalte Lernfaecher ID
	*/
	getlernfaecher_id(){
		return this.lernfaecher_id;
	}
	/*
	setze Lernfaecher ID
	*/
	setlernfaecher_id(alernfaecher_id){
		this.lernfaecher_id = alernfaecher_id;
	}
    /*
	erhalte Match nach Profil ID
	*/
    getmatch_profil_id(){
        return this.match_profil_id;
    }
    /*
	setze atch nach Profil ID
	*/
    setperson_id(amatch_profil_id){
        this.match_profil_id = amatch_profil_id;
    }

	/**
	 * Gibt ein Array von VorschlagBO aus einer gegebenen JSON-Struktur zurück
	 */
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