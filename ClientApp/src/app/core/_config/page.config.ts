export class PageConfig {
	public defaults: any = {
		dashboard: {
			page: {
				title: 'Dashboard',
				desc: 'Latest updates and statistic charts'
			},
		},
		countries: {
			page: {title: 'Countries', desc: 'List All'}
		},
		cities: {
			page: {title: 'Cities', desc: 'List All'}
		},
		error: {
			404: {
				page: {title: '404 Not Found', desc: '', subheader: false}
			},
			403: {
				page: {title: '403 Access Forbidden', desc: '', subheader: false}
			}
		},
		wizard: {
			'wizard-1': {page: {title: 'Wizard 1', desc: ''}},
			'wizard-2': {page: {title: 'Wizard 2', desc: ''}},
			'wizard-3': {page: {title: 'Wizard 3', desc: ''}},
			'wizard-4': {page: {title: 'Wizard 4', desc: ''}},
		},
	};

	public get configs(): any {
		return this.defaults;
	}
}
