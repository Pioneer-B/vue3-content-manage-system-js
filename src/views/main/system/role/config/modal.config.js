const modalConfig = {
    formItems: [
        {
            type: 'input',
            filed: 'name',
            label: '角色',
            placeholder: '角色',
        },
        {
            type: 'input',
            filed: 'intro',
            label: '角色介绍',
            placeholder: '角色介绍',
        },
    ],
    colLayout: { span: 24 },
    name: 'modal', // 处理 non-unique id
    title: '新建角色',
    showFooter: false,
}

export default modalConfig
