import Pages from './components/pages';

// 路由配置参数 -- 每一个路由映射一个组件
const routers = [// WEBPACK会把每一个路由都打包为一个JS文件在请求到该页面时才去加载这个页面的JS
	{
		path: '/',
		redirect: '/incidents'
	},
	{
		path: '/Login',
		name: 'name',
		meta: {
			title: '登录'
		},
		component: Pages.Login,// 对应的组件
		// component: (resolve) => require(['./views/index.vue'], resolve) 异步懒加载
		// component: require('./views/index.vue')	// 一次性加载
	}, {
		path: '*', component: Pages.Home// 访问路径不存在时重定向到首页
	}, {
		path: '/home',
		name: 'Home',
		meta: { // 统一配置一些自定义信息(如标题)
			title: '主页'
		},
		component: Pages.Home,
		children: [
			{
				name: 'Incidents',
				path: '/incidents',
				component: Pages.Incidents,
			}, {
				name: 'Alerts',
				path: '/alerts',
				component: Pages.Alerts,
			}, {
				name: 'Configuration',
				path: '/configuration',
				component: Pages.Nothing,
				children: [
					{
						name: 'Schedules',
						path: '/schedules',
						component: Pages.Schedules
					}, {
						name: 'Schedules',
						path: '/schedules/:id/edit',
						component: Pages.SchedulesEdit
					}, {
						name: 'Services',
						path: '/services',
						component: Pages.Services,
						children: []
					}, {
						name: 'Service Detail',
						path: '/services/:id',
						component: Pages.ServiceDetail,
					}, {
						name: 'Add Service',
						path: '/service_add',
						component: Pages.AddService
					}, {
						name: 'Edit Service',
						path: '/service_edit/:id',
						component: Pages.AddService
					}, {
						name: 'Users',
						path: '/users',
						component: Pages.Users
					}, {
						name: 'Users',
						path: '/users/:id',
						component: Pages.UserDetail
					}, {
						name: 'Teams',
						path: '/teams',
						component: Pages.Teams
					},
				]
			}, {
				name: 'Analytics',
				path: '/analytics',
				component: Pages.Nothing,
				children: [
					{
						name: 'demo',
						path: '/demo',
						component: Pages.UsersDemo
					}
				]
			}
		]
	},
];
export default routers;