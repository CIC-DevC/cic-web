<template>
  <div class="app-container">
    <div class="info-container">
      <table>
        <tr>
          <td class="info-col-left">Số lượng data đã sử dụng</td>
          <td>{{ data.numUsedInternet || 0 }}</td>
        </tr>
        <tr>
          <td class="info-col-left">Số lượng data đã tải lên</td>
          <td>{{ data.numUploadedInternet || 0 }}</td>
        </tr>
        <tr>
          <td class="info-col-left">
            Số lượng bạn dùng internet trong network
          </td>
          <td>
            {{ data.totalParnerInternet || 0 }}
          </td>
        </tr>
        <tr>
          <td class="info-col-left">
            ĐTB về tín dụng của bạn dùng internet trong network
          </td>
          <td>
            {{ data.avgScoreOfPartner || 0 }}
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
        <el-table-column :label="'Lượng data đã sử dụng'" :min-width="38">
          <template slot-scope="scope">
            {{ scope.row.usedData || 0 }}
          </template>
        </el-table-column>
        <el-table-column :label="'Lượng data đã tải lên'" :min-width="38">
          <template slot-scope="scope">
            <span>{{ scope.row.uploadData || 0 }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="'Ngày sử dụng internet'" :min-width="20">
          <template slot-scope="scope">
            <span v-if="scope.row.createdDate">
              {{
                toStringDate(
                  scope.row.createdDate,
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
  watch: {
    data: {
      immediate: true,
      deep: true,
      handler(newValue) {
        this.convertData(newValue);
        this.getList();
      },
    },
  },
  created() {
    this.convertData(this.data);
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
    convertData(data) {
      if (data && data.lstInternet && data.lstInternet.length > 0) {
        this.listAll = data.lstInternet;
        this.total = data.lstInternet.length;
      } else {
        this.listAll = [];
        this.total = 0;
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
