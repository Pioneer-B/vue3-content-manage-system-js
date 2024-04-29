const modalConfig = {
    formItems: [
        {
            type: 'input',
            filed: 'name',
            label: '部门名称',
            placeholder: '部门名称',
        },
        {
            type: 'select',
            filed: 'parentId',
            label: '上级部门',
            placeholder: '上级部门',
            options: [],
        },
        {
            type: 'input',
            filed: 'leader',
            label: '领导名称',
            placeholder: '领导名称',
        },
    ],
    colLayout: { span: 24 },
    showFooter: false,
    name: 'modal', // 处理 non-unique id
    title: '新建部门',
}

export default modalConfig
