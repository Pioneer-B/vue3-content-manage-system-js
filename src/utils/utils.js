export function mapUserMenu(userMenu) {
    let modules = import.meta.glob('@/views/main/*/**/*.vue')
    // console.log(modules)
    const result = []
    userMenu.forEach((item) => {
        item.children.forEach((i) => {
            const name = i.url.substring(i.url.lastIndexOf('/') + 1)
            // console.log(`/src/views${i.url}/${name}.vue`)
            const obj = {
                path: i.url,
                name,
                // component: () => import(`@/views${i.url}/${name}.vue`),
                component: modules[`/src/views${i.url}/${name}.vue`],
                // 拼接后的形式：@/view/main/product/category/category.vue
            }
            result.push(obj)
        })
    })
    return result
}

// 面包屑数据
export function getBreadcrumbsByPath(userMenus, currentPath) {
    const breadcrumbs = []
    getMenuByPath(userMenus, currentPath, breadcrumbs)
    return breadcrumbs
}

// 找出左侧menu 的 当前选择的menu 以及它的上级menu
export function getMenuByPath(userMenus, currentPath, breadcrumbs) {
    for (const item of userMenus) {
        if (item.type === 1) {
            const findMenu = getMenuByPath(item.children ?? [], currentPath)

            if (findMenu) {
                if (breadcrumbs) {
                    breadcrumbs.push(item, findMenu)
                }
                return {
                    menu: findMenu,
                    parentMenu: item,
                }
            }
        }
        if (item.type === 2 && item.url === currentPath) {
            return item
        }
    }
}

// 递归收集所有的按钮权限
export function mapMenusToPermissions(userMenu) {
    const permissions = []

    function recurseGetPermission(userMenu) {
        userMenu.forEach((menu) => {
            if (menu.type === 1 || menu.type === 2) {
                recurseGetPermission(menu.children ?? [])
            } else if (menu.type === 3) {
                permissions.push(menu.permission)
            }
        })
    }
    recurseGetPermission(userMenu.value)
    return permissions
}

// 编辑角色时，得到该条角色 所有的叶子节点key 以及 上级节点
export function recurseMenuGetleafKeys(menuList) {
    const leafKeys = []
    const parentKeys = []
    function getLeafKeys(menuList) {
        menuList.forEach((item) => {
            if (item.children && item.children.length) {
                parentKeys.push(item.id)
                getLeafKeys(item.children)
            } else {
                leafKeys.push(item.id)
            }
        })
    }
    getLeafKeys(menuList)
    return [leafKeys, parentKeys]
}
