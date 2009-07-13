function genTopicCloud() {
	topicStore = new Ext.ux.data.PagingStore({
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
			{name: 'tag', mapping: 'neigh'}
		]),
		autoLoad: { params: { start: 0, limit: 20, domain: 'foxnews.com', period: 30, topic: 'Obama' } }
	});
	
		//sampleData.results.sort( function(){return (Math.round(Math.random())-0.5)});
    
    var cloud = new Ext.ux.TagCloud({
        store: topicStore, 
        displayField: 'tag', 
        weightField: 'count', 
        displayWeight: false
    }
      							   );
    cloud.on('tagselect', function(cloud, record, index){
			//        alert('You clicked on "'+record.get('tag')+'"!');
		delete contentStore.lastParams;
		contentStore.load( { params: { start: 0, limit: 4, domain: 'foxnews.com', period: 30, topic: record.get('tag') } });
    });
    cloud.render('cloud');
}

function genContentList() {
	contentStore = new Ext.ux.data.PagingStore({
		totalProperty: 'url_count',
		root: 'items',
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
		store: contentStore,
		ctCls:'pagingBar',
		plugins: new Ext.ux.CustomPaging(),
	});
	
	var panel = new Ext.Panel({
		items: new Ext.DataView({                                                                                                                
			id: 'resultsView',
			store: contentStore,
			tpl: tpl,
			height:222,
			itemSelector:'div.thumb-wrap',
		}),
		bbar: pagebar,
		border: false,

	});
	panel.render('content');
}

var contentStore;
var topicStore;

Ext.onReady(function(){
	//Ext.state.Manager.setProvider(new Ext.state.CookieProvider());
	genTopicCloud();
	genContentList();

});
						