Ext.ux.CustomPaging = Ext.extend(Object, {
	init : function(pbar){
		pbar.items.getRange()[0].hide();
		pbar.items.getRange()[8].hide();
		Ext.each(pbar.items.getRange(2,6), function(c){
			c.hide();
		});

		Ext.apply(pbar, {
			customNumPages: 1
		});

		pbar.insert(5, '<div id="pagingDotContainer"><div id="pagingDot1" class="pagingDot"></div></div>');

		pbar.on({
			change: function(pb, data){
				var pagingDivs = "";
				
				if(pb.customNumPages < data.pages){
					for( var i = pb.customNumPages + 1; i <= data.pages; i++ ){                                                    
						var headerTemplate = new Ext.Template(
							'<div id="pagingDot{num}" class="pagingDot"></div>'
						);
						headerTemplate.append('pagingDotContainer', {num: i} ) ;
					}
					pb.customNumPages = data.pages;
				} else if( pb.customNumPages > data.pages){
					for( var i = pb.customNumPages; i > data.pages; i-- ){                                                    
						Ext.fly('pagingDot' + i).remove();
					}
					pb.customNumPages = data.pages;
				}  
				Ext.fly('pagingDot' + data.activePage).radioClass('pagingDot_selected');
			}
		});

	}

});