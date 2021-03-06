import ProfilBO from './ProfilBO';
import PersonBO from './PersonBO';
import VorschlagBO from './VorschlagBO';
import LerngruppeBO from './LerngruppeBO';
import LernvorliebenBO from './LernvorliebenBO';
import NachrichtBO from './NachrichtBO';
import KonversationBO from './KonversationBO'
import TeilnahmeChatBO from './TeilnahmeChatBO';
import TeilnahmeGruppeBO from './TeilnahmeGruppeBO';
import LernfachBO from './LernfachBO';

/**
 * Abstrahiert die REST-Schnittstelle des Python-Backends mit komfortablen Zugriffsmethoden.
 * Die Klasse ist als Singleton implementiert.
 */
export default class LernpartnerAPI {

        // Singelton instance
        static #api = null;

        #lernappServerBaseURL = '/lernApp'
        /**
         * Singleton Instanz erhalten
         * 
         * @public
         */
        static getAPI() {
          if (this.#api == null) {
            this.#api = new LernpartnerAPI();
          }
          return this.#api;
        }

        #fetchAdvanced = (url, init) => fetch(url, init, {credential: 'include'})
          .then(res => {
            // Das von fetch() zurückgegebene Promise wird bei einem HTTP-Fehlerstatus nicht zurückgewiesen, auch wenn die Antwort ein HTTP 404 oder 500 ist.
            if (!res.ok) {
              throw Error(`${res.status} ${res.statusText}`);
            }
            return res.json();
          }
          )

        //Personbezogen
        #getPersonenURL = () => `${this.#lernappServerBaseURL}/personen`;
        #addPersonURL = () => `${this.#lernappServerBaseURL}/personen`;
        #getPersonURL = (id) => `${this.#lernappServerBaseURL}/personen/${id}`;
        #getPersonByNameURL = (name) => `${this.#lernappServerBaseURL}/personen-by-name/${name}`;
        #getPersonByProfilURL = (profilid) => `${this.#lernappServerBaseURL}/personen-by-profil/${profilid}`;
        #updatePersonURL = (id, name, vorname, semester, studiengang, alter, geschlecht, lerngruppe) => `${this.#lernappServerBaseURL}/personen?id=${id}&name=${name}&vorname=${vorname}&semester=${semester}&studiengang=${studiengang}&alter=${alter}&geschlecht=${geschlecht}&lerngruppe=${lerngruppe}`;
        #deletePersonURL = (id) => `${this.#lernappServerBaseURL}/personen/${id}`;
        #searchPersonURL = (personName) => `${this.#lernappServerBaseURL}/personen-by-name/${personName}`;
        #getPersonByGoogleIDURL = (google_user_id) => `${this.#lernappServerBaseURL}/personbygoogle/${google_user_id}`;
        
        //Gruppenbezogen
        #getLerngruppenURL = () => `${this.#lernappServerBaseURL}/lerngruppen`;
        #getLerngruppeByProfilURL = (profilid) => `${this.#lernappServerBaseURL}/lerngruppen-by-profil/${profilid}`;
        #addLerngruppeURL = () => `${this.#lernappServerBaseURL}/lerngruppen`;
        #getLerngruppeURL = (id) => `${this.#lernappServerBaseURL}/lerngruppen/${id}`;
        #updateLerngruppeURL = (id, name, profil)  => `${this.#lernappServerBaseURL}/lerngruppen?id=${id}&name=${name}&profil=${profil}`;
        #deleteLerngruppeURL = (id) => `${this.#lernappServerBaseURL}/lerngruppen/${id}`;
        
        //Profilbezogen
        #getProfileURL = () => `${this.#lernappServerBaseURL}/profile`;
        #addProfilURL = () => `${this.#lernappServerBaseURL}/profile`;
        #addProfileURL = () => `${this.#lernappServerBaseURL}/profile`;
        #getProfilURL = (id) => `${this.#lernappServerBaseURL}/profile-by-id/${id}`;
        #updateProfilURL = (id, gruppe, lernfaecher, lernvorlieben) => `${this.#lernappServerBaseURL}/profile?id=${id}&gruppe=${gruppe}&lernfaecher=${lernfaecher}&lernvorlieben=${lernvorlieben}`;
        #deleteProfilURL = (id) => `${this.#lernappServerBaseURL}/profile/${id}`;

        //Lernvorliebenbezogen
        #getLernvorliebenURL = (id) => `${this.#lernappServerBaseURL}/lernvorlieben/${id}`;
        #addLernvorliebenURL = () => `${this.#lernappServerBaseURL}/lernvorlieben`;
        #updateLernvorliebenURL = (id, tageszeiten, tage, frequenz, lernart, gruppengroesse, lernort) => `${this.#lernappServerBaseURL}/lernvorlieben?id=${id}&tageszeiten=${tageszeiten}&tage=${tage}&frequenz=${frequenz}&lernart=${lernart}&gruppengroesse=${gruppengroesse}&lernort=${lernort}`;
        #deleteLernvorliebenURL = (id) => `${this.#lernappServerBaseURL}/lernvorlieben/${id}`;

        //Vorschlagbezogen
        #getVorschlaegeByPersonByLernfachURL = (mainpersonID, lernfachID) => `${this.#lernappServerBaseURL}/vorschlaege-by-person-by-lernfach/${mainpersonID}/${lernfachID}`;

        //Nachrichtenbezogen
        #getNachrichtenURL = () => `${this.#lernappServerBaseURL}/nachrichten`;
        #getNachrichtenByKonversationURL = (id) => `${this.#lernappServerBaseURL}/nachricht-by-konversation/${id}`;
        #addNachrichtURL = () => `${this.#lernappServerBaseURL}/nachrichten`;
        #getNachrichtenByKonversationByPersonURL = (konversationID, person_id) => `${this.#lernappServerBaseURL}/nachricht-by-konversation-by-person/${konversationID}/${person_id}`;
        #deleteNachrichtURL = (id) => `${this.#lernappServerBaseURL}/nachrichten/${id}`;
        #deleteNachrichtenByKonversationURL = (konversation_id) => `${this.#lernappServerBaseURL}/nachrichten/${konversation_id}`;
        #getNachrichtenByPersonURL = (personID) => `${this.#lernappServerBaseURL}/nachrichten/${personID}`;
        #getNachrichtenByInhaltURL= (nachricht_inhalt) => `${this.#lernappServerBaseURL}/nachrichten/${nachricht_inhalt}`;
        
