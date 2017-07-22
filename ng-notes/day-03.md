# AngularJS - day-03

## TodoMVC案例
- [todomvc官网](http://todomvc.com)
- [todomvc素材](https://github.com/tastejs/todomvc-app-template)

### 功能划分
```
1 展示任务列表
2 添加任务
3 删除一条任务
4 修改任务
5 切换任务选中状态(单个或批量)
6 清除已完成任务
7 显示未完成任务数
8 显示不同状态的任务
    以及当前任务高亮处理
9 根据URL变化显示相应任务
11 使用服务抽象数据模型管理
12 使用路由完成不同任务的切换
```

### $location.url()
- 作用：用于获取页面中的锚点值，不包含：`#`
- 注意：`$location` 与 `$scope`一样，都需要通过注入的方式传入

```
URL是： file:///F:/Angular_File/todomvc/index.html#/completed

通过调用 $location.url() 方法获取的是：'/completed'
```

## 过滤器
- 作用：格式化数据/筛选数据的小工具
- 语法：在数据模型的后面加上 `| 过滤器名称: 参数`
- 说明：过滤器通过 `|` 指定，参数通过 `:` 指定

### 格式化数据过滤器
- 作用：对数据进行格式化，以某种指定的格式输出 

#### filter过滤器 -过滤数据
- 作用：对数据进行过滤，从多条数据中筛选出符合规则的数据
- 参数：
    + 基本类型参数：angular会根据参数对数据进行全局匹配
    + 对象类型参数：根据参数对象中的属性对数据进行匹配，只会匹配指定的属性
- 注意：配合`track by`使用的时候，`track by` 要放在最后面

```html
<!-- 取出 completed 属性为：true 的数据 -->
<p ng-repeat="item in data | filter:{completed: true} track by $index"></p>

<script>
app.controller('FilterController', ['$scope', '$filter', 
    function($scope, $filter) {
        $scope.data = [
            {name: '吃饭', completed: true },
            {name: '睡觉', completed: false },
            {name: '豆豆', completed: true }
        ];
    }]);
</script>
```

#### currency 过滤器
- 作用：将数字转化为货币的形式显示

```html
<p>{{12345678.333 | currency: "￥"}}</p>
```

#### date 过滤器
- 作用：将整数形式的日期转化为常用日期形式

```html
<p>{{1412345678901 | date: "yyyy-MM-dd hh:mm:ss"}}</p>
```

#### limitTo 过滤器
- 作用：限制显示的文字个数
- 参数：`:5` 表示展示文字长度为：5，`:2` 表示开始的索引号

```html
<p>{{'是谁在唱歌，温暖了寂寞' | limitTo:5:2}}</p>
```

#### orderBy 过滤器
- 作用：对数据进行排序
- 参数：排序的属性，如果是倒序排列，属性名前加`-`，例如：`-age`
- 说明：一般与 `ng-repeat` 指令共同使用

```html
<p ng-repeat="item in data | orderBy: 'age'"></p>
```

### 在JavaScript中使用过滤器
- 语法：
- 使用 `$filter` 方法, 参数为：过滤器名称
- `$filter`方法的返回值是一个方法：第一个参数表示要过滤的数据，后面的参数为：过滤器的参数

```javascript
var time = $filter("date")($scope.curDate, "yyyy-MM-dd hh:mm:ss");
```


## service 服务
- 公用（公共）的业务逻辑集中存放的一段代码
- 主要用于对重复业务的封装，达到复用的目的
- 一般主要封装针对于Model的CRUD

- 服务中的代码只会在使用服务的时候，执行一次，并且只会执行一次
- 服务给控制器提供了一些额外的功能
    + $log / $http 等以$开头的服务都是Angular的内置服务

```
在一个分层良好的 ng 应用中，controller 这一层应该很薄。 应用中大部分的业务逻辑
和 持久化数据 都应该放在 service 中。

数据持久化：将数据存储起来（存储数据库中）
```


### 创建服务
- 创建服务的语法，与创建控制器的语法相同
- `service`方法中的函数参数，是一个构造函数，通过`this`添加成员
- 控制器中通过服务的名字（实例对象）就可以使用服务的属性和方法

```javascript
app.service('TestService', [function() {
    // this.get = function() {};
    // this.set = function() {};
    // this.update = function() {};
    // this.delete = function() {};
}]);

// 在控制器中使用自定义服务
app.controller('DemoController', ['$scope', 'TestService', 
    function($scope, TestService) {
    console.log(TestService);
}]);
```

### 模块之间的依赖关系
```
有三个模块：
1 app.js：主模块，应用程序的入口，实现统一调用所有其他模块
2 controller.js：控制器模块，处理视图中与用户交互的功能，即：处理业务逻辑
3 service.js：服务模块，抽象数据操作，提供数据的增删改查

每个模块都会放在一个独立的js文件中，因此，每个文件都会有一个模块，
    即：angular.module("模块名", []);
建立模块之间的联系：
    在 app.js 主模块中，引入：controller 和 service这两个模块
```


## ngRoute -路由
- 语法：`app.config(['$routeProvider', function($routeProvider) {}])`
- 安装：`npm install angular-route` 单独安装
- 注意：`ngRoute` -路由模块名称，作为依赖模块

### 使用步骤
- 1 引入 angular-route.js 文件
- 2 创建模块的时候，将`ngRoute`作为依赖项引入
- 3 通过调用模块的`config`方法来配置路由，并将`$routeProvider`注入进来
- 4 通过`$routeProvider`的两个方法：`when()`和`otherwise()`进行路由配置
- 5 在视图中，通过指令`ng-view`展示路由对应的内容
- 6 1.6 版本以后，添加 `$locationProvider.hashPrefix('')` 配合 `#/users` 使用

```html
<div ng-app="routeApp">
    <a href="#/stu/li"></a>
    <p>a</p>
    <p>b</p>
    <div ng-view></div>
    <p>c</p>
    <p>d</p>
</div>

<script>
    var app = angular.module('routeApp', ['ngRoute']);
    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/stu/li', {
            template: '<p>李四</p>'
        });
    }]);
</script>
```

### when() 方法
- 参数：
    + 第一个参数：url的hash值，例如：`/stu/li`
    + 第二个参数：是一个对象，对象中属性用来控制路由的相关功能

- `template`：指定路由的模板，显示在`ng-view`指令所有的html元素中
- `templateUrl`: 作用与 template 相同，取值：模板id 或者 路径
- `controller`: 为路由指定一个控制器，用于提供当前视图中的数据模型

```javascript
app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/stu/li', {
        template: '<p>你好，我是{{name}}</p>',
        controller: 'stuController'
    });
}]);

app.controller('stuController', ['$scope', function($scope) {
    $scope.name = '小明';
}]);
```

### otherwise() 方法
- 作用：匹配不合法（when无法匹配）的锚点值，与`switch-case`中的 `default` 类似
- 参数: 是一个对象
- `redirectTo`属性：指定默认跳转的锚点值

```javascript
$routeProvider
    .otherwise({
        redirectTo: '/stu/'
    });
```

### $routeParams -路由的服务
- 作用：用于获取路由的参数，是 路由服务，在控制器中使用
- ":name?" 的 ":name"用于匹配URL路径，"?"表示可以省略
- 例如URL为 "#/stu/lisi" ，路由 "/stu/:name" 匹配：lisi

```javascript
app.config(['$routeProvider', function($routeProvider) {
    // '/stu/:name?' 用来匹配：/stu/ 或 /stu 或 /stu/xxx 的任意一种
    $routeProvider.when('/stu/:name?', {
        template: '<p>你好，我是{{name}}</p>',
        controller: 'stuController'
    });
}]);

app.controller('stuController', ['$scope', '$routeParams', function($scope, $routeParams) {
    // $routeParams 是一个对象，对象中包含了一个 name 属性。
    // name属性，是路由的 when 方法的第一个参数
    console.log($routeParams.name);
}]);
```

### $route -路由的服务
- 作用：控制当前的路由
- `$route.updateParams()`方法：更新路由参数的值
    + 参数：对象，具有路由参数属性，用于指定更新后的锚点值
- 可以使用 `$location.url('/teacher/laowang')` 来修改，路由的URL值

```javascript
app.controller('stuController', ['$scope', '$routeProvider', '$route', function($scope, $routeProvider, $route) {
    console.log($routeProvider.name);
    
    // 参数是一个对象，具有路由参数属性的对象
    $route.updateParams({name: 'lisi'});
}]);
```

### hashPrefix
- 在 angular-1.6以上的版本，默认使用 `!` 前缀

```html
<a href="#!/users"></a>

<script>
$routeProvider
    .when('/users', {
        templateUrl: 'view.html',
        controller: 'TestController'
    })

// 1.6以上，默认值为：'!'
// $locationProvider.hashPrefix('!');
</script>
```















