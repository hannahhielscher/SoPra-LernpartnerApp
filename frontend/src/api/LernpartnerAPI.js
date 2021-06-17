import ProfilBO from './ProfilBO';
import PersonBO from './PersonBO';
import VorschlagBO from './VorschlagBO';
import LerngruppeBO from './LerngruppeBO';
import LernvorliebenBO from './LernvorliebenBO';
import NachrichtBO from './NachrichtBO';
import TeilnahmeChatBO from './TeilnahmeChatBO';
import TeilnahmeGruppeBO from './TeilnahmeGruppeBO';

/**
 * Abstracts the REST interface of the Python backend with convenient access methods.
 * The class is implemented as a singleton. 
 */
export default class LernpartnerAPI {

        // Singelton instance
        static #api = null;

        #lernappServerBaseURL = '/lernApp'
        /** 
         * Get the Singelton instance 
         * 
         * @public
         */
        static getAPI() {
          if (this.#api == null) {
            this.#api = new LernpartnerAPI();
          }
          return this.#api;
        }

        #fetchAdvanced = (url, init) => fetch(url, init)
          .then(res => {
            // The Promise returned from fetch() won’t reject on HTTP error status even if the response is an HTTP 404 or 500. 
            if (!res.ok) {
              throw Error(`${res.status} ${res.statusText}`);
            }
            return res.json();
          }
          )

        //Person related
        #getPersonenURL = () => `${this.#lernappServerBaseURL}/personen`;
        //#addPersonURL = () => `${this.#lernappServerBaseURL}/personen`;
        #getPersonURL = (id) => `${this.#lernappServerBaseURL}/personen/${id}`;
        #updatePersonURL = (id) => `${this.#lernappServerBaseURL}/personen/${id}`;
        #deletePersonURL = (id) => `${this.#lernappServerBaseURL}/personen/${id}`;
        #searchPersonURL = (personName) => `${this.#lernappServerBaseURL}/personen-by-name/${personName}`;
        #getPersonByGoogleIDURL = (google_user_id) => `${this.#ElectivServerBaseURL}/personbygoogle/${google_user_id}`;
        
        //Gruppenbezogen
        #getLerngruppenURL = () => `${this.#lernappServerBaseURL}/lerngruppen`;
        #addLerngruppeURL = () => `${this.#lernappServerBaseURL}/lerngruppen`;
        #getLerngruppeURL = () => `${this.#lernappServerBaseURL}/lerngruppen/${id}`;
        #updateLerngruppeURL = () => `${this.#lernappServerBaseURL}/lerngruppen/${id}`;
        #deleteLerngruppeURL = () => `${this.#lernappServerBaseURL}/lerngruppen/${id}`;
        
        //Profilbezogen
        #getProfileURL = () => `${this.#lernappServerBaseURL}/profile`;
        #addProfilURL = () => `${this.#lernappServerBaseURL}/profile`;
        #getProfilURL = (id) => `${this.#lernappServerBaseURL}/profile/${id}`;
        #updateProfilURL = (id) => `${this.#lernappServerBaseURL}/profile/${id}`;
        //#getLernfaecherByProfilURL = (profilID) => `${this.#lernappServerBaseURL}/profil/${profilID}`;
        #deleteProfilURL = (id) => `${this.#lernappServerBaseURL}/profile/${id}`;

        //Lernvorliebenbezogen
        #getLernvorliebenURL = () => `${this.#lernappServerBaseURL}/lernvorlieben/${id}`;
        //#getLernvorliebenByProfilURL = () => `${this.#lernappServerBaseURL}/lervorlieben/${profilid}`;
        #addLernvorliebenURL = () => `${this.#lernappServerBaseURL}/lernvorlieben`;
        #updateLernvorliebenURL = () => `${this.#lernappServerBaseURL}/lernvorlieben/${id}`;
        #deleteLernvorliebenURL = () => `${this.#lernappServerBaseURL}/lernvorlieben/${id}`;

        //Vorschlagbezogen
        #getVorschlaegeURL = (mainpersonID) => `${this.#lernappServerBaseURL}/vorschlaege/${mainpersonID}`;
        //#getSelectedLernfach = () => `${this.#lernappServerBaseURL}`
        #addVorschlaegeURL = (mainpersonID, lernfachID) => `${this.#lernappServerBaseURL}/vorschlaege/${mainpersonID, lernfachID}`;

