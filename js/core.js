
Ext.onReady(function(){
	//Ext.state.Manager.setProvider(new Ext.state.CookieProvider());

	var store = new Ext.ux.data.PagingStore({
		totalProperty: 'count',
		root: 'items',
		idProperty: 'num',
		fields: ['title', 'views', 'shares', 'services'],
		proxy: new Ext.data.HttpProxy({
			url: '../api/getResults.php',
		}),
		reader: new Ext.data.JsonReader({
			totalProperty: 'count',
			root: 'items',
		}, [
			{name: 'title'},
			{name: 'views'},
			{name: 'shares'},
			{name: 'services'}
		]),
		autoLoad: {params: {start: 0, limit: 4}}
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

	var pagebar = new Ext.PagingToolbar({
		pageSize: 4,
		store: store,
		ctCls:'pagingBar',
		plugins: new Ext.ux.CustomPaging(),
	});
	


	var panel = new Ext.Panel({
		items: new Ext.DataView({                                                                                                                
			id: 'resultsView',
			store: store,
			tpl: tpl,
			autoHeight:false,
			height:222,
			itemSelector:'div.thumb-wrap',
		}),
		bbar: pagebar
	});
	panel.render('content');

	store.load();

});
						