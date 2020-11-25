<template>
  <div class="app-container">
    <div class="chart-container">
      <LineChart
        :data="dataScore"
        :title="'Biểu đồ lịch sử điểm cá nhân'"
        :width="'100%'"
        :height="'500px'"
        :numLine="2"
        :color="['#409EFF', '#E6A23C']"
        :legend="['Score', 'Average']"
      />
    </div>
  </div>
</template>

<script>
import { toStringDate } from '@/utils/datetime';
import LineChart from '@/components/charts/lineChart';

export default {
  components: { LineChart },
  props: {
    data: {
      type: Object,
      default: {},
    },
  },
  watch: {
    data: {
      immediate: true,
      deep: true,
      handler(newValue) {
        this.convertData(newValue);
      },
    },
  },
  data() {
    return {
      dataScore: [],
    };
  },
  created() {
    this.convertData(this.data);
  },
  methods: {
    convertData(data) {
      if (data && data.scoreHistoryLst && data.scoreHistoryLst.length > 0) {
        this.dataScore = data.scoreHistoryLst.map((item) => {
          return {
            value: [item.score, Math.random()],
            label: toStringDate(
              item.createdDate,
              this.$t('common.formatDateMoment')
            ),
          };
        });
      } else {
        this.dataScore = [];
      }
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.chart-container {
  padding: 0px 40px;
}
</style>
