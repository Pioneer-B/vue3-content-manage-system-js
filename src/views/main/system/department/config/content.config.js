export default {
    title: '部门列表',
    columns: [
        { title: '序号', dataIndex: 'no', width: '80px' },
        { title: '部门名称', dataIndex: 'name' },
        { title: '部门领导', dataIndex: 'leader' },
        { title: '上级部门', dataIndex: 'parentId' },
        { title: '创建时间', dataIndex: 'createAt' },
        { title: '更新时间', dataIndex: 'updateAt' },
        { title: '操作', dataIndex: 'handle', width: 80 },
    ],
}
