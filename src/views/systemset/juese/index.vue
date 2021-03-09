<!--  -->
<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch"
            class="p10bg255" style="padding-bottom:0px;" label-width="68px">
            <el-form-item label="关键字" prop="keyword">
                <el-input v-model="queryParams.keyword" placeholder="名称/编码" clearable size="small"
                    @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索
                </el-button>
                <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
        </el-form>
        <div class="p10bg255 mt20">
            <el-row :gutter="10" class="mb8">
                <el-col :span="1.5">
                    <el-button type="primary" plain icon="el-icon-plus" size="mini"
                        @click="handleAdd">添加</el-button>
                </el-col>
                <el-col :span="1.5">
                    <el-button type="danger" plain icon="el-icon-delete" size="mini"
                        :disabled="multiple" @click="handleListDelete">删除</el-button>
                </el-col>

            </el-row>

            <el-table :data="tablelist" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="50" align="center" />
                <el-table-column label="角色名称" show-overflow-tooltip prop="name"></el-table-column>
                <el-table-column label="用户数" show-overflow-tooltip prop="adminCount">
                </el-table-column>
                <el-table-column label="备注" show-overflow-tooltip prop="description">
                </el-table-column>
                <el-table-column label="操作" align="center" class-name="small-padding fixed-width"
                    width="150">
                    <template slot-scope="scope">
                        <el-button size="mini" type="text" icon="el-icon-edit"
                            @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button size="mini" type="text" icon="el-icon-delete"
                            @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
            <el-form ref="form" :model="form" :rules="rules" label-width="100px">
                <el-form-item label="角色名称:" prop="name">
                    <el-input v-model="form.name" placeholder="请输入角色名称" v-if="title != '查看角色'"/>
                    <div v-else>{{form.name}}</div>
                </el-form-item>
                <el-form-item label="备注:">
                    <el-input v-model="form.description" placeholder="请输入备注" v-if="title != '查看角色'"/>
                    <div v-else>{{form.description}}</div>
                </el-form-item>
                <el-form-item label="角色状态：">
                    <el-radio v-model="form.status" :label="1" v-if="title != '查看角色'">正常</el-radio>
                    <el-radio v-model="form.status" :label="0" v-if="title != '查看角色'">停用</el-radio>
                    <div v-else>{{form.statusShift}}</div>
                </el-form-item>
                <!-- <el-form-item label="权限分配">
                    <el-checkbox v-model="menuExpand"
                        @change="handleCheckedTreeExpand($event, 'menu')">展开/折叠</el-checkbox>
                    <el-checkbox v-model="menuNodeAll"
                        @change="handleCheckedTreeNodeAll($event, 'menu')">全选/全不选</el-checkbox>
                    <el-checkbox v-model="form.menuCheckStrictly"
                        @change="handleCheckedTreeConnect($event, 'menu')">父子联动</el-checkbox>
                    <el-tree class="tree-border" :data="menuOptions" show-checkbox ref="menu"
                        node-key="id" :check-strictly="!form.menuCheckStrictly" empty-text="加载中，请稍后"
                        :props="defaultProps"></el-tree>
                </el-form-item> -->

            </el-form>
            <div slot="footer" class="dialog-footer" v-if="title != '查看角色'">
                <el-button type="primary" icon="el-icon-check" @click="deviceCateOpeation">确 定
                </el-button>
                <el-button icon="el-icon-close" @click="open=false">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { roleList,roleDelete, roleAdd, roleUpdate, rolePage,
 roleListDelete, menuTreeList } from '@/api/yc_roles.js';
export default {
    name: 'JueSe',
    data() {
        return {
            queryParams: {
                pageNum: 1,
                pageSize: 10,
                keyword: undefined,
            },
            showSearch: true,
            multiple: true,
            tablelist: [],
            open: false,
            title: '',
            form: {

            },
            rules: {
                code: [
                    { required: true, message: "请输入设备类编码", trigger: "blur" }
                ],
                name: [
                    { required: true, message: "请输入角色名称", trigger: "blur" }
                ],
            },
            // 菜单列表
            menuOptions: [],
            defaultProps: {
                children: "children",
                label: "name"
            },
            menuExpand: false,
            menuNodeAll: false,
        };
    },

    components: {},

    computed: {},

    mounted() {
        this.getList()
        // menuTreeList().then(res => {
        //     console.log(res)
        //     this.menuOptions = res.data
        // })
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
            this.resetForm("form");
            this.open = true;
            this.title = "添加课节";
        },
        handleListDelete() { 
            let that = this
            this.$confirm('确认要删除这些角色吗?', "警告", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(function () {
                return roleListDelete(that.ids);
            }).then(() => {
                this.msgSuccess("删除成功");
                this.getList();
            })
        },
        getList() {
            // 获取分页列表
            rolePage(this.queryParams).then((res) => {
                console.log(res)
                var list = res.data.list
                list.forEach(element => {
                    if (element.status == 0) {
                        element.statusShift = '正常'
                    } else if (element.status == 1) {
                        element.statusShift = '停用'
                    }
                });
                this.tablelist = list
            })
        },
        // 多选框选中数据
        handleSelectionChange(selection) {
            this.ids = selection.map(item => item.id);
            this.single = selection.length != 1;
            this.multiple = !selection.length;
        },
        handleView(e) { 
            this.form = JSON.parse(JSON.stringify(e))
            this.resetForm("form");
            this.open = true;
            this.title = "查看角色";
        },
        handleEdit(e) {
            this.form = JSON.parse(JSON.stringify(e))
            this.resetForm("form");
            this.open = true;
            this.title = "修改角色";
        },
        handleDelete(e) {
            this.$confirm('确认要删除该角色吗?', "警告", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(function () {
                return roleDelete(e.id);
            }).then(() => {
                this.msgSuccess("删除成功");
                this.getList();
            })
        },
        deviceCateOpeation() {
            this.$refs["form"].validate(valid => {
                if (valid) {
                    if (this.form.id != undefined) {
                        // this.form.menuIds = this.getMenuAllCheckedKeys();
                        roleUpdate(this.form).then(response => {
                            this.msgSuccess("修改成功");
                            this.open = false;
                            this.getList();
                        });
                    } else {
                        // this.form.menuIds = this.getMenuAllCheckedKeys();
                        roleAdd(this.form).then(response => {
                            this.msgSuccess("新增成功");
                            this.open = false;
                            this.getList();
                        });
                    }
                }
            });
        },
        // 树权限（展开/折叠）
        handleCheckedTreeExpand(value, type) {
            let treeList = this.menuOptions;
            for (let i = 0; i < treeList.length; i++) {
                this.$refs.menu.store.nodesMap[treeList[i].id].expanded = value;
            }
        },
        // 树权限（全选/全不选）
        handleCheckedTreeNodeAll(value, type) {
            this.$refs.menu.setCheckedNodes(value ? this.menuOptions : []);
        },
        // 树权限（父子联动）
        handleCheckedTreeConnect(value, type) {
            this.form.menuCheckStrictly = value ? true : false;
        },
        // 所有菜单节点数据
        getMenuAllCheckedKeys() {
            // 目前被选中的菜单节点
            let checkedKeys = this.$refs.menu.getCheckedKeys();
            // 半选中的菜单节点
            let halfCheckedKeys = this.$refs.menu.getHalfCheckedKeys();
            checkedKeys.unshift.apply(checkedKeys, halfCheckedKeys);
            return checkedKeys;
        },
    }
}

</script>
<style lang="scss" scoped>
::v-deep .el-date-editor {
    width: 80%;
}

::v-deep .el-input__inner {
    width: 100%;
}
</style>