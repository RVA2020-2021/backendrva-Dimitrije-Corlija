import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { HomeComponent } from './components/core/home/home.component';
import { AuthorComponent } from './components/core/author/author.component';
import { ProizvodjacComponent } from './components/proizvodjac/proizvodjac.component';
import { ProizvodComponent } from './components/proizvod/proizvod.component';
import { RacunComponent } from './components/racun/racun.component';
import { StavkaRacunaComponent } from './components/stavka-racuna/stavka-racuna.component';
import { AboutComponent } from './components/core/about/about.component';


import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table'
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ProizvodDialogComponent } from './components/dialogs/proizvod-dialog/proizvod-dialog.component'
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { RacunDialogComponent } from './components/dialogs/racun-dialog/racun-dialog.component';
import { ProizvodjacDialogComponent } from './components/dialogs/proizvodjac-dialog/proizvodjac-dialog.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { StavkaRacunDialogComponent } from './components/dialogs/stavka-racun-dialog/stavka-racun-dialog.component';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthorComponent,
    ProizvodComponent,
    ProizvodjacComponent,
    RacunComponent,
    StavkaRacunaComponent,
    AboutComponent,
    ProizvodDialogComponent,
    RacunDialogComponent,
    ProizvodjacDialogComponent,
    StavkaRacunDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatGridListModule,
    MatExpansionModule,
    MatTableModule,
    HttpClientModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatDatepickerModule,
    MatSelectModule,
    MatNativeDateModule,
    MatSortModule,
    MatPaginatorModule,
    FormsModule
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
