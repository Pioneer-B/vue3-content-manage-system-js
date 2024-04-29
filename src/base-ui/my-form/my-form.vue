<template>
    <!-- <div class="my-form-cls"></div> -->
    <a-form
        :model="formData"
        autocomplete
        :="colSpan"
        style="background-color: #fff; padding: 24px 24px 0; margin-bottom: 16px"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
    >
        <a-row>
            <template v-for="item in formItems" :key="item.filed">
                <a-col :="colLayout">
                    <a-form-item
                        v-if="!item.isHidden"
                        :label="item.label"
                        :name="item.filed"
                        :="item.colSpan"
                    >
                        <template v-if="item.type === 'input'">
                            <a-input
                                :placeholder="item.placeholder"
                                v-model:value="formData[`${item.filed}`]"
                            />
                        </template>

                        <template v-if="item.type === 'password'">
                            <a-input-password
                                autocomplete="off"
                                v-model:value="formData[`${item.filed}`]"
                                :placeholder="item.placeholder"
                            />
                        </template>

                        <template v-if="item.type === 'select'">
                            <a-select
                                ref="select"
                                v-model:value="formData[`${item.filed}`]"
                                style="width: 100%"
                                :options="item.options"
                            ></a-select>
                        </template>

                        <template v-if="item.type === 'rangepicker'">
                            <a-range-picker
                                v-model:value="formData[`${item.filed}`]"
                                style="width: 100%"
                            />
                        </template>
                    </a-form-item>
                </a-col>
            </template>
        </a-row>
        <a-row v-if="showFooter">
            <a-col :span="24" style="text-align: right">
                <a-form-item :wrapper-col="{ offset: 16, span: 8 }">
                    <a-space>
                        <slot name="footer"></slot>
                    </a-space>
                </a-form-item>
            </a-col>
        </a-row>
    </a-form>
</template>
<script setup>
    import { watch, ref } from 'vue'
    import { useUser } from '@/store'
    const userStore = useUser()

    const props = defineProps({
        pageName: {
            type: String,
        },
        modelValue: {
            type: Object,
            required: true,
        },
        formItems: {
            type: Array,
            default: () => [],
        },
        colSpan: {
            type: Object,
            default: () => ({
                'label-col': { span: 8 },
                'wrapper-col': { span: 16 },
            }),
        },
        colLayout: {
            type: Object,
            default: () => ({
                xxl: { span: 6 },
                xl: { span: 6 },
                lg: { span: 8 },
                md: { span: 12 },
                sm: { span: 24 },
                xs: { span: 24 },
            }),
        },
        showFooter: {
            type: Boolean,
            default: true,
        },
    })
    const emit = defineEmits(['update:modelValue'])

    // 将modelValue拷贝一份，假如modelValue中还有引用类型的属性，则应该使用深拷贝
    const formData = ref({ ...props.modelValue })
    /**
     * 注意：刚进页面时， props.modelValue 和 子组件的formData.value是两个内存地址，
     * 当用户在my-form中输入内容时，也就是子组件的formData有变化时，会emit('update:modelValue', newValue)
     * 父组件pageSearch收到newValue时，会赋值给父组件的formData，然后父组件在将formData传给子组件的modelValue，
     * 也就是说：这时候的 子组件的modalValue、子组件的formData、父组件的formData，这三个变量的内存地址是同一个
     * 问：为什么不能 formData.value= formOrignData ，这样去更改formData的值
     * 答：这样会导致父组件的formData 和 子组件的modelValue是同一个内存地址，而子组件的formData又是一个内存地址
     * 较为简单的办法：
     * 父组件pageSearch直接调用a-form的resetFields()
     */
    watch(
        formData,
        (newValue) => {
            emit('update:modelValue', newValue)
            // 将formData在store中保存一份，用于后续 请求表格数据时收集 pagination 和 fromData ，
            // 注意：如果是新建或编辑时，不需要传pageName，因为这时候是不需要备份fromData，
            if (props.pageName) userStore[props.pageName].formData = newValue
        },
        {
            deep: true,
        }
    )
    const onFinish = (values) => {
        console.log('Success:', values)
    }
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo)
    }
</script>
<style lang="less" scope>
    .my-form-cls {
    }
</style>
