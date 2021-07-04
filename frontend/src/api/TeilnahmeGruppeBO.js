import BusinessObject from './BusinessObject';

export default class TeilnahmeGruppeBO extends BusinessObject{

	constructor(ateilnehmer, alerngruppe){
        super();
        this.teilnehmer = ateilnehmer;
        this.lerngruppe = alerngruppe;
    }

    /*
	erhalte Teilnehmer
	*/
    getteilnehmer(){
        return this.teilnehmer;
    }
    /*
	setze Teilnehmer
	*/
    setteilnehmer(ateilnehmer){
        this.teilnehmer = ateilnehmer;
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

    /**
     * Gibt ein Array von TeilnahmeGruppeBO aus einer gegebenen JSON-Struktur zurück
     */
    static fromJSON(teilnahmeGruppen) {
		let results = null;
		if (Array.isArray(teilnahmeGruppen)) {
			results = [];
			teilnahmeGruppen.forEach((c) => {
				Object.setPrototypeOf(c, TeilnahmeGruppeBO.prototype);
				results.push(c);
			})
		} else {
			// Es gibt wohl nur ein Objekt
			let c = teilnahmeGruppen;
			Object.setPrototypeOf(c, TeilnahmeGruppeBO.prototype);
			results = c;
		}
		return results;
	}
} 