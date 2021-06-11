import BusinessObject from './BusinessObject';

/**
 * Repräsentiert ein Profil Objekt einer Person .
 */
export default class ProfilBO extends BusinessObject {
    constructor(gruppe_neu, lernfaecher_neu, lernvorlieben_neu){
        super();
        this.gruppe = gruppe_neu
        this.lernfaecher = lernfaecher_neu
        this.lernvorlieben = lernvorlieben_neu;
    }

    get_gruppe(){
        return this.gruppe;
    }

    set_gruppe(gruppe_neu){
        this.gruppe = gruppe_neu;
    }

    get_lernfaecher(){
        return this.lernfaecher;
    }

    set_lernfaecher(lernfaecher_neu){
        this.lernfaecher = lernfaecher_neu;
    }

    get_lernvorlieben(){
        return this.lernvorlieben;
    }

    set_lernvorlieben(lernvorlieben_neu){
        this.lernvorlieben = lernvorlieben_neu;
    }

    	/**
   * Returns an Array of ProfilBO from a given JSON structure
   */
    static fromJSON(profile) {
		let results = null;
		if (Array.isArray(profile)) {
			results = [];
			profile.forEach((c) => {
				Object.setPrototypeOf(c, ProfilBO.prototype);
				results.push(c);
			})
		} else {
			// Es gibt wohl nur ein Objekt
			let c = profile;
			Object.setPrototypeOf(c, ProfilBO.prototype);
			results = c;
		}
		return results;
	}
}