import { Component, Injectable } from '@angular/core';
import { MatSnackBar, MatBottomSheet, MatBottomSheetRef } from '@angular/material';
import { Headers, Http } from '@angular/http';
import { FormControl, Validators } from '@angular/forms';

/******************** Add New Country ****************************/
@Component({
    selector: 'bottomsheetform',
    templateUrl: 'countries._form.html',
  })
  @Injectable()
  export class Addnewcountrybottomsheet {
    constructor(private _bottomSheetRef: MatBottomSheetRef<Addnewcountrybottomsheet>,private _bottomSheet: MatBottomSheet,private http: Http, public snackBar: MatSnackBar) {}
    public mainHeading: string = "Add New Country";
    
    openLink(event: MouseEvent): void {
      this._bottomSheetRef.dismiss();
      event.preventDefault();
    }
    ////////////////////////////////// Insert Modal ///////////////////////////////////
    countryName = new FormControl('', Validators.required);
    countryCode = new FormControl('', Validators.required);
  
    getErrorNameMessage() {
      return this.countryName.hasError('required') ? 'Country Name is required' :'';
    }
  
    getErrorCodeMessage() {
      return this.countryCode.hasError('required') ? 'Country Code is required' :'';
    }
    
    closeBottomSheet(): void {
      this._bottomSheet.dismiss();
    }
  
    saveCountryData() {
      if(this.countryName.value){
        if(this.countryCode.value){
          let countrylist = {
            Name: this.countryName.value,
            CountryCode: this.countryCode.value
          };
          this.saveData(countrylist).subscribe();
        }
        else{
          this.countryCode.invalid;
        }
      }
      else{
        this.countryName.invalid;
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