        //Nachrichtenbezogen
        #getNachrichtenURL = () => `${this.#lernappServerBaseURL}/nachrichten`;
        #getNachrichtenByKonversationURL = (id) => `${this.#lernappServerBaseURL}/nachrichten/konversation/${id}`;
        #addNachrichtURL = () => `${this.#lernappServerBaseURL}/nachrichten`;
        #getNachrichtenByKonversationByPersonURL = (konversationID, personID) => `${this.#lernappServerBaseURL}/nachricht-by-konversation-by-person/${konversationID}/${personID}`;
        #deleteNachrichtURL = () => `${this.#lernappServerBaseURL}/nachrichten/${id}`;
        #deleteNachrichtenByKonversationURL = () => `${this.#lernappServerBaseURL}/nachrichten/${konversationID}`;
        #getNachrichtenByPersonURL = (personID) => `${this.#lernappServerBaseURL}/nachrichten/${personID}`;
        #getNachrichtenByInhaltURL= () => `${this.#lernappServerBaseURL}/nachrichten/${inhalt}`;
        
        //Konversationbezogen
        #getKonversationenURL = () => `${this.#lernappServerBaseURL}/konversationen`;
        #getKonversationURL = (id) => `${this.#lernappServerBaseURL}/konversation/${id}`;
        #setKonversationURL = (id) => `${this.#lernappServerBaseURL}/konversation/${id}`;
        #addKonversationURL = (id) => `${this.#lernappServerBaseURL}/konversation/${id}`;
        #deleteKonversationURL = (id) => `${this.#lernappServerBaseURL}/konversation/${id}`;
        #getKonversationByNameURL = (name) => `${this.#lernappServerBaseURL}/konversation/${name}`;

        //TeilnahmeChatbezogen
        #getTeilnahmeChatURL = () => `${this.#lernappServerBaseURL}/teilnahmeChat`;
        #getTeilnahmeChatByIdURL = (id) => `${this.#lernappServerBaseURL}/teilnahmeChat/${id}`;
        #setTeilnahmeChatURL = (id) => `${this.#lernappServerBaseURL}/teilnahmeChat/${id}`;
        #addTeilnahmeChatURL = (id) => `${this.#lernappServerBaseURL}/teilnahmeChat/${id}`;
        #deleteTeilnahmeChatURL = (id) => `${this.#lernappivServerBaseURL}/teilnahmeChat/${id}`;
        #getTeilnahmeChatByStudentIdURL = (id) => `${this.#lernappServerBaseURL}/teilnehmer-by-student-id/${id}`;
        #getTeilnahmeChatByKonversationsIdURL = (id) => `${this.#lernappServerBaseURL}/teilnehmer-by-konversation-id/${id}`;

