<template>
    <div class="card-cls">
        <a-card>
            <template #title>
                <div class="card-header">
                    <span>{{ title }}</span>
                </div>
            </template>
            <div class="item">
                <slot></slot>
            </div>
        </a-card>
    </div>
</template>
<script setup>
    const props = defineProps({
        title: {
            type: String,
            default: '',
        },
    })
</script>
<style lang="less" scoped>
    .card-cls {
        .card-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 30px;
            font-weight: 400;
        }
        .item {
            margin-bottom: 10px;
            // border: 1px solid red;
        }
    }
</style>
