(function($){
	// node click function
	var clickBtn = function(){
		$('.tree li.parent_li > span').off('click').on('click', function(e) {
			var children = $(this).parent('li.parent_li').find(' > ul > li');
			if (children.is(":visible")) {
				children.hide('fast');
				$(this).attr('node-status', 'closed').find(' > span').removeClass('glyphicon-minus').addClass('glyphicon-plus');
			} else {
				children.show('fast');
				$(this).attr('node-status', 'open').find(' > span').removeClass('glyphicon-plus').addClass('glyphicon-minus');
			};
			e.stopPropagation();
		});
	};
	// functions
	var method = {
			closeAll: function() {
				$('.tree li.parent_li > span').each(function(){
					if($(this).parent('li.parent_li').find(' > ul > li').is(':visible'))
						$(this).trigger('click');
				});
			},
			openAll: function() {
				$('.tree li.parent_li > span').each(function(){
					if($(this).parent('li.parent_li').find(' > ul > li').is(':hidden'))
						$(this).trigger('click');
				});
			}
	};
	// default parameter
	var defaults = {
			openOnLoad: true,
			openedNodeIcon: 'glyphicon-minus',
			closedNodeIcon: 'glyphicon-plus',
			leafNodeIcon: 'glyphicon-leaf'
	};
	// init
	var init = function() {
		$('.tree li:has(ul)').addClass('parent_li').find(' > span').attr('node-status', 'open');
		if($('.tree li > span').children().length > 0){
			console.log($('.tree li > span').html());
			return;
		}
		$('.tree li:has(ul)').find(' > span').prepend('<span class="glyphicon glyphicon-minus" aria-hidden="true"></span>');
		$('.tree li[class!=parent_li]').find(' > span').prepend('<span class="glyphicon glyphicon-leaf" aria-hidden="true"></span>');
	};
	
	$.fn.bootstrapTree = function(options) {
		$(this).addClass('tree');
		init();
		clickBtn();
		return this.each(function(){
			var $this = $(this);
			// when event
			if (typeof options == 'string') {
				console.log('ready to execute ' + options + ' function.');
				if (options == 'closeAll') {
					method.closeAll();
				};
				if (options == 'openAll') {
					method.openAll();
				}
			};
			// when parameter
			if (typeof options == 'object') {
				var settings = $.extend({}, defaults, options);
				//icon
				var openedNodeIcon = settings.openedNodeIcon;
				var closedNodeIcon = settings.closedNodeIcon;
				var leafNodeIcon = settings.leafNodeIcon;
				// openOnLoad
				if(!settings.openOnLoad) {
					$('.tree li.parent_li > span').attr('node-status', 'closed').find(' > span').removeClass(openedNodeIcon).addClass(closedNodeIcon);
					$('.tree li.parent_li').find(' > ul > li').hide();
				};
				
			};
		});
	};
})(jQuery);