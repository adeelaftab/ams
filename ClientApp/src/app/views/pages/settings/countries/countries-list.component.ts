import { Component, ViewChild, AfterViewInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import { merge } from 'rxjs/observable/merge';
import { of as observableOf } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators/catchError';
import { map } from 'rxjs/operators/map';
import { startWith } from 'rxjs/operators/startWith';
import { switchMap } from 'rxjs/operators/switchMap';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {Http} from "@angular/http";
import { ExampleHttpDao} from "./countries.model";
import { Addnewcountrybottomsheet } from "./countries-add.component";
import { Editcountrybottomsheet } from "./countries-edit.component";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import Swal from 'sweetalert2';

/**
* @title Table retrieving data through HTTP
*/
@Component({
  selector: 'kt-countries-list',
  templateUrl: './countries-list.component.html',
  styleUrls: ['./countries-list.component.scss']
})

export class CountriesListComponent implements AfterViewInit {
  closeResult: string;
  searchfield: string;

  displayedColumns = ['buttons', 'name', 'countryCode']; //display Sequence
  exampleDatabase: ExampleHttpDao | null;
  dataSource = new MatTableDataSource();

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private HttpClient: HttpClient, private Http: Http, config: NgbModalConfig, private modalService: NgbModal,private _bottomSheet: MatBottomSheet, public snackBar: MatSnackBar) {
    config.backdrop = 'static';
    config.keyboard = false;
    
  }

  addnewBottomSheet(): void {
    this._bottomSheet.open(Addnewcountrybottomsheet);
  }
  

  editcountry(id: number): void {
    this._bottomSheet.open(Editcountrybottomsheet, {
      data: { countryid: id },
    });
  }

  deletecountry(id: number): void{
    Swal.fire({
      title: 'Are you sure want to delete it?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        const href = '/api/countries/'+id;
        this.Http.delete(href).subscribe(data => {
          var res = JSON.parse((<any>data)._body);
          this.snackBar.open(res.msg, "Dismiss", {
            duration: 3000,
          });
          this.refresh();
        })
      } 
    })
  }
  

  refresh() {
    this.paginator._changePageSize(this.paginator.pageSize); 
  }
  

  ngAfterViewInit() {
    this.exampleDatabase = new ExampleHttpDao(this.HttpClient);


    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.exampleDatabase!.getRepoIssues(this.searchfield,
            this.sort.active, this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize);
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.total_count;
          Object.keys(data.items).map((key)=>{ 
            return data.items[key]
          });
          return data.items;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          this.isRateLimitReached = true;
          return observableOf([]);
        }),
      ).subscribe(data => {
        this.isLoadingResults = false;
        this.isRateLimitReached = false;
        this.dataSource.data = data
      });
  }
}



