from server.db.Mapper import Mapper
from server.bo.Person import Person


class PersonMapper(Mapper):
    """Mapper-Klasse, die Person Objekte auf der relationalen Datenbank abbildet.
    Die Klasse ermöglicht die Umwandlung von Objekten in Datenbankstrukturen und umgekehrt
    """

    def __init__(self):
        super().__init__()

    def find_all(self):
        """Auslesen aller Personen aus der Datenbank
        :return Alle Person-Objekte im System
        """
        result = []

        cursor = self._connection.cursor()

        command = "SELECT id, name, vorname, semester, `alter`, geschlecht, lerngruppe, google_user_id, email, studiengang, profil_id FROM personen"

        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, name, vorname, semester, alter, geschlecht, lerngruppe, google_user_id, email, studiengang, profil_id) in tuples:
            person = Person()
            person.set_id(id)
            person.set_name(name)
            person.set_vorname(vorname)
            person.set_semester(semester)
            person.set_alter(alter)
            person.set_geschlecht(geschlecht)
            person.set_lerngruppe(lerngruppe)
            person.set_google_user_id(google_user_id)
            person.set_email(email)
            person.set_studiengang(studiengang)
            person.set_profil(profil_id)
            
            result.append(person)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_name(self):
        pass

    def find_by_email(self):
        pass

    def find_by_id(self, id):
        """Suchen einer Person nach der übergebenen ID. 
        :param id Primärschlüsselattribut einer Person aus der Datenbank
        :return Person-Objekt, welche mit der ID übereinstimmt,
                None wenn kein Eintrag gefunden wurde
        """
        
        cursor = self._connection.cursor()
        command = "SELECT id, name, vorname, semester, studiengang, `alter`, geschlecht, lerngruppe, google_user_id, email, profil_id FROM personen WHERE id='{}'".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()
        
        try:
            (id, name, vorname, semester, studiengang, alter, geschlecht, lerngruppe, google_user_id, email,  profil_id) = tuples[0]
            person = Person()
            person.set_id(id)
            person.set_name(name)
            person.set_vorname(vorname)
            person.set_semester(semester)
            person.set_studiengang(studiengang)
            person.set_alter(alter)
            person.set_geschlecht(geschlecht)
            person.set_lerngruppe(lerngruppe)
            person.set_google_user_id(google_user_id)
            person.set_email(email)
            person.set_profil(profil_id)
            
            result = person


        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
			keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None
            

        self._connection.commit()
        cursor.close()

        
        return result

    def find_by_google_user_id(self, google_user_id):
        """Suchen einer Person nach der übergebenen Google User ID. 
        :param google_user_id Google User ID einer Person aus der Datenbank
        :return Person-Objekt, welche mit der Google User ID übereinstimmt,
                None wenn kein Eintrag gefunden wurde
        """
        result = None

        cursor = self._connection.cursor()
        command = "SELECT id, name, vorname, semester, studiengang, `alter`, geschlecht, lerngruppe, google_user_id, email, profil_id FROM personen WHERE google_user_id='{}'".format(
                google_user_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, name, vorname, semester, studiengang, alter, geschlecht, lerngruppe, google_user_id, email, profil_id) = tuples[0]
            person = Person()
            person.set_id(id)
            person.set_name(name)
            person.set_vorname(vorname)
            person.set_semester(semester)
            person.set_studiengang(studiengang)
            person.set_alter(alter)
            person.set_geschlecht(geschlecht)
            person.set_lerngruppe(lerngruppe)
            person.set_google_user_id(google_user_id)
            person.set_email(email)
            person.set_profil(profil_id)
            
            result = person
        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._connection.commit()
        cursor.close()

        return result

    def insert(self, person):
        """Einfügen eines Person Objekts in die DB
        Dabei wird auch der Primärschlüssel des übergebenen Objekts geprüft 
        :param person das zu speichernde Person Objekt
        :return das bereits übergebene Person Objekt mit aktualisierten Daten (id)
        """
        cursor = self._connection.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM personen ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            if maxid[0] is not None:
                """Wenn wir eine maximale ID festellen konnten, zählen wir diese
                um 1 hoch und weisen diesen Wert als ID dem User-Objekt zu."""
                person.set_id(maxid[0] + 1)
            else:
                """Wenn wir KEINE maximale ID feststellen konnten, dann gehen wir
                davon aus, dass die Tabelle leer ist und wir mit der ID 1 beginnen können."""
                person.set_id(1)

        command = "INSERT INTO personen (id, `name`, vorname, semester, studiengang, `alter`, geschlecht, lerngruppe, google_user_id, email, profil_id) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
        data = (person.get_id(), person.get_name(), person.get_vorname(), person.get_semester(), person.get_studiengang(), person.get_alter(), person.get_geschlecht(), person.get_lerngruppe(), person.get_google_user_id(), person.get_email(), person.get_profil())
        cursor.execute(command, data)
        
        self._connection.commit()
        cursor.close()

        return person

    def update(self, person):
        """Überschreiben / Aktualisieren eines Person-Objekts in der DB
        :param person -> Person-Objekt
        :return aktualisiertes Person-Objekt
        """
        cursor = self._connection.cursor()

        command = "UPDATE personen " + "SET name=%s, vorname=%s, semester=%s, studiengang=%s, `alter`=%s, geschlecht=%s, lerngruppe=%s, email=%s, profil_id=%s WHERE google_user_id=%s"
        data = (person.get_name(), person.get_vorname(), person.get_semester(), person.get_studiengang(), person.get_alter(), person.get_geschlecht(), person.get_lerngruppe(), person.get_email(), person.get_profil(), person.get_google_user_id())

        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

    def update_by_id(self, person):
        """Überschreiben / Aktualisieren eines Person-Objekts in der DB
        :param person -> Person-Objekt
        :return aktualisiertes Person-Objekt
        """
        cursor = self._connection.cursor()

        command = "UPDATE personen " + "SET name=%s, vorname=%s, semester=%s, studiengang=%s, `alter`=%s, geschlecht=%s, lerngruppe=%s, email=%s, profil_id=%s WHERE id=%s"
        data = (person.get_name(), person.get_vorname(), person.get_semester(), person.get_studiengang(), person.get_alter(), person.get_geschlecht(), person.get_lerngruppe(), person.get_email(), person.get_profil(), person.get_id())

        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

    def delete(self, person):
        """Löschen der Daten einer Person aus der Datenbank
        :param person -> Person-Objekt
        """
        cursor = self._connection.cursor()

        command = "DELETE FROM personen WHERE id={}".format(person.get_id())
        cursor.execute(command)

        self._connection.commit()
        cursor.close()

    def deleteByID(self, personID):
        """Löschen der Daten einer Person aus der Datenbank
        :param person -> Person-Objekt
        """
        cursor = self._connection.cursor()

        command = "DELETE FROM personen WHERE id={}".format(personID)
        cursor.execute(command)

        self._connection.commit()
        cursor.close()