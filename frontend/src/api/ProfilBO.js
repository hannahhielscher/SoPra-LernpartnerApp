import BusinessObject from './BusinessObject';

/**
 * Repräsentiert ein Profil Objekt einer Person .
 */
export default class ProfilBO extends BusinessObject {
    constructor(gruppe_neu, studiengang_neu, semester_neu, lernfaecher_neu, lernvorlieben_neu){
        super();
        this.gruppe = gruppe_neu
        this.studiengang = studiengang_neu
        this.semester = semester_neu
        this.lernfaecher = lernfaecher_neu
        this.lernvorlieben = lernvorlieben_neu;
    }

    get_gruppe(){
        return this.gruppe;
    }

    set_gruppe(gruppe_neu){
        this.gruppe = gruppe_neu;
    }

    get_studiengang(){
        return this.studiengang;
    }

    set_studiengang(studiengang_neu){
        this.studiengang = studiengang_neu;
    }

    get_semester(){
        return this.semester;
    }

    set_semester(semester_neu){
        this.semester = semester_neu;
    }

    get_lernfaecher(){
        return this.lernfaecher;
    }

    set_lernfaecher(lernfaecher_neu){
        this.lernfaecher = lernfaecher_neu;
    }

    get_lernvorlieben(){
        return this.lernvorlieben;
    }

    set_lernvorlieben(lernvorlieben_neu){
        this.lernvorlieben = lernvorlieben_neu;
    }
}