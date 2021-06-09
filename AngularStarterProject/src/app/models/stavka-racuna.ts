import { proizvod } from "./proizvod";
import { racun } from "./racun";

export class stavkaRacuna{
    id: number;
    redniBroj:number;
    kolicina:number;
    jedinicaMere:string;
    cena:number;
    racun:racun;
    proizvod:proizvod;
}