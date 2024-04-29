<template>
    <div class="nav-header-cls">
        <!-- 折叠菜单 -->
        <div class="fold-menu">
            <DoubleRightOutlined class="trigger" v-if="isCollapsed" @click="handleFoldChange" />
            <DoubleLeftOutlined class="trigger" v-else @click="handleFoldChange" />
        </div>
        <div class="content">
            <breadcrumb />
            <user-info />
        </div>
    </div>
</template>
<script setup>
    import breadcrumb from './src/breadcrumb.vue'
    import userInfo from './src/user-info.vue'

    const emit = defineEmits(['foldChange'])
    const props = defineProps({
        isCollapsed: {
            type: Boolean,
            required: true,
        },
    })

    function handleFoldChange() {
        emit('foldChange', !props.isCollapsed)
    }
</script>
<style lang="less" scope>
    .nav-header-cls {
        display: flex;
        .trigger {
            font-size: 18px;
            padding: 0 24px;
            cursor: pointer;
            transition: color 0.3s;
        }

        .trigger:hover {
            color: #1890ff;
        }

        .content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex: 1;
        }
    }
</style>
