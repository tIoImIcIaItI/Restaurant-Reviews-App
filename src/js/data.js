var venues = [
	{
		id: 1,
		name: 'Venue 1',
		imageUrl: 'http://placehold.it/128/aaaaaa',
		address: '1234 Some Place DR Captitol City, XY',
		pricing: 2,
		rating: 4,
		hours: [
		{ dow: '1', open: '10:00', close: '13:00' },
		{ dow: '2', open: '', close: '' },
		{ dow: '3', open: '', close: '' },
		{ dow: '4', open: '09:00', close: '17:00' },
		{ dow: '5', open: '09:00', close: '17:00' },
		{ dow: '6', open: '09:00', close: '21:00' },
		{ dow: '7', open: '07:00', close: '21:00' }
		],
		reviews: []
	}, {
		id: 2,
		name: 'Venue 2',
		imageUrl: 'http://placehold.it/128/aaaaaa',
		address: '5678 Some Other Place DR Suburbia, AB',
		pricing: 1,
		rating: 2,
		hours: [
		{ dow: '1', open: '', close: '' },
		{ dow: '2', open: '11:00', close: '17:00' },
		{ dow: '3', open: '11:00', close: '17:00' },
		{ dow: '4', open: '11:00', close: '17:00' },
		{ dow: '5', open: '11:00', close: '17:00' },
		{ dow: '6', open: '11:00', close: '21:00' },
		{ dow: '7', open: '', close: '' }
		],
		reviews: [
		{
			rating: 1,
			reviewer: 'Zapp Brannigan',
			date: '2016-09-07T20:53:39',
			comments: 'Viverra nulla, in fringilla posuere. Wisi eget. Donec pellentesque, sed facilisis dui. Pede in egestas, arcu tempor, aenean a dui.'
		}, {
			rating: 3,
			reviewer: 'Turanga Leela',
			date: '2016-03-21T15:34:09',
			comments: 'Magna pharetra massa. Ut mauris, orci bibendum, a nostrud massa. Nec lectus interdum, orci dolor, rutrum vulputate. Donec pharetra, nam nulla.'
		}]
	}, {
		id: 3,
		name: 'Venue 3',
		imageUrl: 'http://placehold.it/128/aaaaaa',
		address: '5599 Steeplechase DR Longmont, CO 80503',
		pricing: 3,
		rating: 5,
		hours: [
		{ dow: '1', open: '', close: '' },
		{ dow: '2', open: '11:00', close: '13:00' },
		{ dow: '2', open: '16:00', close: '17:00' },
		{ dow: '3', open: '', close: '' },
		{ dow: '4', open: '11:00', close: '13:00' },
		{ dow: '4', open: '16:00', close: '17:00' },
		{ dow: '5', open: '', close: '' },
		{ dow: '6', open: '11:00', close: '13:00' },
		{ dow: '6', open: '16:00', close: '17:00' },
		{ dow: '7', open: '', close: '' }
		],
		reviews: []
	}
];