import { CountriesListComponent } from './views/pages/settings/countries/countries-list.component';
import { CitiesComponent } from './views/pages/settings/cities/cities.component';
// Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Components
import { BaseComponent } from './views/theme/base/base.component';
import { ErrorPageComponent } from './views/theme/content/error-page/error-page.component';
// Auth
import { AuthGuard } from './core/auth';

const routes: Routes = [
	{path: 'auth', loadChildren: () => import('./views/pages/auth/auth.module').then(m => m.AuthModule)},

	{
		path: '',
		component: BaseComponent,
		canActivate: [AuthGuard],
		children: [
			{
				path: 'dashboard',
				loadChildren: () => import('./views/pages/dashboard/dashboard.module').then(m => m.DashboardModule)
			},
			{
			  path: 'countries', // <= Page URL
			  component: CountriesListComponent // <= Page component registration
			},
			{
			  path: 'cities', // <= Page URL
			  component: CitiesComponent // <= Page component registration
			},
			{
				path: 'error/403',
				component: ErrorPageComponent,
				data: {
					type: 'error-v6',
					code: 403,
					title: '403... Access forbidden',
					desc: 'Looks like you don\'t have permission to access for requested page.<br> Please, contact administrator'
				}
			},
			{path: 'error/:type', component: ErrorPageComponent},
			{path: '', redirectTo: 'dashboard', pathMatch: 'full'},
			{path: '**', redirectTo: 'dashboard', pathMatch: 'full'}
		]
	},

	{path: '**', redirectTo: 'error/403', pathMatch: 'full'},
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes)
	],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
