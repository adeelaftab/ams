import { Component, Injectable, Inject } from '@angular/core';
import { MatSnackBar, MatBottomSheet, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { Headers, Http } from '@angular/http';
import { FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

/******************** Update Country ****************************/
@Component({
  selector: 'bottomsheetform',
  templateUrl: 'countries._form.html',
})
@Injectable()
export class Editcountrybottomsheet {
  private countryid: number;
  countryName = new FormControl('', Validators.required);
  countryCode = new FormControl('', Validators.required);
  public mainHeading: string = "Update Country";
  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: any,private _bottomSheetRef: MatBottomSheetRef<Editcountrybottomsheet>,private _bottomSheet: MatBottomSheet,private http: Http, private httpclient: HttpClient, public snackBar: MatSnackBar) {
    this.countryid = data.countryid[0];
    this.getintialvalues(data.countryid);
  }
  
  getintialvalues(countryid): void {
    const href = '/api/countries/'+countryid;
    this.httpclient.get<any>(href).subscribe(data => {
      this.countryName.setValue(data.name);
      this.countryCode.setValue(data.countryCode);
    })
  }


  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
  ////////////////////////////////// Insert Modal ///////////////////////////////////

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
          id: this.countryid,
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
    return this.http.put('/api/countries',JSON.stringify(countrylist), { headers })
      .map(res=>res.json())
      .do(res => {
        //let res = JSON.parse(data);
        if(res.status==1){this.refresh();
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