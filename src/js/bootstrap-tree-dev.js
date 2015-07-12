(function($){
	// 定义 BootstrapTree 构造函数
	var BootStrapTree = function(element, options) {
		this.element = element;
		this.defaults = {
			bootstrapversion: 3,
			openOnLoad: true,
			icons: {
				openedNodeIcon: 'glyphicon-minus',
				closedNodeIcon: 'glyphicon-plus',
				leafNodeIcon: 'glyphicon-leaf'
			}
		};
		this.settings = $.extend(true, {}, this.defaults, options);
		this.initialize();
	};
	BootstrapTree.prototye = {
			initialize: function() {
				this.$element = $(this.element);
				var icons = this.settings.icons;
				var openedNodeIcon = icons.openedNodeIcon;
				var leafNodeIcon = icons.leafNodeIcon;
				$element.find('li:has(ul)').addClass('parent_li').find(' > span').attr('node-status', 'open');
				$element.find('li:has(ul)').find(' > span').prepend('<span class="glyphicon ' + openedNodeIcon + '" aria-hidden="true"></span>');
				$element.find('li[class!=parent_li]').find(' > span').prepend('<span class="glyphicon ' + leafNodeIcon + '" aria-hidden="true"></span>');
				this.bindClick(element, settings);
			},
			bindClick: function() {
				var icons = this.settings.icons;
				var openedNodeIcon = icons.openedNodeIcon;
				var closedNodeIcon = icons.closedNodeIcon;
				$element.find('li.parent_li > span').on('click', function(e) {
					var children = $(this).parent('li.parent_li').find(' > ul > li');
					if (children.is(":visible")) {
						children.hide('fast');
						$(this).attr('node-status', 'closed').find(' > span').removeClass(openedNodeIcon).addClass(closedNodeIcon);
					} else {
						children.show('fast');
						$(this).attr('node-status', 'open').find(' > span').removeClass(closedNodeIcon).addClass(openedNodeIcon);
					};
					e.stopPropagation();
				});
			},
			closeAll: function() {
				return $element.find('li.parent_li > span').each(function(){
					if($(this).parent('li.parent_li').find(' > ul > li').is(':visible'))
						$(this).trigger('click', $.fn.bootstrapTree.settings.icons);
				});
			},
			openAll: function() {
				$element.find('li.parent_li > span').each(function(){
					if($(this).parent('li.parent_li').find(' > ul > li').is(':hidden'))
						$(this).trigger('click', $.fn.bootstrapTree.settings.icons);
				});
			},
			init: function() {
				return $element.each(function(){
					if(!$element.data('bootstrapTree')){
						this.bindClick();
					};
				});
			},
	};
	$.fn.bootstrapTree = function(options) {
		var args = arguments;
		
		return $(this).each(function(index, dom){
			var $this = $(dom);
			data = $this.data('bootstrapTree');
			if(!data){
				data = new BootStrapTree(dom, options);
				$this = data.element;
				$this.data('bootstrapTree', data);
			};
			
		});
	};
	$.fn.bootstrapTree.Constructor = BootstrapTree;
})(window.jQuery);