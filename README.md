# amaze-ui autocomplete

[使用示例](http://orionwei.github.io/homework/autocomplete/docs/test.html)

1. 获取 Amaze UI autocomplete

  下载autocomplete文件

2. 引入 autocomplete 插件（`dist` 目录下的 JS）：

  ```html
  <script src="autocomplete.js"></script>
  ```

3. 初始化 autocomplete:

  ```js
  var str = "This is a native JS of the fuzzy search plug-in there are some features are not perfect is being improved";
	var a = autocomplete(document.getElementById("a"),str.split(" "));
  ```
