import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { proizvodjac } from 'src/app/models/proizvodjac';
import { proizvod } from 'src/app/models/proizvod';
import { ProizvodService } from 'src/app/service/proizvod.service';
import { ProizvodjacService } from 'src/app/service/proizvodjac.service';
@Component({
  selector: 'app-proizvod-dialog',
  templateUrl: './proizvod-dialog.component.html',
  styleUrls: ['./proizvod-dialog.component.css']
})
export class ProizvodDialogComponent implements OnInit {

  public flag:number;//govori nam o kojoj opercaiji je rec u momentu poziva dialoga
  proizvodjaci: proizvodjac[];
 
  

  constructor(public snackBar: MatSnackBar, 
              public dialogRef: MatDialogRef<ProizvodDialogComponent>,
              @Inject (MAT_DIALOG_DATA) public data: proizvod,
              public proizvodService: ProizvodService,
              public proizvodjacService:ProizvodjacService) { }

              ngOnInit(): void {
                this.proizvodjacService.getAllProizvodjacs().subscribe( data => 
                  {
                    this.proizvodjaci = data;
                  });
              }
  compareTo(a,b){
    return a.id==b.id;
  }
  public addProizvod():void {
      this.proizvodService.addProizvod(this.data).subscribe(() =>{// ovde prosledjujemo podatke o tom nasem proizvodu koji hocemo da dodamo
          this.snackBar.open('Uspesno dodat proizvod: '+this.data.naziv,'OK',{
            duration: 2500
          })
      }),
      (error:Error) => {
        console.log(error.name+' '+error.message);
        this.snackBar.open('Doslo je do greske prilikom dodavanja novog proizvoda','Zatvori', {
          duration:2500
        })
      } 
  }

  public updateProizvod():void {
    this.proizvodService.updateProizvod(this.data).subscribe(()=>{
      this.snackBar.open('Uspesno modifikovan proizvod: '+this.data.naziv,'OK', {
        duration:2500
      })
    }),
    (error:Error) => {
      console.log(error.name+' '+error.message);
      this.snackBar.open('Doslo je do greske prilikom modifikacij postojeceg proizvoda','Zatvori', {
        duration:2500
      })
    }
  }

  public deleteProizvod():void {
    this.proizvodService.deleteProizvod(this.data.id).subscribe(()=>{
      this.snackBar.open('Uspesno obrisan proizvod: '+this.data.naziv,'OK', {
        duration:2500
      })
    }),
    (error:Error) => {
      console.log(error.name+' '+error.message);
      this.snackBar.open('Doslo je do greske prilikom brisanja proizvoda','Zatvori', {
        duration:2500
      })
    }
  }

  public cancel():void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste. '+this.data.id,'Zatvori', {
      duration:1000
    })
  }

}
//MatDialogRef-- referenca na dijalog 
//@Inject (MAT_DIALOG_DATA) public data: proizvod -- injektujemo podatke , kazemo da ce podaci bitu uskladisteni u okciru neke promenljive data (data je proizvod zato sto se radi o podacima o proizvodu )
//public proizvodService: ProizvodService-- da bi smo iscitali podatke i mogli da ih menjamo potrebna nam je instanca servisa 
//public snackBar: MatSnackBar-- sluzi da nam iskoci prozorce gde pise npr. uspesno ste dodali novi artikl 