        //Konversationbezogen
        #getKonversationenURL = () => `${this.#lernappServerBaseURL}/konversationen`;
        #getKonversationURL = (id) => `${this.#lernappServerBaseURL}/konversationen/${id}`;
        #getKonversationenByPersonURL = (personid) => `${this.#lernappServerBaseURL}/konversationbyperson/${personid}`;
        #getangenommeneKonversationenByPersonURL = (personid) => `${this.#lernappServerBaseURL}/angenommenekonversationbyperson/${personid}`;
        #getKonversationByNameURL = (name) => `${this.#lernappServerBaseURL}/konversationen/${name}`;
        #updateKonversationURL = (id, name, anfragestatus) => `${this.#lernappServerBaseURL}/konversationen?id=${id}&name=${name}&anfragestatus=${anfragestatus}`;
        #addKonversationURL = () => `${this.#lernappServerBaseURL}/konversationen`;
        #deleteKonversationURL = (id) => `${this.#lernappServerBaseURL}/konversationen/${id}`;

        //TeilnahmeChatbezogen
        #getTeilnahmeChatURL = () => `${this.#lernappServerBaseURL}/teilnahmeChat`;
        #getTeilnahmeChatByIdURL = (id) => `${this.#lernappServerBaseURL}/teilnahmeChat/${id}`;
        #getTeilnahmeChatByPersonByStatusURL = (person_id, status) => `${this.#lernappServerBaseURL}/teilnahmeChat-by-person-id-status/${person_id}/${status}`;
        #updateTeilnahmeChatURL = (id, teilnehmer, anfrage_sender, status, konversation) => `${this.#lernappServerBaseURL}/teilnahmenChat?id=${id}&teilnehmer=${teilnehmer}&anfrage_sender=${anfrage_sender}&status=${status}&konversation=${konversation}`;
        #setTeilnahmeChatURL = (id) => `${this.#lernappServerBaseURL}/teilnahmeChat/${id}`;
        #addTeilnahmeChatURL = () => `${this.#lernappServerBaseURL}/teilnahmenChat`;
        #deleteTeilnahmeChatURL = (id) => `${this.#lernappServerBaseURL}/teilnahmeChat/${id}`;
        #deleteTeilnahmeChatByPersonURL = (id) => `${this.#lernappServerBaseURL}/teilnahmeChat-by-person-id/${id}`;
        #getTeilnahmeChatByStudentIdURL = (id) => `${this.#lernappServerBaseURL}/teilnehmer-by-student-id/${id}`;
        #getTeilnahmeChatByStatusByKonversationURL = (status, konversation_id) => `${this.#lernappServerBaseURL}/teilnehmer-by-status-konversation-id/${status}/${konversation_id}`;
        #getTeilnahmeChatByKonversationIdURL = (id) => `${this.#lernappServerBaseURL}/teilnehmer-by-konversation-id/${id}`;
        #getTeilnahmeChatByKonversationAndPersonURL = (konversation_id, person_id) => `${this.#lernappServerBaseURL}/teilnahmenChat-by-konv-pers/${konversation_id}/${person_id}`;
        #getTeilnahmeChatByAnfrageSenderURL = (anfrage_sender) => `${this.#lernappServerBaseURL}/teilnehmer-by-anfrage-sender/${anfrage_sender}`;

        //TeilnahmeGruppebezogen
        #getTeilnahmeGruppeURL = () => `${this.#lernappServerBaseURL}/teilnahmenGruppe`;
        #addTeilnahmeGruppeURL = () => `${this.#lernappServerBaseURL}/teilnahmenGruppe`;
        #getTeilnahmeGruppeByIdURL = (person_id) => `${this.#lernappServerBaseURL}/teilnahmenGruppe/${person_id}`;
        #getTeilnahmeGruppeByPersonByGruppeURL = (personId, lerngruppeId) => `${this.#lernappServerBaseURL}/teilnahmenGruppe/${personId}/${lerngruppeId}`;
        #deleteTeilnahmeGruppeURL = (person_id) => `${this.#lernappServerBaseURL}/teilnahmenGruppe/${person_id}`;
        #getTeilnahmeGruppeByGruppeURL = (lerngruppeId) => `${this.#lernappServerBaseURL}/teilnahmenGruppe-by-gruppe/${lerngruppeId}`;

        //Lernfachbezogene
        #getLernfaecherURL = () => `${this.#lernappServerBaseURL}/lernfaecher`;
        #getLernfachByIDURL = (id) => `${this.#lernappServerBaseURL}/lernfaecher-by-id/${id}`;
        #getLernfaecherByProfilURL = (profilid) => `${this.#lernappServerBaseURL}/lernfaecher-by-profil/${profilid}`;
        #deleteLernfaecherByProfilURL = (profilid) => `${this.#lernappServerBaseURL}/lernfaecher-by-profil/${profilid}`;


