import ProfilBO from './ProfilBO';


/**
 * Abstracts the REST interface of the Python backend with convenient access methods.
 * The class is implemented as a singleton. 
 */
export default class LernpartnerAPI {

  // Singelton instance
  static #api = null;

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
  //Personbezogen

  //Gruppenbezogen

  //Profilbezogen

  //...

}
