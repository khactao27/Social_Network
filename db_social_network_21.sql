-- MySQL dump 10.13  Distrib 8.0.23, for macos10.15 (x86_64)
--
-- Host: localhost    Database: db_social_network_21
-- ------------------------------------------------------
-- Server version	8.0.23

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
-- Table structure for table `Comment`
--

DROP TABLE IF EXISTS `Comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Comment` (
  `comment_id` varchar(100) NOT NULL,
  `post_id` varchar(100) NOT NULL,
  `user_id` varchar(50) NOT NULL,
  `content` varchar(250) NOT NULL,
  `timestamp` timestamp NOT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `fk_comment_user` (`user_id`),
  KEY `fk_comment_post` (`post_id`),
  CONSTRAINT `fk_comment_post` FOREIGN KEY (`post_id`) REFERENCES `Post` (`post_id`),
  CONSTRAINT `fk_comment_user` FOREIGN KEY (`user_id`) REFERENCES `User` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Comment`
--

LOCK TABLES `Comment` WRITE;
/*!40000 ALTER TABLE `Comment` DISABLE KEYS */;
INSERT INTO `Comment` VALUES ('c1','p1','taodk','good','2021-04-08 13:22:16'),('c2','p2','sonmt','great','2021-04-08 14:22:22'),('c3','p3','user1','awesome','2021-04-08 15:56:23'),('c4','p4','sonth','excellent','2021-04-08 15:59:23'),('c5','p5','tantd','oh my god','2021-04-08 12:11:20'),('c6','p6','sonth','so funny','2021-04-08 13:57:23'),('c7','p7','taodk','wow','2021-04-08 15:55:23');
/*!40000 ALTER TABLE `Comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Follow`
--

DROP TABLE IF EXISTS `Follow`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Follow` (
  `follower_id` varchar(50) NOT NULL,
  `following_id` varchar(50) NOT NULL,
  PRIMARY KEY (`follower_id`,`following_id`),
  KEY `fk_following_user_2` (`following_id`),
  CONSTRAINT `fk_following_user_1` FOREIGN KEY (`follower_id`) REFERENCES `User` (`user_id`),
  CONSTRAINT `fk_following_user_2` FOREIGN KEY (`following_id`) REFERENCES `User` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Follow`
--

LOCK TABLES `Follow` WRITE;
/*!40000 ALTER TABLE `Follow` DISABLE KEYS */;
INSERT INTO `Follow` VALUES ('sonth','sonmt'),('taodk','sonmt'),('user1','sonmt'),('sonmt','sonth'),('tantd','sonth'),('taodk','sonth'),('sonmt','tantd'),('sonth','tantd'),('sonmt','taodk'),('user1','taodk'),('tantd','user1');
/*!40000 ALTER TABLE `Follow` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Love`
--

DROP TABLE IF EXISTS `Love`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Love` (
  `user_id` varchar(50) NOT NULL,
  `post_id` varchar(100) NOT NULL,
  PRIMARY KEY (`user_id`,`post_id`),
  KEY `fk_love_post` (`post_id`),
  CONSTRAINT `fk_love_post` FOREIGN KEY (`post_id`) REFERENCES `Post` (`post_id`),
  CONSTRAINT `fk_love_user` FOREIGN KEY (`user_id`) REFERENCES `User` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Love`
--

LOCK TABLES `Love` WRITE;
/*!40000 ALTER TABLE `Love` DISABLE KEYS */;
INSERT INTO `Love` VALUES ('sonmt','p1'),('tantd','p2'),('sonth','p3'),('user1','p4'),('taodk','p5'),('sonmt','p6'),('tantd','p7');
/*!40000 ALTER TABLE `Love` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Post`
--

DROP TABLE IF EXISTS `Post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Post` (
  `post_id` varchar(100) NOT NULL,
  `user_id` varchar(50) NOT NULL,
  `caption` varchar(100) DEFAULT NULL,
  `img_url` varchar(200) DEFAULT NULL,
  `number_of_loves` int NOT NULL,
  `number_of_comments` int NOT NULL,
  `timestamp` timestamp NOT NULL,
  PRIMARY KEY (`post_id`),
  KEY `fk_post_user` (`user_id`),
  CONSTRAINT `fk_post_user` FOREIGN KEY (`user_id`) REFERENCES `User` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Post`
--

LOCK TABLES `Post` WRITE;
/*!40000 ALTER TABLE `Post` DISABLE KEYS */;
INSERT INTO `Post` VALUES ('p1','sonmt','hello',NULL,1,1,'2021-04-08 13:12:16'),('p2','sonth','world',NULL,1,1,'2021-04-08 14:12:22'),('p3','taodk','hello world',NULL,1,1,'2021-04-08 15:54:23'),('p4','tantd','python',NULL,1,1,'2021-04-08 15:54:23'),('p5','user1','java',NULL,1,1,'2021-04-08 12:01:20'),('p6','sonmt','web',NULL,1,1,'2021-04-08 13:54:23'),('p7','sonth','servlet',NULL,1,1,'2021-04-08 15:54:23');
/*!40000 ALTER TABLE `Post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User` (
  `user_id` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `personal_info` varchar(200) DEFAULT NULL,
  `followers` int NOT NULL,
  `authority` char(10) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES ('sonmt','123456',NULL,3,'admin'),('sonth','123456',NULL,3,'admin'),('tantd','123456',NULL,2,'admin'),('taodk','123456',NULL,2,'admin'),('user1','123456',NULL,1,'user');
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-04-09  0:52:41
