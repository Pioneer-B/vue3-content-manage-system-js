import { reactive } from 'vue'

const defaultPagination = {
    total: 0,
    current: 1,
    pageSize: 10,
    pageSizeOptions: ['10', '20', '50'],
}

export function usePagePagination(initialPagination = {}) {
    const pagination = reactive({ ...defaultPagination, ...initialPagination })

    return { pagination }
}
