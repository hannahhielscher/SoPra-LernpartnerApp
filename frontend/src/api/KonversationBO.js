import BusinessObject from './BusinessObject';

export default class KonversationBO extends BusinessObject{

	constructor(){
        super();
        
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