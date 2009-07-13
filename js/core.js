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
		autoLoad: { params: { start: 0, limit: 20, domain: currentDomain, period: currentPeriod, topic: currentTopic } }
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
		currentTopic = record.get('tag');

		var staticEl = new Ext.Element({
			tag: 'div',
			id: 'header',
			html: 'Discover more about:'
		});
		var dynEl = new Ext.Element({
			tag: 'div',
			id: 'headerTopic',
			html: currentTopic
		});

			//		Ext.fly('header').appendChild(dynEl);

			//		Ext.fly('header').replaceWith(staticEl);

		reload();
    });
    cloud.render('cloud');
}

function genFilter() {
	Ext.each( [1, 7, 30], function(period){
		Ext.fly(period + 'dayFilter').on('click', function(e, t) {	
			currentPeriod = period;
			Ext.fly(period + 'dayFilter').radioClass('selected');
			reload();
		});	
	});
}

function reload() {
	topicStore.load( { params: { start: 0, limit: 4, domain: currentDomain, period: currentPeriod, topic: currentTopic } });
	contentStore.load( { params: { start: 0, limit: 4, domain: currentDomain, period: currentPeriod, topic: currentTopic } });
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
			autoLoad: { params: { start: 0, limit: 4, domain: currentDomain, period: currentPeriod, topic: currentTopic } }
	});
	
	var tpl = new Ext.XTemplate( 
		'<tpl for=".">',
		'<div class="listElement">',
		    '<div class="resultTitle"><a href="{url}" title="{title}" target="_blank">{[Ext.util.Format.ellipsis(values.title, 60, true)]}</a></div>',
		    '<div class="resultViews">viewed {views}</div>',
			'<div class="separator"></div>',
		    '<div class="resultShares">shared {shares}</div>',
			'<div class="separator"></div>',
		    '<div class="resultServices">most shared on {[this.formatServices(values.services)]}</div>',
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
			itemSelector:'div.thumb-wrap',
		}),
		bbar: pagebar,
		border: false,

	});
	panel.render('content');
}

var contentStore;
var topicStore;
var currentTopic = "Obama";
var currentDomain = "foxnews.com";
var currentPeriod = 30;

Ext.override(Ext.PagingToolbar, {
    refresh: function(){
        currentTopic = "Obama";
        currentPeriod = 30;

        delete this.store.lastParams;
        topicStore.load( { params: { start: 0, limit: 4, domain: currentDomain, period: currentPeriod, topic: currentTopic } });
        contentStore.load( { params: { start: 0, limit: 4, domain: currentDomain, period: currentPeriod, topic: currentTopic } });
    }
});

Ext.onReady(function(){
	//Ext.state.Manager.setProvider(new Ext.state.CookieProvider());
	genTopicCloud();
	genFilter();
	genContentList();

	

});
						