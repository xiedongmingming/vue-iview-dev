# VUE-IVIEW-DEV

基于WEBPACK+VUE+IVIEW企业级开发框架

WEBPACK版本: 2.7.0

安装最新版本NODE、NPM

```
git clone https://github.com/xiedongmingming/vue-iview-dev.git front

cd front

npm install

通过下面两个命令可以搭建起整个服务
npm run start   // 启动前端
npm run server  // 启动后端
```

## 开发规范

### 文件结构
```
入口文件: /src/main.js
路由文件: /src/router.js
菜单文件: /src/menus.js
通用组件位置: /src/components/common         通用组件为全局组件(无需引用和注册可直接调用)
页面框架组件位置: /src/components/frame
业务组件位置: /src/components/pages
请求及服务位置: /src/actions
样式文件: /src/themes
国际化资源文件位置: /src/locales
```

### 编码规范

#### .VUE文件
```
<template>
    <div class='module_class'> // 建议每个组件最外层包一个DIV.CLASS用于分离样式
        // your component code;
    </div>  
</template>

<script>
import ...;

export default{
    name: 'component.name', // 组件名
    components:{ ...},      // 注册要用的组件
    computed(){
          ...VueUtil(this).select([Entity.name, ...]).state(),      // 引入VUEX-STATE
    },
    methods: { // 定义页面中使用的ACTION
          ...VueUtil(this).select([Entity.name, ...]).actions(),    // 引入VUEX-ACTION
    },
    watch:{
        // 定义监听VUEX-STATE变化时调用的方法
    },
    mounted(){
        // 挂载完毕后
    },
    props:{
        // 定义接受外部的属性
    },
    data(){  
        return {
            // 定义页面内部使用的数据
        };
    }
}
</script>
```

#### ACTION文件

- ACTION文件都是简化版的VUEX
- ACTIONS下的所有文件用于为各个VUE组件生成对应的ACTIONS、STATE、MUTATION方法
- 通过VUEXDECORATOR进行转换
```
export default {
    actions: {
        get: {
            method: 'get',
            url: (payload) => `/mock/users/${payload.id}`,
            // 如要重新封装返回的数据请自行实现FORMAT方法.否则统一封装为: {data, loading, error}
            // format: (responseData){
            //      return ...;
            // }
        },
        list: {
            method: 'get',
            url: (payload) => `/mock/users`
        },
        save: {
            method: 'post',
            key: ...,           // 将提交数据封装在KEY属性内.不填则不做封装
            url: (payload) => `/mock/users`
        },
        update: {
            method: 'put',
            key: ...,           // 将提交数据封装在KEY属性内.不填则不做封装
            url: (payload) => `/mock/users`,
        },
        delete: {
            method: 'delete',
            url: (payload) => `/mock/users`,
        },
        ...自定义ACTION
    },
    // state: {},       // 和ACTIONS一一对应(一般无需重写)
    // mutations: {},   // 无需重写
    // getters: {}      // 复用业务逻辑可以写在这里
}
```
### 如何调用ACTION方法?

六个默认方法可以直接调用

```
VueUtil(this).select('User').get(id);
VueUtil(this).select('User').save(user);
VueUtil(this).select('User').update(user);
VueUtil(this).select('User').delete(id);
VueUtil(this).select('User').list(query);
VueUtil(this).select('User').all(query);
```

批量调用可使用链式风格
```
VueUtil(this).select('User').get(id).save(user).select('Teams').update(team);
```

自定义的方法调用ACTION
```
VueUtil(this).select('User').action('custome', params);
```

### 如何处理ACTION返回值?

1. 定义WATCH指定要监控的变量
```
watch:{
    'User.get': 'listenUser',
    'User.save': 'listenUser',
    'User.update': 'listenUser',
    'User.delete': 'listenUser',
}
```
2. 定义METHOD处理返回值
```
methods:{
    listenUser:(data) =>{
        VueUtil(this).cb(data).success(() => { 
             switch(data.type){
                case 'get':
                    // handle get
                    break;
                case 'save':
                    // handle save
                    break;
                case 'update':
                    // handle update
                    break;
                case 'delete':
                    // handle delete
                    break;
            }
        }).error();
    }
}
```

### 如何绑定数据到TEMPLATE

1. 输出数据 "{{ }}"

```
<div>{{ title }}</div> 
// TITLE可以是DATA()或者PROPS里定义的变量
```

2. 绑定属性":
```
<Button :label="label"></Button>
// LABEL可以是DATA()或者PROPS里定义的变量(也可以是方法)
```

3. 绑定事件"@"

```
<Button @click="method"></Button>
// METHOD可以是METHODS里定义的方法或者PROPS DATA()里定义的方法
```

### 如何控制页面元素权限
```
用KEY将元素包裹例如: <Key id='功能号'>\</Key>
<Key id='User.add'>
    <Button >Add Users</Button>
</Key>
```
### 国际化
TEMPLATE中调用
```
<div>{{ $t('key') }}</div>                          // 单值
<div>{{ $t('key', {msg:$t('key1')}) }}</div>        // 组合值
```
JS中调用
```
this.$t('key');                                     // 单值
this.$t('key',{msg:this.$t('key1')});               // 组合值
```
自定义国际化规则
```
VueUtil(this).I18n(...);

1 KEY值为小写英文单词

```
后端可在请求HEADERS的LANG属性里获取当前语言: 'zh_CN', 'en_US'