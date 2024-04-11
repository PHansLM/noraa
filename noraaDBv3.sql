/*
 Navicat Premium Data Transfer

 Source Server         : postgre
 Source Server Type    : PostgreSQL
 Source Server Version : 120017 (120017)
 Source Host           : localhost:5432
 Source Catalog        : noraaDBV2
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 120017 (120017)
 File Encoding         : 65001

 Date: 10/04/2024 21:58:36
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
-- Table structure for consumible
-- ----------------------------
DROP TABLE IF EXISTS "public"."consumible";
CREATE TABLE "public"."consumible" (
  "id_consumible" int4 NOT NULL DEFAULT nextval('platillo_id_platillo_seq'::regclass),
  "nombre_consumible" varchar(150) COLLATE "pg_catalog"."default" NOT NULL,
  "precio_consumible" numeric(4,2) NOT NULL,
  "foto_consumible" text COLLATE "pg_catalog"."default" NOT NULL,
  "descripcion_consumible" varchar(255) COLLATE "pg_catalog"."default",
  "id_menu_fk" int4 NOT NULL,
  "valoracion_consumible" numeric(1,1) NOT NULL
)
;

-- ----------------------------
-- Records of consumible
-- ----------------------------

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
-- Records of etiqueta
-- ----------------------------
INSERT INTO "public"."etiqueta" VALUES (1, 'pollo');
INSERT INTO "public"."etiqueta" VALUES (2, 'pescado');
INSERT INTO "public"."etiqueta" VALUES (3, 'vegetariano');
INSERT INTO "public"."etiqueta" VALUES (4, 'vegano');
INSERT INTO "public"."etiqueta" VALUES (5, 'sin gluten');
INSERT INTO "public"."etiqueta" VALUES (6, 'picante');
INSERT INTO "public"."etiqueta" VALUES (7, 'dulce');
INSERT INTO "public"."etiqueta" VALUES (8, 'salado');
INSERT INTO "public"."etiqueta" VALUES (9, 'bebidas');
INSERT INTO "public"."etiqueta" VALUES (10, 'postres');
INSERT INTO "public"."etiqueta" VALUES (11, 'hamburguesas');
INSERT INTO "public"."etiqueta" VALUES (12, 'salchipapa');

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
-- Records of etiqueta_restaurante
-- ----------------------------
INSERT INTO "public"."etiqueta_restaurante" VALUES (1, 1);
INSERT INTO "public"."etiqueta_restaurante" VALUES (2, 8);
INSERT INTO "public"."etiqueta_restaurante" VALUES (2, 9);
INSERT INTO "public"."etiqueta_restaurante" VALUES (3, 1);
INSERT INTO "public"."etiqueta_restaurante" VALUES (3, 8);
INSERT INTO "public"."etiqueta_restaurante" VALUES (3, 9);
INSERT INTO "public"."etiqueta_restaurante" VALUES (4, 7);
INSERT INTO "public"."etiqueta_restaurante" VALUES (4, 9);
INSERT INTO "public"."etiqueta_restaurante" VALUES (4, 10);
INSERT INTO "public"."etiqueta_restaurante" VALUES (5, 8);
INSERT INTO "public"."etiqueta_restaurante" VALUES (5, 10);

-- ----------------------------
-- Table structure for menu
-- ----------------------------
DROP TABLE IF EXISTS "public"."menu";
CREATE TABLE "public"."menu" (
  "id_menu" int4 NOT NULL DEFAULT nextval('"Menu_id_menu_seq"'::regclass),
  "nombre_menu" varchar(100) COLLATE "pg_catalog"."default" NOT NULL,
  "vigente" bool NOT NULL,
  "id_restaurante_fk" int4 NOT NULL
)
;

-- ----------------------------
-- Records of menu
-- ----------------------------

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
-- Records of registro_avistamiento
-- ----------------------------

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
-- Records of resena_restaurante
-- ----------------------------

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
  "valoracion" numeric(2,1) NOT NULL,
  "imagen" bytea NOT NULL,
  "icono_base" varchar(20) COLLATE "pg_catalog"."default" NOT NULL
)
;

-- ----------------------------
-- Records of restaurante
-- ----------------------------
INSERT INTO "public"."restaurante" VALUES (1, 'Pollos Nova', '', '123456789', 'Horario de atención', -66.14480, -17.39210, 0.0, E'imagen_pollos_nova.png', 'broaster');
INSERT INTO "public"."restaurante" VALUES (2, 'Bunker King', '', '987654321', 'Horario de atención', -66.15052, -17.39423, 0.0, E'imagen_bunker_king.png', 'burger');
INSERT INTO "public"."restaurante" VALUES (3, 'Bowser', '', '55555555', 'Horario de atención', -66.14490, -17.39513, 0.0, E'imagen_bowser.png', 'burger');
INSERT INTO "public"."restaurante" VALUES (4, 'Salteñas Don Pedro', '', '777777777', 'Horario de atención', -66.14187, -17.39342, 0.0, E'imagen_saltenas_don_pedro.png', 'saltena');
INSERT INTO "public"."restaurante" VALUES (5, 'Empanadas Ale', '', '999999999', 'Horario de atención', -66.14946, -17.39298, 0.0, E'imagen_empanadas_ale.png', 'saltena');
INSERT INTO "public"."restaurante" VALUES (6, 'Lactobar Vaquita', 'Dirección de Lactobar Vaquita', '61234567', 'Horario de Lactobar Vaquita', -66.14655, -17.39345, 3.0, E'imagen1.jpg', 'helado');
INSERT INTO "public"."restaurante" VALUES (8, 'Pollos Choco', 'Dirección de Pollos Choco', '61234568', 'Horario de Pollos Choco', -66.14458, -17.39034, 4.0, E'imagen3.jpg', 'broaster');
INSERT INTO "public"."restaurante" VALUES (9, 'Pollos Koko', 'Dirección de Pollos Koko', '72345679', 'Horario de Pollos Koko', -66.14995, -17.39432, 4.0, E'imagen4.jpg', 'broaster');
INSERT INTO "public"."restaurante" VALUES (10, 'La Parrilla', 'Dirección de La Parrilla', '61234569', 'Horario de La Parrilla', -66.1493, -17.39563, 3.0, E'imagen5.jpg', 'comidaVegetariana');
INSERT INTO "public"."restaurante" VALUES (11, 'Restaurante Americas', 'Dirección de Restaurante Americas', '72345670', 'Horario de Restaurante Americas', -66.14911, -17.39147, 5.0, E'imagen6.jpg', 'carne');
INSERT INTO "public"."restaurante" VALUES (12, 'Pircolina', 'Dirección de Pircolina', '61234560', 'Horario de Pircolina', -66.14723, -17.38532, 4.0, E'imagen7.jpg', 'pizza');
INSERT INTO "public"."restaurante" VALUES (14, 'Helarte', 'Dirección de Helarte', '61234561', 'Horario de Helarte', -66.14144, -17.39309, 5.0, E'imagen9.jpg', 'helado');
INSERT INTO "public"."restaurante" VALUES (15, 'El Sabor de la Pizza', 'Dirección de El Sabor de la Pizza', '72345672', 'Horario de El Sabor de la Pizza', -66.14126, -17.3929, 4.0, E'imagen10.jpg', 'pizza');
INSERT INTO "public"."restaurante" VALUES (16, 'Anticuchos', 'Dirección de Anticuchos', '61234562', 'Horario de Anticuchos', -66.14988, -17.39197, 3.0, E'imagen11.jpg', 'sushi');
INSERT INTO "public"."restaurante" VALUES (17, 'Carritos de Comida', 'Dirección de Carritos de Comida', '72345673', 'Horario de Carritos de Comida', -66.14989, -17.39167, 4.0, E'imagen12.jpg', 'burger');
INSERT INTO "public"."restaurante" VALUES (18, 'Mimos Crepes', 'Dirección de Mimos Crepes', '61234563', 'Horario de Mimos Crepes', -66.14969, -17.39212, 5.0, E'imagen13.jpg', 'helado');
INSERT INTO "public"."restaurante" VALUES (13, 'Wistupiku', 'Dirección de Wistupiku', '72345671', 'Horario de Wistupiku', -66.14728, -17.38592, 3.0, E'imagen8.jpg', 'saltena');
INSERT INTO "public"."restaurante" VALUES (19, 'Rellenos Calama', 'Dirección de Rellenos Calama', '61234564', 'Horario de Rellenos Calama', -66.15114, -17.39564, 3.0, E'imagen14.jpg', 'saltena');
INSERT INTO "public"."restaurante" VALUES (20, 'Casa de las Tripas', 'Dirección de Casa de las Tripas', '72345665', 'Horario de Casa de las Tripas', -66.15182, -17.39361, 4.0, E'imagen15.jpg', 'burger');
INSERT INTO "public"."restaurante" VALUES (21, 'El Picafe', 'Dirección de El Picafe', '61234566', 'Horario de El Picafe', -66.15282, -17.39377, 4.0, E'imagen16.jpg', 'cafe');
INSERT INTO "public"."restaurante" VALUES (22, 'Cafe Docente', 'Dirección de Cafe Docente', '72345667', 'Horario de Cafe Docente', -66.14623, -17.3934, 4.0, E'imagen17.jpg', 'cafe');
INSERT INTO "public"."restaurante" VALUES (23, 'Cafe Economia', 'Dirección de Cafe Economia', '61234568', 'Horario de Cafe Economia', -66.14798, -17.39508, 4.0, E'imagen18.jpg', 'cafe');
INSERT INTO "public"."restaurante" VALUES (24, 'Koko Pollo', 'Dirección de Koko Pollo', '72345669', 'Horario de Koko Pollo', -66.15349, -17.39668, 4.0, E'imagen19.jpg', 'broaster');
INSERT INTO "public"."restaurante" VALUES (25, 'Pollos Panchita San Martin', 'Dirección de Pollos Panchita San Martin', '61234570', 'Horario de Pollos Panchita San Martin', -66.15379, -17.39556, 4.0, E'imagen20.jpg', 'broaster');
INSERT INTO "public"."restaurante" VALUES (26, 'Pollos Panchita Heroinas', 'Dirección de Pollos Panchita Heroinas', '72345671', 'Horario de Pollos Panchita Heroinas', -66.14685, -17.39018, 4.0, E'imagen21.jpg', 'broaster');
INSERT INTO "public"."restaurante" VALUES (27, 'Marisqueria', 'Dirección de Marisqueria', '61234572', 'Horario de Marisqueria', -66.14973, -17.39082, 3.0, E'imagen22.jpg', 'marisco');
INSERT INTO "public"."restaurante" VALUES (7, 'Pension Juanita', 'Dirección de Pension Juanita', '72345678', 'Horario de Pension Juanita', -66.1433, -17.39096, 4.0, E'imagen2.jpg', 'menu');
INSERT INTO "public"."restaurante" VALUES (31, 'Pamelita', 'calle Mama Ocllo', '60688350', '10:00-23:00', -66.12345, -17.98765, 2.0, E'imagen_generica', 'empanada');
INSERT INTO "public"."restaurante" VALUES (35, 'Tropical Chicken Cine Center', 'Pasarela Cine Center, Cochabamba, Bolivia', '72855362', '11:00-23:50', -66.15092, -17.38001, 2.0, E'imagen_generica', 'pollo');
INSERT INTO "public"."restaurante" VALUES (36, 'Empanadas Pamelita Muyurina', 'Avenida América 1128, Cochabamba, Bolivia', '70833502', '09:00-22:00', -66.14224, -17.38037, 2.0, E'imagen_generica', 'saltena');
INSERT INTO "public"."restaurante" VALUES (40, 'Pollo Carlitos', 'Ruta Nacional 7, Bolivia', '61596437', '11:00-23:00', -66.1362, -17.42309, 2.0, E'imagen_generica', 'pollo');
INSERT INTO "public"."restaurante" VALUES (41, 'Casa Korea', 'Calle José Antonio de Sucre, Cochabamba, Bolivia', '67562742', '11:00-16:00', -66.15194, -17.39345, 2.0, E'imagen_generica', 'pension');
INSERT INTO "public"."restaurante" VALUES (42, 'Snack edificio nuevo', 'Calle Complejo Deportivo, Cochabamba, Bolivia', '78917234', '10:00-17:00', -66.14534, -17.39451, 2.0, E'imagen_generica', 'hamburguesa');
INSERT INTO "public"."restaurante" VALUES (43, 'Los hornos', 'Avenida Oquendo 609, Cochabamba, Bolivia', '78912345', '07:00-18:00', -66.15096, -17.38586, 2.0, E'imagen_generica', 'cafe');
INSERT INTO "public"."restaurante" VALUES (44, 'Renecos', 'Calle Mariano Antezana 744, Cochabamba, Bolivia', '79182321', '11:00-23:00', -66.15578, -17.38313, 2.0, E'imagen_generica', 'burger');
INSERT INTO "public"."restaurante" VALUES (45, 'Bar las Americas', 'Calle Mariano Antezana 332, Cochabamba, Bolivia', '78123452', '11:00-08:00', -66.15135, -17.39608, 2.0, E'imagen_generica', 'bar');
INSERT INTO "public"."restaurante" VALUES (46, 'Pollos Junior', '-', '72346123', '11:00-21:00', -66.158592, -17.3965312, 2.0, E'imagen_generica', 'broaster');
INSERT INTO "public"."restaurante" VALUES (47, 'Pollos Junior', 'Calle 16 de Julio 400, Cochabamba, Bolivia', '78927420', '11:00-21:00', -66.15071, -17.39387, 2.0, E'imagen_generica', 'broaster');

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
-- Records of usuario
-- ----------------------------

-- ----------------------------
-- Function structure for obtener_restaurantes_en_rango
-- ----------------------------
DROP FUNCTION IF EXISTS "public"."obtener_restaurantes_en_rango"("latitud_busqueda" numeric, "longitud_busqueda" numeric);
CREATE OR REPLACE FUNCTION "public"."obtener_restaurantes_en_rango"("latitud_busqueda" numeric, "longitud_busqueda" numeric)
  RETURNS TABLE("id_restaurante" int4, "nombre_restaurante" varchar, "direccion" varchar, "telefono" varchar, "horario_atencion" varchar, "coordenada_longitud" numeric, "coordenada_latitud" numeric, "valoracion" numeric, "icono_base" varchar, "imagen" text) AS $BODY$
BEGIN
    RETURN QUERY
    SELECT *
    FROM restaurante
    WHERE ABS(coordenada_latitud - latitud_busqueda) <= 0.001
    AND ABS(coordenada_longitud - longitud_busqueda) <= 0.001;
END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100
  ROWS 1000;

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."Menu_id_menu_seq"
OWNED BY "public"."menu"."id_menu";
SELECT setval('"public"."Menu_id_menu_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."platillo_id_platillo_seq"
OWNED BY "public"."consumible"."id_consumible";
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
SELECT setval('"public"."restaurante_id_restaurante_seq"', 47, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."usuario_id_usuario_seq"
OWNED BY "public"."usuario"."id_usuario";
SELECT setval('"public"."usuario_id_usuario_seq"', 1, false);

-- ----------------------------
-- Primary Key structure for table consumible
-- ----------------------------
ALTER TABLE "public"."consumible" ADD CONSTRAINT "platillo_pkey" PRIMARY KEY ("id_consumible");

-- ----------------------------
-- Primary Key structure for table etiqueta
-- ----------------------------
ALTER TABLE "public"."etiqueta" ADD CONSTRAINT "etiqueta_pkey" PRIMARY KEY ("id_etiqueta");

-- ----------------------------
-- Primary Key structure for table etiqueta_restaurante
-- ----------------------------
ALTER TABLE "public"."etiqueta_restaurante" ADD CONSTRAINT "etiqueta_restaurante_pkey" PRIMARY KEY ("id_restaurante_etiquetado", "id_etiqueta_restaurante");

-- ----------------------------
-- Primary Key structure for table menu
-- ----------------------------
ALTER TABLE "public"."menu" ADD CONSTRAINT "Menu_pkey" PRIMARY KEY ("id_menu");

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
-- Foreign Keys structure for table consumible
-- ----------------------------
ALTER TABLE "public"."consumible" ADD CONSTRAINT "fk_menu" FOREIGN KEY ("id_menu_fk") REFERENCES "public"."menu" ("id_menu") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table etiqueta_restaurante
-- ----------------------------
ALTER TABLE "public"."etiqueta_restaurante" ADD CONSTRAINT "etiqueta_fk" FOREIGN KEY ("id_etiqueta_restaurante") REFERENCES "public"."etiqueta" ("id_etiqueta") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."etiqueta_restaurante" ADD CONSTRAINT "restaurante_fk" FOREIGN KEY ("id_restaurante_etiquetado") REFERENCES "public"."restaurante" ("id_restaurante") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table menu
-- ----------------------------
ALTER TABLE "public"."menu" ADD CONSTRAINT "fk_restaurante" FOREIGN KEY ("id_restaurante_fk") REFERENCES "public"."restaurante" ("id_restaurante") ON DELETE SET NULL ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table registro_avistamiento
-- ----------------------------
ALTER TABLE "public"."registro_avistamiento" ADD CONSTRAINT "fk_avistador" FOREIGN KEY ("id_usuario_fk") REFERENCES "public"."usuario" ("id_usuario") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table resena_restaurante
-- ----------------------------
ALTER TABLE "public"."resena_restaurante" ADD CONSTRAINT "resena_restaurante_id_restaurante_fkey" FOREIGN KEY ("id_restaurante") REFERENCES "public"."restaurante" ("id_restaurante") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."resena_restaurante" ADD CONSTRAINT "resena_restaurante_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "public"."usuario" ("id_usuario") ON DELETE NO ACTION ON UPDATE NO ACTION;
