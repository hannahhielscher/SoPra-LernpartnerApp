from flask import request
from google.auth.transport import requests
import google.oauth2.id_token

from server.AppAdministration import AppAdministration


def secured(function):
    """Decorator zur Google Firebase-basierten Authentifizierung von Benutzern
    """
    firebase_request_adapter = requests.Request()

    def wrapper(*args, **kwargs):
        # Verify Firebase auth.
        #Hier werden alle in Cookies, welche in der Anmeldung vergeben werden, abgefragt
        id_token = request.cookies.get("token")

        error_message = None
        claims = None
        objects = None

        if id_token:
            try:
                # Verify the token against the Firebase Auth API. This example
                # verifies the token on each page load. For improved performance,
                # some applications may wish to cache results in an encrypted
                # session store (see for instance
                # http://flask.pocoo.org/docs/1.0/quickstart/#sessions).
                claims = google.oauth2.id_token.verify_firebase_token(
                    id_token, firebase_request_adapter)

                if claims is not None:
                    adm = AppAdministration()

                    google_user_id = claims.get("user_id")
                    email = claims.get("email")

                    person = adm.get_person_by_google_user_id(google_user_id)
                    if person is not None:
                        """Fall: Der Benutzer ist unserem System bereits bekannt.
                        Wir gehen davon aus, dass die google_user_id sich nicht ändert.
                        Wohl aber können sich der zugehörige Klarname (name) und die
                        E-Mail-Adresse ändern. Daher werden diese beiden Daten sicherheitshalber
                        in unserem System geupdated."""
                        person.set_email(email)
                        adm.save_person(person)
                    else:
                        """Fall: Der Benutzer war bislang noch nicht eingelogged. 
                        Wir legen daher ein neues Lernvorlieben-Objekt, Profil-Objekt und Person-Objekt an, um dieses ggf. später
                        nutzen zu können.
                        """
                        lernvorlieben = adm.create_lernvorlieben(1, 'Null', 1, 'Null', 1, 'Null', 1, 'Null', 1, 'Null', 1, 'Null')
                        lernvorlieben_id = lernvorlieben.get_id()
                        profil = adm.create_profil(False, [9] , lernvorlieben_id)
                        profil_id = profil.get_id()
                        person = adm.create_person('Null', 'Null', 0, 'Null', 0, 'Null', False, google_user_id, email, profil_id)

                    print(request.method, request.path, "angefragt durch:", email)

                    objects = function(*args, **kwargs)
                    return objects
                else:
                    return '', 401  # UNAUTHORIZED !!!
            except ValueError as exc:
                # This will be raised if the token is expired or any other
                # verification checks fail.
                error_message = str(exc)
                return exc, 401  # UNAUTHORIZED !!!

        return '', 401  # UNAUTHORIZED !!!

    return wrapper
