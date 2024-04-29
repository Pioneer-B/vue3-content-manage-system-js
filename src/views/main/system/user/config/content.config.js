export default {
    title: '用户列表',
    columns: [
        { title: '序号', dataIndex: 'no', width: '80px' },
        { title: '用户名', dataIndex: 'name' },
        { title: '真实姓名', dataIndex: 'realname' },
        { title: '手机号码', dataIndex: 'cellphone' },
        { title: '状态', dataIndex: 'enable' },
        { title: '创建时间', dataIndex: 'createAt' },
        { title: '更新时间', dataIndex: 'updateAt' },
        { title: '操作', dataIndex: 'handle', width: 80 },
    ],
}
