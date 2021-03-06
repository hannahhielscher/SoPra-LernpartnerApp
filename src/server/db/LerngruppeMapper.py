from server.db.Mapper import Mapper
from server.bo.Lerngruppe import Lerngruppe

class LerngruppeMapper(Mapper):
    """Mapper-Klasse, die Lerngruppe-Objekte auf eine relationale Datenbank abbildet.
    
    Die Klasse ermöglicht die Umwandlung von Objekten in Datenbankstrukturen und umgekehrt.
    """

    def __init__(self):
        super().__init__()

    def find_all(self):
        """Auslesen aller Lerngruppen.

        :return Eine Sammlung mit Lerngruppen-Objekten, die sämtliche Lerngruppen repräsentieren.
        """
        result = []
        cursor = self._connection.cursor()
        cursor.execute("SELECT id, name, profil_id FROM lerngruppen")
        tuples = cursor.fetchall()

        for (id, name, profil_id) in tuples:
            lerngruppe = Lerngruppe()
            lerngruppe.set_id(id)
            lerngruppe.set_name(name)
            lerngruppe.set_profil(profil_id)
            result.append(lerngruppe)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_id(self, id):
        """Auslesen der Lerngruppen anhand der ID

        :param id Primärschlüsselattribut einer Lerngruppe aus der Datenbank
        :return Lerngruppe-Objekt, welche mit der ID übereinstimmt, None wenn kein Eintrag gefunden wurde
        """
        result = None
        cursor = self._connection.cursor()
        command = "SELECT id, name, profil_id FROM lerngruppen WHERE id={}".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, name, profil_id) in tuples:
            lerngruppe = Lerngruppe()
            lerngruppe.set_id(id)
            lerngruppe.set_name(name)
            lerngruppe.set_profil(profil_id)
            result = lerngruppe

        self._connection.commit()
        cursor.close()

        return result

    def find_by_profil_id(self, id):
        """Auslesen der Lerngruppen anhand der profilID

        :param id profilID einer Lerngruppe aus der Datenbank
        :return Lerngruppe-Objekt, welche mit der ID übereinstimmt, None wenn kein Eintrag gefunden wurde
        """
        cursor = self._connection.cursor()
        command = "SELECT id, name, profil_id FROM lerngruppen WHERE profil_id={}".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, name, profil_id) = tuples[0]
            
            lerngruppe = Lerngruppe()

            lerngruppe.set_id(id)
            lerngruppe.set_name(name)
            lerngruppe.set_profil(profil_id)

            result = lerngruppe

        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._connection.commit()
        cursor.close()

        return result

    def find_by_name(self, name):
        """Auslesen der Lerngruppe anhand des Namens

        :param name Name einer Lerngruppe aus der Datenbank
        :return Lerngruppe-Objekt, welche mit der ID übereinstimmt, None wenn kein Eintrag gefunden wurde
        """
        result = []
        cursor = self._connection.cursor()
        command = "SELECT name, id, profil_id FROM lerngruppen WHERE name={}".format(name)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (name, id) in tuples:
            lerngruppe = Lerngruppe()
            lerngruppe.set_id(id)
            lerngruppe.set_name(name)
            lerngruppe.set_profil(profil_id)
            result.append(lerngruppe)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_person_id(self, person_id):
        """Auslesen der Lerngruppen anhand der ID eines Teilnehmers

        :param person_id PersonID einer Lerngruppe aus der Datenbank
        :return Lerngruppe-Objekt, welche mit der ID übereinstimmt, None wenn kein Eintrag gefunden wurde
        """
        result = []
        cursor = self._connection.cursor()
        command = "SELECT lerngruppen.id, lerngruppen.name, lerngruppen.profil_id FROM lerngruppen INNER JOIN teilnahmen_gruppe ON lerngruppen.id = teilnahmen_gruppe.lerngruppe_id WHERE teilnahmen_gruppe.person_id = {}".format(person_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, name, profil_id) in tuples:
            lerngruppe = Lerngruppe()

            lerngruppe.set_id(id)
            lerngruppe.set_name(name)
            lerngruppe.set_profil(profil_id)

            result.append(lerngruppe)

        self._connection.commit()
        cursor.close()

        return result
        

    def find_by_lernfach_id(self, lernfach_id):
        """Suche eines Profiles nach einem bestimmten Lernfach

        :param lernfach_id LernfachID einer Lerngruppe aus der Datenbank, Verbindung über profile_has_lernfaecher
        :return Lerngruppe-Objekt, welche mit der ID übereinstimmt, None wenn kein Eintrag gefunden wurde
        """

        result = []

        cursor = self._connection.cursor()
        command = "SELECT profile_has_lernfaecher.profil_id, profile.gruppe, profile_has_lernfaecher.lernfaecher_id, profile.lernvorlieben_id FROM profile_has_lernfaecher INNER JOIN profile ON profile.id = profile_has_lernfaecher.profil_id WHERE profile_has_lernfaecher.lernfaecher_id ='{}'".format(lernfach_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (profil_id, gruppe, lernfaecher_id, lernvorlieben_id) in tuples:
            profil = Profil()
            profil.set_id(profil_id)
            profil.set_gruppe(gruppe)
            #profil.set_lernfaecher(find_lernfaecher_id_by_profil_id(profil_id))
            profil.set_lernfaecher(lernfaecher_id)
            profil.set_lernvorlieben_id(lernvorlieben_id)
            result.append(profil)

        self._connection.commit()
        cursor.close()

        return result

    def insert(self, lerngruppe):
        """Einfügen eines lerngruppen-Objekts in die Datenbank.

        Dabei wird auch der Primärschlüssel des übergebenen Objekts geprüft und ggf.
        berichtigt.
        """
        print(lerngruppe)
        cursor = self._connection.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM lerngruppen")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            if maxid[0] is not None:
                """Wenn wir eine maximale ID festellen konnten, zählen wir diese
                um 1 hoch und weisen diesen Wert als ID dem User-Objekt zu."""
                lerngruppe.set_id(maxid[0] + 1)
            else:
                """Wenn wir KEINE maximale ID feststellen konnten, dann gehen wir
                davon aus, dass die Tabelle leer ist und wir mit der ID 1 beginnen können."""
                lerngruppe.set_id(1)

        command = "INSERT INTO lerngruppen (id, name, profil_id) VALUES (%s,%s,%s)"
        data = (lerngruppe.get_id(), lerngruppe.get_name(), lerngruppe.get_profil())

        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

        return lerngruppe

    def update(self, lerngruppe):
        """Wiederholtes Schreiben eines Objekts in die Datenbank.
        """
        cursor = self._connection.cursor()

        command = "UPDATE lerngruppen " + "SET name=%s, profil_id=%s  WHERE id=%s"
        data = (lerngruppe.get_name(), lerngruppe.get_profil(), lerngruppe.get_id())
        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

    def delete(self,lerngruppe):
        """Löschen der Daten eines Lerngruppen-Objekts aus der Datenbank.

        :param lerngruppe -> Lerngruppe-Objekt
        """
        cursor = self._connection.cursor()

        command = "DELETE FROM lernguppen WHERE id={}".format(lerngruppe.get_id())
        cursor.execute(command)

        self._connection.commit()
        cursor.close()
