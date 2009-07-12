Ext.ux.CustomPaging = Ext.extend(Object, {
	init : function(pbar){
		pbar.items.getRange()[0].hide();
		pbar.items.getRange()[8].hide();
		Ext.each(pbar.items.getRange(2,6), function(c){
			c.hide();
		});

		var pagingDivs= "";
		var numPages = 4;
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