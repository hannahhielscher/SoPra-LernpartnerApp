from server.db.Mapper import Mapper
from server.bo.Profil import Profil


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

        cursor = self._connection.cursor()

        command = "SELECT profile.id, profile.gruppe, profile_has_lernfaecher.lernfaecher_id, profile.lernvorlieben_id FROM profile INNER JOIN profile_has_lernfaecher ON profile.id = profile_has_lernfaecher.profil_id WHERE profile_has_lernfaecher.profil_id = profile.id"

        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, gruppe, lernfaecher_id, lernvorlieben_id) in tuples:

            buff = False
            for profil in result:
                if profil.get_id() == id:
                    buff = True
                    profil.set_lernfaecher(lernfaecher_id)

            if buff == False:
                profil = Profil()
                profil.set_id(id)
                profil.set_gruppe(gruppe)
                profil.set_lernfaecher(lernfaecher_id)
                profil.set_lernvorlieben_id(lernvorlieben_id)

                result.append(profil)
            else:
                pass

            self._connection.commit()
            cursor.close()

        return result

    def find_by_id(self, id):
        """Suchen eines Profils nach ID. Da diese eindeutig ist,
        wird genau ein Objekt zurückgegeben.

        :param id Primärschlüsselattribut (->DB)
        :return Konto-Objekt, das dem übergebenen Schlüssel entspricht, None bei
            nicht vorhandenem DB-Tupel.
        """
        result = []

        cursor = self._connection.cursor()
        command = "SELECT profile.id, profile.gruppe, profile_has_lernfaecher.lernfaecher_id, profile.lernvorlieben_id FROM profile INNER JOIN profile_has_lernfaecher ON profile.id = profile_has_lernfaecher.profil_id WHERE profile_has_lernfaecher.profil_id ='{}'".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, gruppe, lernfaecher, lernvorlieben_id) in tuples:

            buff = False
            for i in result:
                if i.get_id() == id:
                    buff = True
                    i.set_lernfaecher(lernfaecher)

            if buff == False:
                profil = Profil()
                profil.set_id(id)
                profil.set_gruppe(gruppe)
                profil.set_lernfaecher(lernfaecher)
                profil.set_lernvorlieben_id(lernvorlieben_id)

                result.append(profil)
            else:
                pass

        self._connection.commit()
        cursor.close()

        return result

    def find_lernfaecher_by_profil_id(self, profil_id):
        """Gibt ein Lernfacher + Bezeichnung eines Profiles zurück"""

        result_key = []
        result_value = []
        result = []

        cursor = self._connection.cursor()
        command = "SELECT profile_has_lernfaecher.lernfaecher_id, lernfaecher.bezeichnung FROM profile_has_lernfaecher INNER JOIN lernfaecher ON profile_has_lernfaecher.lernfaecher_id = lernfaecher.id WHERE profile_has_lernfaecher.profil_id ='{}'".format(profil_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (lernfaecher_id) in tuples:
            result_key.append(lernfaecher_id)

        for (bezeichnung) in tuples:
            result_value.append(bezeichnung)

        result = dict.fromkeys(result_key, 0)
        buff = 0
        for i in result:
            for j in range(buff, len(result_value)):
                result[i] = result_value[j]
                buff += 1
                break

        self._connection.commit()
        cursor.close()

        return result

    def find_lernfaecher_id_by_profil_id(self, profil_id):
        """Gibt Lernfächer-ID eines Profiles zurück"""

        result = []

        cursor = self._connection.cursor()
        command = "SELECT profile_has_lernfaecher.lernfaecher_id FROM profile_has_lernfaecher WHERE profile_has_lernfaecher.profil_id ='{}'".format(profil_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (lernfaecher_id) in tuples:
            result.append(lernfaecher_id)

        self._connection.commit()
        cursor.close()

        return result
    
    def find_by_lernfach_id(self, lernfach_id):
        """Suche eines Profiles nach einem bestimmten Lernfach"""

        result = []

        cursor = self._connection.cursor()
        command = "SELECT profile_has_lernfaecher.profil_id, profile.gruppe, profile_has_lernfaecher.lernfaecher_id, profile.lernvorlieben_id  FROM profile_has_lernfaecher INNER JOIN profile ON profile.id = profile_has_lernfaecher.profil_id WHERE profile_has_lernfaecher.lernfaecher_id ='{}'".format(lernfach_id)
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

    def insert(self, profil):
        """Einfügen eines Profil-Objekts in die Datenbank.

        Dabei wird auch der Primärschlüssel des übergebenen Objekts geprüft und ggf.
        berichtigt.

        :param profil das zu speichernde Objekt
        :return das bereits übergebene Objekt, jedoch mit ggf. korrigierter ID.
        """
        cursor = self._connection.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM profile ")
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
        
        command = "INSERT INTO profile (id, gruppe, lernvorlieben_id) VALUES (%s,%s,%s)"
        data = (profil.get_id(), profil.get_gruppe(), profil.get_lernvorlieben_id())
        cursor.execute(command, data)

        lernfaecher = profil.get_lernfaecher()
        command2 = "INSERT INTO profile_has_lernfaecher (profil_id, lernfaecher_id) VALUES (%s,%s)"

        for lernfach in lernfaecher:
            for i in lernfach:
                data2 = (profil.get_id(), i)
                #print(lernfaecher)
                #print(lernfach)
                #print(i)
                cursor.execute(command2, data2)

        self._connection.commit()
        cursor.close()

        return profil


    def update(self, profil):
        """Wiederholtes Schreiben eines Objekts in die Datenbank.

        :param profil das Objekt, das in die DB geschrieben werden soll
        """
        cursor = self._connection.cursor()

        command = "UPDATE profile " + "SET gruppe=%s, lernvorlieben_id=%s WHERE id=%s"
        data = (profil.get_id(), profil.get_gruppe(), profil.get_lernvorlieben_id())
        cursor.execute(command, data)

        command2 = "UPDATE profile_has_lernfaecher" + "SET profil_id=s%, lernfaecher_id=set%  WHERE id=s%"

        data2 = (profil.get_id(), profil.get_lernfaecher_id())
        cursor.execute(command2, data2)

        self._connection.commit()
        cursor.close()

    def delete(self, profil):
        """Löschen der Daten eines Profil-Objekts aus der Datenbank.

        :param profil das aus der DB zu löschende "Objekt"
        """
        cursor = self._connection.cursor()

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