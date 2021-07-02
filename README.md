# SoPra-LernpartnerApp

## Intro
Die Lernpartner App ist eine Full Stack Webapplikation. Hierbei kann der User ein eigenes Profil mit persönlichen Daten sowie Daten zu eigenen Lernvorlieben erstellen, dieses verwalten und mit Hilfe des Matching-Algorithmus passende Lernpartner finden. Nach gestellter und angenommener Anfrage können die User chatten und sich zu Lerngruppen zusammenfügen, um von anderen USern gefunden zu werden.
Das System ist aufgeteilt in Präsentationsschicht, Serviceschicht, Business Logik Schicht und Datenbank Schicht.
1. Als Speicher in der Datenbank-Schicht dient eine relationale MySQL Datenbank welche über ein Python Backend angesprochen wird. Hierbei kommt das [mysql connector package](https://dev.mysql.com/doc/connector-python/en/) zum Einsatz. Um die Wartbarkeit zu erhöhen wird in allen Schichten auf Business Objekt Klassen zurückgegriffen. 
2. Business Logik Anfragen werden im Backend in der Business Logik Schicht verarbeitet. 
3. Der Service Layer stellt die Resourcen mithilfe eines [Flask Web Server](https://flask.palletsprojects.com/en/1.1.x/) zur verfügung. Abgesichert werden die einzelnen Methoden durch einen Security Decorator mit dem [google-auth](https://google-auth.readthedocs.io/en/latest/) package.
4. Dargestellt werden die unterschiedlichen Ressourcen über ein JavaScript frontend erstellt mithilfe der [React Library](https://reactjs.org/). Das React Frontend sendet seine API Anfragen an das Python Backend. 

## Inhalt
Informationen finden Sie in:
- [INSTALLATION.md](INSTALLATION.md) welche alle Informationen für eine erfolgreiche Installation in ihrerer Entwicklungsumgebung enthält
- [RUN.md](RUN.md) baut auf [INSTALLATION.md](INSTALLATION.md) auf und erklärt den start der Datenbank, des Backends sowie des Frontends.
- [/src](/src): In diesem Verzeichnis finden Sie den Source Code des Projekts.
- [/frontend](/frontend): In diesem Verzeichnis finden Sie separat vom restlichen Source Code den Source Code des Frontend.
- [/mysql](/mysql): Hier finden Sie mySQL-spezifisches Material wie z.B. den Dump, um eine Datenbankinstanz zu erstellen