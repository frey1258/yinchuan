<!--  -->
<template>
    <div class="app-container">
        <div class="p10bg255">
            <div class="normalT1 mb20">基础信息</div>
            <el-row :gutter="50" type="flex" justify="center">
                <el-col :span="6" :xs="24">
                    <img :src="form.photo" class="imagev">
                </el-col>
                <el-col :span="6" :xs="24" class="cellv">
                    <div><span class="leftdiv">实验室名称：</span><span>{{form.name}}</span></div>
                    <div><span class="leftdiv">所在位置：</span><span>{{form.location}}</span></div>
                    <div><span class="leftdiv">责任人：</span><span>{{form.teacherName}}</span></div>
                    <div><span class="leftdiv">使用率系数：</span><span>{{form.useCoefficient}}</span>
                    </div>
                </el-col>
                <el-col :span="6" :xs="24" class="cellv">
                    <div><span class="leftdiv">权重：</span><span>{{form.weight}}</span></div>
                    <div><span class="leftdiv">备注：</span><span>{{form.remark}}</span></div>
                    <div><span class="leftdiv">当前使用率：</span><span>{{form.currentUseRate || 0}}%</span>
                    </div>
                    <div><span class="leftdiv">学期使用率：</span><span>{{form.semesterUseRate || 0}}%</span>
                    </div>
                </el-col>
                <el-col :span="6" :xs="24" class="cellv">
                    <div><span class="leftdiv">当前使用情况：</span><span>{{form.useStatus}}</span></div>
                    <div><span class="leftdiv">上课老师：</span><span>{{form.attendTeacherName}}</span>
                    </div>
                    <div><span class="leftdiv">上课班级：</span><span>{{form.attendClassesName}}</span>
                    </div>
                    <div><span class="leftdiv">使用目的：</span><span>{{form.useGoal}}</span></div>
                </el-col>
            </el-row>
        </div>

        <div class="p10bg255 mt20">
            <div class="normalT1 mb20 fls">
                视频监控
                <el-select v-model="form.device" placeholder="全部" size="small" class="selectv"
                    @click="deviceChange">
                    <el-option v-for="dict in devices" :key="dict.id" :label="dict.name"
                        :value="dict.id" />
                </el-select>
            </div>
        </div>

        <div class="p10bg255 mt20">
            <div class="normalT1 mb20 fls">关联设备
                <el-button type="primary" size="mini" @click="linkDevice">
                    关联设备</el-button>
            </div>
            <el-table :data="form.devices">
                <el-table-column type="selection" width="50" align="center" />
                <el-table-column align="center" label="设备编号" prop="code" show-overflow-tooltip>
                </el-table-column>
                <el-table-column align="center" label="类型" prop="type" show-overflow-tooltip>
                </el-table-column>
                <el-table-column align="center" label="IP" prop="ip" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="操作" align="center" class-name="small-padding fixed-width"
                    width="200">
                    <template slot-scope="scope">
                        <el-button size="mini" type="text" icon="el-icon-view"
                            @click="handleView(scope.row,scope.$index)">详情</el-button>
                        <el-button size="mini" type="text" icon="el-icon-delete"
                            @click="handleDelete(scope.row)">移除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="p10bg255 mt20" v-if="0">
            <div class="normalT1 mb20 fls">
                <div>出入控制 <span
                        style="font-size:12px;padding-left:10px;">*添加后的用户在非预约状态下仍可通过人脸识别进出</span>
                </div>
                <el-button type="primary" size="mini" @click="addUser">
                    添加用户</el-button>
            </div>
            <el-radio-group v-model="tabPosition" style="margin-bottom:15px;" @change="tabChange">
                <el-radio-button label="1">
                    密码管理
                </el-radio-button>
                <el-radio-button label="2">内部授权</el-radio-button>
                <el-radio-button label="3">外部授权</el-radio-button>
            </el-radio-group>
            <div v-show="tabPosition == '1'">
                <span>开门密码</span>
                <span v-if="!showOpenPassword">********</span>
                <span v-else>{{form.openPassword}}</span>
                <i class="el-icon-view" v-if="!showOpenPassword"></i>
                <i class="el-icon-remove-outline" v-else></i>
                <i class="el-icon-edit"></i>
            </div>
            <!-- 内部 -->
            <el-table :data="form.innerUser" v-show="tabPosition == '2'">
                <el-table-column type="selection" width="50" align="center" />
                <el-table-column align="center" label="姓名" prop="username" show-overflow-tooltip>
                </el-table-column>
                <el-table-column align="center" label="角色" prop="roleNames" show-overflow-tooltip>
                </el-table-column>
                <el-table-column align="center" label="用户编号" prop="no" show-overflow-tooltip>
                </el-table-column>
                <el-table-column align="center" label="照片" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <div @click="seeImg(scope.row.photo)">查看</div>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="照片状态" show-overflow-tooltip>
                    <template slot-scope="scope">
                        {{scope.row.photoStatus==0?"待检验":''}}
                        {{scope.row.photoStatus==1?"未通过":''}}
                        {{scope.row.photoStatus==2?"已通过":''}}
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
                    <template slot-scope="scope">
                        <el-button size="mini" type="text" icon="el-icon-delete"
                            @click="handleInnerDelete(scope.row)">移除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 外部 -->
            <el-table :data="form.outUser" v-show="tabPosition == '3'">
                <el-table-column type="selection" width="50" align="center" />
                <el-table-column align="center" label="姓名" prop="nickName" show-overflow-tooltip>
                </el-table-column>
                <el-table-column align="center" label="备注" prop="note" show-overflow-tooltip>
                </el-table-column>
                <el-table-column align="center" label="照片" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <div @click="seeImg(scope.row.photo)">查看</div>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="照片状态" show-overflow-tooltip>
                    <template slot-scope="scope">
                        {{scope.row.photoStatus==0?"待检验":''}}
                        {{scope.row.photoStatus==1?"未通过":''}}
                        {{scope.row.photoStatus==2?"已通过":''}}
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
                    <template slot-scope="scope">
                        <el-button size="mini" type="text" icon="el-icon-delete"
                            @click="handleOutDelete(scope.row)">移除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!--  -->
        <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
            <el-table :data="devices" @selection-change="handleSelectionChange" ref="tableList"
                v-if="title!='添加外部用户'">
                <el-table-column type="selection" width="50" align="center" />
                <el-table-column v-for="(ii,ix) in columns" :label="ii.label" align="center"
                    :key="ix+'dw'" v-if="ii.visible" :prop="ii.prop" show-overflow-tooltip>
                </el-table-column>
            </el-table>

            <el-form ref="form" :model="form" :rules="rules" label-width="120px" v-else>
                <el-form-item label="用户姓名:" prop="code">
                    <el-input v-model="form.code" placeholder="请输入BOM组编码" />
                </el-form-item>
                <el-form-item label="照片:" prop="name">

                </el-form-item>
                <el-form-item label="备注:" prop="code">
                    <el-input v-model="form.code" placeholder="请输入备注" />
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button type="primary" icon="el-icon-check" @click="addOperation">确 定</el-button>
                <el-button icon="el-icon-close" @click="cancelOperation">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {
    labAdd, labUpdate, labAddInnerUser, labAddOutUser,
    labRelatedDevice, labUpdatePassword, labList, labPage, labGet, labDelete
} from '@/api/yc_laboratory.js';
import { deviceList } from '@/api/yc_device.js';
export default {
    name: '',
    data() {
        return {
            tablelist: [],
            tabPosition: '1',
            open: false,
            title: '',
            tableList: [],
            selectlist: [],
            form: { devices: [] },
            rules: {
                roleName: [
                    { required: true, message: "角色名称不能为空", trigger: "blur" }
                ],
                roleKey: [
                    { required: true, message: "权限字符不能为空", trigger: "blur" }
                ],
                code: [
                    { required: true, message: "请输入BOM组编码", trigger: "blur" }
                ],
                name: [
                    { required: true, message: "请输入BOM组名称", trigger: "blur" }
                ],
            },
            columns: [],
            devices: [],
            linkDeviceList: [],
            ids: [],
            showOpenPassword: false
        };
    },

    components: {},

    computed: {},

    mounted() {
        this.getInfo()
        deviceList().then(res => {
            this.devices = res.data
        })
        // this.getLinkDevice()

    },

    created() { },

    methods: {
         handleView(e, i) {
             this.$router.push({ path: '/device/info', query: { id: e.id } })
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

        },
        handleSelectionChange(selection) {
            this.ids = selection.map(item => item.id);
        },
        getInfo() {
            labGet(this.$route.query.id).then(res => {
                console.log(res)
                this.form = res.data
            })

        },
        addLinkDevice(arr) {
            let param = {
                labId: this.$route.query.id,
                deviceIds: this.ids
            }
            labRelatedDevice(param).then(res => {
                this.open = false
                this.msgSuccess("添加成功");
                this.getInfo()
            })
        },
        linkDevice() {
            this.title = '关联设备'
            this.open = true
            this.columns = [
                { key: 1, label: `设备编号`, visible: true, prop: 'code' },
                { key: 2, label: `设备类型`, visible: true, prop: 'type' },
                { key: 3, label: `IP`, visible: true, prop: 'ip' },
                { key: 4, label: `供应商`, visible: true, prop: 'supplier' },
                { key: 5, label: `型号`, visible: true, prop: "model" },
                { key: 6, label: `铭牌号`, visible: true, prop: 'nameplate' },
                { key: 7, label: `出厂日期`, visible: true, prop: 'productionTime' },
                { key: 8, label: `备注`, visible: true, prop: 'remark' },
            ]
        },
        addUser() {
            if (this.tabPosition == '2') {
                this.title = '添加内部用户'
                this.columns = [
                { key: 1, label: `用户编号`, visible: true, prop: 'code' },
                { key: 2, label: `姓名`, visible: true, prop: 'name' },
                { key: 3, label: `角色`, visible: true, prop: 'weight' },
                { key: 4, label: `备注`, visible: true, prop: 'brand' },
                { key: 5, label: `用户状态`, visible: true, prop: "typeShift" },
            ]
            }else if (this.tabPosition == '3'){
                 this.title = '添加外部用户'
            }
            this.open = true
        },
        addOperation() {
            if (this.title == '关联设备') {
                if (this.ids.length) {
                    this.addLinkDevice()
                } else {
                    this.$message.error('请选择要添加的关联设备')
                }
            }
        },
        cancelOperation() {
            this.open = false
        },
        deviceChange(e) {

        },
        tabChange(e) {
            console.log(e)
        },
        handleInnerDelete(e) {

        },
        handleOutDelete(e) {

        }
    }
}

</script>
<style lang="scss" scoped>
.imagev {
    display: block;
    width: 100%;
    height: 200px;
    object-fit: cover;
}

.selectv {
    width: 200px;
}

.cellv {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}
.leftdiv {
    width: 300px;
}
</style>