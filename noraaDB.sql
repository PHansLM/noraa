/*
 Navicat Premium Data Transfer

 Source Server         : DB2
 Source Server Type    : PostgreSQL
 Source Server Version : 120017 (120017)
 Source Host           : localhost:5432
 Source Catalog        : postgres
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 120017 (120017)
 File Encoding         : 65001

 Date: 28/03/2024 22:03:32
*/



-- ----------------------------
-- Sequence structure for Menu_id_menu_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."Menu_id_menu_seq";
CREATE SEQUENCE "public"."Menu_id_menu_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for platillo_id_platillo_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."platillo_id_platillo_seq";
CREATE SEQUENCE "public"."platillo_id_platillo_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for registro_avistamiento_id_avistamiento_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."registro_avistamiento_id_avistamiento_seq";
CREATE SEQUENCE "public"."registro_avistamiento_id_avistamiento_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for resena_restaurante_id_resena_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."resena_restaurante_id_resena_seq";
CREATE SEQUENCE "public"."resena_restaurante_id_resena_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for restaurante_id_restaurante_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."restaurante_id_restaurante_seq";
CREATE SEQUENCE "public"."restaurante_id_restaurante_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for usuario_id_usuario_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."usuario_id_usuario_seq";
CREATE SEQUENCE "public"."usuario_id_usuario_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Table structure for Menu
-- ----------------------------
DROP TABLE IF EXISTS "public"."Menu";
CREATE TABLE "public"."Menu" (
  "id_menu" int4 NOT NULL DEFAULT nextval('"Menu_id_menu_seq"'::regclass),
  "nombre_menu" varchar(100) COLLATE "pg_catalog"."default" NOT NULL,
  "vigente" bool NOT NULL,
  "id_restaurante_fk" int4 NOT NULL
)
;

-- ----------------------------
-- Table structure for etiqueta
-- ----------------------------
DROP TABLE IF EXISTS "public"."etiqueta";
CREATE TABLE "public"."etiqueta" (
  "id_etiqueta" int4 NOT NULL,
  "etiqueta_nombre" varchar(30) COLLATE "pg_catalog"."default" NOT NULL
)
;

-- ----------------------------
-- Table structure for etiqueta_restaurante
-- ----------------------------
DROP TABLE IF EXISTS "public"."etiqueta_restaurante";
CREATE TABLE "public"."etiqueta_restaurante" (
  "id_restaurante_etiquetado" int4 NOT NULL,
  "id_etiqueta_restaurante" int4 NOT NULL
)
;

-- ----------------------------
-- Table structure for platillo
-- ----------------------------
DROP TABLE IF EXISTS "public"."platillo";
CREATE TABLE "public"."platillo" (
  "id_platillo" int4 NOT NULL DEFAULT nextval('platillo_id_platillo_seq'::regclass),
  "nombre_platillo" varchar(150) COLLATE "pg_catalog"."default" NOT NULL,
  "precio_platillo" numeric(4,2) NOT NULL,
  "foto_platillo" text COLLATE "pg_catalog"."default" NOT NULL,
  "descripcion_platillo" varchar(255) COLLATE "pg_catalog"."default",
  "id_menu_fk" int4 NOT NULL,
  "valoracion_platillo" numeric(1,1) NOT NULL
)
;

-- ----------------------------
-- Table structure for registro_avistamiento
-- ----------------------------
DROP TABLE IF EXISTS "public"."registro_avistamiento";
CREATE TABLE "public"."registro_avistamiento" (
  "id_avistamiento" int4 NOT NULL DEFAULT nextval('registro_avistamiento_id_avistamiento_seq'::regclass),
  "nombre_restaurante" varchar(100) COLLATE "pg_catalog"."default" NOT NULL,
  "foto" text COLLATE "pg_catalog"."default",
  "direccion" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "id_usuario_fk" int4 NOT NULL,
  "coordenada_longitud" numeric NOT NULL,
  "coordenada_latitud" numeric NOT NULL
)
;

-- ----------------------------
-- Table structure for resena_restaurante
-- ----------------------------
DROP TABLE IF EXISTS "public"."resena_restaurante";
CREATE TABLE "public"."resena_restaurante" (
  "id_resena" int4 NOT NULL DEFAULT nextval('resena_restaurante_id_resena_seq'::regclass),
  "id_usuario" int4,
  "id_restaurante" int4,
  "calificacion" int4,
  "comentario" text COLLATE "pg_catalog"."default",
  "verificado" bool
)
;

-- ----------------------------
-- Table structure for restaurante
-- ----------------------------
DROP TABLE IF EXISTS "public"."restaurante";
CREATE TABLE "public"."restaurante" (
  "id_restaurante" int4 NOT NULL DEFAULT nextval('restaurante_id_restaurante_seq'::regclass),
  "nombre_restaurante" varchar(100) COLLATE "pg_catalog"."default" NOT NULL,
  "direccion" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "telefono" varchar(15) COLLATE "pg_catalog"."default" NOT NULL,
  "horario_atencion" varchar(100) COLLATE "pg_catalog"."default" NOT NULL,
  "coordenada_longitud" numeric NOT NULL,
  "coordenada_latitud" numeric NOT NULL,
  "valoracion" numeric(1,1) NOT NULL,
  "imagen" text COLLATE "pg_catalog"."default" NOT NULL
)
;

