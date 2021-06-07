import BusinessObject from './BusinessObject';

/**
 * Repräsentiert ein Profil Objekt einer Person .
 */
export default class ProfilBO extends BusinessObject {
    constructor(agruppe, astudiengang, asemester, alernfaecher, alernvorlieben){
        super();
        this.gruppe = agruppe
        this.studiengang = astudiengang
        this.semester = asemester
        this.lernfaecher = alernfaecher
        this.lernvorlieben = alernvorlieben;
    }

    get_gruppe(){
        return this.gruppe;
    }

    set_gruppe(this, gruppe_neu){
        this.gruppe = gruppe_neu;
    }
    
}