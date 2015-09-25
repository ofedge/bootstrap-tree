### 省市级联选择

省市value值为从0开始的序号, 只有所有区value值不重复, 因为项目用到, 所以写了个简单的

使用: 
```
$(function(){
    $.provinceAndCity({
        province: '#province',
        city: '#city',
        district: '#district'
    });
});
```