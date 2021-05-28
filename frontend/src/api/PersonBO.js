import NamedBusinessObject from './NamedBusinessObject';


export default class PersonBO extends NamedBusinessObject{

	constructor(avorname, asemester, aalter, ageschlecht, alerngruppe, agoogle_user_id, aemail, apersonenprofil){
        super();
        this.vorname = avorname;
        this.semester = asemester
        this.alter = aalter
        this.geschlecht = ageschlecht
        this.lerngruppe = alerngruppe
        this.google_user_id = agoogle_user_id;
        this.email = aemail;
        this.personenprofil = apersonenprofil;
    }

    /*
	erhalte 
	*/
    getvorname(){
        return this.vorname;
    }
    /*
	setze 
	*/
    setvorname(avorname){
        this.vorname = avorname;
    }
    /*
	erhalte 
	*/
    getsemester(){
        return this.semester;
    }
    /*
	setze 
	*/
    setsemester(asemester){
        this.semester = asemester;
    }
    /*
	erhalte 
	*/
    getalter(){
        return this.alter;
    }
    /*
	setze 
	*/
    setalter(aalter){
        this.alter = aalter;
    }
    /*
	erhalte 
	*/
    getgeschlecht(){
        return this.geschlecht;
    }
    /*
	setze 
	*/
    setgeschlecht(ageschlecht){
        this.geschlecht = ageschlecht;
    }
     /*
	erhalte 
	*/
    getlerngruppe(){
        return this.lerngruppe;
    }
    /*
	setze 
	*/
    setlerngruppe(alerngruppe){
        this.lerngruppe = alerngruppe;
    }
    /*
	erhalte 
	*/
    getgoogle_user_id(){
        return this.google_user_id;
    }
    /*
	setze 
	*/
    setgoogle_user_id(agoogle_user_id){
        this.google_user_id = agoogle_user_id;
    }
    /*
	erhalte 
	*/
	getemail(){
        return this.email;
    }
    /*
	setze 
	*/
    setemail(aemail){
        this.email = aemail;
    }
    /*
	erhalte 
	*/
    getpersonenprofil(){
        return this.personenprofil;
    }
    /*
	setze 
	*/
    setpersonenprofil(apersonenprofil){
        this.personenprofil = apersonenprofil;
    }
    
    /** 
   * Returns an Array of PersonBOs from a given JSON structure
   */
    static fromJSON(personen) {
		let results = null;
		if (Array.isArray(personen)) {
			results = [];
			personen.forEach((c) => {
				Object.setPrototypeOf(c, PersonBO.prototype);
				results.push(c);
			})
		} else {
			// Es gibt wohl nur ein Objekt
			let c = personen;
			Object.setPrototypeOf(c, PersonBO.prototype);
			results = c;
		}
		return results;
	}

}