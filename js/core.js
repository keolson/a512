function genTopicCloud() {
    // Make an array of sample tags
    var sampleData = {
        results : [
            {tag: 'Social Security', count: 5},
            {tag: 'Retirement', count: 9},
            {tag: 'Savings Account', count: 5},
            {tag: 'Stock Trading', count: 7},
            {tag: 'Investment', count: 7},
        ]};

	var topicStore = new Ext.ux.data.PagingStore({
		totalProperty: 'topic_count',
		root: 'items',
		idProperty: 'num',
		fields: ['count', 'score', 'neigh'],
		proxy: new Ext.data.HttpProxy({
			url: '../api/getTopics.php',
		}),
		reader: new Ext.data.JsonReader({
			totalProperty: 'topic_count',
			root: 'topics',
		}, [
			{name: 'count'},
			{name: 'score'},
			{name: 'neigh'}
		]),
		autoLoad: { params: { start: 0, limit: 4, domain: 'foxnews.com', period: 30, topic: 'Obama' } }
	});
	
	sampleData.results.sort( function(){return (Math.round(Math.random())-0.5)});
    
          /* 
           * Here we use a MemoryProxy to read in the JSON data.
           * 
           * This store could potentially read from any source you'd like (in-memory
           * or stored server-side), and a variety of data formats from JSON, XML, 
           * or simple arrays using the variety of DataProxy and DataReader 
           * implementations supplied in Ext.data.
           */
    var ds = new Ext.data.Store({
        proxy: new Ext.data.MemoryProxy(sampleData),
        reader: new Ext.data.JsonReader({
            root: 'results',
            
              }, [
                  {name: 'tag'},
      			  {name: 'count'}
              ]),
        remoteSort: false
    });
	
    var cloud = new Ext.ux.TagCloud({
        store: topicStore, 
        displayField: 'neigh', 
        weightField: 'count', 
        displayWeight: false
    }
      							   );
	
    cloud.on('tagselect', function(cloud, record, index){
        alert('You clicked on "'+record.get('tag')+'"!');
    });
    cloud.render('cloud');
	
    ds.load();
}

function genContentList() {
	var store = new Ext.ux.data.PagingStore({
		totalProperty: 'url_count',
		root: 'items',
		idProperty: 'num',
		fields: ['title', 'url', 'views', 'shares', 'services'],
		proxy: new Ext.data.HttpProxy({
			url: '../api/getTopics.php',
		}),
		reader: new Ext.data.JsonReader({
			totalProperty: 'url_count',
			root: 'urls',
		}, [
			{name: 'title'},
			{name: 'url'},
			{name: 'views'},
			{name: 'shares'},
			{name: 'services'}
		]),
		autoLoad: { params: { start: 0, limit: 4, domain: 'foxnews.com', period: 30, topic: 'Obama' } }
	});

	var tpl = new Ext.XTemplate( 
		'<tpl for=".">',
		'<div class="listElement">',
		    '<div class="resultTitle"><a href="{url}">{[Ext.util.Format.ellipsis(values.title, 60, true)]}</a></div>',
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
}


Ext.onReady(function(){
	//Ext.state.Manager.setProvider(new Ext.state.CookieProvider());
	genTopicCloud();
	genContentList();

});
						