CREATE DATABASE  IF NOT EXISTS `chat_app` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `chat_app`;
-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: chat_app
-- ------------------------------------------------------
-- Server version	8.0.19

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

--
-- Table structure for table `conversation`
--

DROP TABLE IF EXISTS `conversation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `conversation` (
  `idConversation` int NOT NULL AUTO_INCREMENT,
  `idUtilisateur` int NOT NULL,
  PRIMARY KEY (`idConversation`,`idUtilisateur`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conversation`
--

LOCK TABLES `conversation` WRITE;
/*!40000 ALTER TABLE `conversation` DISABLE KEYS */;
/*!40000 ALTER TABLE `conversation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `message`
--

DROP TABLE IF EXISTS `message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `message` (
  `idMessage` int NOT NULL AUTO_INCREMENT,
  `messageContent` varchar(500) NOT NULL,
  `idsender` int NOT NULL,
  `idreceiver` int NOT NULL,
  `timeSent` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `idConversation` int NOT NULL,
  PRIMARY KEY (`idMessage`),
  KEY `fk_sender_idx` (`idsender`),
  KEY `fk_receiver_idx` (`idreceiver`),
  KEY `fk_convo_idx` (`idConversation`),
  CONSTRAINT `fk_convo` FOREIGN KEY (`idConversation`) REFERENCES `conversation` (`idConversation`),
  CONSTRAINT `fk_receiver` FOREIGN KEY (`idreceiver`) REFERENCES `utilisateur` (`idUtilisateur`) ON UPDATE RESTRICT,
  CONSTRAINT `fk_sender` FOREIGN KEY (`idsender`) REFERENCES `utilisateur` (`idUtilisateur`) ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `message`
--

LOCK TABLES `message` WRITE;
/*!40000 ALTER TABLE `message` DISABLE KEYS */;
/*!40000 ALTER TABLE `message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `session`
--

DROP TABLE IF EXISTS `session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `session` (
  `sid` varchar(36) NOT NULL,
  `expires` datetime DEFAULT NULL,
  `data` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`sid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `session`
--

LOCK TABLES `session` WRITE;
/*!40000 ALTER TABLE `session` DISABLE KEYS */;
INSERT INTO `session` VALUES ('AMZstrEBlG_ogr-g6ZS7Ee9N2q1O7VY5','2020-10-23 03:02:16','{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"passport\":{}}','2020-10-22 02:51:58','2020-10-22 03:02:16'),('iR24yXRCXN5WLLEf5u_melGRmuRn-h4M','2020-10-23 02:03:14','{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":1}}','2020-10-22 01:53:43','2020-10-22 02:03:14'),('KfO_M1f1Hk_In557G2MzVgyuYLpb1HCW','2020-10-23 02:26:38','{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":1}}','2020-10-22 02:07:49','2020-10-22 02:26:38'),('Oz2GcxHw1TUbVRPyECahi6l1pCGbB45-','2020-10-23 02:48:48','{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":1}}','2020-10-22 02:27:40','2020-10-22 02:48:48'),('uSt4lSdsaOfOKZGRUwxLpZ3Xgo7icsJS','2020-10-23 02:06:25','{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":1}}','2020-10-22 02:06:02','2020-10-22 02:06:25');
/*!40000 ALTER TABLE `session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `utilisateur`
--

DROP TABLE IF EXISTS `utilisateur`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `utilisateur` (
  `idUtilisateur` int NOT NULL AUTO_INCREMENT,
  `Login` varchar(45) NOT NULL,
  `MotDePasse` varchar(128) NOT NULL,
  `Affichage` varchar(45) DEFAULT NULL,
  `avatar` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`idUtilisateur`),
  UNIQUE KEY `Login_UNIQUE` (`Login`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `utilisateur`
--

LOCK TABLES `utilisateur` WRITE;
/*!40000 ALTER TABLE `utilisateur` DISABLE KEYS */;
INSERT INTO `utilisateur` VALUES (1,'raid','$2b$10$EYB5RXNE8wmp2gEz6BiZUuFqX6yOT4ump0BiNgNilcqsjm2f/tSk2',NULL,'./avatars/raid/5cc94aab41857675c9f42f76b15a704d.jpg'),(18,'karim','$2b$10$D4hs.r6LBhZKR3lMoojfx.Eq/X8ctZl6csidwlVmcIhtn6ftJoCau','kassa','./avatars/karim/9ac981c882d445b2ceb0d29163e95ba2.jpg'),(20,'aaa','$2b$10$KjMzHUpkmZ70w.kvKyBEMuZ18JcKyQsahA.5h9Ld/.a3Pj1ktHiXu','','./avatars/default.png'),(21,'yassir','$2b$10$HkMuBjDd00jxzcuEDooTEeDHbBCDKgBtn3gwLgFaEpiqYrKHQbYI6','','./avatars/default.png');
/*!40000 ALTER TABLE `utilisateur` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-10-22  4:07:56
