<template>
    <div class="list-cls">
        <div style="border: 1px solid #ccc">
            <Toolbar
                style="border-bottom: 1px solid #ccc"
                :editor="editorRef"
                :defaultConfig="toolbarConfig"
                mode="mode"
            />
            <Editor
                style="height: 500px; overflow-y: hidden"
                v-model="valueHtml"
                :defaultConfig="editorConfig"
                mode="mode"
                @onCreated="handleCreated"
            />
        </div>
    </div>
</template>
<script setup>
    import '@wangeditor/editor/dist/css/style.css' // 引入 css

    import { onBeforeUnmount, ref, shallowRef, onMounted, nextTick } from 'vue'
    import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
    import { DomEditor } from '@wangeditor/editor'

    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef()

    // 内容 HTML
    const valueHtml = ref('<p>hello</p>')

    // 模拟 ajax 异步获取内容
    onMounted(() => {
        setTimeout(() => {
            valueHtml.value = '<p>模拟 Ajax 异步设置内容</p>'
        }, 1500)
    })

    const toolbarConfig = {}
    const editorConfig = { placeholder: '请输入内容...' }

    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
        const editor = editorRef.value
        if (editor == null) return
        editor.destroy()
    })

    const handleCreated = (editor) => {
        editorRef.value = editor // 记录 editor 实例，重要！
        nextTick(() => {
            const toolbar = DomEditor.getToolbar(editorRef.value)
            const curToolbarConfig = toolbar.getConfig()
            console.log(curToolbarConfig.toolbarKeys) // 当前菜单排序和分组
        })
    }
</script>
