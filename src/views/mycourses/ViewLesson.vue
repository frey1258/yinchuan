<!--  -->
<template>
    <div class="app-container">
        <div >
            <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px"
                style="padding-bottom:0px;" class="p10bg255">
                <el-form-item label="学期" prop="type">
                    <el-select v-model="queryParams.type" placeholder="全部" clearable size="small">
                        <el-option v-for="dict in materialCates" :key="dict.dictValue"
                            :label="dict.dictLabel" :value="dict.dictValue" />
                    </el-select>
                </el-form-item>
                <el-form-item label="教学周" prop="materialGroupId">
                    <el-select v-model="queryParams.materialGroupId" placeholder="全部" clearable
                        size="small">
                        <el-option v-for="dict in materialGroups" :key="dict.id" :label="dict.name"
                            :value="dict.id" />
                    </el-select>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ViewLes',

    data() {
        return {
            queryParams:{},
            materialCates:[],
            materialGroups:[]
        };
    },

    components: {},

    computed: {},

    mounted() { },

    created() { },

    methods: {}
}

</script>
<style lang="scss" scoped>

</style>