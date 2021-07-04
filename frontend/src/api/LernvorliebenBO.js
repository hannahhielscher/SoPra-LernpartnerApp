import BusinessObject from './BusinessObject';

export default class LernvorliebenBO extends BusinessObject{

	constructor(atageszeiten_id, atageszeiten_bez, atage_id, atage_bez, afrequenz_id, afrequenz_bez, alernart_id, alernart_bez, agruppengroesse_id, agruppengroesse_bez, alernort_id, alernort_bez){
        super();
        this.tageszeiten_id = atageszeiten_id
        this.tageszeiten_bez = atageszeiten_bez
        this.tage_id = atage_id
        this.tage_bez = atage_bez
        this.frequenz_id = afrequenz_id
        this.frequenz_bez = afrequenz_bez
        this.lernart_id = alernart_id
        this.lernart_bez = alernart_bez
        this.gruppengroesse_id = agruppengroesse_id
        this.gruppengroesse_bez = agruppengroesse_bez
        this.lernort_id = alernort_id
        this.lernort_bez = alernort_bez;
    }

    /*
	erhalten der Tageszeiten ID
	*/
    gettageszeiten_id(){
        return this.tageszeiten_id;
    }
    /*
	setzen der Tageszeiten ID
	*/
    settageszeiten_id(atageszeiten_id){
        this.tageszeiten_id = atageszeiten_id;
    }
        /*
	erhalten der Tageszeiten Bezeichnung
	*/
    gettageszeiten_bez(){
        return this.tageszeiten_bez;
    }
    /*
	setzen der Tageszeiten Bezeichnung
	*/
    settageszeiten_bez(atageszeiten_bez){
        this.tageszeiten_bez = atageszeiten_bez;
    }
    /*
	erhalten der Tage ID
	*/
    gettage_id(){
        return this.tage_id;
    }
    /*
	setzen der Tage ID
	*/
    settage_id(atage_id ){
        this.tage_id  = atage_id;
    }
        /*
	erhalten der Tage Bezeichnung
	*/
    gettage_bez(){
        return this.tage_bez;
    }
    /*
	setzen der Tage Bezeichnung
	*/
    settage_bez(atage_bez){
        this.tage_bez = atage_bez;
    }
    /*
	erhalten der Frequenz ID
	*/
    getfrequenz_id(){
        return this.frequenz_id;
    }
    /*
	setzen der Frequenz ID
	*/
    setfrequenz_id(afrequenz_id){
        this.frequenz_id = afrequenz_id;
    }
        /*
	erhalten der Frequenz Bezeichnung
	*/
    getfrequenz_bez(){
        return this.frequenz_bez;
    }
    /*
	setzen der Frequenz Bezeichnung
	*/
    setfrequenz_bez(afrequenz_bez){
        this.frequenz_bez = afrequenz_bez;
    }
     /*
	erhalten der Lernart ID
	*/
    getlernart_id(){
        return this.lernart_id;
    }
    /*
	setzen der Lernart ID
	*/
    setlernart_id(alernart_id){
        this.lernart_id = alernart_id;
    }
         /*
	erhalten der Lernart Bezeichnung
	*/
    getlernart_bez(){
        return this.lernart_bez;
    }
    /*
	setzen der Lernart Bezeichnung
	*/
    setlernart_bez(alernart_bez){
        this.lernart_bez = alernart_bez;
    }
    /*
	erhalten der Gruppengroesse ID
	*/
    getgruppengroesse_id(){
        return this.gruppengroesse_id;
    }
    /*
	setzen der Gruppengroesse ID
	*/
    setgruppengroesse_id(agruppengroesse_id){
        this.gruppengroesse_id = agruppengroesse_id;
    }
        /*
	erhalten der Gruppengroesse Bezeichnung
	*/
    getgruppengroesse_bez(){
        return this.gruppengroesse_bez;
    }
    /*
	setzen der Gruppengroesse Bezeichnung
	*/
    setgruppengroesse_bez(agruppengroesse_bez){
        this.gruppengroesse_bez = agruppengroesse_bez;
    }
    /*
	erhalten der Lernort ID
	*/
	getlernort_id(){
        return this.lernort_id;
    }
    /*
	setzen der Lernort ID
	*/
    setlernort_id(alernort_id){
        this.lernort_id = alernort_id;
    }
        /*
	erhalten der Lernort Bezeichnung
	*/
	getlernort_bez(){
        return this.lernort_bez;
    }
    /*
	setzen der Lernort Bezeichnung
	*/
    setlernort_bez(alernort_bez){
        this.lernort_bez = alernort_bez;
    }
    
    /**
     * Gibt ein Array von LernvorliebenBO aus einer gegebenen JSON-Struktur zurück
   */
    static fromJSON(lernvorlieben) {
		let results = null;
		if (Array.isArray(lernvorlieben)) {
			results = [];
			lernvorlieben.forEach((c) => {
				Object.setPrototypeOf(c, LernvorliebenBO.prototype);
				results.push(c);
			})
		} else {
			// Es gibt wohl nur ein Objekt
			let c = lernvorlieben;
			Object.setPrototypeOf(c, LernvorliebenBO.prototype);
			results = c;
		}
		return results;
	}

}