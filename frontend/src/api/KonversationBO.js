import BusinessObject from '/.BusinessObject';

export default class KonversationBO extends BusinessObject{

	constructor(ateilnehmer, anachricht){
        super();
        this.teilnehmer = ateilnehmer;
        this.nachricht = anachricht;
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
    getnachricht(){
        return this.nachricht;
    }
    /*
	setze 
	*/
    setnachricht(anachricht){
        this.nachricht = anachricht;
    }

    static fromJSON(konversationen) {
		let results = null;
		if (Array.isArray(konversationen)) {
			results = [];
			konversationen.forEach((x) => {
				Object.setPrototypeOf(x, konversationen.prototype);
				results.push(x);
			})
		} else {
			// Es gibt wohl nur ein Objekt
			let x = konversationen;
			Object.setPrototypeOf(x, KonversationBO.prototype);
			results = x;
		}
		return results;
	}
}