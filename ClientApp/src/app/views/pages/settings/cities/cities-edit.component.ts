import { Component, Injectable, Inject } from '@angular/core';
import { MatSnackBar, MatBottomSheet, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { Headers, Http } from '@angular/http';
import { FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

/******************** Update Country ****************************/
@Component({
  selector: 'bottomsheetform',
  templateUrl: 'cities._form.html',
})
@Injectable()
export class Editcitybottomsheet {
  private countryid: number;
  cityName = new FormControl('', Validators.required);
  country = new FormControl('', Validators.required);
  public mainHeading: string = "Update City";
  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: any,private _bottomSheetRef: MatBottomSheetRef<Editcitybottomsheet>,private _bottomSheet: MatBottomSheet,private http: Http, private httpclient: HttpClient, public snackBar: MatSnackBar) {
    this.countryid = data.countryid[0];
    this.getintialvalues(data.countryid);
  }
  
  getintialvalues(countryid): void {
    const href = '/api/cities/'+countryid;
    this.httpclient.get<any>(href).subscribe(data => {
      this.cityName.setValue(data.name);
      this.country.setValue(data.countryCode);
    })
  }


  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
  ////////////////////////////////// Insert Modal ///////////////////////////////////

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
          id: this.countryid,
          Name: this.cityName.value,
          Country: this.country.value
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

  refresh(): void {
    document.getElementById('refresh-main-table').click();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  saveData(countrylist) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put('/api/cities',JSON.stringify(countrylist), { headers })
      .map(res=>res.json())
      .do(res => {
        //let res = JSON.parse(data);
        if(res.status==1){this.refresh();
          this.openSnackBar("City Added Successfully", "Dismiss");
          this.closeBottomSheet();
          this.refresh();
        }
        else if(res.status==-1){
          this.openSnackBar(res.msg, "Dismiss");
        }
        else if(res.status==0){
          this.openSnackBar("Unable to Add City", "Dismiss");
        }
        else{
          this.openSnackBar(res, "Dismiss");
        }
      });
  }
  
}