import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RACUN_URL } from '../app.constants';
import { racun } from '../models/racun';

@Injectable({ /* koji nam sluzi da nas servis mozemo da injektujemo u neku drugu klasu odnosno sve klase koje su u okviru servisa ce moci da idu u neke druge klase   */
    providedIn: 'root'
  })
  export class RacunService {
  
    constructor(private httpClient: HttpClient) { } /* injekotvanje httpclijent koji ce nam omoguciti da imamo neke http zahteve */
  
  
    public getAllRacuns(): Observable<any> /*metoda za ocitavanje svih proizvoda iz baze podataka odnosno poziv odgovarajacuje metoda na backend */
    {
      return this.httpClient.get(`${RACUN_URL}`); // Pristup url-u koji se nalazi u app.constants.ts, a on sadrzi podatke o proizvodu 
    }
  
    public addRacun(racun: racun):Observable<any> {//ova nasa metoda vraca neku observablu na koju cemo se mi subskrajbovati i cekati da nam se vrate neki podatci i potom ih prikazati 
      racun.id= 0;//difoltna vrednost kako on ne bi prepoznao null vrednost, a on svakako dobija  svoju vrednost
      return  this.httpClient.post(`${RACUN_URL}`, racun);//ovde govori koji proizvod da postuje, a to je upravo ovaj gore parametar proizvod
      }
  
      public updateRacun(racun: racun):Observable<any> {
  
        return this.httpClient.put(`${RACUN_URL}`,racun)//prosledjuje URL gde ce se izvrsiti metoda na bekendu i proizvod 
      }
  
      public deleteRacun(id:number):Observable<any>{
        return this.httpClient.delete(`${RACUN_URL}/${id}`)
      }
    }
  