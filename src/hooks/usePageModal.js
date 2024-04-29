import { ref } from 'vue'

export function usePageModal(addCallBack, updateCallBack) {
    const pageModalRef = ref()
    const defaultInfo = ref({})

    function onAdd() {
        defaultInfo.value = {}
        pageModalRef.value?.showModal()

        addCallBack && addCallBack()
    }
    function onUpdate(record) {
        defaultInfo.value = { ...record }
        pageModalRef.value?.showModal()

        updateCallBack && updateCallBack(record)
    }

    function onOk(pageContentRef) {
        // 注意：template中使用 ref数据，会自动解包，所以传进来的参数不需要.value
        pageContentRef.handleSearch()
    }

    return { pageModalRef, defaultInfo, onAdd, onUpdate, onOk }
}
