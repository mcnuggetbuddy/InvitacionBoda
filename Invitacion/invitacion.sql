-- =====================================
-- 1) CREAR USUARIO
-- =====================================
DROP USER IF EXISTS 'admin'@'localhost';
CREATE USER 'admin'@'localhost'
IDENTIFIED BY '123456';

-- =====================================
-- 2) CREAR BASE DE DATOS
-- =====================================
DROP DATABASE IF EXISTS invitacion;

CREATE DATABASE invitacion
DEFAULT CHARACTER SET utf8mb4
DEFAULT COLLATE utf8mb4_unicode_ci;

GRANT ALL PRIVILEGES ON invitacion.*
TO 'admin'@'localhost';

FLUSH PRIVILEGES;

USE invitacion;