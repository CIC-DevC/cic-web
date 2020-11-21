<template>
  <div class="line-chart" :style="{ width: width, height: height }">
    <v-chart
      ref="lineChart"
      v-if="!isEmpty"
      :options="option"
      theme="light"
      autoresize
    />
    <div v-else style="padding-top: 50px; text-align: center;">
      {{ $t('common.noData') }}
    </div>
  </div>
</template>

<script>
import ECharts from 'vue-echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/dataZoom';
import 'echarts/lib/component/dataZoomInside';
import 'echarts/lib/component/toolbox';
import 'echarts/lib/component/title';
import theme from './theme';
ECharts.registerTheme('light', theme);

export default {
  components: {
    'v-chart': ECharts,
  },
  props: {
    width: {
      type: String,
      default: '600px',
    },
    height: {
      type: String,
      default: '400px',
    },
    yAxisLabel: {
      type: Array,
      default: () => [],
    },
    numLine: {
      type: Number,
      default: 0,
    },
    data: {
      type: Array,
      default() {
        return [];
      },
    },
    legend: {
      type: Array,
      default() {
        return [];
      },
    },
    color: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      default: '',
    },
  },
  watch: {
    data: {
      immediate: true,
      deep: true,
      handler(newValue) {
        if (this.option.series.length !== this.numLine) {
          this.option.series = [];
          for (let i = 0; i < this.numLine; i++) {
            this.option.series.push({
              name: this.legend[i],
              type: 'line',
              data: [],
              showSymbol: false,
              // symbolSize: 8,
              hoverAnimation: true,
              itemStyle: {
                color: this.color[i],
              },
            });
          }
        }
        if (newValue && newValue.length > 0) {
          const temp = JSON.parse(JSON.stringify(newValue));
          this.option.xAxis.data = temp.map((item) => item.label);
          for (let i = 0; i < this.numLine; i++) {
            this.option.series[i].data = temp.map((item) => item.value[i]);
          }
        } else {
          this.option.xAxis.data = [];
          for (let i = 0; i < this.numLine; i++) {
            this.option.series[i].data = [];
          }
        }
        if (this.$refs.lineChart) {
          this.$refs.lineChart.dispatchAction({
            type: 'restore',
          });
        }
      },
    },
    yAxisLabel: {
      immediate: true,
      deep: true,
      handler(newValue) {
        if (newValue) {
          this.option.yAxis.name = newValue;
        } else {
          this.option.yAxis.name = '';
        }
      },
    },
    legend: {
      immediate: true,
      deep: true,
      handler(newValue) {
        if (newValue) {
          this.option.legend.data = newValue;
        } else {
          this.option.legend.data = [];
        }
      },
    },
    title: {
      immediate: true,
      deep: true,
      handler(newValue) {
        if (newValue) {
          this.option.title.text = newValue;
        } else {
          this.option.title.text = '';
        }
      },
    },
  },
  computed: {
    isEmpty: function() {
      return !this.data || this.data.length === 0;
    },
  },
  data() {
    return {
      option: {
        title: {
          text: 'History score',
          textStyle: {
            fontFamily: 'Roboto',
            fontSize: '24',
            fontWeight: 'normal',
          },
          left: 'center',
        },
        legend: {
          data: [],
          bottom: 10,
          left: 'center',
          textStyle: {
            fontFamily: 'Roboto',
          },
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            animation: false,
            type: 'shadow',
          },
          textStyle: {
            fontFamily: 'Roboto',
          },
        },
        toolbox: {
          show: true,
          feature: {
            magicType: { type: ['line', 'bar'] },
            restore: {},
            saveAsImage: {
              name: 'image',
            },
          },
          showTitle: false,
        },
        backgroundColor: '#FFF',
        xAxis: {
          type: 'category',
          axisLine: { onZero: false },
          boundaryGap: true,
          data: [],
          nameTextStyle: {
            fontFamily: 'Roboto',
          },
        },
        yAxis: {
          type: 'value',
          nameTextStyle: {
            fontFamily: 'Roboto',
          },
        },
        grid: {
          left: '80px',
          right: '80px',
          bottom: '90px',
          containLabel: true,
        },
        dataZoom: [
          {
            bottom: '40px',
            start: 90,
            end: 100,
            handleIcon:
              'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '80%',
            handleStyle: {
              color: '#fff',
              shadowBlur: 3,
              shadowColor: 'rgba(0, 0, 0, 0.6)',
              shadowOffsetX: 2,
              shadowOffsetY: 2,
            },
          },
          {
            type: 'inside',
          },
        ],
        series: [],
      },
    };
  },
};
</script>
<style>
/**
 * The default size is 600px×400px, for responsive charts
 * you may need to set percentage values as follows (also
 * don't forget to provide a size for the container).
 */
.line-chart .echarts {
  width: 100%;
  height: 100%;
}
</style>
