<template>
  <div class="app-container">
    <div class="info-container">
      <table>
        <tr>
          <td class="info-col-left">Tổng thanh toán thẻ</td>
          <td>{{ formatCurrency(1500000) }}</td>
        </tr>
        <tr>
          <td class="info-col-left">Lần thanh toán lớn nhất</td>
          <td>{{ formatCurrency(500000) }}</td>
        </tr>
        <tr>
          <td class="info-col-left">Lần thanh toán nhỏ nhất</td>
          <td>
            {{ formatCurrency(20000) }}
          </td>
        </tr>
        <tr>
          <td class="info-col-left">Số lần thanh toán</td>
          <td>
            {{ 12 }}
          </td>
        </tr>
        <tr>
          <td class="info-col-left">Số lần thanh toán loại V</td>
          <td>
            {{ 6 }}
          </td>
        </tr>
        <tr>
          <td class="info-col-left">Số lần thanh toán loại C</td>
          <td>
            {{ 6 }}
          </td>
        </tr>
      </table>
    </div>

    <div class="table-container">
      <el-table
        :key="tableKey"
        :data="list"
        border
        fit
        highlight-current-row
        style="width: 100%; min-width: 800px;"
        class="content-table"
      >
        <el-table-column label="#" align="center" :min-width="4">
          <template slot-scope="scope">
            <span>{{ showIndex(scope.$index) }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="'Loại vay nợ'" :min-width="16">
          <template slot-scope="scope">
            {{ scope.row.typeRecharge }}
          </template>
        </el-table-column>
        <el-table-column :label="'Khoản vay'" :min-width="30">
          <template slot-scope="scope">
            <span>{{ formatCurrency(scope.row.recharge) }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="'Thời điểm tạo'" :min-width="25">
          <template slot-scope="scope">
            <span v-if="scope.row.createdTime">
              {{
                toStringDate(
                  scope.row.createdTime,
                  $t('common.formatDateTimeMoment')
                )
              }}
            </span>
          </template>
        </el-table-column>
        <el-table-column :label="'Lần cập nhật cuối cùng'" :min-width="25">
          <template slot-scope="scope">
            <span v-if="scope.row.updatedTime">
              {{
                toStringDate(
                  scope.row.createdTime,
                  $t('common.formatDateTimeMoment')
                )
              }}
            </span>
          </template>
        </el-table-column>
      </el-table>

      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.size"
        @pagination="getList"
      />
    </div>
  </div>
</template>

<script>
import { toStringDate } from '@/utils/datetime';
import Pagination from '@/components/Pagination';
import { formatCurrency } from '@/utils/number';
import dayjs from 'dayjs';

export default {
  components: { Pagination },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      tableKey: 0,
      list: [],
      total: 0,
      listQuery: {
        page: 1,
        size: 5,
      },
      listAll: [],
    };
  },
  created() {
    this.generateListAll();
    this.getList();
  },
  methods: {
    toStringDate,
    formatCurrency,
    getList() {
      this.total = this.listAll.length;
      this.list = this.listAll.slice(
        (this.listQuery.page - 1) * this.listQuery.size,
        this.listQuery.page * this.listQuery.size
      );
    },
    generateListAll() {
      this.listAll = [];
      const currentDate = dayjs();
      for (let i = 0; i < 20; i++) {
        this.listAll.push({
          id: i,
          typeRecharge: Math.round(Math.random()) ? 'C' : 'V',
          recharge: 50000,
          createdTime: dayjs()
            .subtract('5', 'day')
            .toDate(),
          updatedTime: dayjs()
            .subtract('1', 'day')
            .toDate(),
        });
      }
    },
    showIndex(index) {
      if (this.listQuery) {
        return (this.listQuery.page - 1) * this.listQuery.size + index + 1;
      }
      return index + 1;
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
.table-container {
  margin-top: 30px;
}

::v-deep .table-container {
  .el-table {
    .cell {
      word-break: normal;
    }
  }
  .pagination-container {
    margin-top: 10px;
  }
}
</style>
