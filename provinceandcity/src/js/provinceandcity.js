(function($){
	var ProvinceAndCity = function(options){
		this.defaults = {
				province: '#province',
				city: '#city',
				district: '#district',
				provinceValue: undefined,
				cityValue: undefined,
				districtValue: undefined,
				textValue: false
		}
		this.settings = $.extend(true, {}, this.defaults, options);
		this.init();
		
	}
	ProvinceAndCity.prototype = {
			init: function(){
				var $p = $(this.settings.province);
				var $c = $(this.settings.city);
				var $d = $(this.settings.district);
				var textValue = this.settings.textValue;
				var pStr = '';
				for (var i = 0; i < allCity.length; i++) {
					var pro = allCity[i];
					var key = textValue ? pro.name : i;
					pStr = pStr + '<option value="' + key + '">' + pro.name + '</option>';
				}
				$p.html(pStr).off('change').on('change', function(){
					var pId = $(this).find('option[value=' + $(this).val() + ']').index();
					var cs = allCity[pId].sub;
					var cStr = '';
					for (var i = 0; i < cs.length; i++) {
						var city = cs[i];
						var key = textValue ? city.name : i;
						cStr = cStr + '<option value="' + key + '">' + city.name + '</option>'; 
					}
					$c.html(cStr)
					$c.trigger('change');
				});
				$c.off('change').on('change', function(){
					var pId = $p.find('option[value=' + $p.val() + ']').index();
					var cId = $(this).find('option[value=' + $(this).val() + ']').index();
					var ds = allCity[pId].sub[cId].sub;
					var dStr = '';
					for (var i = 0; i < ds.length; i++) {
						var district = ds[i];
						var key = textValue ? district.name : district.id;
						dStr = dStr + '<option value="' + key + '">' + district.name + '</option>';
					}
					$d.html(dStr).trigger('change'); // in case of other change event
				});
				$p.trigger('change');
				if(this.settings.provinceValue){
					$p.find('option:contains(' + this.settings.provinceValue + ')').prop('selected', true);
					$p.trigger('change');
				}
				if(this.settings.cityValue){
					$c.find('option:contains(' + this.settings.cityValue + ')').prop('selected', true);
					$c.trigger('change');
				}
				if(this.settings.districtValue){
					$d.find('option:contains(' + this.settings.districtValue + ')').prop('selected', true);
					$d.trigger('change');
				}
			},
	}
	$.provinceAndCity = function(options){
		var args = arguments;
		if (typeof options == 'string') {
			throw options + 'does not support';
		}
		new ProvinceAndCity(options);
	}
	$.provinceAndCity.Constructor = ProvinceAndCity;
})(window.jQuery)