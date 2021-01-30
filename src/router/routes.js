const Home = () => import("@/views/home/Home.vue");
const Login = () => import("@/views/Login.vue");
const Statistics = () => import("@/views/home/Statistics.vue");
const ProductList = () => import("@/views/product/ProductList.vue");
const ProductAdd = () => import("@/views/product/ProductAdd.vue");
const Category = () => import("@/views/product/Category.vue");

export default [
    {
        path: "/",
        name: "Home",
        redirect: "/statistics",
        component: Home,
        meta: {
            requireLogin: true,
            title: "首页",
            icon: "home"
        },
        children: [
            {
                path: "/statistics",
                name: "Statistics",
                meta: {
                    title: "统计",
                    icon: "line-chart"
                },
                component: Statistics
            }
        ]
    },
    {
        path: "/product",
        name: "Product",
        redirect: "/product/list",
        component: Home,
        meta: {
            requireLogin: true,
            title: "商品",
            icon: "inbox"
        },
        children: [
            {
                path: "list",
                name: "ProductList",
                meta: {
                    title: "商品列表",
                    icon: "unordered-list"
                },
                component: ProductList
            },
            {
                path: "add",
                name: "ProductAdd",
                meta: {
                    title: "添加商品",
                    icon: "file-add"
                },
                component: ProductAdd
            },
            {
                path: "category",
                name: "Category",
                meta: {
                    title: "类目管理",
                    icon: "number"
                },
                component: Category
            }
        ]
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
    }
];
