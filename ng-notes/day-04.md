# AngularJS day-04

## WebAPI
- [聚合数据](https://www.juhe.cn/)
- [百度API服务](http://apistore.baidu.com/)

```
API 应用程序编程接口，简单来说，就是：方法
依赖于Web而提供的API称为： WebAPI ，通过URL实现。

可以把 WebAPI 看作是有 输入和输出（I/O） 的方法

webapi就相当于函数
webapi的参数（?username=小明&pwd=123465） 相当于 函数参数
    function fn(username, pwd) {}  fn('小明', 123456)
webapi接口返回的数据，就相当于函数的返回值
```

## 豆瓣电影项目

### 豆瓣电影API
- [豆瓣电影](https://developers.douban.com/)
- [加载动画](http://tobiasahlin.com/spinkit/)

```
1 输入上述网址
2 点击最上部的开发文档，进入 豆瓣API快速入门
3 从该页面中找到 'https://api.douban.com/v2/' 这是所有API的URL地址的前半部分
4 点击左侧菜单中的 '豆瓣Api V2（测试版）'，进入 豆瓣Api V2（测试版）
5 将页面滑动到底部，找到 '电影Api V2'，点击，然后会进入到 Movie API Doc 页面
6 在该页面中即可找到："正在热映"、"即将上映"、"Top250"
```

- 正在热映API： "/v2/movie/in_theaters"
- 完整的URL： "https://api.douban.com/v2/movie/in_theaters"

### 模块的划分
- 原则：按照功能模块进行划分

```
首页模块、电影详情页模块
有三个模块： "正在热映"、"即将上映"、"Top250"

各个模块之间相互独立， 主模块中引入单个模块即可！
```

### 电影案例思路
- 1 首页模块的搭建
- 2 正在热映、即将上映、Top250模块的搭建
- 3 通过$http服务获取数据，展示列表（in_theaters）
- 4 创建跨域服务，获取数据，展示列表
- 5 实现分页功能
- 6 其他两个模块的功能实现
- 7 统一实现三个模块的功能
- 8 添加加载动画
- 9 导航栏焦点状态高亮处理
- 10 实现搜索功能
- 11 实现电影详情页

### ng-src
- 作用：设置图片的src属性
- 目的：为了解决浏览器优先解析img的src属性的问题
- 其他属性：`ng-href`

```html
<img ng-src="{{item.iamges.large}}" alt="">
```

## $http服务
- 说明：提供了XHR的功能，类似于jQuery中的$.ajax()

### $http.get
- 作用：发送get请求
- 语法：`$http.get(url, [option])`

```javascript
app.controller('DemoController', ['$scope', '$http', function($scope, $http) {
    // 路径最好使用绝对路径
    $http.get('url').then(function(response) {
        // 成功的回调函数
    }, function() {
        // 失败的回调函数
    });
}]);
```

## JSONP -实现跨域

### JSONP跨域原理分析
- 动态创建script标签并添加到页面中，浏览器会根据script标签的src属性发送请求
- script标签的src属性带有：'?callback="jsonpcallback"' 参数
- 由服务器返回的是：函数调用，格式为：';jsonpcallback({})'

### 其他跨域方式
- `window.name`：同一个标签也中的页面共享同一个 name 属性
- `iframe`
- `postMessage`


## 2 $http.jsonp -实现跨域
- 说明：angular为了防止全局污染，把JSONP的回到函数放在`angular.callbacks`对象中
- 注意：豆瓣API 支持JSONP方式的调用，但是不支持包含点的情况！
- 结论：无法使用angular的内置 $http.jsonp 跨域访问豆瓣API中的数据

```javascript
// $http.jsonp 版本升级说明：
// https://docs.angularjs.org/guide/migration#migrate1.5to1.6-ng-services-$http

// 1.5 版本中使用方式：
$http.jsonp("url地址?callback=JSON_CALLBACK").then();
// 获取手机号码归属地
// http://v.showji.com/Locating/showji.com2016234999234.aspx?m=13333333333&output=json&callback=JSON_CALLBACK&timestamp=' + (new Date()-0)

// 1.6以上版本中的用法：
// url 中也不在需要 callback=JSON_CALLBACK
var src = 'http://v.showji.com/Locating/showji.com2016234999234.aspx?m=13333333333&output=json&timestamp=' + (new Date()-0);
// 需要注入 $sce 服务
var ret = $sce.trustAsResourceUrl(src);

$http.jsonp(ret, {
    jsonpCallbackParam: 'callback'
})
```

## $scope.$apply()
- 作用：强制让 angular 监视数据的变化
- 注意：angular的内置方法，会自动调用$apply执行脏检查
- 说明：

```
1 angular代码执行会触发 Dirty Check 机制，进行数据的双向绑定
2 异步操作是在angular代码执行完毕之后才执行的
3 也就是说，angular代码执行完了，脏检查已经执行完毕，才执行的异步回调
4 此时，可以在异步操作中手动调用 $scope.$apply() 方法告诉angular让其立即执行一次 Dirty Check
5 执行完毕，angular知道了数据变化，就会展示出我们想要的数据

如果没有调用 $scope.$apply，数据已经改变了，但是双向绑定没有触发。
```


## 自定义指令
- [angularjs.org - Directive](https://docs.angularjs.org/api/ng/service/$compile)
- 概述:

```
1 自定义指令用于扩展和增强HTML
2 用于封装一些常用而且共用的功能
3 AngularJS仍然有DOM操作, 所有的DOM操作都应该集中在自定义指令中
4 内部指令基本满足我们平时开发的需求, 少数情况的一些特殊需求, 会用到自定义指令
```

### 创建指令
- 语法：`模块.directive('指令名称', callback)`
- 说明：创建指令的语法与创建控制器的语法完全相同

```js
// 第一个参数：表示指令的名称，使用驼峰命名法，在视图中使用时修改为`-`分割的形式
// 第二个参数：是一个回调函数，让用户设置该指令的行为
angular.module('testApp', [])
    .directive('myBtn', [function() {
        return {};
    }]);
```

### 指令常用属性说明
- `template`: 模板，设置自定义指令显示的内容
- `templateUrl`: 可以指定一个模板的id或者url地址
    + id：模板的id，需要给模板设置type属性为：`type="text/ng-template"`，该模板需要在`ng-app`内
    + url: 一个页面，页面中用于存放模板标签 （agnular会异步请求该路径，注意跨域问题）

- `restrict`: 限制指令的使用方式，取值：'E'/'C'/'M'/'A'，取值是区分大小写的

```html
<!-- 标签 -->
<my-btn></my-btn>
<!-- 类名 -->
<div class="my-btn"></div>
<!-- 注释 -->
<!-- directive:my-btn -->
<!-- 属性 -->
<div my-btn></div>
```

- `link`: 为DOM元素注册事件以及更新DOM，一般将所有的业务逻辑放在此处
    + 该属性的值是一个函数，这个函数给当前指令提供了事件，该函数有3个参数
    + `scope`: 表示当前指令的作用域，用来暴露一些数据，类似与控制器的scope，只在当前指令中有效
    + `element`: 表示一个jqLite对象，是自定义指令所在标签对应的jqLite对象
    + `attribute`: 表示自定义指令所在标签的所有指令属性的集合
    + link 用于控制指令的行为

- `replace`: 需要一个布尔值。为true时，会将自定义指令所在的标签替换为模板字符串


### 参考文章
- [自定义指令参考](http://www.cnblogs.com/powertoolsteam/p/angularjs-custom-directive.html)
- [bootstrap指令库](http://angular-ui.github.io/bootstrap/)











