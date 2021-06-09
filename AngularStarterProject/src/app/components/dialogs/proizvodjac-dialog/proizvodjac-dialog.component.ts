import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { proizvodjac } from 'src/app/models/proizvodjac';
import { ProizvodjacService } from 'src/app/service/proizvodjac.service';

@Component({
  selector: 'app-proizvodjac-dialog',
  templateUrl: './proizvodjac-dialog.component.html',
  styleUrls: ['./proizvodjac-dialog.component.css']
})
export class ProizvodjacDialogComponent implements OnInit {
  public flag:number;//govori nam o kojoj opercaiji je rec u momentu poziva dialoga
  
  constructor(public snackBar: MatSnackBar, 
    public dialogRef: MatDialogRef<ProizvodjacDialogComponent>,
    @Inject (MAT_DIALOG_DATA) public data: proizvodjac,
    public proizvodjacService: ProizvodjacService) { }

  ngOnInit(): void {

  }
  public addProizvodjac():void {
    this.proizvodjacService.addProizvodjac(this.data).subscribe(() =>{// ovde prosledjujemo podatke o tom nasem proizvodu koji hocemo da dodamo
        this.snackBar.open('Uspesno dodat proizvodjac: '+this.data.naziv,'OK',{
          duration: 2500
        })
    }),
    (error:Error) => {
      console.log(error.name+' '+error.message);
      this.snackBar.open('Doslo je do greske prilikom dodavanja novog racuna','Zatvori', {
        duration:2500
      })
    } 
  }
  public updateProizvodjac():void {
    this.proizvodjacService.updateProizvodjac(this.data).subscribe(()=>{
      this.snackBar.open('Uspesno modifikovan proizvodjac: '+this.data.naziv,'OK', {
        duration:2500
      })
    }),
    (error:Error) => {
      console.log(error.name+' '+error.message);
      this.snackBar.open('Doslo je do greske prilikom modifikacij postojeceg racuna','Zatvori', {
        duration:2500
      })
    }
  }
  public deleteProizvodjac():void {
    this.proizvodjacService.deleteProizvodjac(this.data.id).subscribe(()=>{
      this.snackBar.open('Uspesno obrisan proizvodjac: '+this.data.naziv,'OK', {
        duration:2500
      })
      console.log(1);
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
    this.snackBar.open('Odustali ste','Zatvori', {
      duration:1000
    })
  }
}
//MatDialogRef-- referenca na dijalog 
//@Inject (MAT_DIALOG_DATA) public data: proizvod -- injektujemo podatke , kazemo da ce podaci bitu uskladisteni u okciru neke promenljive data (data je proizvod zato sto se radi o podacima o proizvodu )
//public proizvodService: ProizvodService-- da bi smo iscitali podatke i mogli da ih menjamo potrebna nam je instanca servisa 
//public snackBar: MatSnackBar-- sluzi da nam iskoci prozorce gde pise npr. uspesno ste dodali novi artikl 