-- ----------------------------
-- Table structure for usuario
-- ----------------------------
DROP TABLE IF EXISTS "public"."usuario";
CREATE TABLE "public"."usuario" (
  "id_usuario" int4 NOT NULL DEFAULT nextval('usuario_id_usuario_seq'::regclass),
  "nombre" varchar(50) COLLATE "pg_catalog"."default",
  "apellido" varchar(50) COLLATE "pg_catalog"."default",
  "telefono" varchar(15) COLLATE "pg_catalog"."default",
  "correo_electronico" varchar(100) COLLATE "pg_catalog"."default",
  "contrasena" varchar(100) COLLATE "pg_catalog"."default"
)
;



-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."Menu_id_menu_seq"
OWNED BY "public"."Menu"."id_menu";
SELECT setval('"public"."Menu_id_menu_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."platillo_id_platillo_seq"
OWNED BY "public"."platillo"."id_platillo";
SELECT setval('"public"."platillo_id_platillo_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."registro_avistamiento_id_avistamiento_seq"
OWNED BY "public"."registro_avistamiento"."id_avistamiento";
SELECT setval('"public"."registro_avistamiento_id_avistamiento_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."resena_restaurante_id_resena_seq"
OWNED BY "public"."resena_restaurante"."id_resena";
SELECT setval('"public"."resena_restaurante_id_resena_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."restaurante_id_restaurante_seq"
OWNED BY "public"."restaurante"."id_restaurante";
SELECT setval('"public"."restaurante_id_restaurante_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."usuario_id_usuario_seq"
OWNED BY "public"."usuario"."id_usuario";
SELECT setval('"public"."usuario_id_usuario_seq"', 1, false);

-- ----------------------------
-- Primary Key structure for table Menu
-- ----------------------------
ALTER TABLE "public"."Menu" ADD CONSTRAINT "Menu_pkey" PRIMARY KEY ("id_menu");

-- ----------------------------
-- Primary Key structure for table etiqueta
-- ----------------------------
ALTER TABLE "public"."etiqueta" ADD CONSTRAINT "etiqueta_pkey" PRIMARY KEY ("id_etiqueta");

-- ----------------------------
-- Primary Key structure for table etiqueta_restaurante
-- ----------------------------
ALTER TABLE "public"."etiqueta_restaurante" ADD CONSTRAINT "etiqueta_restaurante_pkey" PRIMARY KEY ("id_restaurante_etiquetado", "id_etiqueta_restaurante");

-- ----------------------------
-- Primary Key structure for table platillo
-- ----------------------------
ALTER TABLE "public"."platillo" ADD CONSTRAINT "platillo_pkey" PRIMARY KEY ("id_platillo");

-- ----------------------------
-- Primary Key structure for table registro_avistamiento
-- ----------------------------
ALTER TABLE "public"."registro_avistamiento" ADD CONSTRAINT "registro_avistamiento_pkey" PRIMARY KEY ("id_avistamiento");

-- ----------------------------
-- Primary Key structure for table resena_restaurante
-- ----------------------------
ALTER TABLE "public"."resena_restaurante" ADD CONSTRAINT "resena_restaurante_pkey" PRIMARY KEY ("id_resena");

-- ----------------------------
-- Primary Key structure for table restaurante
-- ----------------------------
ALTER TABLE "public"."restaurante" ADD CONSTRAINT "restaurante_pkey" PRIMARY KEY ("id_restaurante");

-- ----------------------------
-- Primary Key structure for table usuario
-- ----------------------------
ALTER TABLE "public"."usuario" ADD CONSTRAINT "usuario_pkey" PRIMARY KEY ("id_usuario");

-- ----------------------------
-- Foreign Keys structure for table Menu
-- ----------------------------
ALTER TABLE "public"."Menu" ADD CONSTRAINT "fk_restaurante" FOREIGN KEY ("id_restaurante_fk") REFERENCES "public"."restaurante" ("id_restaurante") ON DELETE SET NULL ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table etiqueta_restaurante
-- ----------------------------
ALTER TABLE "public"."etiqueta_restaurante" ADD CONSTRAINT "etiqueta_fk" FOREIGN KEY ("id_etiqueta_restaurante") REFERENCES "public"."etiqueta" ("id_etiqueta") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."etiqueta_restaurante" ADD CONSTRAINT "restaurante_fk" FOREIGN KEY ("id_restaurante_etiquetado") REFERENCES "public"."restaurante" ("id_restaurante") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table platillo
-- ----------------------------
ALTER TABLE "public"."platillo" ADD CONSTRAINT "fk_menu" FOREIGN KEY ("id_menu_fk") REFERENCES "public"."Menu" ("id_menu") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table registro_avistamiento
-- ----------------------------
ALTER TABLE "public"."registro_avistamiento" ADD CONSTRAINT "fk_avistador" FOREIGN KEY ("id_usuario_fk") REFERENCES "public"."usuario" ("id_usuario") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table resena_restaurante
-- ----------------------------
ALTER TABLE "public"."resena_restaurante" ADD CONSTRAINT "resena_restaurante_id_restaurante_fkey" FOREIGN KEY ("id_restaurante") REFERENCES "public"."restaurante" ("id_restaurante") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."resena_restaurante" ADD CONSTRAINT "resena_restaurante_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "public"."usuario" ("id_usuario") ON DELETE NO ACTION ON UPDATE NO ACTION;
