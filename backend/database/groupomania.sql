-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: localhost    Database: groupomania
-- ------------------------------------------------------
-- Server version	8.0.22

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `coms`
--

DROP TABLE IF EXISTS `coms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coms` (
  `comId` smallint unsigned NOT NULL AUTO_INCREMENT,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `userId` smallint unsigned NOT NULL,
  `postId` smallint unsigned NOT NULL,
  `firstname` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `lastname` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`comId`),
  KEY `userId` (`userId`),
  KEY `postId` (`postId`),
  KEY `firstname` (`firstname`),
  KEY `lastname` (`lastname`),
  KEY `avatar` (`avatar`),
  CONSTRAINT `coms_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `coms_ibfk_2` FOREIGN KEY (`postId`) REFERENCES `posts` (`postId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `coms_ibfk_3` FOREIGN KEY (`firstname`) REFERENCES `users` (`firstname`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `coms_ibfk_4` FOREIGN KEY (`lastname`) REFERENCES `users` (`lastname`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `coms_ibfk_5` FOREIGN KEY (`avatar`) REFERENCES `users` (`avatar`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coms`
--

LOCK TABLES `coms` WRITE;
/*!40000 ALTER TABLE `coms` DISABLE KEYS */;
INSERT INTO `coms` VALUES (1,'N\'h&eacute;sitez pas &agrave; me demander plus d\'informations !',4,4,'Mario','Bros','images/mario.jpg'),(2,'Merci Mario pour toutes ces astuces tr&egrave;s utiles. La 2 m\'a laiss&eacute;e sans voix 😱.',1,4,'Elisabeth','Lardière','images/îleAvion.jpg'),(3,'Un article qui vous donne le sourire jusqu\'aux oreilles.',3,4,'Arthur','Fleck','images/joker.jpg'),(4,'Je ne me sens pas concern&eacute;. J\'arrive &agrave; rester calme en toutes circonstances.',3,2,'Arthur','Fleck','images/joker.jpg'),(5,'J\'aime p&ocirc; bricoler 😡.',2,4,'Bruce','Banner','images/hulk.jpg'),(6,'J\'aime p&ocirc; rire 😡.',2,3,'Bruce','Banner','images/hulk.jpg');
/*!40000 ALTER TABLE `coms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dislikes`
--

DROP TABLE IF EXISTS `dislikes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dislikes` (
  `dislikeId` int unsigned NOT NULL AUTO_INCREMENT,
  `userId` smallint unsigned NOT NULL,
  `postId` smallint unsigned NOT NULL,
  PRIMARY KEY (`dislikeId`),
  KEY `userId` (`userId`),
  KEY `postId` (`postId`),
  CONSTRAINT `dislikes_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `dislikes_ibfk_2` FOREIGN KEY (`postId`) REFERENCES `posts` (`postId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dislikes`
--

LOCK TABLES `dislikes` WRITE;
/*!40000 ALTER TABLE `dislikes` DISABLE KEYS */;
INSERT INTO `dislikes` VALUES (2,3,2),(3,2,4),(4,2,3);
/*!40000 ALTER TABLE `dislikes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
  `likeId` int unsigned NOT NULL AUTO_INCREMENT,
  `userId` smallint unsigned NOT NULL,
  `postId` smallint unsigned NOT NULL,
  PRIMARY KEY (`likeId`),
  KEY `userId` (`userId`),
  KEY `postId` (`postId`),
  CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`postId`) REFERENCES `posts` (`postId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT INTO `likes` VALUES (4,3,4),(5,1,4),(7,4,4),(8,4,1);
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `postId` smallint unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `likes` mediumint unsigned NOT NULL DEFAULT '0',
  `dislikes` mediumint unsigned NOT NULL DEFAULT '0',
  `totalComs` mediumint unsigned NOT NULL DEFAULT '0',
  `userId` smallint unsigned NOT NULL,
  `firstname` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `lastname` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`postId`),
  KEY `userId` (`userId`),
  KEY `firstname` (`firstname`),
  KEY `lastname` (`lastname`),
  KEY `avatar` (`avatar`),
  CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `posts_ibfk_2` FOREIGN KEY (`firstname`) REFERENCES `users` (`firstname`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `posts_ibfk_3` FOREIGN KEY (`lastname`) REFERENCES `users` (`lastname`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `posts_ibfk_4` FOREIGN KEY (`avatar`) REFERENCES `users` (`avatar`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,'Bienvenue sur Groupomania !','Ici, vous pouvez publier, commenter, d&eacute;battre, liker (ou pas !), partager, rire, ...<br />On ne vous demandera qu\'une seule chose : &ecirc;tre respectueux ! Enjoy 😊 !','2021-03-02 23:02:33',1,0,0,1,'Elisabeth','Lardière','images/îleAvion.jpg'),(2,'Bien dans sa peau au travail','Les remarques incessantes de J. du service trombones vous rendent vert de rage ?<br />Apprenez &agrave; g&eacute;rer vos &eacute;motions dans le cadre professionnel.','2021-03-02 23:07:17',0,1,1,2,'Bruce','Banner','images/hulk.jpg'),(3,'Ateliers rire en entreprise','D&eacute;couvrez ce nouveau concept n&eacute; au coeur de Gotham City. 😬','2021-03-02 23:09:51',0,1,1,3,'Arthur','Fleck','images/joker.jpg'),(4,'Des bonnes news dans les tuyaux','Top 10 des astuces-plomberie qui vous sauveront la vie.<br />La 4 va vous scier les jambes !<br /><br />1 - Sachez o&ugrave; sont les vannes principales.<br /><br />2 - Ne prenez pas vos toilettes pour une poubelle.<br /><br />3 - Eviter de laisser passer des ordures dans le drain de la cuisine.<br /><br />4 - Ne percez pas vos tuyaux.<br /><br />5 - Servez-vous de l\'aspirateur pour d&eacute;loger les petits objets qui bouchent les canalisations.<br /><br />6 - Utilisez les pistons d\'&eacute;vier pour d&eacute;boucher les siphons.<br /><br />7 - Utilisez du ruban de teflon pour r&eacute;aliser des raccords d\'&eacute;tanch&eacute;it&eacute;.<br /><br />8 - V&eacute;rifier r&eacute;guli&egrave;rement votre syst&egrave;me de plomberie.<br /><br />9 - R&eacute;parez les fuites le plus t&ocirc;t possible.<br /><br />10 - Evitez de trop serrer les raccords.','2021-03-02 23:26:50',3,1,4,4,'Mario','Bros','images/mario.jpg'),(5,'Challenge du mois !','Lancement aujourd\'hui du compteur de r&ecirc;ves : moins vous r&ecirc;vassez, plus vous &ecirc;tes r&eacute;compens&eacute;s.<br /><br />A vous de jouer !','2021-03-05 23:24:43',0,0,0,1,'Elisabeth','Lardière','images/îleAvion.jpg');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userId` smallint unsigned NOT NULL AUTO_INCREMENT,
  `firstname` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `lastname` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `avatar` varchar(255) NOT NULL DEFAULT 'images/avatar-default.png',
  `admin` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`userId`),
  UNIQUE KEY `email` (`email`),
  KEY `firstname` (`firstname`),
  KEY `lastname` (`lastname`),
  KEY `avatar` (`avatar`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Elisabeth','Lardière','groupomodo@gmail.com','$2b$10$rKVz8FqQb7inMKYRdoAEe.YvXc20Wjst4rwZsWv6FYCv8wrw1C16W','images/îleAvion.jpg',1),(2,'Bruce','Banner','hulk@gmail.com','$2b$10$fBz0HJqZXPDnnC25oguSpe.aCozlhEOiD9VJ2xOeirWaC8IxjSwgy','images/hulk.jpg',0),(3,'Arthur','Fleck','joker@gmail.com','$2b$10$4IBBL5ys4OAzKuezkYImp./7kxKFuNcNGhpTv1wZMA3/vRJqZCXny','images/joker.jpg',0),(4,'Mario','Bros','supermario@gmail.com','$2b$10$3kBQsNNdcTaKBLJfIBN2XeJYAr5jcBXTl3mXRcm.5t9SEKcs6zdqy','images/mario.jpg',0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-03-07 21:42:19
