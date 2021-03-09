<!--  -->
<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch"
            label-width="88px" class="p10bg255" style="padding-bottom:0px;">
            <el-form-item label="关键字" prop="keyword">
                <el-input v-model="queryParams.keyword" placeholder="" clearable size="small"
                    @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="设备类型：" prop="type">
                <el-select v-model="queryParams.type" placeholder="请选择">
                    <el-option v-for="dict in types" :key="dict" :label="dict" :value="dict">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索
                </el-button>
                <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
        </el-form>

        <div class="p10bg255 mt20">
            <el-row :gutter="10" style="margin:0px;">
                <el-col :span="1.5">
                    <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAdd">
                        添加</el-button>
                </el-col>
                <el-col :span="1.5">
                    <el-button type="primary" icon="el-icon-close" size="mini"
                        @click="handleListDelete">删除</el-button>
                </el-col>
                <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"
                    :columns="columns"></right-toolbar>
            </el-row>

            <el-table :data="tablelist" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="50" align="center" />
                <el-table-column v-for="(ii,ix) in columns" :label="ii.label" align="center"
                    :key="ix+'dw'" v-if="ii.visible" :prop="ii.prop" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="操作" align="center" class-name="small-padding fixed-width"
                    width="200">
                    <template slot-scope="scope">
                        <el-button size="mini" type="text" icon="el-icon-view"
                            @click="handleView(scope.row,scope.$index)">详情</el-button>
                        <el-button size="mini" type="text" icon="el-icon-edit"
                            @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button size="mini" type="text" icon="el-icon-delete"
                            @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <pagination v-show="total>0" :total="total" :page.sync="queryParams.pageNum"
                :limit.sync="queryParams.pageSize" @pagination="getList"></pagination>
        </div>

        <!-- 详细 -->
        <el-dialog title="操作日志详细" :visible.sync="infoOpen" width="700px" append-to-body>
            <el-form ref="form" :model="infoForm" label-width="100px" size="mini">
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="open = false">关 闭</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {
    deviceAdd,
    deviceUpdate,
    deviceList,
    devicePage, deviceGet,
    deviceDelete
} from '@/api/yc_device.js';
export default {
    name: 'MyDevice',
    data() {
        return {
            queryParams: {
                pageNum: 1,
                pageSize: 10,
                keyword: undefined,
                type: undefined,
            },
            total: 0,
            showSearch: true,
            multiple: true,
            types: ['基础实验台', '三轴', '过程控制', '柔性产线', '微电网', '风光互补', '摄像头', '数控机床'],
            // 列信息
            columns: [
                { key: 1, label: `设备编号`, visible: true, prop: 'code' },
                { key: 2, label: `设备类型`, visible: true, prop: 'type' },
                { key: 3, label: `IP`, visible: true, prop: 'ip' },
                { key: 4, label: `供应商`, visible: true, prop: 'supplier' },
                { key: 5, label: `型号`, visible: true, prop: "model" },
                { key: 6, label: `铭牌号`, visible: true, prop: 'nameplate' },
                { key: 7, label: `出厂日期`, visible: true, prop: 'productionTime' },
                { key: 8, label: `备注`, visible: true, prop: 'remark' },
                { key: 9, label: `关联实验室`, visible: true, prop: 'labNames' },
            ],
            tablelist: [],
            infoForm: {},
            infoOpen: false
        };
    },

    components: {},

    computed: {},

    mounted() {
        this.getGroupList()
        this.getList()
    },

    created() { },

    methods: {
        handleQuery() {
            this.getList()
        },
        resetQuery() {
            this.resetForm("queryForm");
            this.handleQuery();
        },
        handleAdd() {
            this.$router.push({ path: '/device/add' })
        },
        handleListDelete() {

        },
        getGroupList() {
            // // 获取物料组所有数据
            // materialGroupList().then(res => {
            //     console.log(res)
            //     this.materialGroups = res.data
            // })
        },
        getList() {
            // 获取分页列表
            devicePage(this.queryParams).then((res) => {
                console.log(res)
                var list = res.data.list
                // list.forEach(element => {
                //     // 分类
                //     if (element.type == 0) {
                //         element.typeShift = '原材料'
                //     } else if (element.type == 1) {
                //         element.typeShift = '半成品'
                //     } else if (element.type == 2) {
                //         element.typeShift = '成品'
                //     }
                //     // 状态
                //     if (element.status == 0) {
                //         element.statusShift = '正常'
                //     } else if (element.status == 1) {
                //         element.statusShift = '停用'
                //     }
                // });
                this.tablelist = list
                this.total = res.data.total
            })
        },
        // 多选框选中数据
        handleSelectionChange(selection) {
            this.ids = selection.map(item => item.userId);
            this.single = selection.length != 1;
            this.multiple = !selection.length;
        },
        handleEdit(e) {
            this.$router.push({ path: '/device/update', query: { id: e.id } })
        },
        handleView(e, i) {
            // this.$router.push({ path: '/device/info', query: { id: e.id } })
            let targetUrl = '/default/deviceInfo'
            let id = 0
            if (e.type === '基础实验台') {
                id = 1
            } else if (e.type === '三轴') {
                id = 2
            } else if (e.type === '过程控制') {
                id = 3
            } else if (e.type === '柔性产线') {
                id = 4
            } else if (e.type === '微电网') {
                id = 5
            } else if (e.type === '数控机床') {
                id = 6
            } else if (e.type === '摄像头') {
                return
            } else if (e.type === '风光互补') {
                id = 8
            }
            let routeData = this.$router.resolve({ path: targetUrl, query: { id: id } })
            window.open(routeData.href, '_blank');
        },
        handleDelete(e) {
            this.$confirm('是否确认删除该设备?', "警告", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(function () {
                return deviceDelete(e.id);
            }).then(() => {
                this.getList();
                this.msgSuccess("删除成功");
            })
        }
    }
}

</script>
<style lang="scss" scoped>
::v-deep .el-date-editor {
    width: 180px;
}

::v-deep .el-input__inner {
    width: 180px;
}

.btmshowtitle {
    font-size: 15px;
    margin-top: 10px;
}
</style>