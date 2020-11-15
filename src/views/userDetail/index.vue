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
              <span style="font-weight: bold">{{ data.phoneNum }}</span>
            </td>
          </tr>
          <tr>
            <td class="info-col-left">Điểm tín dụng</td>
            <td>0.001</td>
          </tr>
          <tr>
            <td class="info-col-left">Năm sinh</td>
            <td>{{ data.birthyear }}</td>
          </tr>
          <tr>
            <td class="info-col-left">COL_17</td>
            <td>
              {{ toStringDate(data.col17, $t('common.formatDateMoment')) }}
            </td>
          </tr>
          <tr>
            <td class="info-col-left">COL_18</td>
            <td>
              {{ toStringDate(data.col18, $t('common.formatDateMoment')) }}
            </td>
          </tr>
        </table>
      </div>
      <div class="history_container">
        <el-tabs>
          <el-tab-pane label="Lịch sử điểm cá nhân">
            <HistoryScore />
          </el-tab-pane>
          <el-tab-pane label="Lịch sử vay nợ">
            <HistoryLoan :data="data" />
          </el-tab-pane>
          <el-tab-pane label="Lịch sử thanh toán thẻ">
            <HistoryRecharge />
          </el-tab-pane>
          <el-tab-pane label="Lịch sử cuộc gọi">Chưa phát triển</el-tab-pane>
          <el-tab-pane label="Lịch sử dùng Internet"
            >Chưa phát triển</el-tab-pane
          >
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import { toStringDate } from '@/utils/datetime';
import { validatePhoneNumberVietnam } from '@/utils/validate';
import { formatPhoneNumberVietNam } from '@/utils/index';
import { getUserDetail } from '@/api/user';
import HistoryScore from './historyScore';
import HistoryLoan from './historyLoan';
import HistoryRecharge from './historyRecharge';

export default {
  components: { HistoryScore, HistoryLoan, HistoryRecharge },
  name: 'UserDetail',
  beforeRouteEnter(to, from, next) {
    const phoneNumber = to.params.phoneNumber;
    if (phoneNumber && validatePhoneNumberVietnam(phoneNumber)) {
      getUserDetail(formatPhoneNumberVietNam(phoneNumber))
        .then((response) => {
          if (response && response.data) {
            next((vm) => {
              vm.setData(response.data);
            });
          } else {
            next((vm) => {
              vm.setData(null);
            });
          }
        })
        .catch(() => {
          next((vm) => {
            vm.setData(null);
          });
        });
    } else {
      next((vm) => {
        vm.isError = true;
        vm.messageError = 'Số điện thoại không hợp lệ';
      });
    }
  },
  data() {
    return {
      isError: false,
      messageError: '',
      data: {},
    };
  },
  created() {},
  methods: {
    toStringDate,
    setData(data) {
      if (data) {
        this.isError = false;
        this.data = data;
      } else {
        this.isError = true;
        this.messageError = 'Không thể tải dữ liệu';
      }
    },
  },
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
