from server.bo.Profil import Profil
from server.db.Mapper import Mapper


class ProfilMapper(Mapper):
    """Mapper-Klasse, die Profil-Objekte auf eine relationale
    Datenbank abbildet. Hierzu wird eine Reihe von Methoden zur Verfügung
    gestellt, mit deren Hilfe z.B. Objekte gesucht, erzeugt, modifiziert und
    gelöscht werden können. Das Mapping ist bidirektional. D.h., Objekte können
    in DB-Strukturen und DB-Strukturen in Objekte umgewandelt werden.
    """

    def __init__(self):
        super().__init__()

    def find_all(self):
        """Auslesen aller Profile.
        :return Alle Profil-Objekten im System
        """
        result = []

        cursor = self._connenction.cursor()

        command = "SELECT id, studiengang, abschluss, semester, lernvorlieben_id from profile"

        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, studiengang, abschluss, semester, lernvorlieben_id) in tuples:
            profil = Profil()
            profil.set_id(id)
            profil.set_abschluss(abschluss)
            profil.set_semester(semester)
            profil.set_lernvorlieben_id_lernvorlieben(lernvorlieben_id)

            result.append(profil)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_id(self, id):
        """Suchen eines Kontos mit vorgegebener Kontonummer. Da diese eindeutig ist,
        wird genau ein Objekt zurückgegeben.

        :param id Primärschlüsselattribut (->DB)
        :return Konto-Objekt, das dem übergebenen Schlüssel entspricht, None bei
            nicht vorhandenem DB-Tupel.
        """
        result = None

        cursor = self._connection.cursor()
        command = "SELECT id FROM profile WHERE id={}".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, studiengang, abschluss, semester, lernvorlieben_id) = tuple[0]
            profil = Profil()
            profil.set_id(id)
            profil.set_abschluss(abschluss)
            profil.set_semester(semester)
            profil.set_lernvorlieben_id_lernvorlieben(lernvorlieben_id)

            result = profil

            except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def insert(self, profil):
        """Einfügen eines Profil-Objekts in die Datenbank.

        Dabei wird auch der Primärschlüssel des übergebenen Objekts geprüft und ggf.
        berichtigt.

        :param profil das zu speichernde Objekt
        :return das bereits übergebene Objekt, jedoch mit ggf. korrigierter ID.
        """
        cursor = self.connection.cursor()
        cursor.execute("SELECT MAX(id_) AS maxid FROM profile ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            if maxid[0] is not None:
                """Wenn wir eine maximale ID festellen konnten, zählen wir diese
                um 1 hoch und weisen diesen Wert als ID dem User-Objekt zu."""
                profil.set_id(maxid[0] + 1)
            else:
                """Wenn wir KEINE maximale ID feststellen konnten, dann gehen wir
                davon aus, dass die Tabelle leer ist und wir mit der ID 1 beginnen können."""
                profil.set_id(1)


        command = "INSERT INTO profile (id, studiengang, abschluss, semester, lernvorlieben_id) VALUES (%s,%s,%s,%s,%s)"
        data = (profil.get_id(), profil.get_studiengang(), profil.get_abschluss() profil.get_semester() profil.get_lernvorlieben_id())
        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()
        return profil

    def update(self, profil):
        """Wiederholtes Schreiben eines Objekts in die Datenbank.

        :param profil das Objekt, das in die DB geschrieben werden soll
        """
        cursor = self._connection.cursor()

        command = "UPDATE profile " + "SET studiengang=%s, SET abschluss=%s, SET semester=%s, SET lernvorlieben_id=%s WHERE id=%s"
        data = (profil.get_id(), profil.get_studiengang(), profil.get_abschluss() profil.get_semester() profil.get_lernvorlieben_id())
        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

    def delete(self, profil):
        """Löschen der Daten eines Profil-Objekts aus der Datenbank.

        :param profil das aus der DB zu löschende "Objekt"
        """
        cursor = self.connection.cursor()

        command = "DELETE FROM profile WHERE id={}".format(profil.get_id())
        cursor.execute(command)

        self._connection.commit()
        cursor.close()


"""Zu Testzwecken können wir diese Datei bei Bedarf auch ausführen, 
um die grundsätzliche Funktion zu überprüfen.

Anmerkung: Nicht professionell aber hilfreich..."""
if (__name__ == "__main__"):
    with ProfilMapper() as mapper:
        result = mapper.find_all()
        for p in result:
            print(p)