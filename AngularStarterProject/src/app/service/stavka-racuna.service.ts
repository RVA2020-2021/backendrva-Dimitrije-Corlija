import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { STAVKE_RACUNA_URL, STAVKE_ZA_RACUN_URL } from "../app.constants";
import { racun } from "../models/racun";
import { stavkaRacuna } from "../models/stavka-racuna";

@Injectable({ /* koji nam sluzi da nas servis mozemo da injektujemo u neku drugu klasu odnosno sve klase koje su u okviru servisa ce moci da idu u neke druge klase   */
    providedIn: 'root'
  })
  export class StavkaRacunaService {
  
    constructor(private httpClient: HttpClient) { } /* injekotvanje httpclijent koji ce nam omoguciti da imamo neke http zahteve */
  
  
    public getStavkeZaRacun(idRacuna:number): Observable<any> /*metoda za ocitavanje svih proizvoda iz baze podataka odnosno poziv odgovarajacuje metoda na backend */
    {
      return this.httpClient.get(`${STAVKE_ZA_RACUN_URL}/${idRacuna}`); // Pristup url-u koji se nalazi u app.constants.ts, a on sadrzi podatke o proizvodu 
    }
  
    public addStavkaRacuna(stavkaRacuna: stavkaRacuna):Observable<any> {//ova nasa metoda vraca neku observablu na koju cemo se mi subskrajbovati i cekati da nam se vrate neki podatci i potom ih prikazati 
        stavkaRacuna.id= 0;//difoltna vrednost kako on ne bi prepoznao null vrednost, a on svakako dobija  svoju vrednost
      return  this.httpClient.post(`${STAVKE_RACUNA_URL}`, stavkaRacuna);//ovde govori koji proizvod da postuje, a to je upravo ovaj gore parametar proizvod
      }
  
      public updateStavkaRacuna(stavkaRacuna: stavkaRacuna):Observable<any> {
  
        return this.httpClient.put(`${STAVKE_RACUNA_URL}`,stavkaRacuna)//prosledjuje URL gde ce se izvrsiti metoda na bekendu i proizvod 
      }
  
      public deleteStavkaRacuna(id:number):Observable<any>{
        return this.httpClient.delete(`${STAVKE_RACUNA_URL}/${id}`)
      }
    }