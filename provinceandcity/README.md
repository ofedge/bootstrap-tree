### 省市级联选择

省市value值为从0开始的序号, 只有所有区value值不重复

使用: 
```
$(function(){
    $.provinceAndCity({
        province: '#province',
        city: '#city',
        district: '#district',
        provinceValue: '台湾',
        cityValue: '台湾',
        districtValue: '基隆',
        textValue: true // 使用文本作为value值, 和省市区名字一致
    });
});
```