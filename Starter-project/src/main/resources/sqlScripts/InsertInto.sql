


INSERT INTO "proizvodjac"("id", "naziv","adresa", "kontakt")
VALUES (nextval('proizvodjac_seq'), 'AD Imlek','Marsala Tita 55','063789543');
INSERT INTO "proizvodjac"("id", "naziv","adresa","kontakt")
VALUES (nextval('proizvodjac_seq'), 'USN','Mira Popare 11','069745298');
INSERT INTO "proizvodjac"("id", "naziv","adresa", "kontakt")
VALUES (nextval('proizvodjac_seq'), 'Dijamant','Dimitrije Tucovica 78','063879555');
INSERT INTO "proizvodjac"("id", "naziv","adresa", "kontakt")
VALUES (nextval('proizvodjac_seq'), 'Knjaz Milos','Bulerva oslobodjenja 12','065 888 999');
INSERT INTO "proizvodjac"("id", "naziv","adresa", "kontakt")
VALUES (nextval('proizvodjac_seq'), 'Nescafe','Bulevar Patrijarha Pavla','066 544 344');
INSERT INTO "proizvodjac"("id", "naziv","adresa", "kontakt")
VALUES (-100, 'Test naziv','Test adresa','063789543');



INSERT INTO "proizvod"("id","naziv","proizvodjac")
VALUES (nextval('proizvod_seq'),'Mleko',1);
INSERT INTO "proizvod"("id","naziv","proizvodjac")
VALUES (nextval('proizvod_seq'),'Jogurt',1);
INSERT INTO "proizvod"("id","naziv","proizvodjac")
VALUES (nextval('proizvod_seq'),'Protein jagoda',2);
INSERT INTO "proizvod"("id","naziv","proizvodjac")
VALUES (nextval('proizvod_seq'),'Crna proteinska cokoladica',2);
INSERT INTO "proizvod"("id","naziv","proizvodjac")
VALUES (nextval('proizvod_seq'),'Ulje',3);
INSERT INTO "proizvod"("id","naziv","proizvodjac")
VALUES (nextval('proizvod_seq'),'Margarin',3);
INSERT INTO "proizvod"("id","naziv","proizvodjac")
VALUES (nextval('proizvod_seq'),'Kisela',4);
INSERT INTO "proizvod"("id","naziv","proizvodjac")
VALUES (nextval('proizvod_seq'),'Knjaz remix',4);
INSERT INTO "proizvod"("id","naziv","proizvodjac")
VALUES (nextval('proizvod_seq'),'Nescafe',5);
INSERT INTO "proizvod"("id","naziv","proizvodjac")
VALUES (nextval('proizvod_seq'),'Nescafe',5);
INSERT INTO "proizvod"("id","naziv","proizvodjac")
VALUES (-100,'Test naziv',1);



INSERT INTO "racun"("id","datum","nacin_placanja")
VALUES(nextval('racun_seq'),to_date('05.03.2020.', 'dd.mm.yyyy.'),'kes');
INSERT INTO "racun"("id","datum","nacin_placanja")
VALUES(nextval('racun_seq'),to_date('05.08.2018.', 'dd.mm.yyyy.'),'kartica');
INSERT INTO "racun"("id","datum","nacin_placanja")
VALUES(nextval('racun_seq'),to_date('01.01.2021.', 'dd.mm.yyyy.'),'kartica');
INSERT INTO "racun"("id","datum","nacin_placanja")
VALUES(nextval('racun_seq'),to_date('11.09.2017.', 'dd.mm.yyyy.'),'kes');
INSERT INTO "racun"("id","datum","nacin_placanja")
VALUES(nextval('racun_seq'),to_date('28.08.2018.', 'dd.mm.yyyy.'),'kes');
INSERT INTO "racun"("id","datum","nacin_placanja")
VALUES(nextval('racun_seq'),to_date('19.06.2020.', 'dd.mm.yyyy.'),'kartica');
INSERT INTO "racun"("id","datum","nacin_placanja")
VALUES(nextval('racun_seq'),to_date('20.03.2021.', 'dd.mm.yyyy.'),'kartica');
INSERT INTO "racun"("id","datum","nacin_placanja")
VALUES(nextval('racun_seq'),to_date('23.12.2017.', 'dd.mm.yyyy.'),'kes');
INSERT INTO "racun"("id","datum","nacin_placanja")
VALUES(-100,to_date('05.03.2020.', 'dd.mm.yyyy.'),'Test placanje');



INSERT INTO "stavka_racuna"("id","redni_broj","kolicina","jedinica_mere","cena","racun","proizvod")
VALUES(nextval('stavka_racuna_seq'),1,2,'l',115,1,5);
INSERT INTO "stavka_racuna"("id","redni_broj","kolicina","jedinica_mere","cena","racun","proizvod")
VALUES(nextval('stavka_racuna_seq'),2,4,'kom',87,1,4);
INSERT INTO "stavka_racuna"("id","redni_broj","kolicina","jedinica_mere","cena","racun","proizvod")
VALUES(nextval('stavka_racuna_seq'),3,6,'l',51,1,7);
INSERT INTO "stavka_racuna"("id","redni_broj","kolicina","jedinica_mere","cena","racun","proizvod")
VALUES(nextval('stavka_racuna_seq'),1,2,'l',99,2,1);
INSERT INTO "stavka_racuna"("id","redni_broj","kolicina","jedinica_mere","cena","racun","proizvod")
VALUES(nextval('stavka_racuna_seq'),2,8,'kom',23,2,9);
INSERT INTO "stavka_racuna"("id","redni_broj","kolicina","jedinica_mere","cena","racun","proizvod")
VALUES(-100,3,2,'test jedinica_mere',115,2,5);




