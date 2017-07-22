# AngularJS -day02

## 在Angular中使用"jQuery"
- 语法：`angular.element`
- Angular中操作的功能称为：`jqLite`（轻量级jQuery）

### 示例
```js
// 获取 jqLite 对象
var $ = angular.element;
$(document).ready(function() { });
```

### 注意点
- 1 jqLite 中只实现了jQuery的部分功能
- 2 jqLite中选择器只能是DOM对象
- 3 **尽量使用ng中提供的功能**


## AngularJS的一般开发流程
- 1 引入 angular.js 文件
- 2 创建模块：`angular.module('模块名', [])`
- 3 在页面中指定`ng-app="模块名"`，告诉NG管理指定的页面部分
- 4 创建控制器：`模块名.controller('控制器名', function() {})` 
- 5 在页面中指定`ng-controller="控制器名"`，指定管理内容的控制器
- 6 建模（根据页面原型抽象出数据模型），最终得到视图模型（ViewModel）
- 7 将抽象好的数据，添加到 `$scope`中，即：暴露数据和行为给视图
- 8 在页面中使用 `ng-model` 或者 `{{}}` 拿到并绑定数据


## 模块的划分
- 1 按照模块划分（推荐）
- 2 按照文件类型划分

### 按照模块划分
- 根据项目中具体的功能模块进行划分
- 比如：登录模块、注册模块、编写博客 等等不同的功能模块
- 每个功能模块都有自己的 Model View Controller 对应的文件
- 开发过程中，每个人完成一个独立的模块

### 按照文件划分
- 根据文件的功能进行划分
- 将所有的文件放到3个文件夹中：M、V、C


## 控制器（controller） -创建方式

### 低版本（1.2.29之前）
- 使用全局函数创建控制器，会造成：全局污染

### 推断式

```js
angular
    .module('testApp', [])
    .controller('DemoController', function($scope) {
        
    });
```

### 安全方式创建
- 问题：项目上线的时候，会进行代码压缩，$scope会被修改
- 解决：代码会被压缩和混淆，但是 字符串 是不会被压缩的

#### 创建控制器
- 优势：根据指定的参数名直接获取到想要的参数，而非根据参数的顺序

```js
// 第一个参数：控制器的名称
// 第二个参数：数组，最后一项表示回调函数，除此之外其他的参数表示依赖的参数列表
app.controller("DemoController", ["$scope", "$log", function($scope, $log) {
    $log.log("打印日志了");
}]);
```

### 面向对象方式（使用方式）
- 特点：将回调函数当作构造函数来使用，直接使用`this`添加数据
- 也可以通过 `$scope.age` 添加数据
- 注意：在html中使用指令的时候，格式变为：`DemoController as demo`

```html
<div ng-app="testApp" ng-controller="DemoController as demo">
    <p>{{demo.name}}</p>
</div>

<script>
angular.module('testApp', [])
    .controller('DemoController', ['$scope', function($scope) {
        // 添加模型属性
        this.name = 'Jack';
    }]);
</script>
```


## 依赖注入（DI -Dependency injection）
- 目的: 简化传入参数的操作，防止代码压缩导致参数无法使用的问题

### 原理分析
- 1 获取到依赖项(参数)列表
- 2 查找依赖项所对应的对象
- 3 代码执行时，将其注入

```js
/**
 * [提取参数]
 * @param  {Function} fn [回调函数]
 * @return {[type]}      [参数列表数组]
 */
function extractArgs(fn) {
    var r = /^[^\(]*\(\s*([^\)]*)\)/;
    var args = r.exec( fn.toString() );
    return args[1].split(',');
}

extractArgs(function($scope, $log) {});
// 方法的返回值：["$scope", "$log"]
```

