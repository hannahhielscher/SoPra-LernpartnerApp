import BusinessObject from './BusinessObject';

export default class LernvorliebenBO extends BusinessObject{

	constructor(atageszeiten, atage, afrequenz, alernart, agruppengroesse, alernort){
        super();
        this.tageszeiten = atageszeiten
        this.tage = atage
        this.frequenz = afrequenz
        this.lernart = alernart
        this.gruppengroesse = agruppengroesse
        this.lernort = alernort;
    }

    /*
	erhalte 
	*/
    gettageszeiten(){
        return this.tageszeiten;
    }
    /*
	setze 
	*/
    settageszeiten(atageszeiten){
        this.tageszeiten = atageszeiten;
    }
    /*
	erhalte 
	*/
    gettage(){
        return this.tage;
    }
    /*
	setze 
	*/
    settage(atage){
        this.tage = atage;
    }
    /*
	erhalte 
	*/
    getfrequenz(){
        return this.frequenz;
    }
    /*
	setze 
	*/
    setfrequenz(afrequenz){
        this.frequenz=afrequenz;
    }
     /*
	erhalte 
	*/
    getlernart(){
        return this.lernart
    }
    /*
	setze 
	*/
    setlernart(alernart){
        this.lernart=alernart
    }
    /*
	erhalte 
	*/
    getgruppengroesse(){
        return this.gruppengroesse;
    }
    /*
	setze 
	*/
    setgruppengroesse(agruppengroesse){
        this.gruppengroesse = agruppengroesse;
    }
    /*
	erhalte 
	*/
	getlernort(){
        return this.lernort;
    }
    /*
	setze 
	*/
    setlernort(alernort){
        this.lernort = alernort;
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