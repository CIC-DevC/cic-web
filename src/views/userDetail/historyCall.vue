<template>
  <div class="app-container">
    <div class="info-container">
      <table>
        <tr>
          <td class="info-col-left">Tổng thời lượng đã gọi</td>
          <td>{{ (data.totalCallTime || 0) + 's' }}</td>
        </tr>
        <tr>
          <td class="info-col-left">Trung bình thời lượng một cuộc gọi</td>
          <td>{{ (data.avgCallTime || 0) + 's' }}</td>
        </tr>
        <tr>
          <td class="info-col-left">Số lượng đối tác gọi</td>
          <td>
            {{ data.totalParnerCall || 0 }}
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
        <el-table-column :label="'Số điện thoại liên hệ'" :min-width="36">
          <template slot-scope="scope">
            {{ scope.row.partnerPhoneNum }}
          </template>
        </el-table-column>
        <el-table-column :label="'Thời gian gọi'" :min-width="20">
          <template slot-scope="scope">
            <span>{{ scope.row.secondPerCall + 's' }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="'Loại cước gọi'" :min-width="20">
          <template slot-scope="scope">
            <span>{{ scope.row.serviceType }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="'Ngày gọi'" :min-width="20">
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
    getList() {
      this.total = this.listAll.length;
      this.list = this.listAll.slice(
        (this.listQuery.page - 1) * this.listQuery.size,
        this.listQuery.page * this.listQuery.size
      );
    },
    convertData(data) {
      if (data && data.lstCall && data.lstCall.length > 0) {
        this.listAll = data.lstCall;
        this.total = data.lstCall.length;
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
