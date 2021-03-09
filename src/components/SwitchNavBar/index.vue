<!--  -->
<template>
    <el-row class="navc" v-if="device!='mobile'">
        <div v-for="(ii,ix) in ulist" :key="ix+'df'" class="navc_cell" :class="ix==currentix?'graybg':''" @click="handleix(ix)">
            {{ii}}
        </div>
    </el-row>
    <div v-else>
        <el-radio-group v-model="currentix" size="mini" @change="handleix">
            <el-radio-button v-for="(ii,ix) in ulist" :key="ix+'df'" :label="ix">{{ii}}</el-radio-button>
        </el-radio-group>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: '',
    data() {
        return {
            currentix: 0
        };
    },

    props: {
        ulist: {
            type: Array,
            default: false
        }
    },
    computed: {
        ...mapGetters([
            'device'
        ]),

    },
    methods: {
        handleix(e) {
            this.currentix = e
            this.$emit('handleix', e)
        },

    }
}

</script>
<style scoped>
.navc {
    padding: 0px;
    height: 60px;
    background-color: white;
    border-radius: 6px;
    display: flex;
    flex-wrap: wrap;
}

.navc_cell {
    height: 100%;
    font-size: 15px;
    padding: 0px 25px;
    background-color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
}

.graybg {
    background-color: rgb(209, 216, 204);
}
</style>