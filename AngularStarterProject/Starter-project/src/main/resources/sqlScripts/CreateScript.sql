DROP TABLE IF EXISTS proizvodjac CASCADE;
DROP TABLE IF EXISTS proizvod CASCADE;
DROP TABLE IF EXISTS stavka_racuna CASCADE;
DROP TABLE IF EXISTS racun CASCADE;

DROP SEQUENCE IF EXISTS proizvodjac_seq;
DROP SEQUENCE IF EXISTS proizvod_seq;
DROP SEQUENCE IF EXISTS stavka_racuna_seq;
DROP SEQUENCE IF EXISTS racun_seq;

CREATE TABLE proizvodjac(
	id integer not null,
	naziv varchar(50),
	adresa varchar(200),
	kontakt varchar(100)
);


CREATE TABLE proizvod(
	id integer not null,
	naziv varchar(50),
	proizvodjac integer
);

CREATE TABLE stavka_racuna(
	id integer not null,
	redni_broj integer,
	kolicina numeric,
	jedinica_mere varchar(50),
	cena numeric,
	racun integer,
	proizvod integer
);

CREATE TABLE racun(
	id integer not null,
	datum date,
	nacin_placanja varchar(200)
);


--Primary key
ALTER TABLE proizvodjac ADD CONSTRAINT pk_proizvodjac PRIMARY KEY(id);
ALTER TABLE proizvod ADD CONSTRAINT pk_proizvod PRIMARY KEY(id);
ALTER TABLE racun ADD CONSTRAINT pk_racun PRIMARY KEY(id);
ALTER TABLE stavka_racuna ADD CONSTRAINT pk_stavka_racuna PRIMARY KEY(id);

--Foreign key
ALTER TABLE proizvod ADD CONSTRAINT fk_proizvod_proizvodjac FOREIGN KEY(proizvodjac) REFERENCES proizvodjac(id);
ALTER TABLE stavka_racuna ADD CONSTRAINT fk_stavka_racuna_racun FOREIGN KEY(racun) REFERENCES racun(id);
ALTER TABLE stavka_racuna ADD CONSTRAINT fk_stavka_racuna_proizvod FOREIGN KEY(proizvod) REFERENCES proizvod(id);

--Index for primary key
CREATE INDEX idxpk_proizvodjac ON proizvodjac(id);
CREATE INDEX idxpk_proizvod ON proizvod(id);
CREATE INDEX idxpk_stavka_racuna ON stavka_racuna(id);
CREATE INDEX idxpk_racun ON racun(id);

--Index for foreign key

CREATE INDEX idxfk_proizvod_proizvodjac ON proizvod(proizvodjac);
CREATE INDEX idxfk_stavka_racuna_racun ON stavka_racuna(racun);
CREATE INDEX idxfk_stavka_racuna_proizvod ON stavka_racuna(proizvod);


CREATE SEQUENCE proizvod_seq INCREMENT 1;
CREATE SEQUENCE proizvodjac_seq INCREMENT 1;
CREATE SEQUENCE stavka_racuna_seq INCREMENT 1;
CREATE SEQUENCE racun_seq INCREMENT 1;