        //TeilnahmeGruppebezogen
        #getTeilnahmeGruppeURL = () => `${this.#lernappServerBaseURL}/teilnahmenGruppe`;
        #addTeilnahmeGruppeURL = () => `${this.#lernappServerBaseURL}/teilnahmenGruppe`;
        #getTeilnahmeGruppeByIdURL = (id) => `${this.#lernappServerBaseURL}/teilnahmenGruppe/${id}`;

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
         * Adds a person and returns a Promise, which resolves to a new PersonBO object
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
            let responsePersonBO = PersonBO.fromJSON(responseJSON)[0];
            // console.info(responsePersonBO);
            return new Promise(function (resolve) {
              resolve(responsePersonBO);
            })
          })
        }

        /**
         * Updated eine Person und gibt Promise zurück, resolves as PersonBO.
         * 
         * @param {PersonBO} personBO to be updated
         * @public
         */
        updatePerson(personBO) {
          return this.#fetchAdvanced(this.#updatePersonURL(personBO.getID()), {
            method: 'PUT',
            headers: {
              'Accept': 'application/json, text/plain',
              'Content-type': 'application/json',
            },
            body: JSON.stringify(personBO)
          }).then((responseJSON) => {
            // We always get an array of PersonBOs.fromJSON
            let responsePersonBO = PersonBO.fromJSON(responseJSON)[0];
            // console.info(PersonBOs);
            return new Promise(function (resolve) {
              resolve(responsePersonBO);
            })
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
            let responsePersonBO = PersonBO.fromJSON(responseJSON)[0];
            // console.info(responsePersonBO);
            return new Promise(function (resolve) {
              resolve(responsePersonBO);
            })
          })
        }
 
        /**
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
                resolve(lerngruppeBOs);
              })           
            })
          }
          /**
           * Adds a lerngruppe and returns a Promise, which resolves to a new LerngruppeBO object
           *  
           * @param {LerngruppeBO} lerngruppeBO to be added. The ID of the new lerngruppe is set by the backend
           * @public
           */
          addLerngruppe(lerngruppeBO) {
            return this.#fetchAdvanced(this.#addLerngruppeURL(), {
              method: 'POST',
              headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
              },
              body: JSON.stringify(lerngruppeBO)
            }).then((responseJSON) => {
              // We always get an array of LerngruppeBOs.fromJSON, but only need one object
              let responseLerngruppeBO = LerngruppeBO.fromJSON(responseJSON)[0];
              // console.info(LerngruppeBOs);
              return new Promise(function (resolve) {
                resolve(responseLerngruppeBO);
              })
            })
          }
  
          /**
           * Gibt eine Lerngruppe mit einer bestimmten ID als BO zurück
           * 
           * @param {Number} lerngruppeID to be retrieved
           * @public
           */
          getLerngruppe(lerngruppeID) {
            return this.#fetchAdvanced(this.#getLerngruppeURL(lerngruppeID)).then((responseJSON) => {
              // We always get an array of LerngruppeBOs.fromJSON, but only need one object
              let responseLerngruppeBO = LerngruppeBO.fromJSON(responseJSON)[0];
              // console.info(responseLerngruppeBO);
              return new Promise(function (resolve) {
                resolve(responseLerngruppeBO);
              })
            })
          }
  
          /**
           * Updated eine Lerngruppe und gibt Promise zurück, resolves as LerngruppeBO.
           * 
           * @param {LerngruppeBO} lerngruppeBO to be updated
           * @public
           */
          updateLerngruppe(lerngruppeBO) {
            return this.#fetchAdvanced(this.#updateLerngruppeURL(lerngruppeBO.getID()), {
              method: 'PUT',
              headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
              },
              body: JSON.stringify(lerngruppeBO)
            }).then((responseJSON) => {
              // We always get an array of LerngruppeBOs.fromJSON
              let responseLerngruppeBO = LerngruppeBO.fromJSON(responseJSON)[0];
              // console.info(LerngruppeBOs);
              return new Promise(function (resolve) {
                resolve(responseLerngruppeBO);
              })
            })
          }
   
          /**
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
              // console.info(profilBOs);
              return new Promise(function (resolve) {
                resolve(profileBOs);
              })           
            })
          }
        /**
         * Adds a person and returns a Promise, which resolves to a new PersonBO object
         *  
         * @param {PersonBO} personBO to be added. The ID of the new customer is set by the backend
         * @public
         */
        addProfil(profilBO) {
          return this.#fetchAdvanced(this.#addProfilURL(), {
            method: 'POST',
            headers: {
              'Accept': 'application/json, text/plain',
              'Content-type': 'application/json',
            },
            body: JSON.stringify(profilBO)
          }).then((responseJSON) => {
            // We always get an array of ProfilBOs.fromJSON, but only need one object
            let responseProfilBO = ProfilBO.fromJSON(responseJSON)[0];
            // console.info(accountBOs);
            return new Promise(function (resolve) {
              resolve(responseProfilBO);
            })
          })
        }
        /**
         * Gibt ein Profil-Objekt zurück
         * @param {Number} profilID to be retrieved
         * @public
          */
         getProfil(profilID) {
          return this.#fetchAdvanced(this.#getProfilURL(profilID,{method: 'GET'})).then((responseJSON) => {
            let profilBOs = ProfilBO.fromJSON(responseJSON);
            //console.info(ProfilBOs)
            return new Promise(function (resolve) {
              resolve(profilBOs);
            })
          })
        }

        /**
         * Updated ein Profil und gibt Promise zurück, resolves as ProfilBO.
         * 
         * @param {ProfilBO} profilBO to be updated
         * @public
         */
        updateProfil(profilBO) {
          return this.#fetchAdvanced(this.#updateProfilURL(profilBO.getID()), {
            method: 'PUT',
            headers: {
              'Accept': 'application/json, text/plain',
              'Content-type': 'application/json',
            },
            body: JSON.stringify(profilBO)
          }).then((responseJSON) => {
            // We always get an array of ProfilBOs.fromJSON
            let responseProfilBO = ProfilBO.fromJSON(responseJSON)[0];
            // console.info(ProfilBOs);
            return new Promise(function (resolve) {
              resolve(responseProfilBO);
            })
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
            let responseLernvorliebenBO = LernvorliebenBO.fromJSON(responseJSON)[0];
            // console.info(responseLernvorliebenBO);
            return new Promise(function (resolve) {
              resolve(responseLernvorliebenBO);
            })
          })
        }
        /**
         * Adds a lernvorlieben and returns a Promise, which resolves to a new LernvorliebenBO object
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
            // We always get an array of LernvorliebenBOs.fromJSON, but only need one object
            let responseLernvorliebenBO = LernvorliebenBO.fromJSON(responseJSON)[0];
            // console.info(LernvorliebenBOs);
            return new Promise(function (resolve) {
              resolve(responseLernvorliebenBO);
            })
          })
        }
        /**
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

        //Vorschlagbezogene
        /**
         * Gibt alle Vorschlaege zurück
         * @param {Number} mainpersonID to be retrieved
         * @param {Number} lernfachID to be retrieved
         * @public
          */
        getVorschlaege(mainpersonID, lernfachID) {
          return this.#fetchAdvanced(this.#getVorschlaegeURL(mainpersonID, lernfachID, {method: 'GET'})).then((responseJSON) => {
            let vorschlaegeBOs = VorschlagBO.fromJSON(responseJSON);
            //console.info(vorschlaegeBOs)
            return new Promise(function (resolve) {
              resolve(vorschlaegeBOs);
            })
          })
        }

      
        //Nachrichtbezogene
        /** 
        * Gibt alle Nachrichten einer Person zurück
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
         * Adds a Nachricht and returns a Promise, which resolves to a new NachrichtenBO object
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
    
        getNachrichtenByKonversation(konversationID){
		      return this.#fetchAdvanced(this.#getNachrichtenByKonversationURL(konversationID)).then((responseJSON) => {
			      let nachrichtenBOs = NachrichtBO.fromJSON(responseJSON);
			      //console.info(nachrichtenBOs)
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
         * @param {Number} konversationId to be retrieved
         * @param {Number} personID 
         * @public
         */
    
          getNachrichtenByKonversationByPerson(konversationID, personID) {
            return this.#fetchAdvanced(this.#getNachrichtenByKonversationByPersonURL(konversationID, personID, {method: 'GET'})).then((responseJSON) => {
              let nachrichtenBOs = NachrichtBO.fromJSON(responseJSON);
              //console.info(nachrichtenBOs)
              return new Promise(function (resolve) {
                resolve(nachrichtenBOs);
              })
            })
          }
 
          /** 
           * löscht Nachrichten einer konversation
           * @param {Number} konversationId to be retrieved
           * @param {Number} personID 
           * @public
           */
      
          deleteNachrichtenByKonversation(konversationID) {
            return this.#fetchAdvanced(this.#deleteNachrichtenByKonversationURL(konversationID, personID, {method: 'GET'})).then((responseJSON) => {
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
    
        getNachrichtByInhalt(inhalt){
          return this.#fetchAdvanced(this.#getNachrichtenByInhaltURL(inhalt)).then((responseJSON) => {
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
          * Adds a KOnversation and returns a Promise, which resolves to a new KonversationBO object
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
             let responseKonversationBO = KonversationBO.fromJSON(responseJSON)[0];
             // console.info(KonversationBOs);
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
         * Gibt Promise zurück, Löscht Nachricht mit bestimmter ID
         * 
         * @param {String} name to be retrived 
         * @public
         */


          getKonversationByName(name){
            return this.#fetchAdvanced(this.#getKonversationByNameURL(name)).then((responseJSON) => {
            let konversationBOs = KonversationBO.fromJSON(responseJSON);
            console.info(konversationBOs)
            return new Promise(function (resolve){
              resolve(konversationBOs)
               })
             })
            }

          //setzt den Zustand einer Konversation mit der bestimmten ID auf einen neuen Zustand
	        setKonversation(id) { 
		      //immer Zustand 1 holen
		        return this.#fetchAdvanced(this.#setKonversationURL(id),{method: 'PUT'}).then((responseJSON) => {
			      let konversationBOs = KonversationBO.fromJSON(responseJSON);
			      console.info(konversationBOs)
			      return new Promise(function (resolve){
			      	resolve(konversationBOs);
		           	})
	        	  })
          	}









}