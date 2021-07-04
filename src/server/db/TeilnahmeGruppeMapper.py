from server.db.Mapper import Mapper
from server.bo.TeilnahmeGruppe import TeilnahmeGruppe


class TeilnahmeGruppeMapper(Mapper):
    """Mapper-Klasse, die TeilnahmeGruppe-Objekte auf eine relationale Datenbank abbildet. 

    Die Klasse ermöglicht die Umwandlung von Objekten in Datenbankstrukturen und umgekehrt
    """
    def __init__(self):
        super().__init__()

    def find_all(self):
        """Auslesen aller Teilnahmen der Lerngruppen.
        :return Alle TeilnahmeGruppe-Objekte im System
        """
        result = []
        cursor = self._connection.cursor()
        cursor.execute("SELECT * from teilnahmen_gruppe")
        tuples = cursor.fetchall()

        for (id, teilnehmer, lerngruppe) in tuples:
            teilnahme = TeilnahmeGruppe()
            teilnahme.set_id(id)
            teilnahme.set_teilnehmer(teilnehmer)
            teilnahme.set_lerngruppe(lerngruppe)
            result.append(teilnahme)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_person_id(self, person_id):
        """ Findet alle Gruppenteilnahmen einer bestimmten person mittels PersonId
         :param person_id PersonID der TeilnahmeGruppe
        :return TeilnahmeGruppe-Objekt, das dem übergebenen Schlüssel entspricht, None bei nicht vorhandenem DB-Tupel.
        """
        result = []
        cursor = self._connection.cursor()
        command = "SELECT teilnahmen_gruppe.id, teilnahmen_gruppe.person_id, teilnahmen_gruppe.lerngruppe_id FROM teilnahmen_gruppe WHERE teilnahmen_gruppe.person_id = {}".format(person_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, person_id, lerngruppen_id) in tuples:
            teilnahme = TeilnahmeGruppe()

            teilnahme.set_id(id)
            teilnahme.set_teilnehmer(person_id)
            teilnahme.set_lerngruppe(lerngruppen_id)

            result.append(teilnahme)

        self._connection.commit()
        cursor.close()

        return result

    def find_by_lerngruppe_id(self, lerngruppe_id):
        """ Findet alle Teilnahmen/Teilnehmer einer bestimmten Gruppen ID

        :param lerngruppe_id LerngruppeID der TeilnahmeGruppe
        :return TeilnahmeGruppe-Objekt, das dem übergebenen Schlüssel entspricht, None bei nicht vorhandenem DB-Tupel."""
        result = []
        cursor = self._connection.cursor()
        command = "SELECT id, person_id, lerngruppe_id FROM teilnahmen_gruppe WHERE lerngruppe_id={}".format(lerngruppe_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, person_id, lerngruppe_id) in tuples:
            teilnahme = TeilnahmeGruppe()
            teilnahme.set_id(id)
            teilnahme.set_teilnehmer(person_id)
            teilnahme.set_lerngruppe(lerngruppe_id)
            result.append(teilnahme)

        self._connection.commit()
        cursor.close()

        return result
    
    def find_by_person_and_lerngruppe(self, person_id, lerngruppe_id):
        """ Findet bestimmte Teilnahme nach Person und Lerngruppe 

        :param person_id PersonID der TeilnahmeGruppe
        :param lerngruppe_id LerngruppeID der TeilnahmeGruppe
        :return TeilnahmeGruppe-Objekt, das dem übergebenen Schlüssel entspricht, None bei nicht vorhandenem DB-Tupel."""
        result = None
        cursor = self._connection.cursor()
        command = "SELECT id, person_id, lerngruppe_id FROM teilnahmen_gruppe WHERE person_id = {} AND lerngruppe_id={} ".format(person_id, lerngruppe_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, teilnehmer, lerngruppe) in tuples:
            teilnahme = TeilnahmeGruppe()
            teilnahme.set_id(id)
            teilnahme.set_teilnehmer(teilnehmer)
            teilnahme.set_lerngruppe(lerngruppe)
            result = teilnahme

        self._connection.commit()
        cursor.close()

        return result

    def find_by_id(self):
        """Reads a tuple with a given ID"""
        pass

    def insert(self, teilnahme):
        """
		Einfugen eines Teilnahme BO's in die DB
        Dabei wird auch der Primärschlüssel des übergebenen Objekts geprüft 
        :param teilnahme das zu speichernde TeilnahmeGruppe Objekt
        :return das bereits übergebene TeilnahmeGruppe Objekt mit aktualisierten Daten (id)
		"""
        cursor = self._connection.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM teilnahmen_gruppe ")
        tuples = cursor.fetchall()

        for (maxid) in tuples:
            if maxid[0] is not None:
                """Wenn wir eine maximale ID festellen konnten, zählen wir diese
                um 1 hoch und weisen diesen Wert als ID dem User-Objekt zu."""
                teilnahme.set_id(maxid[0] + 1)
            else:
                """Wenn wir KEINE maximale ID feststellen konnten, dann gehen wir
                davon aus, dass die Tabelle leer ist und wir mit der ID 1 beginnen können."""
                teilnahme.set_id(1)

        command = "INSERT INTO teilnahmen_gruppe (id, person_id, lerngruppe_id) VALUES (%s,%s,%s)"
        data = (teilnahme.get_id(), teilnahme.get_teilnehmer(), teilnahme.get_lerngruppe())
        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

        return teilnahme

    def update(self, teilnahme):
        """Überschreiben / Aktualisieren eines Teilnahme-Objekts in der DB
        :param teilnahme
        :return aktualisiertes Teilnahme-Objekt
        """

        cursor = self._connection.cursor()

        command = "UPDATE teilnahmen_gruppe SET person_id=%s, lerngruppe_id=%s WHERE id=%s"
        data = (teilnahme.get_teilnehmer(), teilnahme.get_lerngruppe(), teilnahme.get_id())
        cursor.execute(command, data)

        self._connection.commit()
        cursor.close()

    def delete(self, id):
        """Löschen der Daten eines teilnahme-Objekts der Lerngruppe aus der Datenbank.
        
        :param id ID der TeilnahmeGruppe
        """

        cursor = self._connection.cursor()

        command = "DELETE FROM teilnahmen_gruppe WHERE id={}".format(id)
        cursor.execute(command)

        self._connection.commit()
        cursor.close()
