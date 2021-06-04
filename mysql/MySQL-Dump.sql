CREATE DATABASE  IF NOT EXISTS `lernapp_SWPra` /*!40100 DEFAULT CHARACTER SET utf8 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `lernapp_SWPra`;

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Table `lernapp_SWPra`.`lernvorlieben`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `lernapp_SWPra`.`lernvorlieben` ;

CREATE TABLE IF NOT EXISTS `lernapp_SWPra`.`lernvorlieben` (
  `id` INT NOT NULL,
  `tageszeit` INT NULL,
  `tage` INT NULL,
  `frequenz` INT NULL,
  `lernart` INT NULL,
  `gruppengroesse` INT NULL,
  `lernort` INT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `lernapp_SWPra`.`profile`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `lernapp_SWPra`.`profile` ;

CREATE TABLE IF NOT EXISTS `lernapp_SWPra`.`profile` (
  `id` INT NOT NULL,
  `studiengang` VARCHAR(45) NULL,
  `semester` INT NULL,
  `lernvorlieben_id` INT NOT NULL,
  PRIMARY KEY (`id`, `lernvorlieben_id`),
  INDEX `fk_profil_lernvorlieben1_idx` (`lernvorlieben_id` ASC) VISIBLE,
  CONSTRAINT `fk_profil_lernvorlieben1`
    FOREIGN KEY (`lernvorlieben_id`)
    REFERENCES `lernapp_SWPra`.`lernvorlieben` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

--
-- Dumping data for table `module`
--

LOCK TABLES `profile` WRITE;
/*!40000 ALTER TABLE `module` DISABLE KEYS */;
INSERT INTO `profile` VALUES (1, 'Wirtschaftsinformatik und digitale Medien', 3, 1), (2, 'CR/PR', 2, 2)/*!40000 ALTER TABLE `module` ENABLE KEYS */;
UNLOCK TABLES;

-- -----------------------------------------------------
-- Table `lernapp_SWPra`.`personen`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `lernapp_SWPra`.`personen` ;

CREATE TABLE IF NOT EXISTS `lernapp_SWPra`.`personen` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  `vorname` VARCHAR(45) NULL,
  `semester` INT NULL,
  `alter` INT NULL,
  `geschlecht` VARCHAR(45) NULL,
  `lerngruppe` VARCHAR(45) NULL,
  `google_user_id` VARCHAR(45) NULL,
  `email` VARCHAR(45) NULL,
  `profil_id` INT NOT NULL,
  PRIMARY KEY (`id`, `profil_id`),
  INDEX `fk_person_profil1_idx` (`profil_id` ASC) VISIBLE,
  CONSTRAINT `fk_person_profil1`
    FOREIGN KEY (`profil_id`)
    REFERENCES `lernapp_SWPra`.`profile` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `lernapp_SWPra`.`lernfaecher`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `lernapp_SWPra`.`lernfaecher` ;

