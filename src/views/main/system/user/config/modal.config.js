const modalConfig = {
    formItems: [
        {
            type: 'input',
            filed: 'name',
            label: '用户名',
            placeholder: '用户名',
        },
        {
            type: 'input',
            filed: 'realname',
            label: '真实姓名',
            placeholder: '真实姓名',
        },
        {
            type: 'password',
            filed: 'password',
            label: '用户密码',
            placeholder: '用户密码',
            isHidden: true, // 新建时显示，编辑时隐藏
        },
        {
            type: 'input',
            filed: 'cellphone',
            label: '电话号码',
            placeholder: '电话号码',
        },
        {
            type: 'select',
            filed: 'departmentId',
            label: '选择部门',
            placeholder: '选择部门',
            options: [],
        },
        {
            type: 'select',
            filed: 'roleId',
            label: '选择角色',
            placeholder: '选择角色',
            options: [],
        },
    ],
    colLayout: { span: 24 },
    showFooter: false,
    name: 'modal', // 处理 non-unique id
    title: '新建用户',
}

export default modalConfig
