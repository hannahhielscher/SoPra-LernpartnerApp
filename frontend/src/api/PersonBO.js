import NamedBusinessObject from './NamedBusinessObject';


export default class PersonBO extends NamedBusinessObject{

	constructor(avorname, asemester, astudiengang, aalter, ageschlecht, alerngruppe, agoogle_user_id, aemail, aprofil){
        super();
        this.vorname = avorname;
        this.semester = asemester
        this.studiengang = astudiengang
        this.alter = aalter
        this.geschlecht = ageschlecht
        this.lerngruppe = alerngruppe
        this.google_user_id = agoogle_user_id;
        this.email = aemail;
        this.profil = aprofil;
    }

    /*
	erhalte Vorname
	*/
    getvorname(){
        return this.vorname;
    }
    /*
	setze Vorname
	*/
    setvorname(avorname){
        this.vorname = avorname;
    }
    /*
	erhalte Semester
	*/
    getsemester(){
        return this.semester;
    }
    /*
	setze Semester
	*/
    setsemester(asemester){
        this.semester = asemester;
    }
    /*
	erhalte Studiengang
	*/
    getstudiengang(){
        return this.studiengang;
    }
    /*
	setze Studiengang
	*/
    setstudiengang(astudiengang){
        this.studiengang = astudiengang;
    }
    /*
	erhalte Alter
	*/
    getalter(){
        return this.alter;
    }
    /*
	setze Alter
	*/
    setalter(aalter){
        this.alter = aalter;
    }
    /*
	erhalte Geschlecht
	*/
    getgeschlecht(){
        return this.geschlecht;
    }
    /*
	setze Geschlecht
	*/
    setgeschlecht(ageschlecht){
        this.geschlecht = ageschlecht;
    }
     /*
	erhalte Lerngruppe
	*/
    getlerngruppe(){
        return this.lerngruppe;
    }
    /*
	setze Lerngruppe
	*/
    setlerngruppe(alerngruppe){
        this.lerngruppe = alerngruppe;
    }
    /*
	erhalte Google User ID
	*/
    getgoogle_user_id(){
        return this.google_user_id;
    }
    /*
	setze Google User ID
	*/
    setgoogle_user_id(agoogle_user_id){
        this.google_user_id = agoogle_user_id;
    }
    /*
	erhalte Email
	*/
	getemail(){
        return this.email;
    }
    /*
	setze Email
	*/
    setemail(aemail){
        this.email = aemail;
    }
    /*
	erhalte Profil
	*/
    getprofil(){
        return this.profil;
    }
    /*
	setze Profil
	*/
    setprofil(aprofil){
        this.profil = aprofil;
    }

    /**
     * Gibt ein Array von PersonBO aus einer gegebenen JSON-Struktur zurück
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