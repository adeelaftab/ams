// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
// Partials
import { PartialsModule } from '../partials/partials.module';
// Pages
import { CoreModule } from '../../core/core.module';
import { Addnewcountrybottomsheet } from './settings/countries/countries-add.component';
import { Editcountrybottomsheet } from './settings/countries/countries-edit.component';
import { CountriesListComponent } from './settings/countries/countries-list.component';
import { DataTablesModule } from 'angular-datatables';
import {MaterialPreviewModule} from '../partials/content/general/material-preview/material-preview.module';
//// Modal
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//import { NgxMaskInputModule } from 'ngx-mask-input';
import { NgxMaskModule, IConfig } from 'ngx-mask'

// Forms stuff
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
	MatButtonModule,
	MatFormFieldModule,
	MatSelectModule,
	MatInputModule,
	MatRippleModule,
	MatRadioModule,
	MatIconModule
  } from '@angular/material';
  import { MatCheckboxModule } from '@angular/material/checkbox';
  import { MatBottomSheetModule } from '@angular/material/bottom-sheet';

//Datatable
import { MatTableModule } from '@angular/material'  
import { MatProgressSpinnerModule, MatTableDataSource, MatSortModule, MatPaginatorModule } from '@angular/material';
import { CitiesComponent } from './settings/cities/cities.component';
import { Addnewcitybottomsheet } from './settings/cities/cities-add.component';
import { Editcitybottomsheet } from './settings/cities/cities-edit.component';
 

export const options: Partial<IConfig> | (() => Partial<IConfig>) = {};

@NgModule({
	declarations: [CountriesListComponent, Editcountrybottomsheet, Addnewcountrybottomsheet, CitiesComponent, Addnewcitybottomsheet, Editcitybottomsheet],
	exports: [ ],
	imports: [
		CommonModule,
		HttpClientModule,
		DataTablesModule,
		MatProgressSpinnerModule,
		MatPaginatorModule,
		MatSortModule,
		MatTableModule,
		FormsModule,
		CoreModule,
		PartialsModule,
		MatButtonModule,
		MatFormFieldModule,
		MatInputModule,
		MatRippleModule,
		MatSelectModule,
		MatIconModule,
		MatRadioModule,
		ReactiveFormsModule,
		MaterialPreviewModule,
		MatBottomSheetModule,
		MatCheckboxModule,
		//NgxMaskInputModule,
		NgxMaskModule.forRoot(options),
		NgbModule
	],
	entryComponents: [ Addnewcountrybottomsheet, Editcountrybottomsheet, Addnewcitybottomsheet, Editcitybottomsheet ],
	providers: []
})
export class PagesModule {
}
