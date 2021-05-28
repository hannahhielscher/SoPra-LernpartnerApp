import ProfilBO from './ProfilBO';
import PersonBO from './PersonBO';
import VorschlagBO from './VorschlagBO';


/**
 * Abstracts the REST interface of the Python backend with convenient access methods.
 * The class is implemented as a singleton. 
 */
export default class LernpartnerAPI {

  // Singelton instance
  static #api = null;

  #lernAppServerBaseURL = '/lernApp'
  /** 
   * Get the Singelton instance 
   * 
   * @public
   */
  static getAPI() {
    if (this.#api == null) {
      this.#api = new BankAPI();
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
#addPersonenURL = () => `${this.#lernappServerBaseURL}/personen`;
#getPersonURL = (id) => `${this.#lernappServerBaseURL}/personen/${id}`;
#updatePersonURL = (id) => `${this.#lernappServerBaseURL}/personen/${id}`;
#deletePersonURL = (id) => `${this.#lernappServerBaseURL}/personen/${id}`;
#searchPersonURL = (personName) => `${this.#lernappServerBaseURL}/personen-by-name/${personName}`;

  //Gruppenbezogen

  //Profilbezogen

  //...



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
   * Gibt eine Person mit einer bestimmten ID als BO zurück
   * 
   * @param {Number} customerID to be retrieved
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
}