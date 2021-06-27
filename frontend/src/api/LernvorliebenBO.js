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
	erhalte 
	*/
    gettageszeiten_id(){
        return this.tageszeiten_id;
    }
    /*
	setze 
	*/
    settageszeiten_id(atageszeiten_id){
        this.tageszeiten_id = atageszeiten_id;
    }
        /*
	erhalte
	*/
    gettageszeiten_bez(){
        return this.tageszeiten_bez;
    }
    /*
	setze
	*/
    settageszeiten_bez(atageszeiten_bez){
        this.tageszeiten_bez = atageszeiten_bez;
    }
    /*
	erhalte 
	*/
    gettage_id(){
        return this.tage_id;
    }
    /*
	setze 
	*/
    settage_id(atage_id ){
        this.tage_id  = atage_id;
    }
        /*
	erhalte
	*/
    gettage_bez(){
        return this.tage_bez;
    }
    /*
	setze
	*/
    settage_bez(atage_bez){
        this.tage_bez = atage_bez;
    }
    /*
	erhalte 
	*/
    getfrequenz_id(){
        return this.frequenz_id;
    }
    /*
	setze 
	*/
    setfrequenz_id(afrequenz_id){
        this.frequenz_id = afrequenz_id;
    }
        /*
	erhalte
	*/
    getfrequenz_bez(){
        return this.frequenz_bez;
    }
    /*
	setze
	*/
    setfrequenz_bez(afrequenz_bez){
        this.frequenz_bez = afrequenz_bez;
    }
     /*
	erhalte 
	*/
    getlernart_id(){
        return this.lernart_id;
    }
    /*
	setze 
	*/
    setlernart_id(alernart_id){
        this.lernart_id = alernart_id;
    }
         /*
	erhalte
	*/
    getlernart_bez(){
        return this.lernart_bez;
    }
    /*
	setze
	*/
    setlernart_bez(alernart_bez){
        this.lernart_bez = alernart_bez;
    }
    /*
	erhalte 
	*/
    getgruppengroesse_id(){
        return this.gruppengroesse_id;
    }
    /*
	setze 
	*/
    setgruppengroesse_id(agruppengroesse_id){
        this.gruppengroesse_id = agruppengroesse_id;
    }
        /*
	erhalte
	*/
    getgruppengroesse_bez(){
        return this.gruppengroesse_bez;
    }
    /*
	setze
	*/
    setgruppengroesse_bez(agruppengroesse_bez){
        this.gruppengroesse_bez = agruppengroesse_bez;
    }
    /*
	erhalte 
	*/
	getlernort_id(){
        return this.lernort_id;
    }
    /*
	setze 
	*/
    setlernort_id(alernort_id){
        this.lernort_id = alernort_id;
    }
        /*
	erhalte
	*/
	getlernort_bez(){
        return this.lernort_bez;
    }
    /*
	setze
	*/
    setlernort_bez(alernort_bez){
        this.lernort_bez = alernort_bez;
    }
    
    /** 
   * Returns an Array of LernvorliebenBOs from a given JSON structure
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