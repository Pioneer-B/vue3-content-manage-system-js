export default {
    title: '菜单列表',
    columns: [
        { title: '菜单名称', dataIndex: 'name', width: '150px' },
        { title: '类型', dataIndex: 'type' },
        { title: '菜单url', dataIndex: 'url' },
        { title: '菜单icon', dataIndex: 'icon' },
        { title: '按钮权限', dataIndex: 'permission' },
        { title: '创建时间', dataIndex: 'createAt' },
        { title: '更新时间', dataIndex: 'updateAt' },
        { title: '操作', dataIndex: 'handle', width: 80 },
    ],
    showFooter: false,
}
