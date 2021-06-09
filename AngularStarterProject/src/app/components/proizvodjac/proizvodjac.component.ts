import { Component, OnDestroy, OnInit,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { proizvodjac } from 'src/app/models/proizvodjac';
import { ProizvodjacService } from 'src/app/service/proizvodjac.service';
import { ProizvodjacDialogComponent } from '../dialogs/proizvodjac-dialog/proizvodjac-dialog.component';

@Component({
  selector: 'app-proizvodjac',
  templateUrl: './proizvodjac.component.html',
  styleUrls: ['./proizvodjac.component.css']
})
export class ProizvodjacComponent implements OnInit, OnDestroy {
  displayedColumns = ['id', 'naziv', 'adresa', 'kontakt', 'actions'];/* sluzi za definisanje kolona*/
  dataSource: MatTableDataSource<proizvodjac>;/* izvor podataka --- mattabledatasourc je omogucen od strane matTableModula koji je importovan u app.module.ts */
  subscription: Subscription;

  @ViewChild(MatSort, { static: false }) sort: MatSort // sluzi da bi povezali ts sa html
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator // povezivanje sa paginatorom u html


  constructor(private proizvodjacService: ProizvodjacService,
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
    this.subscription = this.proizvodjacService.getAllProizvodjacs().subscribe(
      data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    ),
      (error: Error) => {
        console.log(error.name + ' ' + error.message);
      }
  }

  public openDialog(flag: number, id?: number, naziv?: string, adresa?: string, kontakt?: string): void {
    const dialogRef = this.dialog.open(ProizvodjacDialogComponent, { data: { id, naziv, adresa, kontakt } });

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

}
