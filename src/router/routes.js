const Home = () => import('@/views/home/Home.vue');
const Login = () => import('@/views/Login.vue');
const Statistics = () => import('@/views/home/Statistics.vue');
const ProductList = () => import('@/views/product/ProductList.vue');
const ProductAdd = () => import('@/views/product/ProductAdd.vue');
const Category = () => import('@/views/product/Category.vue');

export const menu = [
    {
        path: '/',
        name: 'Home',
        redirect: '/statistics',
        component: Home,
        meta: {
            requireLogin: true,
            title: '首页',
            icon: 'home',
            roles: ['admin', 'coustomer']
        },
        children: [
            {
                path: '/statistics',
                name: 'Statistics',
                meta: {
                    title: '统计',
                    icon: 'line-chart',
                    roles: ['admin', 'coustomer']
                },
                component: Statistics
            }
        ]
    },
    {
        path: '/product',
        name: 'Product',
        redirect: '/product/list',
        component: Home,
        meta: {
            requireLogin: true,
            title: '商品',
            icon: 'inbox',
            roles: ['admin', 'coustomer']
        },
        children: [
            {
                path: 'list',
                name: 'ProductList',
                meta: {
                    title: '商品列表',
                    icon: 'unordered-list',
                    roles: ['admin', 'coustomer']
                },
                component: ProductList
            },
            {
                path: 'add',
                name: 'ProductAdd',
                meta: {
                    title: '添加商品',
                    icon: 'file-add',
                    roles: ['admin', 'coustomer']
                },
                component: ProductAdd
            },
            {
                path: 'category',
                name: 'Category',
                meta: {
                    title: '类目管理',
                    icon: 'number',
                    roles: ['admin']
                },
                component: Category
            }
        ]
    }
];

export const route = [
    {
        path: '/login',
        name: 'Login',
        component: Login,
    }
];

export default menu.concat(route);
