(function (global) {
	'use strict';

	global.venues = [
	{
		id: 1,
		name: 'Venue 1',
		imageUrl: 'http://placehold.it/128/aaaaaa',
		address: '1234 Some Place DR Capital City, XY',
		pricing: 2,
		rating: 5,
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
		rating: 3,
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
		reviews: [
		{
			rating: 1,
			reviewer: 'Zapp Brannigan',
			date: '2014-09-07T20:53:39',
			comments: 'Viverra nulla, in fringilla posuere. Wisi eget. Donec pellentesque, sed facilisis dui. Pede in egestas, arcu tempor, aenean a dui.'
		}, {
			rating: 3,
			reviewer: 'Turanga Leela',
			date: '2015-03-21T15:34:09',
			comments: 'Magna pharetra massa. Ut mauris, orci bibendum, a nostrud massa. Nec lectus interdum, orci dolor, rutrum vulputate. Donec pharetra, nam nulla.'
		}, {
			rating: 4,
			reviewer: 'Foo Bar',
			date: '2016-05-22T11:15:23',
			comments: 'Dapibus diam facilisis et risus elementum, dui amet, vivamus suspendisse commodo proin sit nemo augue, et tincidunt suspendisse pharetra sit eleifend etiam, velit curabitur posuere dolor dui in phasellus. In turpis libero magna. Nulla consectetuer. Et sit nulla dictum sit.'
		}]
	}, {
		id: 4,
		name: 'Venue 4',
		imageUrl: 'http://placehold.it/128/aaaaaa',
		address: '1234 Foo AVE Bar, CO 98765',
		pricing: 3,
		rating: 3,
		hours: [
		{ dow: '1', open: '11:00', close: '17:00' },
		{ dow: '2', open: '', close: '' },
		{ dow: '3', open: '', close: '' },
		{ dow: '4', open: '11:00', close: '17:00' },
		{ dow: '5', open: '11:00', close: '17:00' },
		{ dow: '6', open: '11:00', close: '21:00' },
		{ dow: '7', open: '', close: '' }
		],
		reviews: [
		{
			rating: 1,
			reviewer: 'Zapp Brannigan',
			date: '2014-09-07T20:53:39',
			comments: 'Viverra nulla, in fringilla posuere. Wisi eget. Donec pellentesque, sed facilisis dui. Pede in egestas, arcu tempor, aenean a dui.'
		}, {
			rating: 3,
			reviewer: 'Turanga Leela',
			date: '2015-03-21T15:34:09',
			comments: 'Magna pharetra massa. Ut mauris, orci bibendum, a nostrud massa. Nec lectus interdum, orci dolor, rutrum vulputate. Donec pharetra, nam nulla.'
		}, {
			rating: 4,
			reviewer: 'Foo Bar',
			date: '2016-05-22T11:15:23',
			comments: 'Dapibus diam facilisis et risus elementum, dui amet, vivamus suspendisse commodo proin sit nemo augue, et tincidunt suspendisse pharetra sit eleifend etiam, velit curabitur posuere dolor dui in phasellus. In turpis libero magna. Nulla consectetuer. Et sit nulla dictum sit.'
		}, {
			rating: 5,
			reviewer: 'adsf dfsg',
			date: '2016-02-22T11:15:23',
			comments: 'Dapibus diam facilisis et risus elementum, dui amet, vivamus suspendisse commodo proin sit nemo augue, et tincidunt suspendisse pharetra sit eleifend etiam, velit curabitur posuere dolor dui in phasellus. In turpis libero magna. Nulla consectetuer. Et sit nulla dictum sit.'
		}, {
			rating: 4,
			reviewer: 'yrtyy rtyuty',
			date: '2016-03-22T11:15:23',
			comments: 'Dapibus diam facilisis et risus elementum, dui amet, vivamus suspendisse commodo proin sit nemo augue, et tincidunt suspendisse pharetra sit eleifend etiam, velit curabitur posuere dolor dui in phasellus. In turpis libero magna. Nulla consectetuer. Et sit nulla dictum sit.'
		}]
	}, {
		id: 5,
		name: 'Venue 5',
		imageUrl: 'http://placehold.it/128/aaaaaa',
		address: 'ryrtyt Csd BLVD Qeswrwwer Wre, CO 52163',
		pricing: 3,
		rating: 3,
		hours: [
		{ dow: '1', open: '11:00', close: '17:00' },
		{ dow: '2', open: '', close: '' },
		{ dow: '3', open: '', close: '' },
		{ dow: '4', open: '11:00', close: '17:00' },
		{ dow: '5', open: '11:00', close: '17:00' },
		{ dow: '6', open: '11:00', close: '21:00' },
		{ dow: '7', open: '', close: '' }
		],
		reviews: [
		{
			rating: 1,
			reviewer: 'Zapp Brannigan',
			date: '2014-09-07T20:53:39',
			comments: 'Viverra nulla, in fringilla posuere. Wisi eget. Donec pellentesque, sed facilisis dui. Pede in egestas, arcu tempor, aenean a dui.'
		}, {
			rating: 3,
			reviewer: 'Turanga Leela',
			date: '2015-03-21T15:34:09',
			comments: 'Magna pharetra massa. Ut mauris, orci bibendum, a nostrud massa. Nec lectus interdum, orci dolor, rutrum vulputate. Donec pharetra, nam nulla.'
		}, {
			rating: 4,
			reviewer: 'Foo Bar',
			date: '2016-05-22T11:15:23',
			comments: 'Dapibus diam facilisis et risus elementum, dui amet, vivamus suspendisse commodo proin sit nemo augue, et tincidunt suspendisse pharetra sit eleifend etiam, velit curabitur posuere dolor dui in phasellus. In turpis libero magna. Nulla consectetuer. Et sit nulla dictum sit.'
		}, {
			rating: 5,
			reviewer: 'adsf dfsg',
			date: '2016-02-22T11:15:23',
			comments: 'Dapibus diam facilisis et risus elementum, dui amet, vivamus suspendisse commodo proin sit nemo augue, et tincidunt suspendisse pharetra sit eleifend etiam, velit curabitur posuere dolor dui in phasellus. In turpis libero magna. Nulla consectetuer. Et sit nulla dictum sit.'
		}, {
			rating: 4,
			reviewer: 'yrtyy rtyuty',
			date: '2016-03-22T11:15:23',
			comments: 'Dapibus diam facilisis et risus elementum, dui amet, vivamus suspendisse commodo proin sit nemo augue, et tincidunt suspendisse pharetra sit eleifend etiam, velit curabitur posuere dolor dui in phasellus. In turpis libero magna. Nulla consectetuer. Et sit nulla dictum sit.'
		}]
	}, {
		id: 6,
		name: 'Venue 6',
		imageUrl: 'http://placehold.it/128/aaaaaa',
		address: '567 Efsg ST Vsdfd, CO 54564',
		pricing: 3,
		rating: 3,
		hours: [
		{ dow: '1', open: '11:00', close: '23:00' },
		{ dow: '7', open: '10:00', close: '22:00' },
		],
		reviews: [
		{
			rating: 1,
			reviewer: 'Zapp Brannigan',
			date: '2014-09-07T20:53:39',
			comments: 'Viverra nulla, in fringilla posuere. Wisi eget. Donec pellentesque, sed facilisis dui. Pede in egestas, arcu tempor, aenean a dui.'
		}, {
			rating: 3,
			reviewer: 'Turanga Leela',
			date: '2015-03-21T15:34:09',
			comments: 'Magna pharetra massa. Ut mauris, orci bibendum, a nostrud massa. Nec lectus interdum, orci dolor, rutrum vulputate. Donec pharetra, nam nulla.'
		}, {
			rating: 4,
			reviewer: 'Foo Bar',
			date: '2016-05-22T11:15:23',
			comments: 'Dapibus diam facilisis et risus elementum, dui amet, vivamus suspendisse commodo proin sit nemo augue, et tincidunt suspendisse pharetra sit eleifend etiam, velit curabitur posuere dolor dui in phasellus. In turpis libero magna. Nulla consectetuer. Et sit nulla dictum sit.'
		}, {
			rating: 5,
			reviewer: 'adsf dfsg',
			date: '2016-02-22T11:15:23',
			comments: 'Dapibus diam facilisis et risus elementum, dui amet, vivamus suspendisse commodo proin sit nemo augue, et tincidunt suspendisse pharetra sit eleifend etiam, velit curabitur posuere dolor dui in phasellus. In turpis libero magna. Nulla consectetuer. Et sit nulla dictum sit.'
		}, {
			rating: 4,
			reviewer: 'yrtyy rtyuty',
			date: '2016-03-22T11:15:23',
			comments: 'Dapibus diam facilisis et risus elementum, dui amet, vivamus suspendisse commodo proin sit nemo augue, et tincidunt suspendisse pharetra sit eleifend etiam, velit curabitur posuere dolor dui in phasellus. In turpis libero magna. Nulla consectetuer. Et sit nulla dictum sit.'
		}]
	}
	];

	// ReSharper disable once ThisInGlobalContext
}(this));