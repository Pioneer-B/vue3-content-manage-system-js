import { useUser } from '@/store'
import { storeToRefs } from 'pinia'
import { mapMenusToPermissions } from '@/utils/utils'

export function usePermission(moduleName, permissionName) {
    const userStore = useUser()
    const { menuList } = storeToRefs(userStore)
    const permissionList = mapMenusToPermissions(menuList)

    const verifyPermission = `system:${moduleName}:${permissionName}`
    return permissionList.includes(verifyPermission)
}
