import { Component, Injectable } from '@angular/core';
import { MatSnackBar, MatBottomSheet, MatBottomSheetRef } from '@angular/material';
import { Headers, Http } from '@angular/http';
import { FormControl, Validators } from '@angular/forms';

/******************** Add New Country ****************************/
@Component({
    selector: 'bottomsheetform',
    templateUrl: 'cities._form.html',
  })
  @Injectable()
  export class Addnewcitybottomsheet {
    constructor(private _bottomSheetRef: MatBottomSheetRef<Addnewcitybottomsheet>,private _bottomSheet: MatBottomSheet,private http: Http, public snackBar: MatSnackBar) {}
    public mainHeading: string = "Add New City";
    
    openLink(event: MouseEvent): void {
      this._bottomSheetRef.dismiss();
      event.preventDefault();
    }
    ////////////////////////////////// Insert Modal ///////////////////////////////////
    cityName = new FormControl('', Validators.required);
    country = new FormControl('', Validators.required);
  
    getErrorNameMessage() {
      return this.cityName.hasError('required') ? 'City Name is required' :'';
    }
  
    getErrorCodeMessage() {
      return this.country.hasError('required') ? 'Country is required' :'';
    }
    
    closeBottomSheet(): void {
      this._bottomSheet.dismiss();
    }
  
    saveCountryData() {
      if(this.cityName.value){
        if(this.country.value){
          let countrylist = {
            Name: this.cityName.value,
            CountryCode: this.country.value
          };
          this.saveData(countrylist).subscribe();
        }
        else{
          this.country.invalid;
        }
      }
      else{
        this.cityName.invalid;
      }
    }
  
    openSnackBar(message: string, action: string) {
      this.snackBar.open(message, action, {
        duration: 3000,
      });
    }  
  
    refresh(): void {
      document.getElementById('refresh-main-table').click();
    }
  
    saveData(countrylist) {
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      return this.http.post('/api/countries',JSON.stringify(countrylist), { headers })
        .map(res=>res.json())
        .do(res => {
          //let res = JSON.parse(data);
          if(res.status==1){
            this.openSnackBar("Country Added Successfully", "Dismiss");
            this.closeBottomSheet();
            this.refresh();
          }
          else if(res.status==-1){
            this.openSnackBar(res.msg, "Dismiss");
          }
          else if(res.status==0){
            this.openSnackBar("Unable to Add Country", "Dismiss");
          }
          else{
            this.openSnackBar(res, "Dismiss");
          }
        });
    }
  }