/**
 *
 * Base class für alle BusinessObjects, welche standardmäßig ein ID-Feld haben
 */
export default class BusinessObject {

    /**
     * null constructor.
     */
    constructor() {
      this.id = 0;
    }
  
    /**
     * Setzt die ID des BusinessObject
     *
     * @param {*} aId - die neue ID des BusinessObject
     */
    setID(aId) {
      this.id = aId;
    }
  
    /**
     * Gibt die ID des Business Object wieder.
     */
    getID() {
      return this.id;
    }
  
    /**
     * Gibt eine String-Repräsentation dieses Objekts zurück. Dies ist nützlich für Debugging-Zwecke.
     */
    toString() {
      let result = '';
      for (var prop in this) {
        result += prop + ': ' + this[prop] + ' ';
      }
      return result;
    }
  }