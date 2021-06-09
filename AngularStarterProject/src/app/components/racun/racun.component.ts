import { ViewChild } from '@angular/core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { racun } from 'src/app/models/racun';
import { RacunService } from 'src/app/service/racun.service';
import { RacunDialogComponent } from '../dialogs/racun-dialog/racun-dialog.component';

@Component({
  selector: 'app-racun',
  templateUrl: './racun.component.html',
  styleUrls: ['./racun.component.css']
})
export class RacunComponent implements OnInit, OnDestroy {
  displayedColumns = ['id', 'datum','nacinPlacanja','actions'];/* sluzi za definisanje kolona*/
  dataSource: MatTableDataSource<racun>;/* izvor podataka --- mattabledatasourc je omogucen od strane matTableModula koji je importovan u app.module.ts */
  subscription:Subscription;
  selektovanRacun1 :racun;

  @ViewChild(MatSort,{static: false}) sort:MatSort // sluzi da bi povezali ts sa html
  @ViewChild(MatPaginator,{static: false}) paginator:MatPaginator // povezivanje sa paginatorom u html

  constructor(private racunService: RacunService,
              private dialog:MatDialog) { } // ovim imamo pristup svim metodama koje su u okviru tog servisa deklarisane
  //MatDialog-- modalni dialog je dialog koji kada se otvori ne omogucava da se radi bilo sta drugo sve dok se ne klikne ok ili cancel(odnosno dok se nesto ne uradi)
  ngOnDestroy(): void {//zelimo da se unsubscrajbujemo
    this.subscription.unsubscribe();
    //ngOnDestroy govori sta ce se desiti ako se nasa komponenta unisti
    //zelimo da se unsubscrajb sa ove dole subskripcije a to radimo pravljenjem ove gore varijable subscription koju ubacujemo u loadData metodu -- sto znaci da ce se metoda na koju se subskrajbujemo ubaciti u tu nasu varijablu subscription 
  }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData() {
      this.subscription = this.racunService.getAllRacuns().subscribe(
        data => {
          this.dataSource= new MatTableDataSource(data);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }
      ),
      (error: Error) => {
        console.log(error.name+' '+error.message);
      }
  }
      
      public openDialog(flag:number,id?:number,datum?:Date,nacinPlacanja?:string):void{
        const dialogRef = this.dialog.open(RacunDialogComponent,{data: {id,datum,nacinPlacanja}});

        dialogRef.componentInstance.flag=flag;
        dialogRef.afterClosed().subscribe(res => {
          if(res===1) //ovim se proverava da li je uspesno izvrsena operacija zatvaranja 
          {
            this.loadData();//ponovo se ucitavaju podaci u tabeli 
          }
        })
      }

      selectRow(row:any) {
       this.selektovanRacun1=row;
      }

      applayFilter(filterValue: string) {
        filterValue = filterValue.trim();
        filterValue = filterValue.toLocaleLowerCase();
        this.dataSource.filter = filterValue;
      }
      
}
