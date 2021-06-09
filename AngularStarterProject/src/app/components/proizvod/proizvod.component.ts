import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { proizvod } from 'src/app/models/proizvod';
import { proizvodjac } from 'src/app/models/proizvodjac';
import { ProizvodService } from 'src/app/service/proizvod.service';
import { ProizvodDialogComponent } from '../dialogs/proizvod-dialog/proizvod-dialog.component';

@Component({
  selector: 'app-proizvod',
  templateUrl: './proizvod.component.html',
  styleUrls: ['./proizvod.component.css']
})
export class ProizvodComponent implements OnInit, OnDestroy {

  displayedColumns = ['id', 'naziv', 'proizvodjac', 'actions'];/* sluzi za definisanje kolona*/
  dataSource: MatTableDataSource<proizvod>;/* izvor podataka --- mattabledatasourc je omogucen od strane matTableModula koji je importovan u app.module.ts */
  subscription: Subscription;

  @ViewChild(MatSort, { static: false }) sort: MatSort // sluzi da bi povezali ts sa html
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator // povezivanje sa paginatorom u html


  constructor(private proizvodService: ProizvodService,
    private dialog: MatDialog) { } // ovim imamo pristup svim metodama koje su u okviru tog servisa deklarisane
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
    this.subscription = this.proizvodService.getAllProizvods().subscribe(
      data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.filterPredicate = (data, filter: string) => {
          const accumulator = (currentTerm, key) => {
            return key === 'proizvodjac' ? currentTerm + data.proizvodjac.naziv : currentTerm + data[key];
          };

          this.dataSource.sortingDataAccessor = (data, property) => {
            switch (property) {
              case 'proizvodjac': return data.proizvodjac.naziv.toLowerCase();

              default: return data[property];
            }
          };
          const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
          const transformedFilter = filter.trim().toLowerCase();
          return dataStr.indexOf(transformedFilter) !== -1;
        };
        this.dataSource.sort = this.sort;// ovaj sort to komentara ustv sadrzi podatak iz html o tome po cemu zelimo da sort
        this.dataSource.paginator = this.paginator;
      }
    ),
      (error: Error) => {
        console.log(error.name + ' ' + error.message);
      }
  }

  public openDialog(flag: number, id?: number, naziv?: string, proizvodjac?: proizvodjac): void {
    const dialogRef = this.dialog.open(ProizvodDialogComponent, { data: { id, naziv, proizvodjac } });

    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe(res => {
      if (res === 1) //ovim se proverava da li je uspesno izvrsena operacija zatvaranja 
      {
        this.loadData();//ponovo se ucitavaju podaci u tabeli 
      }
    })
  }


  applayFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLocaleLowerCase();
    this.dataSource.filter = filterValue;
  }



  //id?--? znaci da je to opcioni parametar da moze a i ne mora da se prosledi 
  //getAllProizvods -- mi smo rekli da je ova metoda neka observabla i sada mi na nju(taj tok podataka moramo da se subskrajbujemo) treba da se sabskrajbujemo i onda cemo mi te podatke smestiti u okciru neke data varijable  i prvo cemo ih ispisati na konzoli 
  //ngOnInit se izvrsava prilikom ucitavanja proizvodcomponent.ts--prva se izvrsava
}
