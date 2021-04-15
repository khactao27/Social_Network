-- MySQL dump 10.13  Distrib 8.0.23, for macos10.15 (x86_64)
--
-- Host: localhost    Database: db_sn_21
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
-- Table structure for table `Class`
--

DROP TABLE IF EXISTS `Class`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Class` (
  `class_id` varchar(45) NOT NULL,
  `class_name` varchar(45) NOT NULL,
  `school_id` varchar(45) NOT NULL,
  PRIMARY KEY (`class_id`),
  KEY `fk_class_school_idx` (`school_id`),
  CONSTRAINT `fk_class_school` FOREIGN KEY (`school_id`) REFERENCES `School` (`school_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Class`
--

LOCK TABLES `Class` WRITE;
/*!40000 ALTER TABLE `Class` DISABLE KEYS */;
INSERT INTO `Class` VALUES ('IT1-04 K63','Khoa học máy tính 04 K63','soict'),('IT2-01 K63','Kỹ thuật máy tính 01 - K63','soict'),('MI1-02 K63','Toán-Tin 02 - K63','sami'),('PH1-01 K63','Vật lý kĩ thuật 01 - K63','sep');
/*!40000 ALTER TABLE `Class` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Comment`
--

DROP TABLE IF EXISTS `Comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Comment` (
  `comment_id` varchar(45) NOT NULL,
  `user_id` varchar(45) NOT NULL,
  `post_id` varchar(45) NOT NULL,
  `content` varchar(45) NOT NULL,
  `timestamp` datetime NOT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `fk_comment_user_idx` (`user_id`),
  KEY `fk_comment_post_idx` (`post_id`),
  CONSTRAINT `fk_comment_post` FOREIGN KEY (`post_id`) REFERENCES `Post` (`post_id`),
  CONSTRAINT `fk_comment_user` FOREIGN KEY (`user_id`) REFERENCES `User` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Comment`
--

LOCK TABLES `Comment` WRITE;
/*!40000 ALTER TABLE `Comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `Comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Follow`
--

DROP TABLE IF EXISTS `Follow`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Follow` (
  `following_id` varchar(45) NOT NULL,
  `follower_id` varchar(45) NOT NULL,
  PRIMARY KEY (`following_id`,`follower_id`),
  KEY `fk_follower_user_idx` (`follower_id`),
  CONSTRAINT `fk_follower_user` FOREIGN KEY (`follower_id`) REFERENCES `User` (`user_id`),
  CONSTRAINT `fk_following_user` FOREIGN KEY (`following_id`) REFERENCES `User` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Follow`
--

LOCK TABLES `Follow` WRITE;
/*!40000 ALTER TABLE `Follow` DISABLE KEYS */;
INSERT INTO `Follow` VALUES ('michealc','ant'),('sonth','ant'),('tantd','ant'),('sonth','michealc'),('xhv','michealc'),('michealc','sonmt'),('taodk','sonmt'),('sonmt','sonth'),('taodk','sonth'),('xhv','sonth'),('michealc','tantd'),('sonth','tantd'),('ant','taodk'),('sonmt','taodk'),('tantd','taodk'),('ant','xhv'),('sonmt','xhv'),('taodk','xhv');
/*!40000 ALTER TABLE `Follow` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Loves`
--

DROP TABLE IF EXISTS `Loves`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Loves` (
  `post_id` varchar(45) NOT NULL,
  `user_id` varchar(45) NOT NULL,
  PRIMARY KEY (`post_id`,`user_id`),
  KEY `fk_love_user_idx` (`user_id`),
  CONSTRAINT `fk_love_post` FOREIGN KEY (`post_id`) REFERENCES `Post` (`post_id`),
  CONSTRAINT `fk_love_user` FOREIGN KEY (`user_id`) REFERENCES `User` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Loves`
--

LOCK TABLES `Loves` WRITE;
/*!40000 ALTER TABLE `Loves` DISABLE KEYS */;
/*!40000 ALTER TABLE `Loves` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Post`
--

DROP TABLE IF EXISTS `Post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Post` (
  `post_id` varchar(45) NOT NULL,
  `user_id` varchar(45) NOT NULL,
  `caption` varchar(300) DEFAULT NULL,
  `timestamp` datetime NOT NULL,
  `img_url` varchar(45) NOT NULL,
  `num_of_loves` int unsigned NOT NULL,
  `num_of_comments` int unsigned NOT NULL,
  PRIMARY KEY (`post_id`),
  KEY `fk_post_user_idx` (`user_id`),
  CONSTRAINT `fk_post_user` FOREIGN KEY (`user_id`) REFERENCES `User` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Post`
--

LOCK TABLES `Post` WRITE;
/*!40000 ALTER TABLE `Post` DISABLE KEYS */;
/*!40000 ALTER TABLE `Post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `School`
--

DROP TABLE IF EXISTS `School`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `School` (
  `school_id` varchar(45) NOT NULL,
  `school_name` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`school_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `School`
--

LOCK TABLES `School` WRITE;
/*!40000 ALTER TABLE `School` DISABLE KEYS */;
INSERT INTO `School` VALUES ('sami','Toan Tin'),('sep','VLKT'),('soict','CNTT&TT');
/*!40000 ALTER TABLE `School` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User` (
  `user_id` varchar(45) NOT NULL,
  `firstname` varchar(45) DEFAULT NULL,
  `lastname` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `password` varchar(45) NOT NULL,
  `class_id` varchar(45) NOT NULL,
  `gender` bit(1) NOT NULL,
  `birthday` datetime DEFAULT NULL,
  `hometown` varchar(45) DEFAULT NULL,
  `followers` int NOT NULL,
  `authority` varchar(10) NOT NULL,
  PRIMARY KEY (`user_id`),
  KEY `fk_user_class_idx` (`class_id`),
  CONSTRAINT `fk_user_class` FOREIGN KEY (`class_id`) REFERENCES `Class` (`class_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES ('ant','A','Nguyen Thi',NULL,'123456','MI1-02 K63',_binary '\0','1999-02-04 00:00:00','Nam Dinh',2,'user'),('michealc','Micheal','Carrick',NULL,'123456','MI1-02 K63',_binary '','2000-08-27 00:00:00','England',3,'user'),('sonmt','Son','Mai Truong',NULL,'123456','IT1-04 K63',_binary '','2000-07-10 00:00:00','Hai Phong',3,'admin'),('sonth','Son','To Hoai',NULL,'123456','IT2-01 K63',_binary '','2000-08-01 00:00:00','Ha Noi',3,'admin'),('tantd','Tan','Truong Duy',NULL,'123456','PH1-01 K63',_binary '','1999-01-01 00:00:00','Bac Giang',2,'admin'),('taodk','Tao','Duong Khac',NULL,'123456','IT2-01 K63',_binary '','2000-01-01 00:00:00','Bac Giang',3,'admin'),('xhv','X','Hoang Van',NULL,'123456','IT2-01 K63',_binary '','2000-01-03 00:00:00','Ha Noi',2,'user');
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

-- Dump completed on 2021-04-15 21:33:49
