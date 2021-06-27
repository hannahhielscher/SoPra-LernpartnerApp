import NamedBusinessObject from './NamedBusinessObject';


export default class LerngruppeBO extends NamedBusinessObject{

	constructor(aname, aprofil){
        super(aname);
        this.profil = aprofil;
    }
    /*
	erhalte 
	*/
    getprofil(){
        return this.profil;
    }
    /*
	setze 
	*/
    setprofil(aprofil){
        this.profil = aprofil;
    }
    
    /** 
     * Returns an Array of PersonBOs from a given JSON structure
     */
        static fromJSON(lerngruppen) {
            let results = null;
            if (Array.isArray(lerngruppen)) {
                results = [];
                lerngruppen.forEach((c) => {
                    Object.setPrototypeOf(c, LerngruppeBO.prototype);
                    results.push(c);
                })
            } else {
                // Es gibt wohl nur ein Objekt
                let c = lerngruppen;
                Object.setPrototypeOf(c, LerngruppeBO.prototype);
                results = c;
            }
            return results;
        }

    }