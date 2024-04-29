export default {
    formItems: [
        {
            type: 'input',
            filed: 'name',
            label: '部门名称',
            placeholder: '部门名称',
        },
        {
            type: 'input',
            filed: 'leader',
            label: '部门领导',
            placeholder: '部门领导',
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
    name: 'search',
}
