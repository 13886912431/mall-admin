import { menu } from '@/router/routes';

/**
 * 所有人都显示的路由
 */
const allowRoutes = [
    'Home',
    'Statistics',
    'Product',
    'ProductList',
    'ProductAdd',
];

/**
 * 角色对应的可以显示的路由
 */
const role2Routes = {
    coustomer: [
        ...allowRoutes
    ],
    admin: [
        ...allowRoutes,
        'Category'
    ]
};

/**
 * 根据角色获取显示的路由
 * @param {String} role 角色
 */
export default function getRoutes(role) {
    // 此角色可以显示的路由
    const routesName = role2Routes[role];
    return menu.filter(item => {
        if (routesName.includes(item.name)) {
            if (item.children) {
                item.children = item.children.filter(it => routesName.includes(it.name));
            }
            return true;
        }
        return false;
    });
}
