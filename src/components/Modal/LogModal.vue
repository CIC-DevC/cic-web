<template>
  <el-dialog
    :title="$t('form.title.logList')"
    :visible.sync="data.visible"
    :before-close="cancelClose"
    :show-close="false"
    @close="$emit('close')"
  >
    <div class="box">
      <div v-for="(item, index) in data.content" :key="index">
        <span :class="index % 2 === 0 ? 'even' : 'odd'">{{ item }}</span>
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button icon="el-icon-close" type="primary" @click="btnclose">{{
        $t('form.action.close')
      }}</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { cancelClose } from '@/utils/form';
export default {
  name: 'LogModal',
  props: {
    data: {
      type: Object,
      default: {
        visible: false,
        content: [],
      },
    },
  },
  methods: {
    cancelClose,
    btnclose() {
      this.data.visible = false;
    },
  },
};
</script>
<style module>
.box {
  max-height: 600px;
  overflow-x: hidden;
  overflow-y: auto;
}
.even {
  display: inline-block;
  background-color: #f2f2f2;
  border-top: 1px solid #ddd;
  text-align: left;
  padding: 8px;
  width: 100%;
}
.odd {
  display: inline-block;
  border-top: 1px solid #ddd;
  text-align: left;
  padding: 8px;
  width: 100%;
}
</style>
