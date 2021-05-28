from server.db.Mapper import Mapper
from server.bo.Lerngruppe import Lerngruppe




class LerngruppeMapper(Mapper):
    """Mapper-Klasse, die Profil-Objekte auf eine relationale
        Datenbank abbildet. Hierzu wird eine Reihe von Methoden zur Verfügung
        gestellt, mit deren Hilfe z.B. Objekte gesucht, erzeugt, modifiziert und
        gelöscht werden können. Das Mapping ist bidirektional. D.h., Objekte können
        in DB-Strukturen und DB-Strukturen in Objekte umgewandelt werden.
    """

    def __init__(self):
        super().__init__()

    def find_all(self):
        """Auslesen aller Lerngruppen.

        :return Eine Sammlung mit Lerngruppen-Objekten, die sämtliche Lerngruppen
                repräsentieren.
        """
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT * FROM lerngruppe")
        tuples = cursor.fetchall()

        for (id_lerngruppe, teilnehmer, profil_id) in tuples:
            lerngruppe = Lerngruppe()
            lerngruppe.set_id_lerngruppe(id_lerngruppe)
            lerngruppe.set_teilnehmer(teilnehmer)
            lerngruppe.set_profil_id(profil_id)
            result.append(lerngruppe)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_id_lerngruppe(self, id_lerngruppe):
        """Auslesen der Lerngruppen anhand der ID
        """
        result = []
        cursor = self._connection.cursor()
        command = "SELECT id_lerngruppe, name, teilnehmer, profil_id FROM lerngruppe WHERE id_lerngruppe={}".format(id_lerngruppe)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id_lerngruppe) in tuples:
            lerngruppe = Lerngruppe()
            lerngruppe.set_id_lerngruppe(id_lerngruppe)
            lerngruppe.set_name(name)
            lerngruppe.set_teilnehmer(teilnehmer)
            lerngruppe.set_profil_id(profil_id)
            result.append(lerngruppe)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_name(self, name):
        """Auslesen der Lerngruppe anhand des Namens
        """
        result = []
        cursor = self._connection.cursor()
        command = "SELECT name, id_lerngruppe FROM lerngruppe WHERE name={} ORDER BY name".format(name)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (name, id_lerngruppe) in tuples:
            lerngruppe = Lerngruppe()
            lerngruppe.set_id_lerngruppe(id_lerngruppe)
            lerngruppe.set_name(name)
            result.append(lerngruppe)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_profil_id(self, profil_id):
        """Auslesen der Lerngruppen anhand der ID eines Teilnehmers
        """
        result = []
        cursor = self._connection.cursor()
        command = "SELECT id_lerngruppe, name, teilnehmer, profil_id FROM lerngruppe WHERE profil_id={}".format(profil_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id_lerngruppe,) in tuples:
            lerngruppe = Lerngruppe()
            lerngruppe.set_id_lerngruppe(id_lerngruppe)
            lerngruppe.set_name(name)
            lerngruppe.set_teilnehmer(teilnehmer)
            lerngruppe.set_profil_id(profil_id)
            result.append(lerngruppe)

        self._connection.commit()
        cursor.close()

        return result

    def insert(self, lerngruppe):
        """Einfügen eines lerngruppen-Objekts in die Datenbank.

        Dabei wird auch der Primärschlüssel des übergebenen Objekts geprüft und ggf.
        berichtigt.
        """
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM lerngruppe ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            lerngruppe.set_id_lerngruppe(maxid[0]+1))

            command = "INSERT INTO lerngruppe (id_lerngruppe, name, teilnehmer, profil_id) VALUES (%s,%s,%s)"
            data = (lerngruppe.get_id_lerngruppe(), lerngruppe.get_name(), lerngruppe.get_profil_id())
            cursor.execute(command, data)

            self._cnx.commit()
            cursor.close()

            return lerngruppe

    def update(self, lerngruppe):
        """Wiederholtes Schreiben eines Objekts in die Datenbank.
        """
        cursor = self._cnx.cursor()

        command = "UPDATE lerngruppe " + "SET id_lerngruppe=%s, name=%s, teilnehmer=%s, profil_id=%s  WHERE id=%s"
        data = (lerngruppe.get_id_lerngruppe(), lerngruppe.get_name(), lerngruppe.get_teilnehmer(), lerngruppe.get_profil_id())
        cursor.execute(command, data)

        self._cnx.commit()
        cursor.close()

    def delete(self,lerngruppe):
        """Löschen der Daten eines lerngruppen-Objekts aus der Datenbank.
        """
        cursor = self._cnx.cursor()

        command = "DELETE FROM lernrguppe WHERE id_lerngruppe={}".format(lerngruppe.get_id_lerngruppe())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()


