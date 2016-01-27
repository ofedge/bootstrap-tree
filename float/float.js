(function($){
	var Float = function(element, options){
		this.element = element;
		this.defaults = {
			size: 0,
			count: 10,
			html : '123<br>',
			func: function(){}
		}
		this.settings = $.extend(true, {}, this.defaults, options);
		this.init();
	};
	Float.prototype = {
		init: function(){
			var $element = $(this.element);
			var nScrollHeight = 0;
			var nScrollTop = 0;
			var nDivHight = $element.height();
			var settings = this.settings;
			$element.on('scroll', function(){
				settings.func();
				nScrollHeight = $(this)[0].scrollHeight;
				nScrollTop = $(this).scrollTop();
				if (nScrollTop + nDivHight + settings.size >= nScrollHeight){
					for(var i = 0; i < settings.count; i++){
						$element.append(typeof(settings.html) == 'function' ? settings.html() : settings.html);
					}
				}
			});
		}
	};
	$.fn.float = function(options){
		var args = arguments;
		$(this).each(function(index, dom){
			var $this = $(this);
			var data = $this.data('float');
			if (!data){
				data = new Float(dom, options);
				$(data.$element).data('float', data);
			}
		})
	};
	$.fn.float.constructor = Float;
})(window.jQuery);
