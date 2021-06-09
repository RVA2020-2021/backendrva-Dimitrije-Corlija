import { Inject,Component, OnInit  } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { racun } from 'src/app/models/racun';
import { RacunService } from 'src/app/service/racun.service';

@Component({
  selector: 'app-racun-dialog',
  templateUrl: './racun-dialog.component.html',
  styleUrls: ['./racun-dialog.component.css']
})
export class RacunDialogComponent implements OnInit {
  public flag:number;//govori nam o kojoj opercaiji je rec u momentu poziva dialoga
  
  constructor(public snackBar: MatSnackBar, 
    public dialogRef: MatDialogRef<RacunDialogComponent>,
    @Inject (MAT_DIALOG_DATA) public data: racun,
    public racunService: RacunService) { }

  ngOnInit(): void {

  }
  public addRacun():void {
    this.racunService.addRacun(this.data).subscribe(() =>{// ovde prosledjujemo podatke o tom nasem proizvodu koji hocemo da dodamo
        this.snackBar.open('Uspesno dodat racun: '+this.data.id,'OK',{
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
  public updateRacun():void {
    this.racunService.updateRacun(this.data).subscribe(()=>{
      this.snackBar.open('Uspesno modifikovan racun: '+this.data.id,'OK', {
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
  public deleteRacun():void {
    this.racunService.deleteRacun(this.data.id).subscribe(()=>{
      this.snackBar.open('Uspesno obrisan racun: '+this.data.id,'OK', {
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
    this.snackBar.open('Odustali ste','Zatvori', {
      duration:1000
    })
  }
  selectRow(row) {
    console.log(row);
  }
}
//MatDialogRef-- referenca na dijalog 
//@Inject (MAT_DIALOG_DATA) public data: proizvod -- injektujemo podatke , kazemo da ce podaci bitu uskladisteni u okciru neke promenljive data (data je proizvod zato sto se radi o podacima o proizvodu )
//public proizvodService: ProizvodService-- da bi smo iscitali podatke i mogli da ih menjamo potrebna nam je instanca servisa 
//public snackBar: MatSnackBar-- sluzi da nam iskoci prozorce gde pise npr. uspesno ste dodali novi artikl 