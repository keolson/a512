Ext.ux.CustomPaging = Ext.extend(Object, {
	init : function(pbar){
		pbar.items.getRange()[0].hide();
		pbar.items.getRange()[8].hide();
//		pbar.items.getRange()[9].addItem({xtype:'-->'});
	//	pbar.items.getRange()[11].hide();
//		console.log(pbar.items);
		Ext.each(pbar.items.getRange(2,6), function(c){
			c.hide();
		});

		var pagingDivs= "";
		for( var i = 1; i <= 4; i++ ){
			pagingDivs += '<div id="pagingDot' + i + '" class="pagingDot"></div>';
		}
		pbar.insert(5, pagingDivs);

		pbar.on({
			change: function(pb, data){
				Ext.fly('pagingDot' + data.activePage).radioClass('pagingDot_selected');
			}
		});

	}

});