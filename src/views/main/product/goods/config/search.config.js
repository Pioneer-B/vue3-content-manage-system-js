export default {
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
            type: 'input',
            filed: 'cellphone',
            label: '电话号码',
            placeholder: '电话号码',
        },
        {
            type: 'select',
            filed: 'enable',
            label: '用户状态',
            placeholder: '用户状态',
            options: [
                { label: '启用', value: 1 },
                { label: '禁用', value: 0 },
            ],
        },
        {
            type: 'rangepicker',
            filed: 'createAt',
            label: '创建时间',
            colSpan: {
                'label-col': { span: 8 },
                'wrapper-col': { span: 16 },
            },
        },
    ],
    colSpan: {
        'label-col': { span: 8 },
        'wrapper-col': { span: 16 },
    },
}
