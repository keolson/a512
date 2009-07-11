
Ext.onReady(function(){
	//Ext.state.Manager.setProvider(new Ext.state.CookieProvider());
		/*	
	var baseData = [
		['Infomercial King Billy Mays Found Dead in his home', 745, 185, 'facebook,email,friendfeed'],
		['Critics Cringe at Ad for Burger King\'s Latest Sandwich', 10, 50, 'email,reddit,facebook'],
		['Court Rules for White Firefighters in Discrimination Case', 5, 200, 'facebook,digg,reddit'],
		['Obama Proposes More Training For The Unemployed', 800, 1000, 'email,digg,reddit'],
		['Infomercial King Billy Mays Found Dead in his home', 745, 185, 'facebook,email,friendfeed'],
		['Critics Cringe at Ad for Burger King\'s Latest Sandwich', 10, 50, 'email,reddit,facebook'],
		['Court Rules for White Firefighters in Discrimination Case', 5, 200, 'facebook,digg,reddit'],
		['Obama Proposes More Training For The Unemployed', 800, 1000, 'email,digg,reddit']

	];
			
	var store = new Ext.data.ArrayStore({
		fields: [ 
			{ name: 'title'},
			{ name: 'views', type: 'int' },
			{ name: 'shares', type: 'int' },
			{ name: 'services'}
		]
	});
	store.loadData(baseData);
		

	var ResultRecord = Ext.data.Record.create([
		{name: 'title'},
		{name: 'views'},
		{name: 'shares'},
		{name: 'services'}
	]);
		*/


		/*
		reader: new Ext.data.JsonReader({
			totalProperty: 'count',
			root: 'items',
		}, [
			{name: 'title'},
			{name: 'views'},
			{name: 'shares'},
			{name: 'services'}
		]),
		*/

	var store = new Ext.data.JsonStore({
		totalProperty: 'count',
		root: 'items',
		idProperty: 'num',
		fields: ['title', 'views', 'shares', 'services'],
		proxy: new Ext.data.HttpProxy({
			url: '../api/getResults.php',
		})
	});

	var tpl = new Ext.XTemplate( 
		'<tpl for=".">',
		'<div class="listElement">',
		    '<div class="resultTitle">{title}</div>',
		    '<div class="resultViews">{views}</div>',
		    '<div class="resultShares">{shares}</div>',
		    '<div class="resultServices">{[this.formatServices(values.services)]}</div>',
		'</div>',
		'</tpl>',
		{
			formatServices: function(services) {
				var arr = services.split(',');
				var returnStr = '';
				for ( var i = 0; i < arr.length; i++ ) {
					returnStr += '<div class="' + arr[i] + '_icon"></div>';
				}
				return returnStr;
			},
		}
	);

	var panel = new Ext.Panel({
		items: new Ext.DataView({                                                                                                                
			id: 'resultsView',
			store: store,
			tpl: tpl,
			itemSelector:'div.thumb-wrap',
		}),
		bbar: new Ext.PagingToolbar({
			pageSize: 4,
			store: store,
			displayInfo: true,
			displayMsg: 'Displaying topics {0} - {1} of {2}',
			
		})
	});
	panel.render('content');

	store.load( {params: { start: 0, limit: 3 } } );

		/*	
	var resultsView = new Ext.DataView({
		id: 'resultsView',
		store: store,
		tpl: tpl

	});
	resultsView.render('content');

	var listView = new Ext.ListView({
		store: store,
		columns: [
			{ itemCls: 'share_title', width: 200, dataIndex: 'content' },
			{ width: 50, dataIndex: 'views' },
			{ width: 50, dataIndex: 'shares' },
			{ width: 100, dataIndex: 'popular' }
		],
	});
			listView.render('content');
	*/

});
						