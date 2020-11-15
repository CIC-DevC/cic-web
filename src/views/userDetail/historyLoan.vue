<template>
  <div class="app-container">
    <div class="info-container">
      <table>
        <tr>
          <td class="info-col-left">Tổng vay</td>
          <td>0.001</td>
        </tr>
        <tr>
          <td class="info-col-left">Còn nợ</td>
          <td>{{ '' }}</td>
        </tr>
        <tr>
          <td class="info-col-left">Lần vay lớn nhất</td>
          <td>
            {{ '' }}
          </td>
        </tr>
        <tr>
          <td class="info-col-left">Lần vay nhỏ nhất</td>
          <td>
            {{ '' }}
          </td>
        </tr>
        <tr>
          <td class="info-col-left">Số lần vay</td>
          <td>
            {{ '' }}
          </td>
        </tr>
        <tr>
          <td class="info-col-left">Số lần vay chậm hạn</td>
          <td>
            {{ '' }}
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
            {{ scope.row.title }}
          </template>
        </el-table-column>
        <el-table-column :label="'Khoản vay'" :min-width="30">
          <template slot-scope="scope">
            <span>{{ scope.row.contentTypeName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="'Thời điểm tạo'" :min-width="25">
          <template slot-scope="scope">
            <span v-if="scope.row.created_at">
              {{
                toStringDate(
                  scope.row.created_at,
                  $t('common.formatDateTimeMoment')
                )
              }}
            </span>
          </template>
        </el-table-column>
        <el-table-column :label="'Lần cập nhật cuối cùng'" :min-width="25">
          <template slot-scope="scope">
            <span>{{ scope.row.contentTypeName }}</span>
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
        size: 20,
      },
    };
  },
  created() {},
  methods: {
    getList() {},
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
