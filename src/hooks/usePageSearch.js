import { ref, watch } from 'vue'

export function usePageSearch() {
    const pageContentRef = ref(null)

    function onSearch(params) {
        // 将formData的值在store中复制了一份，这里其实不需要params值了
        pageContentRef.value?.handleSearch()
    }
    function onReset() {
        pageContentRef.value?.handleSearch()
    }
    return { pageContentRef, onSearch, onReset }
}
