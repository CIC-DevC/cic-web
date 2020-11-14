<template>
  <div class="app-container">
    <div v-if="isError">
      <span>{{ messageError }}</span>
    </div>
    <div v-else>
      <div class="info-container">
        <table>
          <tr>
            <td colspan="2">
              <span>{{ 'Thông tin của thuê bao: ' }}</span>
              <span style="font-weight: bold">{{ phoneNumber }}</span>
            </td>
          </tr>
          <tr>
            <td class="info-col-left">Điểm tín dụng</td>
            <td>0.001</td>
          </tr>
          <tr>
            <td class="info-col-left">Năm sinh</td>
            <td>1998</td>
          </tr>
          <tr>
            <td class="info-col-left">COL_17</td>
            <td>10/10/2020</td>
          </tr>
          <tr>
            <td class="info-col-left">COL_18</td>
            <td>10/10/2020</td>
          </tr>
        </table>
      </div>
      <div class="history_container">
        <el-tabs>
          <el-tab-pane label="Lịch sử điểm cá nhân">User</el-tab-pane>
          <el-tab-pane label="Lịch sử vay nợ">Config</el-tab-pane>
          <el-tab-pane label="Lịch sử thanh toán thẻ">Role</el-tab-pane>
          <el-tab-pane label="Lịch sử cuộc gọi">Task</el-tab-pane>
          <el-tab-pane label="Lịch sử dùng Internet">Task</el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import { toStringDate } from '@/utils/datetime';
import { validatePhoneNumberVietnam } from '@/utils/validate';
import { formatPhoneNumberVietNam } from '@/utils/index';
import { getUserDetail } from '@/api/user';

export default {
  beforeRouteEnter(to, from, next) {
    const phoneNumber = to.params.phoneNumber;
    if (phoneNumber && validatePhoneNumberVietnam(phoneNumber)) {
      const phoneNumberFormat = formatPhoneNumberVietNam(phoneNumber);
      next((vm) => {
        vm.isError = false;
        vm.phoneNumber = phoneNumberFormat;
      });
      //   getUserDetail(phoneNumberFormat)
      //     .then((response) => {
      //       next((vm) => {
      //         vm.isError = false;
      //         vm.phoneNumber = phoneNumberFormat;
      //       });
      //     })
      //     .catch(() => {
      //       next((vm) => {
      //         vm.isError = true;
      //         vm.messageError = 'Không thể tải dữ liệu';
      //       });
      //     });
    } else {
      next((vm) => {
        vm.isError = true;
        vm.messageError = 'Số điện thoại không hợp lệ';
      });
    }
  },
  components: {},
  name: 'UserDetail',
  data() {
    return {
      isError: false,
      messageError: '',
      phoneNumber: '',
    };
  },
  created() {},
  methods: {},
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.info-container {
  .info-col-left {
    padding-right: 100px;
  }
}
.history_container {
  margin-top: 40px;
}
</style>
