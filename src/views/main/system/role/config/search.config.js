export default {
    formItems: [
        {
            type: 'input',
            filed: 'name',
            label: '角色名称',
            placeholder: '角色名称',
        },
        {
            type: 'input',
            filed: 'intro',
            label: '权限介绍',
            placeholder: '权限介绍',
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
