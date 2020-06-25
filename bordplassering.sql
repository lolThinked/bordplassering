-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema bordplassering
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema bordplassering
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `bordplassering` DEFAULT CHARACTER SET utf8 ;
USE `bordplassering` ;

-- -----------------------------------------------------
-- Table `bordplassering`.`Person`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bordplassering`.`Person` (
  `idPerson` INT NOT NULL,
  `First name` VARCHAR(128) NULL,
  `Last Name` VARCHAR(128) NULL,
  `Gender` VARCHAR(1) NULL,
  `email` VARCHAR(256) NULL,
  PRIMARY KEY (`idPerson`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bordplassering`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bordplassering`.`User` (
  `idUser` INT NOT NULL,
  `Username` VARCHAR(45) NULL,
  `Password` VARCHAR(128) NULL,
  `idProjects` INT NULL,
  `Person_idPerson` INT NOT NULL,
  PRIMARY KEY (`idUser`),
  INDEX `fk_User_Person1_idx` (`Person_idPerson` ASC),
  CONSTRAINT `fk_User_Person1`
    FOREIGN KEY (`Person_idPerson`)
    REFERENCES `bordplassering`.`Person` (`idPerson`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bordplassering`.`Projects`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bordplassering`.`Projects` (
  `idProjects` INT NOT NULL,
  `Hall` VARCHAR(45) NULL,
  `Name` VARCHAR(45) NULL,
  `OrgenizersID` INT NULL,
  `User_idUser` INT NOT NULL,
  `image` VARCHAR(128) NULL,
  `Date` DATETIME NULL,
  PRIMARY KEY (`idProjects`, `User_idUser`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bordplassering`.`Setup`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bordplassering`.`Setup` (
  `idSetup` INT NOT NULL,
  `Hall` VARCHAR(45) NULL,
  `Projects_idProjects` INT NOT NULL,
  `Projects_User_idUser` INT NOT NULL,
  PRIMARY KEY (`idSetup`),
  INDEX `fk_Setup_Projects1_idx` (`Projects_idProjects` ASC, `Projects_User_idUser` ASC),
  CONSTRAINT `fk_Setup_Projects1`
    FOREIGN KEY (`Projects_idProjects` , `Projects_User_idUser`)
    REFERENCES `bordplassering`.`Projects` (`idProjects` , `User_idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bordplassering`.`TableInfo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bordplassering`.`TableInfo` (
  `idTableInfo` INT NOT NULL,
  `PosX` INT NULL,
  `PosY` INT NULL,
  `Type` VARCHAR(45) NULL,
  `Setup_idSetup` INT NOT NULL,
  PRIMARY KEY (`idTableInfo`),
  INDEX `fk_TableInfo_Setup1_idx` (`Setup_idSetup` ASC),
  CONSTRAINT `fk_TableInfo_Setup1`
    FOREIGN KEY (`Setup_idSetup`)
    REFERENCES `bordplassering`.`Setup` (`idSetup`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bordplassering`.`Allergies`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bordplassering`.`Allergies` (
  `idAllergies` INT NOT NULL,
  `Name` VARCHAR(45) NULL,
  PRIMARY KEY (`idAllergies`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bordplassering`.`Person_has_Allergies`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bordplassering`.`Person_has_Allergies` (
  `Person_idPerson` INT NOT NULL,
  `Allergies_idAllergies` INT NOT NULL,
  PRIMARY KEY (`Person_idPerson`, `Allergies_idAllergies`),
  INDEX `fk_Person_has_Allergies_Allergies1_idx` (`Allergies_idAllergies` ASC),
  INDEX `fk_Person_has_Allergies_Person1_idx` (`Person_idPerson` ASC),
  CONSTRAINT `fk_Person_has_Allergies_Person1`
    FOREIGN KEY (`Person_idPerson`)
    REFERENCES `bordplassering`.`Person` (`idPerson`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Person_has_Allergies_Allergies1`
    FOREIGN KEY (`Allergies_idAllergies`)
    REFERENCES `bordplassering`.`Allergies` (`idAllergies`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bordplassering`.`User_has_Projects`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bordplassering`.`User_has_Projects` (
  `User_idUser` INT NOT NULL,
  `Projects_idProjects` INT NOT NULL,
  `Projects_User_idUser` INT NOT NULL,
  PRIMARY KEY (`User_idUser`, `Projects_idProjects`, `Projects_User_idUser`),
  INDEX `fk_User_has_Projects_Projects1_idx` (`Projects_idProjects` ASC, `Projects_User_idUser` ASC),
  INDEX `fk_User_has_Projects_User1_idx` (`User_idUser` ASC),
  CONSTRAINT `fk_User_has_Projects_User1`
    FOREIGN KEY (`User_idUser`)
    REFERENCES `bordplassering`.`User` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_User_has_Projects_Projects1`
    FOREIGN KEY (`Projects_idProjects` , `Projects_User_idUser`)
    REFERENCES `bordplassering`.`Projects` (`idProjects` , `User_idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bordplassering`.`Preset`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bordplassering`.`Preset` (
  `idPresets` INT NOT NULL,
  `Name` VARCHAR(45) NULL,
  `image` VARCHAR(128) NULL,
  `Setup_idSetup` INT NOT NULL,
  PRIMARY KEY (`idPresets`, `Setup_idSetup`),
  INDEX `fk_Preset_Setup1_idx` (`Setup_idSetup` ASC),
  CONSTRAINT `fk_Preset_Setup1`
    FOREIGN KEY (`Setup_idSetup`)
    REFERENCES `bordplassering`.`Setup` (`idSetup`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bordplassering`.`Seat`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bordplassering`.`Seat` (
  `TableInfo_idTableInfo` INT NOT NULL,
  `Person_idPerson` INT NOT NULL,
  PRIMARY KEY (`TableInfo_idTableInfo`),
  INDEX `fk_Seat_Person1_idx` (`Person_idPerson` ASC),
  CONSTRAINT `fk_Seat_TableInfo1`
    FOREIGN KEY (`TableInfo_idTableInfo`)
    REFERENCES `bordplassering`.`TableInfo` (`idTableInfo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Seat_Person1`
    FOREIGN KEY (`Person_idPerson`)
    REFERENCES `bordplassering`.`Person` (`idPerson`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bordplassering`.`UserType`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bordplassering`.`UserType` (
  `idUserType` INT NOT NULL,
  `Type` VARCHAR(45) NULL,
  PRIMARY KEY (`idUserType`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bordplassering`.`UserType_has_User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bordplassering`.`UserType_has_User` (
  `UserType_idUserType` INT NOT NULL,
  `User_idUser` INT NOT NULL,
  PRIMARY KEY (`UserType_idUserType`, `User_idUser`),
  INDEX `fk_UserType_has_User_User1_idx` (`User_idUser` ASC),
  INDEX `fk_UserType_has_User_UserType1_idx` (`UserType_idUserType` ASC),
  CONSTRAINT `fk_UserType_has_User_UserType1`
    FOREIGN KEY (`UserType_idUserType`)
    REFERENCES `bordplassering`.`UserType` (`idUserType`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_UserType_has_User_User1`
    FOREIGN KEY (`User_idUser`)
    REFERENCES `bordplassering`.`User` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
