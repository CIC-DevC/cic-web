<template>
  <div class="app-container">
    <div class="form-container">
      <el-divider content-position="left">Truy vấn thông tin</el-divider>
      <el-form
        ref="form"
        :model="form"
        label-width="120px"
        label-position="top"
        :rules="rules"
        size="small"
        class="search-form"
      >
        <el-row>
          <el-col :span="6">
            <el-form-item label="Số điện thoại">
              <el-input v-model="form.phone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            &nbsp;
          </el-col>
          <el-col :span="7">
            <el-form-item label="Thành phố">
              <el-select
                v-model="form.city"
                placeholder=""
                clearable
                filterable
                style="width:100%"
                @change="changeCity"
              >
                <el-option
                  v-for="item in listCity"
                  :key="item.i"
                  :label="item.n"
                  :value="item.i"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            &nbsp;
          </el-col>
          <el-col :span="7">
            <el-form-item label="Quận, huyện">
              <el-select
                v-model="form.district"
                placeholder=""
                clearable
                filterable
                style="width:100%"
              >
                <el-option
                  v-for="item in listDitrict"
                  :key="item.i"
                  :label="item.n"
                  :value="item.i"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="6">
            <el-form-item label="Năm sinh" prop="birthYear">
              <el-input
                v-model.number="form.birthYear"
                style="width: 100%;"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            &nbsp;
          </el-col>
          <el-col :span="7">
            <el-form-item label="COL_17">
              <el-date-picker
                type="date"
                placeholder=""
                v-model="form.col17"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            &nbsp;
          </el-col>
          <el-col :span="7">
            <el-form-item label="COL_18">
              <el-date-picker
                type="date"
                placeholder=""
                v-model="form.col18"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="text-align:right; margin-top: 10px">
          <el-button
            type="primary"
            @click="handleSearch"
            icon="el-icon-search"
            :disabled="!enableSearch"
            >{{ $t('button.check') }}</el-button
          >
        </el-row>
      </el-form>
    </div>
    <div class="result-container">
      <el-divider content-position="left">Kết quả kiểm tra</el-divider>
      <div style="margin-top:40px">
        <el-table
          v-loading="loading"
          :key="result.tableKey"
          :data="result.list"
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
          <el-table-column :label="'Thuê bao'" :min-width="12">
            <template slot-scope="scope">
              <router-link
                :to="{
                  name: 'searchInfo.userDetail',
                  params: { phoneNumber: scope.row.phoneNum },
                }"
                target="_blank"
                class="link-type"
              >
                {{ scope.row.phoneNum }}
              </router-link>
            </template>
          </el-table-column>
          <el-table-column :label="'Thành phố'" :min-width="12">
            <template slot-scope="scope">
              <span>{{ scope.row.cityId }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="'Quận, huyện'" :min-width="12">
            <template slot-scope="scope">
              <span>{{ scope.row.areaId }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="'Năm sinh'" :min-width="12">
            <template slot-scope="scope">
              <span>{{ scope.row.birthyear }}</span>
            </template>
          </el-table-column>
          <el-table-column :label="'COL_17'" :min-width="12">
            <template slot-scope="scope">
              <span v-if="scope.row.col17">
                {{
                  toStringDate(
                    scope.row.col17,
                    $t('common.formatDateTimeMoment')
                  )
                }}
              </span>
            </template>
          </el-table-column>
          <el-table-column :label="'COL_18'" :min-width="12">
            <template slot-scope="scope">
              <span v-if="scope.row.col18">
                {{
                  toStringDate(
                    scope.row.col18,
                    $t('common.formatDateTimeMoment')
                  )
                }}
              </span>
            </template>
          </el-table-column>
          <el-table-column :label="'Điểm tín dụng'" :min-width="12">
            <template slot-scope="scope">
              <span>{{ scope.row.score }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            class-name="small-padding"
            :min-width="12"
          >
            <template slot-scope="scope">
              <el-button
                size="small"
                icon="el-icon-info"
                plain
                @click="handleDetail(scope.row)"
                >Chi tiết</el-button
              >
            </template>
          </el-table-column>
        </el-table>

        <pagination
          v-show="result.total > 0"
          :total="result.total"
          :page.sync="result.listQuery.page"
          :limit.sync="result.listQuery.size"
          @pagination="getListResultPaging"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { toStringDate } from '@/utils/datetime';
import Pagination from '@/components/Pagination';
import CityDistrictData from './city_district_data';
import { filterUser } from '@/api/user';

export default {
  components: { Pagination },
  name: 'SearchInfo',
  data() {
    var checkBirthYear = (rule, value, callback) => {
      if (value !== null && value !== undefined && value !== '') {
        if (!Number.isInteger(value)) {
          callback(new Error('Năm sinh phải là một số'));
          return;
        } else if (value <= 1900 || value >= parseInt(new Date().getFullYear)) {
          callback(new Error('Năm sinh không hợp lệ'));
          return;
        }
      }
      callback();
    };

    return {
      listCity: CityDistrictData,
      listDitrict: [],
      form: {
        phone: '',
        city: null,
        district: null,
        birthYear: null,
        col17: '',
        col18: '',
      },
      rules: {
        birthYear: [{ validator: checkBirthYear, trigger: 'blur' }],
      },
      loading: false,
      result: {
        tableKey: 0,
        listAll: [],
        list: [],
        total: 0,
        listQuery: {
          page: 1,
          size: 5,
        },
      },
    };
  },
  computed: {
    enableSearch() {
      return (
        (this.form.phone && this.form.phone.toString().trim() !== '') ||
        this.form.city ||
        this.form.district ||
        this.form.birthYear ||
        this.form.col17 ||
        this.form.col18
      );
    },
  },
  created() {},
  methods: {
    toStringDate,
    formatPhone(phoneNumber) {
      if (phoneNumber) {
        if (phoneNumber.startsWith('0')) {
          return '84' + phoneNumber.substring(1);
        } else if (phoneNumber.startsWith('+84')) {
          return phoneNumber.substring(1);
        } else {
          return phoneNumber;
        }
      } else {
        return '';
      }
    },
    handleSearch() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true;
          filterUser(this.formatPhone(this.form.phone))
            .then((response) => {
              if (response.data && response.data.length > 0) {
                this.result.total = response.data.length;
                this.result.listAll = response.data;
              }
            })
            .catch(() => {
              this.result.total = 0;
              this.result.listAll = [];
            })
            .finally(() => {
              this.getListResultPaging();
              this.loading = false;
            });
        } else {
          return false;
        }
      });
    },
    getListResultPaging() {
      if (this.result.listAll.length > 0) {
        this.result.list = this.result.listAll.slice(
          (this.result.listQuery.page - 1) * this.result.listQuery.size,
          this.result.listQuery.page * this.result.listQuery.size
        );
      } else {
        this.result.list = [];
      }
    },
    showIndex(index) {
      if (this.result.listQuery) {
        return (
          (this.result.listQuery.page - 1) * this.result.listQuery.size +
          index +
          1
        );
      }
      return index + 1;
    },
    handleDetail(data) {
      this.$router.push({
        name: 'searchInfo.userDetail',
        params: { phoneNumber: data.phoneNum },
      });
    },
    getListDistrict() {
      if (this.form.city !== null && this.form.city !== undefined) {
        const temp = CityDistrictData.filter(
          (item) => item.i === this.form.city
        );
        if (temp && temp.length > 0) {
          return temp[0].c;
        }
      }
      return [];
    },
    changeCity() {
      this.form.district = null;
      this.listDitrict = this.getListDistrict();
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
::v-deep .el-divider__text {
  font-size: 20px;
}

::v-deep .form-container {
  .el-form-item__label {
    padding: 0px;
  }
}

::v-deep .result-container {
  .el-table {
    .cell {
      word-break: normal;
    }
  }
  .pagination-container {
    margin-top: 10px;
  }
}

.form-container {
  .search-form {
    padding: 0px 80px;
  }
}

.result-container {
  margin-top: 50px;
}
</style>
