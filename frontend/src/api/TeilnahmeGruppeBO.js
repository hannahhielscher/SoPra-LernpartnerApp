import BusinessObject from './BusinessObject';

export default class TeilnahmeGruppeBO extends BusinessObject{

	constructor(astatus, ateilnehmer, alerngruppe){
        super();
        this.teilnehmer = ateilnehmer;
        this.status = astatus;
        this.lerngruppe = alerngruppe;
    }

    /*
	erhalte 
	*/
    getstatus(){
        return this.status;
    }
    /*
	setze 
	*/
    setstatus(astatus){
        this.status = astatus;
    }


    /*
	erhalte 
	*/
    getteilnehmer(){
        return this.teilnehmer;
    }
    /*
	setze 
	*/
    setteilnehmer(ateilnehmer){
        this.teilnehmer = ateilnehmer;
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
    

    static fromJSON(teilnahmeGruppen) {
		let results = null;
		if (Array.isArray(teilnahmeGruppen)) {
			results = [];
			teilnahmeGruppen.forEach((c) => {
				Object.setPrototypeOf(c, TeilnahmeGruppenBO.prototype);
				results.push(c);
			})
		} else {
			// Es gibt wohl nur ein Objekt
			let c = teilnahmeGruppen;
			Object.setPrototypeOf(c, TeilnahmeGruppenBO.prototype);
			results = c;
		}
		return results;
	}
} 