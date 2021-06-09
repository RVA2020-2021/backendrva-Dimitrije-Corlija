import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PROIZVOD_URL } from '../app.constants';
import { proizvod } from '../models/proizvod';

@Injectable({ /* koji nam sluzi da nas servis mozemo da injektujemo u neku drugu klasu odnosno sve klase koje su u okviru servisa ce moci da idu u neke druge klase   */
  providedIn: 'root'
})
export class ProizvodService {

  constructor(private httpClient: HttpClient) { } /* injekotvanje httpclijent koji ce nam omoguciti da imamo neke http zahteve */


  public getAllProizvods(): Observable<any> /*metoda za ocitavanje svih proizvoda iz baze podataka odnosno poziv odgovarajacuje metoda na backend */
  {
    return this.httpClient.get(`${PROIZVOD_URL}`); // Pristup url-u koji se nalazi u app.constants.ts, a on sadrzi podatke o proizvodu 
  }

  public addProizvod(proizvod: proizvod):Observable<any> {//ova nasa metoda vraca neku observablu na koju cemo se mi subskrajbovati i cekati da nam se vrate neki podatci i potom ih prikazati 
    proizvod.id= 0;
    return  this.httpClient.post(`${PROIZVOD_URL}`, proizvod);//ovde govori koji proizvod da postuje, a to je upravo ovaj gore parametar proizvod
    }

    public updateProizvod(proizvod: proizvod):Observable<any> {

      return this.httpClient.put(`${PROIZVOD_URL}`,proizvod)//prosledjuje URL gde ce se izvrsiti metoda na bekendu i proizvod 
    }

    public deleteProizvod(id:number):Observable<any>{
      return this.httpClient.delete(`${PROIZVOD_URL}/${id}`)
    }
  }


//Obzervabla- vraca neki tok podataka, ona ce emitovati neke podatke i mi cemo moci da se prijavimo na taj tok podatka. Kada god dodje do promene podataka onda cemo mi dobiti obavestenje

/**
 *  servisne klase nam sluze da obezbedimo komunikaciju izmedju komponente(proizvod) i restcontrolera na backendu(spring) nase aplikacije
 */
//`${PROIZVOD_URL}`-- ovo je jedna konstanta