export default {
    title: '商品列表',
    columns: [
        { title: '商品名称', dataIndex: 'name', width: '120px', ellipsis: true },
        { title: '原价格', dataIndex: 'oldPrice' },
        { title: '现价格', dataIndex: 'newPrice' },
        {
            title: '商品图片',
            dataIndex: 'imgUrl',
            width: '120px',
            ellipsis: true,
            className: 'imgUrlClass',
        },
        { title: '状态', dataIndex: 'status' },
        { title: '创建时间', dataIndex: 'createAt' },
        { title: '更新时间', dataIndex: 'updateAt' },
        { title: '操作', dataIndex: 'handle', width: 80 },
    ],
    otherProps: {
        rowKey: 'key',
    },
}
