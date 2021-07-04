import NamedBusinessObject from './NamedBusinessObject';


export default class LerngruppeBO extends NamedBusinessObject{

	constructor(aname, aprofil){
        super(aname);
        this.profil = aprofil;
    }
    /*
	Profil einer Lerngruppe erhalten
	*/
    getprofil(){
        return this.profil;
    }
    /*
	Profil einer Lerngruppe setzen
	*/
    setprofil(aprofil){
        this.profil = aprofil;
    }
    
    /**
     * Gibt ein Array von LerngruppeBO aus einer gegebenen JSON-Struktur zurück
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
                let c = lerngruppen;
                Object.setPrototypeOf(c, LerngruppeBO.prototype);
                results = c;
            }
            return results;
        }

    }