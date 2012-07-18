-- MySQL dump 10.13  Distrib 5.1.61, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: scrapbook_production
-- ------------------------------------------------------
-- Server version	5.1.61-0ubuntu0.10.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `reactions`
--

DROP TABLE IF EXISTS `reactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reactions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `scrap_id` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reactions`
--

LOCK TABLES `reactions` WRITE;
/*!40000 ALTER TABLE `reactions` DISABLE KEYS */;
INSERT INTO `reactions` VALUES (1,3,5,'2012-07-04 15:16:06','2012-07-04 15:16:06'),(2,3,12,'2012-07-04 16:11:52','2012-07-04 16:11:52'),(3,6,18,'2012-07-04 16:21:11','2012-07-04 16:21:11'),(4,6,10,'2012-07-04 16:21:44','2012-07-04 16:21:44'),(5,6,11,'2012-07-04 16:22:23','2012-07-04 16:22:23'),(6,8,18,'2012-07-04 17:00:33','2012-07-04 17:00:33'),(7,8,12,'2012-07-04 17:01:20','2012-07-04 17:01:20'),(11,9,25,'2012-07-05 14:43:45','2012-07-05 14:43:45'),(12,9,24,'2012-07-05 14:46:31','2012-07-05 14:46:31'),(14,9,18,'2012-07-05 14:52:02','2012-07-05 14:52:02'),(15,9,23,'2012-07-05 14:57:31','2012-07-05 14:57:31'),(16,9,1,'2012-07-05 15:01:08','2012-07-05 15:01:08'),(17,9,21,'2012-07-05 17:42:49','2012-07-05 17:42:49'),(18,9,20,'2012-07-05 17:44:36','2012-07-05 17:44:36'),(19,9,19,'2012-07-05 18:39:46','2012-07-05 18:39:46'),(20,9,17,'2012-07-05 18:40:13','2012-07-05 18:40:13'),(21,9,16,'2012-07-05 18:40:48','2012-07-05 18:40:48'),(22,9,15,'2012-07-05 18:41:41','2012-07-05 18:41:41'),(23,9,14,'2012-07-05 18:44:45','2012-07-05 18:44:45'),(24,9,13,'2012-07-05 18:45:09','2012-07-05 18:45:09'),(25,9,12,'2012-07-05 18:45:26','2012-07-05 18:45:26'),(26,9,11,'2012-07-05 18:45:56','2012-07-05 18:45:56'),(27,9,10,'2012-07-05 18:47:00','2012-07-05 18:47:00'),(28,9,9,'2012-07-05 18:47:22','2012-07-05 18:47:22'),(29,9,8,'2012-07-05 19:08:52','2012-07-05 19:08:52'),(30,9,7,'2012-07-05 19:10:02','2012-07-05 19:10:02'),(31,9,6,'2012-07-05 19:10:20','2012-07-05 19:10:20');
/*!40000 ALTER TABLE `reactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `scales`
--

DROP TABLE IF EXISTS `scales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `scales` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `max` int(11) DEFAULT NULL,
  `min` int(11) DEFAULT NULL,
  `max_label` varchar(255) DEFAULT NULL,
  `min_label` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `scales`
--

LOCK TABLES `scales` WRITE;
/*!40000 ALTER TABLE `scales` DISABLE KEYS */;
INSERT INTO `scales` VALUES (1,'affection',10,-10,'Like','Dislike','2012-07-04 15:15:48','2012-07-04 15:15:48'),(2,'usness',10,-10,'Us','Not us','2012-07-04 15:15:48','2012-07-04 15:15:48');
/*!40000 ALTER TABLE `scales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `schema_migrations`
--

DROP TABLE IF EXISTS `schema_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `schema_migrations` (
  `version` varchar(255) NOT NULL,
  UNIQUE KEY `unique_schema_migrations` (`version`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schema_migrations`
--

LOCK TABLES `schema_migrations` WRITE;
/*!40000 ALTER TABLE `schema_migrations` DISABLE KEYS */;
INSERT INTO `schema_migrations` VALUES ('20120630160029'),('20120630160613'),('20120630162159'),('20120702090641'),('20120702091012'),('20120702105316'),('20120702110808'),('20120702122351'),('20120702131659'),('20120703093801'),('20120703162138'),('20120704090357'),('20120705091956');
/*!40000 ALTER TABLE `schema_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `scores`
--

DROP TABLE IF EXISTS `scores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `scores` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `reaction_id` int(11) DEFAULT NULL,
  `scale_id` int(11) DEFAULT NULL,
  `value` float DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `scores`
--

LOCK TABLES `scores` WRITE;
/*!40000 ALTER TABLE `scores` DISABLE KEYS */;
INSERT INTO `scores` VALUES (1,1,1,8,'2012-07-04 15:16:06','2012-07-04 15:16:06'),(2,1,2,0,'2012-07-04 15:16:06','2012-07-04 15:16:06'),(3,2,1,8,'2012-07-04 16:11:52','2012-07-04 16:11:52'),(4,2,2,7,'2012-07-04 16:11:52','2012-07-04 16:11:52'),(5,3,1,10,'2012-07-04 16:21:11','2012-07-04 16:21:11'),(6,3,2,5,'2012-07-04 16:21:11','2012-07-04 16:21:11'),(7,4,1,10,'2012-07-04 16:21:44','2012-07-04 16:21:44'),(8,4,2,10,'2012-07-04 16:21:44','2012-07-04 16:21:44'),(9,5,1,10,'2012-07-04 16:22:23','2012-07-04 16:22:23'),(10,5,2,10,'2012-07-04 16:22:23','2012-07-04 16:22:23'),(11,6,1,10.125,'2012-07-04 17:00:33','2012-07-04 17:00:33'),(12,6,2,10.125,'2012-07-04 17:00:33','2012-07-04 17:00:33'),(13,7,1,5.1875,'2012-07-04 17:01:20','2012-07-04 17:01:20'),(14,7,2,4,'2012-07-04 17:01:20','2012-07-04 17:01:20'),(21,11,1,3.3125,'2012-07-05 14:43:45','2012-07-05 14:43:45'),(22,11,2,-7.625,'2012-07-05 14:43:45','2012-07-05 14:43:45'),(23,12,1,8.75,'2012-07-05 14:46:31','2012-07-05 14:46:31'),(24,12,2,8.75,'2012-07-05 14:46:31','2012-07-05 14:46:31'),(27,14,1,8.8125,'2012-07-05 14:52:02','2012-07-05 14:52:02'),(28,14,2,8.625,'2012-07-05 14:52:02','2012-07-05 14:52:02'),(29,15,1,9.625,'2012-07-05 14:57:31','2012-07-05 14:57:31'),(30,15,2,7.5,'2012-07-05 14:57:31','2012-07-05 14:57:31'),(31,16,1,9.75,'2012-07-05 15:01:08','2012-07-05 15:01:08'),(32,16,2,6.5,'2012-07-05 15:01:08','2012-07-05 15:01:08'),(33,17,1,9.25,'2012-07-05 17:42:49','2012-07-05 17:42:49'),(34,17,2,1.5,'2012-07-05 17:42:49','2012-07-05 17:42:49'),(35,18,1,2.8125,'2012-07-05 17:44:36','2012-07-05 17:44:36'),(36,18,2,-7.8125,'2012-07-05 17:44:36','2012-07-05 17:44:36'),(37,19,1,10,'2012-07-05 18:39:46','2012-07-05 18:39:46'),(38,19,2,10,'2012-07-05 18:39:46','2012-07-05 18:39:46'),(39,20,1,9.875,'2012-07-05 18:40:13','2012-07-05 18:40:13'),(40,20,2,10,'2012-07-05 18:40:13','2012-07-05 18:40:13'),(41,21,1,9.625,'2012-07-05 18:40:48','2012-07-05 18:40:48'),(42,21,2,10,'2012-07-05 18:40:48','2012-07-05 18:40:48'),(43,22,1,7.3125,'2012-07-05 18:41:41','2012-07-05 18:41:41'),(44,22,2,7.4375,'2012-07-05 18:41:41','2012-07-05 18:41:41'),(45,23,1,8.1875,'2012-07-05 18:44:45','2012-07-05 18:44:45'),(46,23,2,9.6875,'2012-07-05 18:44:45','2012-07-05 18:44:45'),(47,24,1,10,'2012-07-05 18:45:09','2012-07-05 18:45:09'),(48,24,2,8.125,'2012-07-05 18:45:09','2012-07-05 18:45:09'),(49,25,1,9.9375,'2012-07-05 18:45:26','2012-07-05 18:45:26'),(50,25,2,10,'2012-07-05 18:45:26','2012-07-05 18:45:26'),(51,26,1,10,'2012-07-05 18:45:56','2012-07-05 18:45:56'),(52,26,2,10,'2012-07-05 18:45:56','2012-07-05 18:45:56'),(53,27,1,10,'2012-07-05 18:47:00','2012-07-05 18:47:00'),(54,27,2,10,'2012-07-05 18:47:00','2012-07-05 18:47:00'),(55,28,1,9.9375,'2012-07-05 18:47:22','2012-07-05 18:47:22'),(56,28,2,7.4375,'2012-07-05 18:47:22','2012-07-05 18:47:22'),(57,29,1,6.5,'2012-07-05 19:08:52','2012-07-05 19:08:52'),(58,29,2,6.3125,'2012-07-05 19:08:52','2012-07-05 19:08:52'),(59,30,1,7.4375,'2012-07-05 19:10:02','2012-07-05 19:10:02'),(60,30,2,10,'2012-07-05 19:10:02','2012-07-05 19:10:02'),(61,31,1,9.8125,'2012-07-05 19:10:20','2012-07-05 19:10:20'),(62,31,2,10,'2012-07-05 19:10:20','2012-07-05 19:10:20');
/*!40000 ALTER TABLE `scores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `scraps`
--

DROP TABLE IF EXISTS `scraps`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `scraps` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `youtube_id` varchar(255) DEFAULT NULL,
  `body` text,
  `image_file_name` varchar(255) DEFAULT NULL,
  `image_content_type` varchar(255) DEFAULT NULL,
  `image_file_size` int(11) DEFAULT NULL,
  `image_updated_at` datetime DEFAULT NULL,
  `image_upload_id` int(11) DEFAULT NULL,
  `image_scale_width` int(11) DEFAULT NULL,
  `image_scale_height` int(11) DEFAULT NULL,
  `image_offset_left` int(11) DEFAULT NULL,
  `image_offset_top` int(11) DEFAULT NULL,
  `image_version` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `updated_by_id` int(11) DEFAULT NULL,
  `description` text,
  `combined_text` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `scraps`
--

LOCK TABLES `scraps` WRITE;
/*!40000 ALTER TABLE `scraps` DISABLE KEYS */;
INSERT INTO `scraps` VALUES (1,'Fuck the context',NULL,'','20081031-188_fuck_the__opt.jpeg','image/jpeg',384334,'2012-07-04 13:41:39',1,1150,1536,-131,-71,NULL,'2012-07-04 16:15:05','2012-07-04 16:15:07',3,NULL,'','fuck context 20081031 188_fuck_the__opt jpeg'),(2,'Boutique',NULL,'Boutique.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2012-07-04 13:42:38','2012-07-04 13:42:38',3,NULL,'',NULL),(3,'Ex Divina',NULL,'','Ex_divina_opt.jpeg','image/jpeg',231977,'2012-07-04 13:46:36',2,1028,723,-98,-42,NULL,'2012-07-04 13:46:37','2012-07-04 13:46:37',3,NULL,'',NULL),(4,'Mirror image',NULL,'','1606.png','image/png',472171,'2012-07-04 15:13:11',3,960,727,0,0,NULL,'2012-07-04 15:13:13','2012-07-04 15:30:03',3,NULL,'Mirrors what is (“It is what it is”), even if ripples go through the mirror, the original still remains the same (important in change processes and times of insecurity during transitions), ripples will go away after some time, it will need time however... looking at things upside down (from different angle), the beauty and treasure of nature (water) never lies.','mirror image 1606 png'),(5,'Let\'s talk about exploring',NULL,'','Slide1_opt.jpeg','image/jpeg',105301,'2012-07-04 15:13:56',4,960,723,210,157,NULL,'2012-07-04 15:13:57','2012-07-04 15:13:57',NULL,NULL,'','talk exploring slide1_opt jpeg'),(6,'Formation',NULL,'','birds.jpg','image/jpeg',27213,'2012-07-04 15:26:47',5,960,1143,0,-317,NULL,'2012-07-04 15:26:48','2012-07-04 16:34:45',3,NULL,'For me this represents clarity, simplicity, alignment, freshness.','formation birds jpg'),(7,'Owl',NULL,'','wol.jpg','image/jpeg',71710,'2012-07-04 15:29:38',6,900,692,30,14,NULL,'2012-07-04 15:29:39','2012-07-04 15:29:39',3,NULL,'Smooth, silent, discreet, wise, good capability to see in the dark, good in adapting to the environment, versatile flyer, slightly mystic, nevertheless well respected.','owl wol jpg'),(8,'Made you look',NULL,'','20090502-IMG_1679_opt.jpeg','image/jpeg',411300,'2012-07-04 15:32:10',8,1041,781,-120,-90,NULL,'2012-07-04 15:31:09','2012-07-04 15:32:13',3,NULL,'','made look 20090502 img_1679_opt jpeg'),(9,'Changes',NULL,'','changes.jpg','image/jpeg',79952,'2012-07-04 15:35:23',9,1070,846,-86,-85,NULL,'2012-07-04 15:35:24','2012-07-04 15:35:24',3,NULL,'or exits, possibly.','changes changes jpg'),(10,'No tools used',NULL,'No tools used; we are the tool.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2012-07-04 15:36:43','2012-07-04 15:36:43',3,NULL,'','tools used tools used tool'),(11,'intertwining',NULL,'Stop working with individuals only, start intertwining organizational and individual (personal) development.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2012-07-04 15:37:22','2012-07-04 15:37:22',3,NULL,'','intertwining stop working individuals only start intertwining organizational individual personal development'),(12,'integrity and trust',NULL,'High integrity, high trust.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2012-07-04 15:37:43','2012-07-04 16:12:24',3,NULL,'','integrity trust high integrity high trust'),(13,'',NULL,'We need institutions that work – that are led effectively – because leadership is harder than ever.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2012-07-04 15:38:15','2012-07-04 15:38:15',3,NULL,'',' need institutions work led effectively leadership harder ever'),(14,'disciplines',NULL,'By bringing together a wide range of disciplines – from organisational economics to psychoanalysis to event management – we can learn something new about institutions and how to make them work.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2012-07-04 15:38:42','2012-07-04 15:38:42',3,NULL,'','disciplines bringing together wide range disciplines organisational economics to psychoanalysis to event management can learn something new institutions to make work'),(15,'',NULL,'For us, developing the leadership potential in an organization and supporting transformation are two sides of the same coin.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2012-07-04 15:39:23','2012-07-04 15:39:23',3,NULL,'',' us developing leadership potential an organization supporting transformation two sides coin'),(16,'',NULL,'We always try to pinpoint the real challenge – working with us should be deeply rewarding, but not necessarily “fun” at all times.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2012-07-04 15:39:42','2012-07-04 15:39:42',3,NULL,'',' always try to pinpoint real challenge working us deeply rewarding but necessarily fun times'),(17,'',NULL,'Technology is never the answer, simply another series of questions.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2012-07-04 15:40:13','2012-07-04 15:40:13',3,NULL,'',' technology never answer simply another series questions'),(18,'',NULL,'To make change happen in organizations you have to change the rules of the game(s) the organization is playing and help the people within the organization to live up to the new rules.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2012-07-04 15:40:34','2012-07-04 15:40:34',3,NULL,'',' to make change happen organizations to change rules game s organization playing help people within organization to live to new rules'),(19,'',NULL,'By identifying adaptive challenges and framing key issues, by providing tailored interventions, we intend to help organizations to pass meaningful thresholds in collective performance and learning.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2012-07-04 15:41:39','2012-07-04 15:41:39',3,NULL,'',' identifying adaptive challenges framing key issues providing tailored interventions intend to help organizations to pass meaningful thresholds collective performance learning'),(20,'beefeating',NULL,'','beefeaters.jpg','image/jpeg',263768,'2012-07-04 15:46:03',14,1301,976,-341,-175,NULL,'2012-07-04 15:42:24','2012-07-04 15:46:04',3,NULL,'One royal bodyguard impedes another.','beefeating beefeaters jpg'),(21,'',NULL,'In this complex, competitive and volatile environment- it is very difficult for leaders of corporations to sustain high functioning organizations. To do so, they often resort to strategy consulting firms, HR consulting firms, headhunters or executive coaches. Despite their technical know-how and skills, these service firms have intrinsic limitations (e.g. economic model) to fully address these types of challenges.',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2012-07-04 15:45:53','2012-07-04 15:45:53',3,NULL,'',' complex competitive volatile environment difficult leaders corporations to sustain high functioning organizations to so often resort to strategy consulting firms hr consulting firms headhunters or executive coaches despite technical know skills service f'),(23,'',NULL,'Perspectives:\r\n\' We don\'t see things as they are, we see them as we are. \' ',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2012-07-04 18:55:13','2012-07-04 19:11:10',13,NULL,'',' perspectives \' see things are see are \''),(24,'',NULL,'\' Develop the mind of equilibrium. You will always be getting praise and blame, but do not let either affect the poise of the mind: follow the calmness, the absence of pride. \'\r\n~ The Buddha\r\n',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2012-07-04 18:58:16','2012-07-04 19:11:17',13,NULL,'',' \' develop mind equilibrium will always getting praise blame but let either affect poise mind follow calmness absence pride \' buddha'),(25,'working within the system',NULL,'','Let\'s-talk-about-exploring_2012_2.jpg','image/jpeg',290713,'2012-07-05 07:23:59',15,1063,809,-43,-89,NULL,'2012-07-04 19:07:19','2012-07-05 07:24:00',8,NULL,'','working within system let\'s talk about exploring_2012_2 jpg');
/*!40000 ALTER TABLE `scraps` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `taggings`
--

DROP TABLE IF EXISTS `taggings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `taggings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tag_id` int(11) DEFAULT NULL,
  `scrap_id` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `taggings`
--

LOCK TABLES `taggings` WRITE;
/*!40000 ALTER TABLE `taggings` DISABLE KEYS */;
/*!40000 ALTER TABLE `taggings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tags`
--

DROP TABLE IF EXISTS `tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tags` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tags`
--

LOCK TABLES `tags` WRITE;
/*!40000 ALTER TABLE `tags` DISABLE KEYS */;
/*!40000 ALTER TABLE `tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `uploads`
--

DROP TABLE IF EXISTS `uploads`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `uploads` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `file_file_name` varchar(255) DEFAULT NULL,
  `file_content_type` varchar(255) DEFAULT NULL,
  `file_file_size` int(11) DEFAULT NULL,
  `file_updated_at` datetime DEFAULT NULL,
  `original_extension` varchar(255) DEFAULT NULL,
  `original_width` int(11) DEFAULT NULL,
  `original_height` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `uploads`
--

LOCK TABLES `uploads` WRITE;
/*!40000 ALTER TABLE `uploads` DISABLE KEYS */;
INSERT INTO `uploads` VALUES (1,'20081031-188_fuck_the__opt.jpeg','image/jpeg',384334,'2012-07-04 13:41:14','.jpeg',1215,1620,'2012-07-04 13:41:16','2012-07-04 13:41:16'),(2,'Ex_divina_opt.jpeg','image/jpeg',231977,'2012-07-04 13:46:01','.jpeg',1028,702,'2012-07-04 13:46:02','2012-07-04 13:46:02'),(3,'1606.png','image/png',472171,'2012-07-04 15:12:40','.png',507,381,'2012-07-04 15:12:41','2012-07-04 15:12:41'),(4,'Slide1_opt.jpeg','image/jpeg',105301,'2012-07-04 15:13:44','.jpeg',720,540,'2012-07-04 15:13:44','2012-07-04 15:13:44'),(5,'birds.jpg','image/jpeg',27213,'2012-07-04 15:26:27','.jpg',756,901,'2012-07-04 15:26:27','2012-07-04 15:26:27'),(6,'wol.jpg','image/jpeg',71710,'2012-07-04 15:29:10','.jpg',1200,923,'2012-07-04 15:29:11','2012-07-04 15:29:11'),(7,'20090502-IMG_1679_opt.jpeg','image/jpeg',411300,'2012-07-04 15:30:51','.jpeg',1920,1440,'2012-07-04 15:30:53','2012-07-04 15:30:53'),(8,'20090502-IMG_1679_opt.jpeg','image/jpeg',411300,'2012-07-04 15:31:53','.jpeg',1920,1440,'2012-07-04 15:31:55','2012-07-04 15:31:55'),(9,'changes.jpg','image/jpeg',79952,'2012-07-04 15:34:54','.jpg',1200,950,'2012-07-04 15:34:55','2012-07-04 15:34:55'),(10,'photo_opt.jpeg','image/jpeg',182774,'2012-07-04 15:42:15','.jpeg',640,480,'2012-07-04 15:42:17','2012-07-04 15:42:17'),(11,'beefeaters.jpg','image/jpeg',263768,'2012-07-04 15:43:08','.jpg',1200,900,'2012-07-04 15:43:09','2012-07-04 15:43:09'),(12,'beefeaters.jpg','image/jpeg',263768,'2012-07-04 15:44:03','.jpg',1200,900,'2012-07-04 15:44:05','2012-07-04 15:44:05'),(13,'beefeaters.jpg','image/jpeg',263768,'2012-07-04 15:45:03','.jpg',1200,900,'2012-07-04 15:45:04','2012-07-04 15:45:04'),(14,'beefeaters.jpg','image/jpeg',263768,'2012-07-04 15:45:40','.jpg',1200,900,'2012-07-04 15:45:41','2012-07-04 15:45:41'),(15,'Let\'s-talk-about-exploring_2012_2.jpg','image/jpeg',290713,'2012-07-05 07:23:42','.jpg',1328,1010,'2012-07-05 07:23:44','2012-07-05 07:23:44');
/*!40000 ALTER TABLE `uploads` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `forename` varchar(255) DEFAULT NULL,
  `surname` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL DEFAULT '',
  `encrypted_password` varchar(255) NOT NULL DEFAULT '',
  `reset_password_token` varchar(255) DEFAULT NULL,
  `reset_password_sent_at` datetime DEFAULT NULL,
  `remember_created_at` datetime DEFAULT NULL,
  `sign_in_count` int(11) DEFAULT '0',
  `current_sign_in_at` datetime DEFAULT NULL,
  `last_sign_in_at` datetime DEFAULT NULL,
  `current_sign_in_ip` varchar(255) DEFAULT NULL,
  `last_sign_in_ip` varchar(255) DEFAULT NULL,
  `confirmation_token` varchar(255) DEFAULT NULL,
  `confirmed_at` datetime DEFAULT NULL,
  `confirmation_sent_at` datetime DEFAULT NULL,
  `unconfirmed_email` varchar(255) DEFAULT NULL,
  `authentication_token` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `activated` tinyint(1) DEFAULT NULL,
  `admin` tinyint(1) DEFAULT NULL,
  `observer` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `index_users_on_email` (`email`),
  UNIQUE KEY `index_users_on_reset_password_token` (`reset_password_token`),
  UNIQUE KEY `index_users_on_confirmation_token` (`confirmation_token`),
  UNIQUE KEY `index_users_on_authentication_token` (`authentication_token`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (3,'Will','Ross','will@spanner.org','$2a$10$jqywdCHyTwASUGEHpwXGdOHqbkXiOYBfaWfn4NXOVMR4M/YVdejeK',NULL,NULL,'2012-07-05 15:31:08',7,'2012-07-06 14:19:45','2012-07-05 15:31:08','217.43.242.245','217.43.242.245',NULL,NULL,NULL,NULL,'ibfqkJsxPHWTFYtpiJgE','2012-07-04 13:19:54','2012-07-06 14:19:45',1,1,1),(4,'Mike','McIver','mike@spanner.org','',NULL,NULL,NULL,4,'2012-07-04 14:30:43','2012-07-04 14:29:22','217.43.242.245','217.43.242.245',NULL,NULL,NULL,NULL,'b9QxisT9bbp6xVsFRpFj','2012-07-04 13:47:21','2012-07-04 14:30:43',1,1,NULL),(5,'Dennis','Bloodnok','bloodnok@spanner.org','$2a$10$33nj4wMu04zZuMWP6fEVl.qpBlOAKTZPULm43WrBMaSiU6RcxX8EO',NULL,NULL,NULL,2,'2012-07-04 14:58:20','2012-07-04 14:57:50','217.43.242.245','217.43.242.245',NULL,NULL,NULL,NULL,'riJGppdcozqziW16k8Wo','2012-07-04 14:55:41','2012-07-04 14:58:20',1,NULL,NULL),(6,'Jonathan','Day','jonathan.day@gmail.com','$2a$10$YSsDvhSYrT7ieLkPYm075uTx9poFLO5mYi8ROe4ZhKoJEpU8crKwe',NULL,NULL,NULL,2,'2012-07-04 16:20:17','2012-07-04 16:19:09','87.127.45.236','87.127.45.236',NULL,NULL,NULL,NULL,'b8tq9XrJpDXZXkAhcZKT','2012-07-04 15:16:46','2012-07-04 16:25:27',1,NULL,NULL),(7,'Matthias','Beck','matthias.beck@kronos-network.com','',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'DHSj5BmFKobsT919bS86','2012-07-04 15:17:08','2012-07-04 15:17:08',NULL,NULL,NULL),(8,'Christiane','Zerfass','christiane.zerfass@kronos-network.com','$2a$10$3vSqMkwYYIUtxaBmtV2jkeA7oCdIExfPoKVNLmbxrNUO3IBwwgJJu',NULL,NULL,'2012-07-04 16:58:41',9,'2012-07-05 08:18:32','2012-07-05 08:14:06','93.233.117.61','93.233.117.61',NULL,NULL,NULL,NULL,'Ck6y5szWKdGs2eN7SxyQ','2012-07-04 15:17:25','2012-07-05 08:18:32',1,NULL,NULL),(9,'Andreas','Oertli','andreas@andreasoertli.com','$2a$10$l95ZjK2AOpmXSH239C9ne..dpifWi3xKsVo2EiwWb1UNBgCdCyZH.',NULL,NULL,'2012-07-05 06:03:45',3,'2012-07-06 05:05:28','2012-07-05 06:03:45','178.195.64.61','178.195.64.61',NULL,NULL,NULL,NULL,'8xvygdeQGwGPfyTUzrk6','2012-07-04 15:17:40','2012-07-06 05:05:28',1,NULL,NULL),(10,'Dominic','Reid','dominic@reidandreid.com','',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'9Y9NZJ1k9xGXAH6AiMZi','2012-07-04 15:17:54','2012-07-04 15:17:54',NULL,NULL,NULL),(11,'Laura','Watkins','laura@cognitasgroup.com','',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'aqa1s5Xf314AhD7dPLiY','2012-07-04 15:18:04','2012-07-04 15:18:04',NULL,NULL,NULL),(12,'Ludovic','Bertrand','ludovic_bertrand@yahoo.fr','',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'MFQHty2A9tu9Ls2zr9jp','2012-07-04 15:18:16','2012-07-04 15:18:16',NULL,NULL,NULL),(13,'Shani','Ospina','shani@cognitasgroup.com','$2a$10$DmKurwcrG7I28U.bG8tSnes3QyjT9EMUMwjxfqzlqHjszZ0wEFlju',NULL,NULL,'2012-07-04 18:49:53',2,'2012-07-04 18:49:53','2012-07-04 18:49:14','84.114.134.109','84.114.134.109',NULL,NULL,NULL,NULL,'LDDz5aX1b4e1mV2owzgc','2012-07-04 15:18:31','2012-07-04 18:49:53',1,NULL,NULL);
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

-- Dump completed on 2012-07-06 14:51:13
