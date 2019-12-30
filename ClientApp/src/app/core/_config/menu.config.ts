export class MenuConfig {
	public defaults: any = {
		header: {
			self: {},
			items: [
				{
					title: 'Dashboards',
					root: true,
					alignment: 'left',
					page: '/dashboard',
					translate: 'MENU.DASHBOARD',
				},
				{
					title: 'Settings',
					root: true,
					alignment: 'left',
					toggle: 'hover',
					submenu: [
						{
							title: 'Flat',
							icon: 'flaticon2-list-2',
							page: '/Flats'
						},
						{
							title: 'Building',
							icon: 'flaticon2-list-2',
							page: '/Flats'
						},
						{
							title: 'Flat Type',
							icon: 'flaticon2-list-2',
							page: '/Flats'
						},
						{
							title: 'Customer',
							icon: 'flaticon2-list-2',
							page: '/Flats'
						},
						{
							title: 'Nationality',
							icon: 'flaticon2-list-2',
							page: '/nationalities'
						},
						{
							title: 'Cities',
							icon: 'flaticon2-list-2',
							page: '/cities'
						},
						{
							title: 'Countries',
							icon: 'flaticon2-list-2',
							page: '/countries'
						}
					]
				},
			]
		},
	};

	public get configs(): any {
		return this.defaults;
	}
}
