<template>
    <div class="chat-cls">
        <editor :value="htmlString" @update="onUpdate"></editor>
    </div>
</template>
<script setup>
    import editor from '@/base-ui/editor/editor.vue'
    import { ref } from 'vue'
    const htmlString = ref('coderwhy')

    function onUpdate(value) {
        console.log('value:', value)
    }
</script>

<style lang="less" scope>
    .chat-cls {
    }
</style>
