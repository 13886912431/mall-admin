import routes from "@/router/routes";

/**
 * 任何人都显示的侧边菜单
 */
const allowMenu = [
    "Home",
    "Statistics",
    "Product",
    "ProductList",
    "ProductAdd",
];

/**
 * 角色对应的可以显示的侧边菜单
 */
const roleToAllowMenu = {
    coustomer: [
        ...allowMenu
    ],
    admin: [
        ...allowMenu,
        "Category"
    ]
};

/**
 * 根据角色获取需要展示的侧边菜单
 * @param {String} role 角色
 */
export default function roleToMenu(role) {
    // 此角色可以展示的菜单
    const menuName = roleToAllowMenu[role];
    // 需要显示的菜单
    const needShowMenu = routes.filter(item => menuName.includes(item.name));
    // 对子菜单进行过滤
    const result = needShowMenu.map(item => {
        if (item.children) {
            return {
                ...item,
                children: item.children.filter(it => menuName.includes(it.name))
            };
        }
        return false;
    });
    return result;
}
