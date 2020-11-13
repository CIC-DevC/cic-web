<template>
  <div class="app-container" style="">
    <div class="list-report-container">
      <div
        class="report-item-container"
        v-for="item in list"
        :key="item.id"
        @click="gotoReportDetail(item)"
      >
        <div class="number-month">
          <span>{{ toStringDate(item.date, 'MM/YYYY') }}</span>
        </div>
        <div class="label-report">
          {{
            $t('dashboard.label.report', [toStringDate(item.date, 'MM/YYYY')])
          }}
        </div>
      </div>
    </div>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.size"
      @pagination="getList"
    />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination';
import dayjs from 'dayjs';
import { toStringDate } from '@/utils/datetime';

export default {
  components: { Pagination },
  name: 'DashBoard',
  data() {
    return {
      list: [],
      total: 0,
      listLoading: false,
      listQuery: {
        page: 1,
        size: 6,
      },
      listReports: [],
    };
  },
  created() {
    this.generateListReport();
    this.getList();
  },
  methods: {
    toStringDate,
    getList() {
      this.total = this.listReports.length;
      this.list = this.listReports.slice(
        (this.listQuery.page - 1) * this.listQuery.size,
        this.listQuery.page * this.listQuery.size
      );
    },
    generateListReport() {
      this.listReports = [];
      const currentDate = dayjs();
      for (let i = 1; i < 40; i++) {
        this.listReports.push({
          id: i,
          date: currentDate.subtract(i, 'month').toDate(),
        });
      }
    },
    gotoReportDetail(reportItem) {
      this.$router.push({
        name: 'viewReport',
        params: { reportItemId: reportItem.id },
      });
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.list-report-container {
  width: 100%;
  min-width: 600px;
  display: flex;
  flex-wrap: wrap;

  .report-item-container {
    width: 400px;
    padding: 15px 30px;
    margin: 20px 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 8px;
    color: #606266;

    cursor: pointer;

    -webkit-box-shadow: 3px 3px 5px 6px #ccc; /* Safari 3-4, iOS 4.0.2 - 4.2, Android 2.3+ */
    -moz-box-shadow: 3px 3px 5px 6px #ccc; /* Firefox 3.5 - 3.6 */
    box-shadow: 3px 3px 5px 6px #ccc; /* Opera 10.5, IE 9, Firefox 4+, Chrome 6+, iOS 5 */

    .number-month {
      width: 200px;
      height: 120px;
      font-size: 30px;
      border: 1px dashed black;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 30px 0px 20px 0px;
    }

    .label-report {
      font-size: 18px;
    }

    &:hover {
      .number-month {
        color: #409eff;
        border-color: #409eff;
      }
      .label-report {
        color: #409eff;
      }
    }
  }
}
</style>
