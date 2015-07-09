### bootstrap tree

基于 bootstrap 的树结构插件

初始化时候需要自己生成节点, 注意这里的`<span>`里除了节点文本不要加其他内容, 如果需要在`<span>`之后加

```
<div>
  <ul>
    <li><span>父节点</span>
      <ul>
        <li><span>子节点</span>
          <ul>
            <li><span>子子节点</span>
              <ul>
                <li><span>子子子节点</span></li>
              </ul>
            </li>
          </ul>
          <ul>
            <li><span>子子节点</span></li>
          </ul>
        </li>
      </ul>
      <ul>
        <li><span>子节点</span>
          <ul>
            <li><span>子子节点</span>
              <ul>
                <li><span>子子子节点</span></li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
      <ul>
        <li><span>子节点</span></li>
      </ul>
    </li>
  </ul>
</div>
```

调用:

`$('div').tree();`

带参数调用:

```
`$('div').tree({
    openOnLoad: false // 初始化时候不展开树
    icons: { // 更改默认图标
		openedNodeIcon: 'glyphicon-folder-open',
		closedNodeIcon: 'glyphicon-folder-close',
		leafNodeIcon: 'glyphicon-file'
	}
});
```

方法:

```
$('div').tree('openAll') // 完全展开树
$('div').tree('closeAll') // 完全关闭树
```