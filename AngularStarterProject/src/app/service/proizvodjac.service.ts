import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PROIZVODJAC_URL } from '../app.constants';
import { proizvodjac } from '../models/proizvodjac';

@Injectable({ /* koji nam sluzi da nas servis mozemo da injektujemo u neku drugu klasu odnosno sve klase koje su u okviru servisa ce moci da idu u neke druge klase   */
    providedIn: 'root'
  })
  export class ProizvodjacService {
  
    constructor(private httpClient: HttpClient) { } /* injekotvanje httpclijent koji ce nam omoguciti da imamo neke http zahteve */
  
  
    public getAllProizvodjacs(): Observable<any> /*metoda za ocitavanje svih proizvoda iz baze podataka odnosno poziv odgovarajacuje metoda na backend */
    {
      return this.httpClient.get(`${PROIZVODJAC_URL}`); // Pristup url-u koji se nalazi u app.constants.ts, a on sadrzi podatke o proizvodu 
    }
  
    public addProizvodjac(proizvodjac: proizvodjac):Observable<any> {//ova nasa metoda vraca neku observablu na koju cemo se mi subskrajbovati i cekati da nam se vrate neki podatci i potom ih prikazati 
      proizvodjac.id= 0;//difoltna vrednost kako on ne bi prepoznao null vrednost, a on svakako dobija  svoju vrednost
      return  this.httpClient.post(`${PROIZVODJAC_URL}`, proizvodjac);//ovde govori koji proizvod da postuje, a to je upravo ovaj gore parametar proizvod
      }
  
      public updateProizvodjac(proizvodjac: proizvodjac):Observable<any> {
  
        return this.httpClient.put(`${PROIZVODJAC_URL}`,proizvodjac)//prosledjuje URL gde ce se izvrsiti metoda na bekendu i proizvod 
      }
  
      public deleteProizvodjac(id:number):Observable<any>{
        return this.httpClient.delete(`${PROIZVODJAC_URL}/${id}`)
      }
    }
  