- 参考文章：[Angular依赖注入分析](http://www.cnblogs.com/etoah/p/5460441.html)


## 解决页面闪烁问题
- 方式一： 将引用angularjs文件放到head中
- 方式二： 使用 `ng-bind` 指令
- 方式三： 使用 `ng-cloak` 指令

### ng-bind 指令
- 作用：设置元素的 `textContent`，功能类似于：`{{}}`
- 注意：只能在双标签中使用（因为只有双标签才有 textContent 属性）
- 注意： `ng-bind`指令无法输出 html 内容（即：实现innerHTML的功能）

```html
<p ng-bind="name"></p>
```

### ng-cloak 指令
- 作用：用来解决表达式闪烁问题
- 原理：angular在加载完成后会移除所有带有`ng-cloak`的样式
- 使用场景：页面中存在大量表达式

```html
<style>
    .ng-cloak {
        display: none;
    }
</style>

<p class="ng-clock">{{name}}</p>
```

## 常用指令介绍
- 指令：就是一个命令，让 Angular 按照我们预先设置好的规则办事

### ngSanitize 模块
- 语法： `ng-bind-html="<div></div>"`
- 作用： 在页面中输出 html内容
- 注意： 这个模块是一个独立的模块（需要单独下载，并在页面中引用）
- 安装： `npm install angular-sanitize`

```html
<div ng-bind-html="name"></div>
<script src="angular-sanitize.js"></script>
<script>
    // 引入 ngSanitize 模块
    var app = angular.module("testApp", ["ngSanitize"]);
    app.controller("testController", ["$scope", function($scope) {
        $scope.name = "<h1>雨啊雨</h1>";
    }]);
</script>
```

### ng-repeat 指令
- 作用：遍历集合中的数据，为集合中的每条数据创建一个当前元素（即，带有指令的元素）
- 说明：功能类似于 for-in 循环

```html
<ul>
    <li ng-repeat="item in datas"></li>
</ul>

<script>
app.controller('TestController', ['$scope', function($scope) {
    $scope.datas = [
        {name: 'jack', age: 19},
        {name: 'tom', age: 21},
        {name: 'rose', age: 22}
    ];
}]);
</script>
```

- 使用 `track by $index` 解决，数据重复的问题

```html
<ul>
    <li ng-repeat="item in datas track by $index"></li>
</ul>
```

#### ng-repeat 的循环项属性
- `$odd`/`$even`，用来表示当前项的奇偶性，类型为：布尔值
- `$first`/`$last`/`$middle`，用来表示当前项的位置，类型为：布尔值
- `$index`，用来表示当前项的索引号，从0开始计算

```html
<ul>
    <!-- 隔行变色效果的实现 -->
    <li ng-repeat="item in datas" class="{{$odd?'red':'green'}}"></li>
</ul>
```

## ng-class指令
- 语法：`ng-class="expression"`，expression是model中的一个数据或表达式
- 作用：根据 expression 的值，给当前元素添加指定的类

### 对象值
- 示例：`ng-class="{red: $odd, green: $even}"`
- 解释：`ng-class`通过指定一个对象（对象字面量），键为：类名，值为：布尔值
- 作用：判断对象中属性的值，如果为true则添加与该属性名相同的类，否则不添加

### 模型中的变量
- 示例：`ng-class="type"`

```html
<div ng-class="type"></div>
<script>
    app.controller("demoController", ["$scope", function($scope) {
        $scope.type = "red";
    }]);
</script>
```

## 其他指令

### ng-hide/ng-show 显示和隐藏（知道）
- 作用：控制当前元素的展示和隐藏，类型为：布尔值
- 语法： `ng-show="布尔值"`

```html
<div ng-show="isShow"></div>
```

### ng-if
- 作用：控制当前元素的显示或隐藏状态，这里的隐藏指的是：页面中不存在当前元素
- `ng-if` 与 `ng-show`或`ng-hide` 的不同：
    + `ng-if`隐藏的元素不会出现在HTML结构中
    + `ng-show`或`ng-hide` 仅仅是设置元素的`display="none"`，还是会出现在HTML结构中
- 语法：`ng-if="布尔值"`

```html
<div ng-hide="false"></div>
```

### ng-switch (了解)
- 作用：类似于js中的switch-case，但一般配合`ng-switch-when`来使用

```html
<div ng-switch="name">
    <div ng-switch-when="jack">我是jack</div>
    <div ng-switch-when="tom">我是tom</div>
    <div ng-switch-when="rose">我是rose</div>
</div>
<script>
    $scope.name = "jack";
</script>
```

### 表单元素的指令
- `ng-checked`: 复选框是否选中
- `ng-selected`: 下拉框是否选中
- `ng-disabled`: 是否禁用
- `ng-readonly`: 是否只读

- 特点：都是单向数据绑定，只能实现从数据到视图的绑定

```
ng-checked / ng-selected 可以使用 ng-model 代替, 但是要注意ng-model是双向绑定
```

### 事件指令
- 作用：Angular中用来绑定事件的

```
ng-click / ng-submit / ng-dblclick / ng-blur / ng-focus / ng-change
```

## 兼容HTML5标准的指令
- 说明：HTML5中的自定义属性规定使用 `data-` 作为属性的开头，
        angluar中的所有指令完全支持HTML5中的语法




















