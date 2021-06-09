import { ViewChild } from '@angular/core';
import { Component,OnDestroy , Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { proizvod } from 'src/app/models/proizvod';
import { racun } from 'src/app/models/racun';
import { stavkaRacuna } from 'src/app/models/stavka-racuna';
import { StavkaRacunaService } from 'src/app/service/stavka-racuna.service';
import { StavkaRacunDialogComponent } from '../dialogs/stavka-racun-dialog/stavka-racun-dialog.component';

@Component({
  selector: 'app-stavka-racuna',
  templateUrl: './stavka-racuna.component.html',
  styleUrls: ['./stavka-racuna.component.css']
})
export class StavkaRacunaComponent implements OnInit,OnChanges,OnDestroy  {

  displayedColumns = ['id','redniBroj','kolicina','jedinicaMere','cena','racun','proizvod', 'actions'];
  dataSource: MatTableDataSource<stavkaRacuna>
  subscription: Subscription;
  @Input() selektovanRacun: racun;//stavak racun je child komponenta za komponentu proizvod i zato je omoguecna komunikacija 
  
  @ViewChild(MatSort,{static: false}) sort:MatSort // sluzi da bi povezali ts sa html
  @ViewChild(MatPaginator,{static: false}) paginator:MatPaginator // povezivanje sa paginatorom u html
  
  constructor(private stavkaRacunaService: StavkaRacunaService,
              private dialog:MatDialog) { }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(this.selektovanRacun.id){
      this.loadData();//na svaku promenu koja se napravi a odnosi se na selekciju racuna odradi loadData
    }
  }

  ngOnInit(): void {
   // this.loadData();
  }

  public loadData() {
    this.stavkaRacunaService.getStavkeZaRacun(this.selektovanRacun.id).subscribe(
      data => {
        this.dataSource= new MatTableDataSource(data);

        this.dataSource.filterPredicate = (data, filter: string) =>{
          const accumulator = (currentTerm, key) => {
            return key === 'proizvod' ? currentTerm + data.proizvod.naziv : currentTerm + data[key];
          };

          this.dataSource.sortingDataAccessor = (data, property) => {
            switch(property) {
              case 'proizvod': return data.proizvod.naziv.toLowerCase();
    
              default: return data[property];
            }
          };
          const dataStr = Object.keys(data).reduce(accumulator,'').toLowerCase();
          const transformedFilter = filter.trim().toLowerCase();
          return dataStr.indexOf(transformedFilter) !== -1;
        };
        this.dataSource.sort = this.sort;// ovaj sort to komentara ustv sadrzi podatak iz html o tome po cemu zelimo da sort
        this.dataSource.paginator = this.paginator;
      }
    ),
    (error: Error) => {
      console.log(error.name+' '+error.message);
    }
}
    
    public openDialog(flag:number,id?:number,redniBroj?:number,kolicina?:number,jedinicaMere?:string,cena?:number,racun?:racun,proizvod?:proizvod):void{
      const dialogRef = this.dialog.open(StavkaRacunDialogComponent,
        { data: {id,redniBroj,kolicina,jedinicaMere,cena,racun,proizvod}});

      dialogRef.componentInstance.flag=flag;
        if(flag===1) //ovim se proverava da li je uspesno izvrsena operacija zatvaranja 
        {
          dialogRef.componentInstance.data.racun=this.selektovanRacun;//nema potrebe da se omoguci korisniku da unese podatke od racuna jer se stavka racuna vrsi za taj neki odredjeni selektovani racun 
        }
        dialogRef.afterClosed().subscribe(result => {
          if(result===1) {
            this.loadData();
          }
        })
      }

      applayFilter(filterValue: string) {
        filterValue = filterValue.trim();
        filterValue = filterValue.toLocaleLowerCase();
        this.dataSource.filter = filterValue;
      }
    }


