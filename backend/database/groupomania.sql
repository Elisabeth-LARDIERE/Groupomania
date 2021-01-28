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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coms`
--

LOCK TABLES `coms` WRITE;
/*!40000 ALTER TABLE `coms` DISABLE KEYS */;
INSERT INTO `coms` VALUES (3,'C\'est pas fou comme article.',5,17,'bab','lard','images/wallhaven-g8xmdl.jpg1610283712252.jpg'),(7,'essai pour clean apr&egrave;s soumission',5,18,'bab','lard','images/wallhaven-g8xmdl.jpg1610283712252.jpg'),(8,'j\'adore quand &ccedil;a marche du premier coup',5,18,'bab','lard','images/wallhaven-g8xmdl.jpg1610283712252.jpg'),(10,'chouchouchouc',5,18,'bab','lard','images/wallhaven-g8xmdl.jpg1610283712252.jpg');
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dislikes`
--

LOCK TABLES `dislikes` WRITE;
/*!40000 ALTER TABLE `dislikes` DISABLE KEYS */;
INSERT INTO `dislikes` VALUES (3,5,17);
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (11,'brocoli','endives','2021-01-06 11:24:47',0,0,0,5,'bab','lard','images/wallhaven-g8xmdl.jpg1610283712252.jpg'),(13,'pour voir la longueur','Parce que j\'ai un peu de mal avec les vh et tout le toutim...','2021-01-10 21:57:47',0,0,0,5,'bab','lard','images/wallhaven-g8xmdl.jpg1610283712252.jpg'),(14,'histoire de scroll','A venir...','2021-01-10 22:33:38',0,0,0,5,'bab','lard','images/wallhaven-g8xmdl.jpg1610283712252.jpg'),(15,'6 c\'est bien','Tout est dit','2021-01-10 22:33:57',0,0,0,5,'bab','lard','images/wallhaven-g8xmdl.jpg1610283712252.jpg'),(17,'Mon premier article','Je vais tout d&eacute;chirer­ƒÿâ','2021-01-11 12:39:14',0,1,1,12,'Yoann','Durassier','images/avatar-default.png'),(18,'essai pour la confirmation de validation','blablabla','2021-01-13 15:21:51',0,0,3,5,'bab','lard','images/wallhaven-g8xmdl.jpg1610283712252.jpg');
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
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (5,'bab','lard','bab@gmail.com','$2b$10$nXAqmO471m/uYEklwNtiZeQVy1tnQiOBTcxIBDFrx9OSTu9soYobi','images/wallhaven-g8xmdl.jpg1610283712252.jpg',0),(12,'Yoann','Durassier','dudu@gmail.com','$2b$10$uaJfADGypBfHdmbozqNWVuu/wNWTaemOJ8CkTZxJE.y360kkaQUnW','images/avatar-default.png',0);
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

-- Dump completed on 2021-01-28 10:19:17
