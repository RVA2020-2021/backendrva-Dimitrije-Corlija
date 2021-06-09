import { Component,Inject, OnInit,OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { proizvod } from 'src/app/models/proizvod';
import { racun } from 'src/app/models/racun';
import { stavkaRacuna } from 'src/app/models/stavka-racuna';
import { ProizvodService } from 'src/app/service/proizvod.service';
import { RacunService } from 'src/app/service/racun.service';
import { StavkaRacunaService } from 'src/app/service/stavka-racuna.service';
import { StavkaRacunaComponent } from '../../stavka-racuna/stavka-racuna.component';

@Component({
  selector: 'app-stavka-racun-dialog',
  templateUrl: './stavka-racun-dialog.component.html',
  styleUrls: ['./stavka-racun-dialog.component.css']
})
export class StavkaRacunDialogComponent implements OnInit,OnDestroy {
  proizvodi: proizvod[];
  public flag: number;
  proizvodSubscription: Subscription;

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<StavkaRacunaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: stavkaRacuna,
    public proizvodService: ProizvodService,
    public stavkaRacunaService: StavkaRacunaService) { }

  ngOnDestroy(): void {
   this.proizvodSubscription.unsubscribe();

  }

  ngOnInit(): void {
    this.proizvodSubscription = this.proizvodService.getAllProizvods().subscribe(
      data => {
        this.proizvodi = data;
      }
    ),
      (error: Error) => {
        console.log(error.name + ' ' + error.message);
      }
  }

  compareTo(a,b) {
    return a.id == b.id;
  }

  public addStavkaRacuna(): void {
    this.stavkaRacunaService.addStavkaRacuna(this.data)
    .subscribe(() => {
      this.snackBar.open('Stavka racuna uspešno dodata: ' + this.data.id, 'OK', {
        duration: 2500
      })
    }),
    (error: Error) => {
      console.log(error.name + ' ' +error.message);
      this.snackBar.open('Došlo je do greške prilikom dodavanja stavke racuna: ' + this.data.id, 'Zatvori', {
        duration: 2500
      })
    }
  }
  public updateStavkaRacuna(): void {
    this.stavkaRacunaService.updateStavkaRacuna(this.data)
    .subscribe(() => {
      this.snackBar.open('Stavka racuna uspešno izmenjena: ' + this.data.id, 'OK', {
        duration: 2500
      })
    }),
    (error: Error) => {
      console.log(error.name + ' ' +error.message);
      this.snackBar.open('Došlo je do greške prilikom izmene stavke racuna: ' + this.data.id, 'Zatvori', {
        duration: 2500
      })
    }
  }
  public deleteStavkaRacuna(): void {
    this.stavkaRacunaService.deleteStavkaRacuna(this.data.id)
    .subscribe(() => {
      this.snackBar.open('Stavka racuna uspešno obrisana: ' + this.data.id, 'OK', {
        duration: 2500
      })
    }),
    (error: Error) => {
      console.log(error.name + ' ' +error.message);
      this.snackBar.open('Došlo je do greške prilikom brisanja stavke racuna: ' + this.data.id, 'Zatvori', {
        duration: 2500
      })
    }
  }
  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste.' + this.data.id, 'Zatvori', {
      duration: 1000
    })
  }

}