        //Personenbezogene
        /**
           * Gibt alle Personen als BO zurück
           * 
           * @public
           */
        getPersonen() {
          return this.#fetchAdvanced(this.#getPersonenURL()).then((responseJSON) => {
            let personenBOs = PersonBO.fromJSON(responseJSON);
            // console.info(customerBOs);
            return new Promise(function (resolve) {
              resolve(personenBOs);
            })           
          })
        }
        /**
         * Person wird hinzugefügt und Promise wird zurückgegeben, das in ein neues PersonBO-Objekt aufgelöst wird
         *
         * @param {PersonBO} personBO to be added. The ID of the new customer is set by the backend
         * @public
         */
        addPerson(personBO) {
          return this.#fetchAdvanced(this.#addPersonURL(), {
            method: 'POST',
            headers: {
              'Accept': 'application/json, text/plain',
              'Content-type': 'application/json',
            },
            body: JSON.stringify(personBO)
          }).then((responseJSON) => {
            // We always get an array of CustomerBOs.fromJSON, but only need one object
            let responsePersonBO = PersonBO.fromJSON(responseJSON)[0];
            // console.info(accountBOs);
            return new Promise(function (resolve) {
              resolve(responsePersonBO);
            })
          })
        }

        /**
         * Gibt eine Person mit einer bestimmten ID als BO zurück
         * 
         * @param {Number} personID to be retrieved
         * @public
         */
        getPerson(personID) {
          return this.#fetchAdvanced(this.#getPersonURL(personID)).then((responseJSON) => {
            // We always get an array of PersonBOs.fromJSON, but only need one object
            let personBO = PersonBO.fromJSON(responseJSON);
            console.info(personBO);
            return new Promise(function (resolve) {
              resolve(personBO);
            })
          })
        }

        /**
         * Gibt eine Person mit einem bestimmten Namen als BO zurück
         *
         * @param {string} name to be retrieved
         * @public
         */
        getPersonByName(name) {
          return this.#fetchAdvanced(this.#getPersonByNameURL(name)).then((responseJSON) => {
            // We always get an array of PersonBOs.fromJSON, but only need one object
            let personBO = PersonBO.fromJSON(responseJSON);
            console.log(personBO);
            return new Promise(function (resolve) {
              resolve(personBO);
            })
          })
        }

        /**
         * Gibt eine Person mit einer bestimmten ID als BO zurück
         * 
         * @param {Number} profilID to be retrieved
         * @public
         */
        getPersonByProfil(profilID) {
          return this.#fetchAdvanced(this.#getPersonByProfilURL(profilID)).then((responseJSON) => {
            // We always get an array of PersonBOs.fromJSON, but only need one object
            let personBO = PersonBO.fromJSON(responseJSON);
            console.log(personBO);
            return new Promise(function (resolve) {
              resolve(personBO);
            })
          })
        }

        /**
         * Updated eine Person und gibt Promise zurück, resolves as PersonBO.
         
         */
        updatePerson(id, name, vorname, semester, studiengang, alter, geschlecht, lerngruppe) {
          return this.#fetchAdvanced(this.#updatePersonURL(id, name, vorname, semester, studiengang, alter, geschlecht, lerngruppe), {
            method: 'PUT',
            headers: {
              'Accept': 'application/json, text/plain',
              'Content-type': 'application/json',
            }
          })
        }

        /**
         * Gibt eine Person mit einer bestimmten ID als BO zurück
         * 
         * @param {Number} google_user_id to be retrieved
         * @public
         */
        getPersonByGoogleID(google_user_id) {
          return this.#fetchAdvanced(this.#getPersonByGoogleIDURL(google_user_id)).then((responseJSON) => {
            // We always get an array of PersonBOs.fromJSON, but only need one object
            let personBO = PersonBO.fromJSON(responseJSON);
            console.info(personBO);
            return new Promise(function (resolve){
                resolve(personBO)
            })
          })
        }
 
        /**
         * Löschen eines PersonBOs
         * Gibt Promise zurück
         *
         * @param {Number} personID to be deleted
         * @public
         */
        deletePerson(personID) {
          return this.#fetchAdvanced(this.#deletePersonURL(personID), {
            method: 'DELETE'
          }).then((responseJSON) => {
            // We always get an array of PersonBOs.fromJSON
            let responsePersonBO = PersonBO.fromJSON(responseJSON)[0];
            // console.info(personBOs);
            return new Promise(function (resolve) {
              resolve(responsePersonBO);
            })
          })
        }

        /**
         * Suchen eines PersonBOs nach dem Namen
         * Gibt Promise zurück
         * 
         * @param {Number} personID to be deleted
         * @public
         */
        searchPerson(personName) {
          return this.#fetchAdvanced(this.#searchPersonURL(personName)).then((responseJSON) => {
            let personBOs = PersonBO.fromJSON(responseJSON);
            // console.info(personBOs);
            return new Promise(function (resolve) {
              resolve(personBOs);
            })
          })
        }
        //Lerngruppenbezogene
        /**
           * Gibt alle Lerngruppen als BO zurück
           * 
           * @public
           */
          getLerngruppen() {
            return this.#fetchAdvanced(this.#getLerngruppenURL()).then((responseJSON) => {
              let lerngruppenBOs = LerngruppeBO.fromJSON(responseJSON);
              // console.info(customerBOs);
              return new Promise(function (resolve) {
                resolve(lerngruppenBOs);
              })           
            })
          }

        /**
         * Gibt eine Lerngruppe mit einer bestimmten ID als BO zurück
         *
         * @param {Number} profilID to be retrieved
         * @public
         */
        getLerngruppeByProfil(profilID) {
          return this.#fetchAdvanced(this.#getLerngruppeByProfilURL(profilID)).then((responseJSON) => {
            // We always get an array of PersonBOs.fromJSON, but only need one object
            let lerngruppeBO = LerngruppeBO.fromJSON(responseJSON);
            console.log(lerngruppeBO);
            return new Promise(function (resolve) {
              resolve(lerngruppeBO);
            })
          })
        }

          /**
           * Lerngruppe wird hinzugefügt und Promise wird zurückgegeben, das in ein neues LerngruppeBO-Objekt aufgelöst wird
           *  
           * @param {LerngruppeBO} lerngruppeBO to be added. The ID of the new lerngruppe is set by the backend
           * @public
           */
          addLerngruppe(lerngruppeBO) {
          console.log(lerngruppeBO)
            return this.#fetchAdvanced(this.#addLerngruppeURL(), {
              method: 'POST',
              headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
             body: JSON.stringify(lerngruppeBO)
           }).then((responseJSON) => {
             // We always get an array of LerngruppeBO.fromJSON, but only need one object
             let responseLerngruppeBO = LerngruppeBO.fromJSON(responseJSON);
             return new Promise(function (resolve) {
               resolve(responseLerngruppeBO);
             })
           })
         }
  
          /**
           * Gibt eine Lerngruppe mit einer bestimmten personenID als BO zurück
           * 
           * @param {Number} personenID to be retrieved
           * @public
           */
          getLerngruppe(personenID) {
            return this.#fetchAdvanced(this.#getLerngruppeURL(personenID)).then((responseJSON) => {
              // We get an array of LerngruppeBOs.fromJSON
              let lerngruppeBO = LerngruppeBO.fromJSON(responseJSON);
              //console.info(lerngruppeBO);
              return new Promise(function (resolve) {
                resolve(lerngruppeBO);
              })
            })
          }
  
          /**
           * Updated eine Lerngruppe und gibt Promise zurück, resolves as LerngruppeBO.
           * 
           * @param {LerngruppeBO} lerngruppeBO to be updated
           * @public
           */
          updateLerngruppe(id, name, profil) {
            return this.#fetchAdvanced(this.#updateLerngruppeURL(id, name, profil), {
            method: 'PUT',
            headers: {
              'Accept': 'application/json, text/plain',
              'Content-type': 'application/json',
            }
          })
        }
   
          /**
           * Löschen einer Lerngruppe nach der ID
           * Gibt Promise zurück
           * 
           * @param {Number} lerngruppeID to be deleted
           * @public
           */
          deleteLerngruppe(lerngruppeID) {
            return this.#fetchAdvanced(this.#deleteLerngruppeURL(lerngruppeID), {
              method: 'DELETE'
            }).then((responseJSON) => {
              // We always get an array of LerngruppeBOs.fromJSON
              let responseLerngruppeBO = LerngruppeBO.fromJSON(responseJSON)[0];
              // console.info(LerngruppeBOs);
              return new Promise(function (resolve) {
                resolve(responseLerngruppeBO);
              })
            })
          }


        //Profilbezogene
        /**
           * Gibt alle Profile als BO zurück
           * 
           * @public
           */
          getProfile() {
            return this.#fetchAdvanced(this.#getProfileURL()).then((responseJSON) => {
              let profileBOs = ProfilBO.fromJSON(responseJSON);
              // console.info(profileBOs);
              return new Promise(function (resolve) {
                resolve(profileBOs);
              })           
            })
          }

        /**
         * Gibt ein Profil-Objekt zurück
         * @param {Number} profilID to be retrieved
         * @public
          */
         getProfil(profilID) {
          return this.#fetchAdvanced(this.#getProfilURL(profilID)).then((responseJSON) => {
            let profilBO = ProfilBO.fromJSON(responseJSON);
            console.info(profilBO)
            return new Promise(function (resolve) {
              resolve(profilBO);
            })
          })
        }

        /**
         * Profil wird hinzugefügt und Promise wird zurückgegeben, das in ein neues ProfilBO-Objekt aufgelöst wird
         *  
         * @param {ProfilBO} profilBO to be added. The ID of the new customer is set by the backend
         * @public
         */
        addProfil(profilBO) {
        console.log(profilBO)
          return this.#fetchAdvanced(this.#addProfileURL(), {
            method: 'POST',
            headers: {
              'Accept': 'application/json, text/plain',
              'Content-type': 'application/json',
            },
             body: JSON.stringify(profilBO)
           }).then((responseJSON) => {
             // We always get an array of LernvorliebenBO.fromJSON, but only need one object
             let responseProfilBO = ProfilBO.fromJSON(responseJSON);
             return new Promise(function (resolve) {
               resolve(responseProfilBO);
             })
           })
         }

        /**
         * Updated ein Profil und gibt Promise zurück, resolves as ProfilBO.
         * 
         * @public
         */
        updateProfil(id, gruppe, lernfaecher, lernvorlieben) {
          return this.#fetchAdvanced(this.#updateProfilURL(id, gruppe, lernfaecher, lernvorlieben), {
            method: 'PUT',
            headers: {
              'Accept': 'application/json, text/plain',
              'Content-type': 'application/json',
            }
          }) 
        }
        /**
         * Gibt Promise zurück
         * 
         * @param {Number} profilID to be deleted
         * @public
         */
        deleteProfil(profilID) {
          return this.#fetchAdvanced(this.#deleteProfilURL(profilID), {
            method: 'DELETE'
          }).then((responseJSON) => {
            // We always get an array of ProfilBOs.fromJSON
            let responseProfilBO = ProfilBO.fromJSON(responseJSON)[0];
            // console.info(profilBOs);
            return new Promise(function (resolve) {
              resolve(responseProfilBO);
            })
          })
        }


        //Lernvorliebenbezogene

        /**
         * Gibt eine Lernvorliebe mit einer bestimmten ID als BO zurück
         * 
         * @param {Number} lernvorliebenID to be retrieved
         * @public
         */
        getLernvorlieben(lernvorliebenID) {
          return this.#fetchAdvanced(this.#getLernvorliebenURL(lernvorliebenID)).then((responseJSON) => {
            // We always get an array of LernvorliebenBOs.fromJSON, but only need one object
            let lernvorliebenBO = LernvorliebenBO.fromJSON(responseJSON);
            console.info(lernvorliebenBO);
            return new Promise(function (resolve) {
              resolve(lernvorliebenBO);
            })
          })
        }


        /**
         * Lernvorlieben werden hinzugefügt und Promise wird zurückgegeben, das in ein neues LervorliebenBO-Objekt aufgelöst wird
         *  
         * @param {LernvorliebenBO} lernvorliebenBO to be added. The ID of the new lernvorliebe is set by the backend
         * @public
         */
        addLernvorlieben(lernvorliebenBO) {
          return this.#fetchAdvanced(this.#addLernvorliebenURL(), {
            method: 'POST',
            headers: {
              'Accept': 'application/json, text/plain',
              'Content-type': 'application/json',
            },
             body: JSON.stringify(lernvorliebenBO)
           }).then((responseJSON) => {
             // We always get an array of LernvorliebenBO.fromJSON, but only need one object
             let responseLernvorliebenBO = LernvorliebenBO.fromJSON(responseJSON);
             return new Promise(function (resolve) {
               resolve(responseLernvorliebenBO);
             })
           })
         }

        /**
         * Löschen eines Lernvorlieben BOs nach der ID
         * Gibt Promise zurück
         * 
         * @param {Number} lernvorliebenID to be deleted
         * @public
         */
        deleteLernvorlieben(lernvorliebenID) {
          return this.#fetchAdvanced(this.#deleteLernvorliebenURL(lernvorliebenID), {
            method: 'DELETE'
          }).then((responseJSON) => {
            // We always get an array of LernvorliebenBOs.fromJSON
            let responseLernvorliebenBO = LernvorliebenBO.fromJSON(responseJSON)[0];
            // console.info(LernvorliebenBOs);
            return new Promise(function (resolve) {
              resolve(responseLernvorliebenBO);
            })
          })
        }

    /**
     * Updated  Lernvorlieben und gibt Promise zurück, resolves as LernvorliebenBO.
     *
     * @public
     */

        updateLernvorlieben(id, tageszeiten, tage, frequenz, lernart, gruppengroesse, lernort) {
            return this.#fetchAdvanced(this.#updateLernvorliebenURL(id, tageszeiten, tage, frequenz, lernart, gruppengroesse, lernort), {
              method: 'PUT',
              headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
              }
            })
          }


        //Vorschlagbezogene
        /**
         * Gibt alle Vorschlaege zurück
         * @param {Number} mainpersonID to be retrieved
         * @param {Number} lernfachID to be retrieved
         * @public
          */
        getVorschlaegeByPersonByLernfach(mainpersonID, lernfachID) {
          return this.#fetchAdvanced(this.#getVorschlaegeByPersonByLernfachURL(mainpersonID, lernfachID, {method: 'GET'})).then((responseJSON) => {
            let vorschlaegeBOs = VorschlagBO.fromJSON(responseJSON);
            //console.info(vorschlaegeBOs)
            return new Promise(function (resolve) {
              resolve(vorschlaegeBOs);
            })
          })
        }

      
        //Nachrichtbezogene
        /** 
        * Gibt alle Nachrichten einer Person nach der ID zurück
         * @param {Number} personID to be retrieved
         * @public
          */

        getNachrichten(personID) {
          return this.#fetchAdvanced(this.#getNachrichtenByPersonURL(personID,{method: 'GET'})).then((responseJSON) => {
            let nachrichtenBOs = NachrichtBO.fromJSON(responseJSON);
            //console.info(nachrichtenBOs)
            return new Promise(function (resolve) {
              resolve(nachrichtenBOs);
            })
          })
        }

       /**
        * Nachricht werden hinzugefügt und Promise wird zurückgegeben, das in ein neues NachrichtBO-Objekt aufgelöst wird
         *  
         * @param {NachrichtBO} nachrichtBO to be added. The ID of the new nachricht is set by the backend
         * @public
         */

        addNachricht(nachrichtBO) {
          return this.#fetchAdvanced(this.#addNachrichtURL(), {
          method: 'POST',
            headers: {
              'Accept': 'application/json, text/plain',
              'Content-type': 'application/json',
            },
            body: JSON.stringify(nachrichtBO)
          }).then((responseJSON) => {
            // We always get an array of NachrichtBOs.fromJSON, but only need one object
            let responseNachrichtBO = NachrichtBO.fromJSON(responseJSON)[0];
            // console.info(NachrichtBOs);
            return new Promise(function (resolve) {
              resolve(responseNachrichtBO);
            })
          })
        }

         /**
           * Gibt alle Nachrichten als BO zurück
           * 
           * @public
           */

        getNachrichten() {
          return this.#fetchAdvanced(this.#getNachrichtenURL()).then((responseJSON) => {
            let nachrichtenBOs = NachrichtBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
              resolve(nachrichtenBOs);
            })           
          })
        }

         /** 
        * gibt die Nachrichten mit der bestimmten konversationsID als BO zurück
         * @param {Number} konversationID to be retrieved
         * @public
          */
    
        getNachrichtenByKonversation(konversation_id){
		      return this.#fetchAdvanced(this.#getNachrichtenByKonversationURL(konversation_id)).then((responseJSON) => {
			      let nachrichtenBOs = NachrichtBO.fromJSON(responseJSON);
			      console.info(nachrichtenBOs)
			      return new Promise(function (resolve){
			  	    resolve(nachrichtenBOs)
			      })
		      })
	      }


          /**
         * Gibt Promise zurück, Löscht Nachricht mit bestimmter ID
         * 
         * @param {Number} id to be deleted
         * @public
         */


        deleteNachricht(id) {
          return this.#fetchAdvanced(this.#deleteNachrichtURL(id), {
            method: 'DELETE'
          }).then((responseJSON) => {
            // We always get an array of NachrichtenBOs.fromJSON
            let responseNachrichtBO = NachrichtBO.fromJSON(responseJSON)[0];
            // console.info(NachrichtBOs);
            return new Promise(function (resolve) {
              resolve(responseNachrichtBO);
            })
          })
        }

         /** 
         * gibt die Nachrichten mit der bestimmten konversationsID und PersonID als BO zurück
         * @param {Number} konversation_id to be retrieved
         * @param {Number} personID 
         * @public
         */
    
          getNachrichtenByKonversationByPerson(konversation_id, person_id) {
            return this.#fetchAdvanced(this.#getNachrichtenByKonversationByPersonURL(konversation_id, person_id, {method: 'GET'})).then((responseJSON) => {
              let nachrichtenBOs = NachrichtBO.fromJSON(responseJSON);
              console.info(nachrichtenBOs)
              return new Promise(function (resolve) {
                resolve(nachrichtenBOs);
              })
            })
          }
 
          /** 
           * löscht Nachrichten einer konversation
           * @param {Number} konversation_id to be retrieved
           * @param {Number} personID 
           * @public
           */
      
          deleteNachrichtenByKonversation(konversation_id) {
            return this.#fetchAdvanced(this.#deleteNachrichtenByKonversationURL(konversation_id, {method: 'DELETE'})).then((responseJSON) => {
              let nachrichtenBOs = NachrichtBO.fromJSON(responseJSON);
              //console.info(nachrichtenBOs)
              return new Promise(function (resolve) {
                resolve(nachrichtenBOs);
              })
            })
          }

           /** 
          * gibt die Nachrichten mit dem bestimmten Inhalt als BO zurück
          * @param {String} inhalt to be retrieved
          * @public
          */
    
        getNachrichtByInhalt(nachricht_inhalt){
          return this.#fetchAdvanced(this.#getNachrichtenByInhaltURL(nachricht_inhalt)).then((responseJSON) => {
          let nachrichtenBOs = NachrichtBO.fromJSON(responseJSON);
          console.info(nachrichtenBOs)
          return new Promise(function (resolve){
            resolve(nachrichtenBOs)
             })
           })
          }


          //Konversations bezogen

           /**
           * Gibt alle Konversationen als BO zurück
           * 
           * @public
           */

        getKonversationen() {
          return this.#fetchAdvanced(this.#getKonversationenURL()).then((responseJSON) => {
            let konversationenBOs = KonversationBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
              resolve(konversationenBOs);
            })           
          })
        }

         /** 
        * gibt die Konversation mit der bestimmten ID als BO zurück
         * @param {Number} id to be retrieved
         * @public
          */
    
          getKonversation(id){
            return this.#fetchAdvanced(this.#getKonversationURL(id)).then((responseJSON) => {
              let konversationenBOs = KonversationBO.fromJSON(responseJSON);
              //console.info(konversationenBOs)
              return new Promise(function (resolve){
                resolve(konversationenBOs)
              })
            })
          }

           /**
           * Gibt alle Konversationen einer Person als BO zurück
           * @param {Number} personid to be retrieved
           * @public
           */

          getKonversationenByPerson(personid) {
            return this.#fetchAdvanced(this.#getKonversationenByPersonURL(personid)).then((responseJSON) => {
              let konversationBO = KonversationBO.fromJSON(responseJSON);
              console.log(konversationBO)
              return new Promise(function (resolve) {
                resolve(konversationBO);
              })           
            })
          }

        /**
           * Gibt alle Konversationen einer Person, die Anfragestatus 1 haben, als BO zurück
           * @param {Number} personid to be retrieved
           * @public
           */

          getangenommeneKonversationenByPerson(personid) {
            return this.#fetchAdvanced(this.#getangenommeneKonversationenByPersonURL(personid)).then((responseJSON) => {
              let konversationBO = KonversationBO.fromJSON(responseJSON);
              console.log(konversationBO)
              return new Promise(function (resolve) {
                resolve(konversationBO);
              })           
            })
          }

         /**
         * Gibt Promise zurück, holt Konversationen mit bestimmtem Namen
         *
         * @param {String} name to be retrived
         * @public
         */
          getKonversationByName(name){
            return this.#fetchAdvanced(this.#getKonversationByNameURL(name)).then((responseJSON) => {
                let konversationBO = KonversationBO.fromJSON(responseJSON);
                console.log(konversationBO)
                return new Promise(function (resolve){
                    resolve(konversationBO)
                })
            })
          }

          /**
           * Konversation werden hinzugefügt und Promise wird zurückgegeben, das in ein neues KonversationBO-Objekt aufgelöst wird
          *  
          * @param {KonversationBO} konversationBO to be added. The ID of the new nachricht is set by the backend
          * @public
          */
 
         addKonversation(konversationBO) {
           return this.#fetchAdvanced(this.#addKonversationURL(), {
           method: 'POST',
             headers: {
               'Accept': 'application/json, text/plain',
               'Content-type': 'application/json',
             },
             body: JSON.stringify(konversationBO)
           }).then((responseJSON) => {
             // We always get an array of NachrichtBOs.fromJSON, but only need one object
             let responseKonversationBO = KonversationBO.fromJSON(responseJSON);
             console.log(responseKonversationBO);
             return new Promise(function (resolve) {
               resolve(responseKonversationBO);
             })
           })
         }

          /**
         * Gibt Promise zurück, Löscht Konversation mit bestimmter ID
         * 
         * @param {Number} id to be deleted
         * @public
         */
        deleteKonversation(id) {
          return this.#fetchAdvanced(this.#deleteKonversationURL(id), {
            method: 'DELETE'
          }).then((responseJSON) => {
            // We always get an array of KonversationBOs.fromJSON
            let responseKonversationBO = KonversationBO.fromJSON(responseJSON)[0];
            // console.info(KonversationBOs);
            return new Promise(function (resolve) {
              resolve(responseKonversationBO);
            })
          })
        }

    /**
     * Updated  Konversation und gibt Promise zurück, resolves as KonversationBO.
     *
     * @public
     */
        updateKonversation(id, name, anfragestatus) {
            return this.#fetchAdvanced(this.#updateKonversationURL(id, name, anfragestatus), {
              method: 'PUT',
              headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
              }
            })
          }

             //Teilnahme Chat bezogene

          /**
           * Gibt alle Teilnahmen eines Chats als BO zurück
           * 
           * @public
           */

           getTeilnahmeChat() {
            return this.#fetchAdvanced(this.#getTeilnahmeChatURL()).then((responseJSON) => {
            let teilnahmechatBOs = TeilnahmeChatBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
              resolve(teilnahmechatBOs);
               })           
              })
            }

          /** 
           * gibt die Teilnehmer mit der bestimmten ID als BO zurück
           * @param {Number} id to be retrieved
           * @public
          */
  
          getTeilnahmeChatById(id){
            return this.#fetchAdvanced(this.#getTeilnahmeChatByIdURL(id)).then((responseJSON) => {
            let teilnahmechatBOs = TeilnahmeChatBO.fromJSON(responseJSON);
            //console.info(teilnahmechatBOs)
            return new Promise(function (resolve){
              resolve(teilnahmechatBOs)
               })
             })
            }

            /**
             * setzt den Zustand einer Konversation mit der bestimmten ID auf einen neuen Zustand
             * 
             * @param {Number} id to be deleted
             * @public
             */
          getTeilnahmeChatByPersonByStatus(person_id, status){
            return this.#fetchAdvanced(this.#getTeilnahmeChatByPersonByStatusURL(person_id, status, {method: 'GET'})).then((responseJSON) => {
            let teilnahmechatBOs = TeilnahmeChatBO.fromJSON(responseJSON);
            console.log(teilnahmechatBOs)
            return new Promise(function (resolve){
              resolve(teilnahmechatBOs)
               })
             })
            }

            /**
             * setzt den Zustand einer Konversation mit dem Status auf einen neuen Zustand
             *
             * @param {Number} id to be deleted
             * @public
             */

          getTeilnahmeChatByStatusByKonversation(status, konversation_id){
            return this.#fetchAdvanced(this.#getTeilnahmeChatByStatusByKonversationURL(status, konversation_id, {method: 'GET'})).then((responseJSON) => {
            let teilnahmechatBOs = TeilnahmeChatBO.fromJSON(responseJSON);
            console.log(teilnahmechatBOs)
            return new Promise(function (resolve){
              resolve(teilnahmechatBOs)
               })
             })
            }


    /**
     * Updated  TeilnahmeChat und gibt Promise zurück, resolves as TeilnahmeChatBO.
     *
     * @public
     */
        updateTeilnahmeChat(id, teilnehmer, anfrage_sender, status, konversation) {
            return this.#fetchAdvanced(this.#updateTeilnahmeChatURL(id, teilnehmer, anfrage_sender, status, konversation), {
              method: 'PUT',
              headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
              }
            })
          }

        setTeilnahmeChat(id) {
            return this.#fetchAdvanced(this.#setTeilnahmeChatURL(id), {
              method: 'PUT',
              headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
              }
            })
          }

            /**
             * Teinahme an einem Chat wird hinzugefügt und Promise wird zurückgegeben, das in ein neues TeilnahmeChatBO-Objekt aufgelöst wird
             *  
             * @param {TeilnahmeChatBO} teilnahmechatBO to be added. The ID of the new teilnahemChat is set by the backend
             * @public
            */

            addTeilnahmeChat(teilnahmechatBO) {
              return this.#fetchAdvanced(this.#addTeilnahmeChatURL(), {
               method: 'POST',
               headers: {
                  'Accept': 'application/json, text/plain',
                  'Content-type': 'application/json',
                 },
               body: JSON.stringify(teilnahmechatBO)
               }).then((responseJSON) => {
               // We always get an array of TeilnahmeChatBOs.fromJSON, but only need one object
               let responseTeilnahmeChatBO = TeilnahmeChatBO.fromJSON(responseJSON);
                  console.log(responseTeilnahmeChatBO);
                  return new Promise(function (resolve) {
                    resolve(responseTeilnahmeChatBO);
                     })
                   })
               }

             /** 
             * löscht Teilnahme an einem Chat
             * @param {Number} id to be retrieved
             * @public
             */
    
            deleteTeilnahmeChat(id) {
              return this.#fetchAdvanced(this.#deleteTeilnahmeChatURL(id), {
                method: 'DELETE'
                }).then((responseJSON) => {
                // We always get an array of TeilnahmeChatBOs.fromJSON
                let responseTeilnahmeChatBO = TeilnahmeChatBO.fromJSON(responseJSON)[0];
                // console.info(KonversationBOs);
                return new Promise(function (resolve) {
                  resolve(responseTeilnahmeChatBO);
                })
              })
            }

            /** 
             * löscht Teilnahme an einem Chat
             * @param {Number} personid to be retrieved
             * @public
             */
    
            deleteTeilnahmeChatByPerson(personid) {
              return this.#fetchAdvanced(this.#deleteTeilnahmeChatByPersonURL(personid), {
                method: 'DELETE'
                }).then((responseJSON) => {
                // We always get an array of TeilnahmeChatBOs.fromJSON
                let responseTeilnahmeChatBO = TeilnahmeChatBO.fromJSON(responseJSON)[0];
                // console.info(KonversationBOs);
                return new Promise(function (resolve) {
                  resolve(responseTeilnahmeChatBO);
                })
              })
            }

             /** 
              * Gibt alle TeilnahmenChat einer Person zurück
              * @param {Number} personid to be retrieved
              * @public
              */

              getTeilnahmeChatByStudentId(personid) {
                return this.#fetchAdvanced(this.#getTeilnahmeChatByStudentIdURL(personid, {method: 'GET'})).then((responseJSON) => {
                let teilnahmechatBOs = TeilnahmeChatBO.fromJSON(responseJSON);
                //console.info(teilnahmechatBOs)
                return new Promise(function (resolve) {
                  resolve(teilnahmechatBOs);
                  })
                })
              }
              
             /** 
              * gibt die Teilnahme an einem CHat mit der bestimmten konversationsID als BO zurück
              * @param {Number} id to be retrieved
              * @public
             */
  
            getTeilnahmeChatByKonversationId(id){
               return this.#fetchAdvanced(this.#getTeilnahmeChatByKonversationIdURL(id)).then((responseJSON) => {
               let teilnahmechatBOs = TeilnahmeChatBO.fromJSON(responseJSON);
              //console.info(teilnahmechatBOs)
              return new Promise(function (resolve){
               resolve(teilnahmechatBOs)
                })
              })
             }


             /**
              * gibt die Teilnahme an einem Chat mit der bestimmten Anfrage Sender ID als BO zurück
              * @param {Number} id to be retrieved
              * @public
             */
            getTeilnahmeChatByAnfrageSender(id){
               return this.#fetchAdvanced(this.#getTeilnahmeChatByAnfrageSenderURL(id)).then((responseJSON) => {
               let teilnahmechatBOs = TeilnahmeChatBO.fromJSON(responseJSON);
              //console.info(teilnahmechatBOs)
              return new Promise(function (resolve){
               resolve(teilnahmechatBOs)
                })
              })
             }

             /** 
              * gibt die Teilnahme mit der bestimmten konversationsID und personID als BO zurück
              * @param {Number} id to be retrieved
              * @public
             */
  
            getTeilnahmeChatByKonversationAndPerson(konversation_id, person_id){
              return this.#fetchAdvanced(this.#getTeilnahmeChatByKonversationAndPersonURL(konversation_id, person_id)).then((responseJSON) => {
              let teilnahmechatBO = TeilnahmeChatBO.fromJSON(responseJSON);
              console.info(teilnahmechatBO)
              return new Promise(function (resolve){
                resolve(teilnahmechatBO)
                })
              })
              }
            //Teilnahme Gruppe bezogen

            /**
           * Gibt alle Teilnahmen einer Gruppe als BO zurück
           * 
           * @public
           */

           getTeilnahmeGruppe() {
            return this.#fetchAdvanced(this.#getTeilnahmeGruppeURL()).then((responseJSON) => {
            let teilnahmegruppeBOs = TeilnahmeGruppeBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
              resolve(teilnahmegruppeBOs);
               })           
              })
            }

            /**
             * Teilnahme an einer Gruppe werden hinzugefügt und Promise wird zurückgegeben, das in ein neues TeilnahmeGruppeBO-Objekt aufgelöst wird
             *  
             * @param {TeilnahmeGruppeBO} teilnahmegruppeBO to be added. The ID of the new teilnahemgruppe is set by the backend
             * @public
            */

             addTeilnahmeGruppe(teilnahmegruppeBO) {
              return this.#fetchAdvanced(this.#addTeilnahmeGruppeURL(), {
               method: 'POST',
               headers: {
                  'Accept': 'application/json, text/plain',
                  'Content-type': 'application/json',
                 },
               body: JSON.stringify(teilnahmegruppeBO)
               }).then((responseJSON) => {
               // We always get an array of TeilnahmeGruppeBOs.fromJSON, but only need one object
               let responseTeilnahmeGruppeBO = TeilnahmeGruppeBO.fromJSON(responseJSON)[0];
               // console.info(TeilnahmeGruppeBOs);
                 return new Promise(function (resolve) {
                  resolve(responseTeilnahmeGruppeBO);
                     })
                   })
               }

              /** 
               * gibt die Teilnehmer mit der bestimmten ID als BO zurück
               * @param {Number} person_id to be retrieved
               * @public
              */
              getTeilnahmeGruppeById(person_id){
                return this.#fetchAdvanced(this.#getTeilnahmeGruppeByIdURL(person_id)).then((responseJSON) => {
                let teilnahmegruppeBOs = TeilnahmeGruppeBO.fromJSON(responseJSON);
                //console.info(teilnahmegruppeBOs)
                return new Promise(function (resolve){
                 resolve(teilnahmegruppeBOs)
                  })
                })
              }

              /** 
               * gibt die Teilnehmer mit der bestimmten LerngruppenID als BO zurück
               * @param {Number} lerngruppeId to be retrieved
               * @public
              */
             getTeilnahmeGruppeByGruppe(lerngruppeId){
              return this.#fetchAdvanced(this.#getTeilnahmeGruppeByGruppeURL(lerngruppeId)).then((responseJSON) => {
              let teilnahmegruppeBOs = TeilnahmeGruppeBO.fromJSON(responseJSON);
              //console.info(teilnahmegruppeBOs)
              return new Promise(function (resolve){
               resolve(teilnahmegruppeBOs)
                })
              })
            }

              /** 
               * gibt die Teilnehmer mit der bestimmten ID als BO zurück
               * @param {Number} id to be retrieved
               * @public
              */
             getTeilnahmeGruppeByPersonByGruppe(personId, lerngruppeId){
              return this.#fetchAdvanced(this.#getTeilnahmeGruppeByPersonByGruppeURL(personId, lerngruppeId)).then((responseJSON) => {
              let teilnahmegruppeBO = TeilnahmeGruppeBO.fromJSON(responseJSON);
              console.info(teilnahmegruppeBO)
              return new Promise(function (resolve){
               resolve(teilnahmegruppeBO)
                })
              })
            }

            /**
             * löscht Teilnahme an einer Gruppe nach der ID
             * @param {Number} personid to be retrieved
             * @public
             */

            deleteTeilnahmeGruppe(personid) {
                return this.#fetchAdvanced(this.#deleteTeilnahmeGruppeURL(personid), {
                    method: 'DELETE'
                }).then((responseJSON) => {
                    // We always get an array of KonversationBOs.fromJSON
                    let responseTeilnahmeGruppeBO = TeilnahmeGruppeBO.fromJSON(responseJSON)[0];
                    // console.info(KonversationBOs);
                    return new Promise(function (resolve) {
                        resolve(responseTeilnahmeGruppeBO);
                    })
                })
              }


        //Lernfachspezifische Methoden
        /**
           * Gibt alle Lernfaecher als BO zurück
           * 
           * @public
           */
          getLernfaecher() {
            return this.#fetchAdvanced(this.#getLernfaecherURL()).then((responseJSON) => {
              let lernfaecherBOs = LernfachBO.fromJSON(responseJSON);
              // console.info(lernfaecherBOs);
              return new Promise(function (resolve) {
                resolve(lernfaecherBOs);
              })           
            })
          }
          
          /**
           * Gibt eine Lernfaecher mit einer bestimmten ID als BO zurück
           * 
           * @param {Number} id to be retrieved
           * @public
           */
          getLernfach(id) {
            return this.#fetchAdvanced(this.#getLernfachByIDURL(id)).then((responseJSON) => {
              // We always get an array of PersonBOs.fromJSON, but only need one object
              let lernfachBO = LernfachBO.fromJSON(responseJSON)[0];
              // console.info(lernfachBO);
              return new Promise(function (resolve) {
                resolve(lernfachBO);
              })
            })
          }

          /**
           * Gibt  Lernfaecher mit einer bestimmten ProfilID als BO zurück
           * 
           * @param {Number} profilid to be retrieved
           * @public
           */
          getLernfaecherByProfil(profilid) {
            return this.#fetchAdvanced(this.#getLernfaecherByProfilURL(profilid)).then((responseJSON) => {
              // We always get an array of PersonBOs.fromJSON, but only need one object
              let lernfaecherBOs = LernfachBO.fromJSON(responseJSON);
              console.info(lernfaecherBOs);
              return new Promise(function (resolve) {
                resolve(lernfaecherBOs);
              })
            })
          }

            /**
             * löscht Teilnahme an einem Chat
             * @param {Number} personid to be retrieved
             * @public
             */

        deleteLernfaecherByProfil(profil_id) {
              return this.#fetchAdvanced(this.#deleteLernfaecherByProfilURL(profil_id), {
                  method: 'DELETE'
              }).then ((responseJSON) => {
                    let lernfaecherBOs = LernfachBO.fromJSON(responseJSON)[0];
                    return new Promise(function (resolve) {
                        resolve(lernfaecherBOs);
                    })
              })
          }





}