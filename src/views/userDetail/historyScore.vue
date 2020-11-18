<template>
  <div class="app-container">
    <div class="chart-container">
      <LineChart
        v-loading="loading"
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
import dayjs from 'dayjs';

export default {
  components: { LineChart },
  data() {
    return {
      loading: false,
      dataScore: [],
    };
  },
  created() {
    this.dataScore = [];
    for (let i = 100; i >= 0; i--) {
      this.dataScore.push({
        label: toStringDate(dayjs().subtract(i, 'day'), 'DD/MM/YYYY'),
        value: [Math.random(), Math.random()],
      });
    }
  },
  methods: {},
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.chart-container {
  padding: 0px 40px;
}
</style>
