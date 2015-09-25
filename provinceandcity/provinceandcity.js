(function($){
	var ProvinceAndCity = function(options){
		this.defaults = {
				province: '#province',
				city: '#city',
				district: '#district'
		}
		this.settings = $.extend(true, {}, this.defaults, options);
		this.init();
		
	}
	ProvinceAndCity.prototype = {
			init: function(){
				this.$p = $(this.settings.province);
				this.$c = $(this.settings.city);
				this.$d = $(this.settings.district);
				var pStr = '';
				for (var i = 0; i < allCity.length; i++) {
					var pro = allCity[i];
					pStr = pStr + '<option value="' + i + '">' + pro.name + '</option>';
				}
				var p = this.$p;
				var c = this.$c;
				var d = this.$d;
				p.html(pStr).on('change', function(){
					var pId = $(this).val();
					var cs = allCity[pId].sub;
					var cStr = '';
					for (var i = 0; i < cs.length; i++) {
						var city = cs[i];
						cStr = cStr + '<option value="' + i + '">' + city.name + '</option>'; 
					}
					c.html(cStr)
					c.trigger('change');
				});
				c.on('change', function(){
					var pId = p.val();
					var cId = $(this).val();
					var ds = allCity[pId].sub[cId].sub;
					var dStr = '';
					for (var i = 0; i < ds.length; i++) {
						var district = ds[i];
						dStr = dStr + '<option value="' + district.id + '">' + district.name + '</option>';
					}
					d.html(dStr);
				});
				p.trigger('change');
				
			},
			setOptions: function(options){
				
			}
	}
	$.provinceAndCity = function(options){
		var args = arguments;
		var data = new ProvinceAndCity(options);
		if (typeof options == 'string') {
			if (data[options]) {
				data[options].apply(data, Array.prototype.slice.call(args, 1));
			} else {
				throw options + '方法不存在';
			}
		} else {
			data.setOptions(options);
		}
	}
	$.provinceAndCity.Constructor = ProvinceAndCity;
})(window.jQuery)