CREATE TABLE IF NOT EXISTS `lernapp_SWPra`.`lernfaecher` (
  `id` INT NOT NULL,
  `bezeichnung` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `lernapp_SWPra`.`person_has_lernfaecher`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `lernapp_SWPra`.`person_has_lernfaecher` ;

CREATE TABLE IF NOT EXISTS `lernapp_SWPra`.`person_has_lernfaecher` (
  `lernfaecher_id_lernfaecher` INT NOT NULL,
  `kenntnisstand` VARCHAR(45) NULL,
  PRIMARY KEY (`lernfaecher_id_lernfaecher`),
  INDEX `fk_person_has_courses_courses1_idx` (`lernfaecher_id_lernfaecher` ASC) VISIBLE,
  CONSTRAINT `fk_person_has_courses_courses1`
    FOREIGN KEY (`lernfaecher_id_lernfaecher`)
    REFERENCES `lernapp_SWPra`.`lernfaecher` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `lernapp_SWPra`.`lerngruppen`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `lernapp_SWPra`.`lerngruppen` ;

CREATE TABLE IF NOT EXISTS `lernapp_SWPra`.`lerngruppen` (
  `id` INT NOT NULL,
  `profil_id` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  `profile_id` INT NOT NULL,
  PRIMARY KEY (`id`, `profil_id`, `profile_id`),
  INDEX `fk_lerngruppen_profile1_idx` (`profile_id` ASC) VISIBLE,
  CONSTRAINT `fk_lerngruppen_profile1`
    FOREIGN KEY (`profile_id`)
    REFERENCES `lernapp_SWPra`.`profile` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `lernapp_SWPra`.`profile_has_lernfaecher`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `lernapp_SWPra`.`profile_has_lernfaecher` ;

CREATE TABLE IF NOT EXISTS `lernapp_SWPra`.`profile_has_lernfaecher` (
  `profil_id` INT NOT NULL,
  `lernfaecher_id` INT NOT NULL,
  `kenntnisstand` VARCHAR(45) NULL,
  PRIMARY KEY (`profil_id`, `lernfaecher_id`),
  INDEX `fk_profil_has_lernfaecher_lernfaecher1_idx` (`lernfaecher_id` ASC) VISIBLE,
  INDEX `fk_profil_has_lernfaecher_profil1_idx` (`profil_id` ASC) VISIBLE,
  CONSTRAINT `fk_profil_has_lernfaecher_profil1`
    FOREIGN KEY (`profil_id`)
    REFERENCES `lernapp_SWPra`.`profile` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_profil_has_lernfaecher_lernfaecher1`
    FOREIGN KEY (`lernfaecher_id`)
    REFERENCES `lernapp_SWPra`.`lernfaecher` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `lernapp_SWPra`.`teilnahmen_gruppe`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `lernapp_SWPra`.`teilnahmen_gruppe` ;

CREATE TABLE IF NOT EXISTS `lernapp_SWPra`.`teilnahmen_gruppe` (
  `person_id` INT NOT NULL,
  `person_profil_id` INT NOT NULL,
  `id` VARCHAR(45) NOT NULL,
  `lerngruppen_id` INT NOT NULL,
  `lerngruppen_profil_id` INT NOT NULL,
  PRIMARY KEY (`person_id`, `person_profil_id`, `id`, `lerngruppen_id`, `lerngruppen_profil_id`),
  INDEX `fk_person_has_lerngruppe_person1_idx` (`person_id` ASC, `person_profil_id` ASC) VISIBLE,
  INDEX `fk_teilnahmen_gruppe_lerngruppen1_idx` (`lerngruppen_id` ASC, `lerngruppen_profil_id` ASC) VISIBLE,
  CONSTRAINT `fk_person_has_lerngruppe_person1`
    FOREIGN KEY (`person_id` , `person_profil_id`)
    REFERENCES `lernapp_SWPra`.`personen` (`id` , `profil_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_teilnahmen_gruppe_lerngruppen1`
    FOREIGN KEY (`lerngruppen_id` , `lerngruppen_profil_id`)
    REFERENCES `lernapp_SWPra`.`lerngruppen` (`id` , `profil_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `lernapp_SWPra`.`konversation`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `lernapp_SWPra`.`konversation` ;

CREATE TABLE IF NOT EXISTS `lernapp_SWPra`.`konversation` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `lernapp_SWPra`.`nachrichten`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `lernapp_SWPra`.`nachrichten` ;

CREATE TABLE IF NOT EXISTS `lernapp_SWPra`.`nachrichten` (
  `id` INT NOT NULL,
  `nachricht_inhalt` VARCHAR(45) NULL,
  `person_id` INT NOT NULL,
  `konversation_id` INT NOT NULL,
  PRIMARY KEY (`id`, `person_id`, `konversation_id`),
  INDEX `fk_nachricht_person1_idx` (`person_id` ASC) VISIBLE,
  INDEX `fk_nachrichten_konversation1_idx` (`konversation_id` ASC) VISIBLE,
  CONSTRAINT `fk_nachricht_person1`
    FOREIGN KEY (`person_id`)
    REFERENCES `lernapp_SWPra`.`personen` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_nachrichten_konversation1`
    FOREIGN KEY (`konversation_id`)
    REFERENCES `lernapp_SWPra`.`konversation` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `lernapp_SWPra`.`tage`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `lernapp_SWPra`.`tage` ;

CREATE TABLE IF NOT EXISTS `lernapp_SWPra`.`tage` (
  `id` INT NOT NULL,
  `präferenz` VARCHAR(45) NULL,
  `lernvorlieben_id` INT NOT NULL,
  PRIMARY KEY (`id`, `lernvorlieben_id`),
  INDEX `fk_tage_lernvorlieben1_idx` (`lernvorlieben_id` ASC) VISIBLE,
  CONSTRAINT `fk_tage_lernvorlieben1`
    FOREIGN KEY (`lernvorlieben_id`)
    REFERENCES `lernapp_SWPra`.`lernvorlieben` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `lernapp_SWPra`.`tageszeiten`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `lernapp_SWPra`.`tageszeiten` ;

CREATE TABLE IF NOT EXISTS `lernapp_SWPra`.`tageszeiten` (
  `id` INT NOT NULL,
  `präferenz` VARCHAR(45) NULL,
  `lernvorlieben_id` INT NOT NULL,
  PRIMARY KEY (`id`, `lernvorlieben_id`),
  INDEX `fk_tageszeit_lernvorlieben1_idx` (`lernvorlieben_id` ASC) VISIBLE,
  CONSTRAINT `fk_tageszeit_lernvorlieben1`
    FOREIGN KEY (`lernvorlieben_id`)
    REFERENCES `lernapp_SWPra`.`lernvorlieben` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `lernapp_SWPra`.`frequenzen`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `lernapp_SWPra`.`frequenzen` ;

CREATE TABLE IF NOT EXISTS `lernapp_SWPra`.`frequenzen` (
  `id` INT NOT NULL,
  `präferenz` VARCHAR(45) NULL,
  `lernvorlieben_id` INT NOT NULL,
  PRIMARY KEY (`id`, `lernvorlieben_id`),
  INDEX `fk_frequenz_lernvorlieben1_idx` (`lernvorlieben_id` ASC) VISIBLE,
  CONSTRAINT `fk_frequenz_lernvorlieben1`
    FOREIGN KEY (`lernvorlieben_id`)
    REFERENCES `lernapp_SWPra`.`lernvorlieben` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `lernapp_SWPra`.`lernarten`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `lernapp_SWPra`.`lernarten` ;

CREATE TABLE IF NOT EXISTS `lernapp_SWPra`.`lernarten` (
  `id` INT NOT NULL,
  `lernvorlieben_id` INT NOT NULL,
  `präferenz` VARCHAR(45) NULL,
  PRIMARY KEY (`id`, `lernvorlieben_id`),
  INDEX `fk_lernart_lernvorlieben1_idx` (`lernvorlieben_id` ASC) VISIBLE,
  CONSTRAINT `fk_lernart_lernvorlieben1`
    FOREIGN KEY (`lernvorlieben_id`)
    REFERENCES `lernapp_SWPra`.`lernvorlieben` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `lernapp_SWPra`.`gruppengroessen`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `lernapp_SWPra`.`gruppengroessen` ;

CREATE TABLE IF NOT EXISTS `lernapp_SWPra`.`gruppengroessen` (
  `id` INT NOT NULL,
  `präferenz` VARCHAR(45) NULL,
  `lernvorlieben_id` INT NOT NULL,
  PRIMARY KEY (`id`, `lernvorlieben_id`),
  INDEX `fk_gruppengroessen_lernvorlieben1_idx` (`lernvorlieben_id` ASC) VISIBLE,
  CONSTRAINT `fk_gruppengroessen_lernvorlieben1`
    FOREIGN KEY (`lernvorlieben_id`)
    REFERENCES `lernapp_SWPra`.`lernvorlieben` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `lernapp_SWPra`.`lernorte`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `lernapp_SWPra`.`lernorte` ;

CREATE TABLE IF NOT EXISTS `lernapp_SWPra`.`lernorte` (
  `id` INT NOT NULL,
  `präferenz` VARCHAR(45) NULL,
  `lernvorlieben_id` INT NOT NULL,
  PRIMARY KEY (`id`, `lernvorlieben_id`),
  INDEX `fk_lernorte_lernvorlieben1_idx` (`lernvorlieben_id` ASC) VISIBLE,
  CONSTRAINT `fk_lernorte_lernvorlieben1`
    FOREIGN KEY (`lernvorlieben_id`)
    REFERENCES `lernapp_SWPra`.`lernvorlieben` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `lernapp_SWPra`.`vorschlaege`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `lernapp_SWPra`.`vorschlaege` ;

CREATE TABLE IF NOT EXISTS `lernapp_SWPra`.`vorschlaege` (
  `id` INT NOT NULL,
  `match_quote` INT NULL,
  `lernfaecher_id` VARCHAR(45) NULL,
  `main_person_id` VARCHAR(45) NULL,
  `personen_id` INT NOT NULL,
  `personen_profil_id` INT NOT NULL,
  PRIMARY KEY (`id`, `personen_id`, `personen_profil_id`),
  INDEX `fk_vorschlaege_personen1_idx` (`personen_id` ASC, `personen_profil_id` ASC) VISIBLE,
  CONSTRAINT `fk_vorschlaege_personen1`
    FOREIGN KEY (`personen_id` , `personen_profil_id`)
    REFERENCES `lernapp_SWPra`.`personen` (`id` , `profil_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `lernapp_SWPra`.`teilnahmen_chat`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `lernapp_SWPra`.`teilnahmen_chat` ;

CREATE TABLE IF NOT EXISTS `lernapp_SWPra`.`teilnahmen_chat` (
  `id` INT NOT NULL,
  `person_id` INT NOT NULL,
  `konversation_id` INT NOT NULL,
  PRIMARY KEY (`id`, `person_id`, `konversation_id`),
  INDEX `fk_teilnehmer_chat_person1_idx` (`person_id` ASC) VISIBLE,
  INDEX `fk_teilnehmer_chat_konversation1_idx` (`konversation_id` ASC) VISIBLE,
  CONSTRAINT `fk_teilnehmer_chat_person1`
    FOREIGN KEY (`person_id`)
    REFERENCES `lernapp_SWPra`.`personen` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_teilnehmer_chat_konversation1`
    FOREIGN KEY (`konversation_id`)
    REFERENCES `lernapp_SWPra`.`konversation` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
