<template>
  <div class="app-container">
    <div class="header-report">
      {{
        $t('dashboard.label.report', [
          toStringDate(this.currentMonth, 'MM/YYYY'),
        ])
      }}
    </div>

    <div class="tab-container">
      <el-tabs>
        <el-tab-pane label="Thông tin tổng quan">
          <div class="tab-content">
            <el-image src="static/images/report_1.png" fit="cover">
              <div slot="placeholder" class="image-slot">
                Đang tải<span class="dot">...</span>
              </div>
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
          </div>
        </el-tab-pane>
        <el-tab-pane label="Báo cáo về tình hình recharge và loan">
          <div class="tab-content">
            <el-image src="static/images/report_2.png" fit="cover">
              <div slot="placeholder" class="image-slot">
                Đang tải<span class="dot">...</span>
              </div>
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
          </div>
        </el-tab-pane>
        <el-tab-pane
          label="Báo cáo về tình hình sử dụng dịch vụ gọi và sử dụng Internet"
        >
          <div class="tab-content">
            <el-image src="static/images/report_3.png" fit="cover">
              <div slot="placeholder" class="image-slot">
                Đang tải<span class="dot">...</span>
              </div>
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { toStringDate } from '@/utils/datetime';

export default {
  components: {},
  name: 'ViewReport',
  beforeRouteEnter(to, from, next) {
    const year = to.query.year;
    const month = to.query.month;
    const date = new Date(year, month, 1);
    if (date instanceof Date && !isNaN(date)) {
      next((vm) => {
        vm.currentMonth = date;
      });
    } else {
      next();
    }
  },
  data() {
    return {
      currentMonth: new Date(),
    };
  },
  created() {},
  methods: {
    toStringDate,
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.header-report {
  font-weight: 500;
  font-size: 28px;
  color: #303133;
  padding: 0 0 20px 0;
  text-align: center;
}
.tab-content {
  display: flex;
  justify-content: center;
  padding: 20px;
}
</style>
