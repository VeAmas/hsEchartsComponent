<template>
  <div class="echarts-component theme-bg-color">
    <div
      ref="chartSlot"
      :style="{ visibility: noData && showNoData ? 'hidden' : 'visible' }"
      class="chart-slot"
      style="width: 100%; height: 100%"
    ></div>
    <div v-show="noData && showNoData" class="nodata theme-text-empty">
      暂无数据
    </div>
    <slot></slot>
  </div>
</template>

<script>
// @ts-check
import mixin from './mixins/base.vue';
import echarts from 'echarts';
import {
  throttle,
  getDefaultPropDatas,
  mergeChainingProps,
  optionExtraProcess,
  cloneDeep
} from './utils.js';
import { propsObjectGrid } from './propsObjects';
import { isUcf } from 'ambf-common-js/common/utils';

import Legend from './Legend/index.vue';
import DataZoomInside from './DataZoom/Inside.vue';
import DataZoomSlider from './DataZoom/Slider.vue';
import Tooltip from './Tooltip/index.vue';
import { GRID_TOP, GRID_BOTTOM, basic10Colors } from './constant.js';

/**
 * @typedef {InstanceType<typeof mixin>} Mixin
 * @typedef {import('echarts').EChartOption} Option
 * @typedef {import('echarts')} echarts
 * @typedef {InstanceType<import('./mixins/extend.vue')['default']>} Part
 * @typedef {InstanceType<import('./Series/base.vue')['default']>} SeriesBase
 * @typedef {{$refs: { chartSlot?: HTMLDivElement }}} $refs
 */

export const props = {
  /** @type {import('vue').PropOptions<Option['color']>} */
  color: {
    default: () => basic10Colors
  },

  /** @type {import('vue').PropOptions<Option['grid']>} */
  grid: {
    default: () => ({
      top: GRID_TOP,
      left: '12px',
      right: '12px',
      bottom: GRID_BOTTOM,
      containLabel: true
    })
  },

  ...propsObjectGrid,

  /** 是否在无Tooltip组件的情况下默认展示Tooltip */
  showTooltip: {
    default: true
  },

  /** 是否在无Legend组件的情况下默认展示Legend */
  showLegend: {
    default: true
  },

  /** 是否在无DataZoom组件的情况下默认展示DataZoom */
  showDataZoom: {
    default: true
  },

  /** showDataZoom为true的前提下, DataZoom出现的数据阈值 */
  dataZoomThreshold: {
    default: 31
  },

  /** 是否展示「暂无数据」 */
  showNoData: {
    default: true
  },

  /**
   * 组件的配置项 传入这个参数则组件只使用这个配置
   * @type {import('vue').PropOptions<Option>}
   */
  option: {
    default: undefined
  }
};

export default {
  name: 'EchartComponent',
  mixins: [mixin],
  props: { ...props },
  data() {
    const data = {
      optionFrame: {
        main: this,
        title: [],
        xaxis: [],
        yaxis: [],
        series: [],
        datazoom: [],
        tooltip: null,
        legend: null
      },
      /** @type {NodeJS.Timeout} */
      triggerTimeout: null,
      /** @type {echarts.ECharts} */
      chartInstance: null,
      /** 请求更新的组件列表 */
      calleeComponents: [],

      category: 'main',

      theme: '',

      /** @type {ResizeObserver} */
      ro: null
    };
    return /** @type {typeof data & Mixin & $refs} */ (data);
  },
  watch: {
    theme() {
      if (this.chartInstance) {
        this.chartInstance.dispose();
        this.chartInstance = echarts.init(this.$refs.chartSlot, this.theme);
        this.registerEvent();
        this.update();
      }
    }
  },
  computed: {
    /**
     * 当前图表是否没有数据
     * @return {boolean}
     */
    noData() {
      if (this.option) {
        return false;
      }
      if (!this.optionFrame.series) {
        return true;
      }
      return this.optionFrame.series.every(
        (/** @type {SeriesBase} */ v) => v.noData
      );
    }
  },
  methods: {
    /**
     * 生成组件的配置项
     * @param {any} [components] 子组件 (为空时更新全部配置项)
     */
    generateOption(components) {
      if (this.option) {
        return this.option;
      }

      /** @type {Option} */
      let option = {};
      /** @type {Part[]} */
      let cmps = components;
      /** 不传入的话则更新全部 */
      if (!cmps) {
        cmps = Object.keys(this.optionFrame)
          .flatMap(key => {
            const v = this.optionFrame[key];
            return Array.isArray(v) ? v : [v];
          })
          .filter(v => v);
      }

      /** @type {Map<string, Part>}  */
      const categoryMap = new Map();

      cmps.forEach(v => {
        categoryMap.set(v.category, v);
      });

      categoryMap.forEach(v => {
        Object.assign(option, v.generateUpdateOption());
      });

      if (this.showTooltip && !option.tooltip) {
        option.tooltip = getDefaultPropDatas(Tooltip);
      }
      if (this.showLegend && !option.legend) {
        option.legend = getDefaultPropDatas(Legend);
      }
      if (this.showDataZoom && !option.dataZoom) {
        option.dataZoom = [
          { type: 'slider', ...getDefaultPropDatas(DataZoomSlider) },
          { type: 'inside', ...getDefaultPropDatas(DataZoomInside) }
        ];
      }

      option = optionExtraProcess(cloneDeep(option), this);

      console.log(option);

      return option;
    },

    /**
     * 触发更新视图
     * 如果传入调用者 则只更新调用者提供的option
     * @param {Mixin} [calleeComponent] 调用的组件
     */
    triggerUpdate(calleeComponent) {
      this.calleeComponents.push(calleeComponent);
      /** 查找联动更新组件 */
      calleeComponent.findCollaborationCmps().forEach(v => {
        if (!this.calleeComponents.includes(v)) {
          this.triggerUpdate(v);
        }
      });
      clearTimeout(this.triggerTimeout);
      this.triggerTimeout = setTimeout(() => {
        if (this.calleeComponents.some(v => !v)) {
          this.calleeComponents = [];
          return this.update();
        }
        // const option = this.generateOption(this.calleeComponents);
        const option = this.generateOption();
        this.update(option);
        this.calleeComponents = [];
      }, 50);
    },

    /**
     * 更新组件的option (内部使用)
     * @param {Option} [option]
     */
    update(option) {
      if (option) {
        this.chartInstance.setOption(option, true);
      } else {
        this.chartInstance.setOption(this.generateOption(), true);
      }
    },

    /** 初始化组件 */
    init() {
      this.chartInstance = echarts.init(this.$refs.chartSlot, this.theme);
      this.triggerUpdate(this);
      this.registerEvent();
    },

    /** 根据组件上绑定的事件 在组件实例上订阅事件 */
    registerEvent() {
      if (!this.chartInstance) {
        return;
      }
      /** $listeners上是组件上绑定的事件(@xxx="") */
      for (const eventName in this.$listeners) {
        if (Object.hasOwnProperty.call(this.$listeners, eventName)) {
          this.chartInstance.on(eventName, (...param) => {
            this.$emit(eventName, ...param);
          });
        }
      }
    },

    /**
     * 等价于Echarts.dispatchAction
     * @type {import('echarts').ECharts['dispatchAction']}
     */
    dispatchAction(...param) {
      this.chartInstance?.dispatchAction(...param);
    },

    /**
     * 获取图片的信息(base64) 用于导出
     * @param {{width: number; height: number;}} [size] 导出图片的尺寸
     * @returns {Promise<string>}
     */
    getImageData(size) {
      if (!this.chartInstance || this.noData) {
        return Promise.resolve('');
      }
      /** @type {HTMLDivElement} */
      const parent = document.createElement('div');
      document.body.append(parent);

      let width = 0;
      let height = 0;

      if (size) {
        width = size.width;
        height = size.height;
      } else {
        width = parent.offsetWidth || 1920;
        height = parent.offsetHeight || 500;
      }

      parent.style.display = 'block';
      parent.style.visibility = 'hidden';
      parent.style.position = 'absolute';
      parent.style.width = width + 'px';
      parent.style.height = height + 'px';
      return new Promise(rev => {
        let newChart;
        this.$nextTick(() => {
          newChart = echarts.init(parent);
          newChart.setOption(this.chartInstance.getOption());
        });
        setTimeout(() => {
          rev(
            newChart.getDataURL({
              backgroundColor: {
                blue: '#fff',
                dark: '#263140'
              }[this.theme]
            })
          );
          newChart.dispose();
          parent.remove();
        }, 1000);
      });
    },

    /** 初始化ResizeObserver */
    initResizeObserver() {
      const resize = throttle(() => {
        // @ts-ignore
        if (this.$el.offsetWidth > 0) {
          this.chartInstance?.resize();
          this.$emit('on-resize');
        }
      }, 300);

      this.ro = new ResizeObserver(() => {
        resize();
      });

      this.ro.observe(this.$el);
    },

    /** 销毁ResizeObserver */
    disposeResizeObserver() {
      this.ro?.disconnect();
      this.ro?.unobserve(this.$el);
    },

    /** 更新主干上的一些参数 main.vue的props */
    generateUpdateOption() {
      const option = {};

      if (this.$options.props) {
        for (const key in this.$options.props) {
          if (
            ['color', 'grid'].some(v => key.indexOf(v) === 0) &&
            Object.hasOwnProperty.call(this.$options.props, key) &&
            this[key] !== undefined
          ) {
            option[key] = this[key];
          }
        }
      }
      mergeChainingProps(option);
      return option;
    },
    initWatchTheme() {
      return new Promise(rev => {
        const cb = async () => {
          if (isUcf()) {
            const ucfSkins = {
              'theme-white': 'blue',
              'theme-black': 'dark'
            };
            const userInfo = JSON.parse(
              (await window.ucf.api.storage.get('USER_INFO')) || '{}'
            );

            const storage = await window.ucf.api.fs.createStorageTo(
              userInfo.customer_id
            );

            const userSetting = JSON.parse(
              (await storage.get('UCF_USER_SETTING')) || '{}'
            );

            const { theme } = userSetting;
            this.theme = ucfSkins[theme];

            rev();

            // 监听换肤
            window.ucf.api.platform.subscribe('webview/theme/change', theme => {
              this.theme = ucfSkins[theme];
            });
          } else {
            const { root } = this.$store.state;
            this.$watch(
              () => {
                return root?.skeleton?.skin;
              },
              () => {
                this.theme = root?.skeleton?.skin;
              }
            );
            this.theme = root?.skeleton?.skin;
            rev();
          }
        };

        cb();
      });
    }
  },
  created() {
    delete this.chartInstance;
    delete this.ro;
  },
  async mounted() {
    this.initWatchTheme().then(() => {
      this.init();
      this.initResizeObserver();
    });
  },
  destroyed() {
    this.disposeResizeObserver();
    this.chartInstance?.dispose();
  }
};
</script>

<style lang="less" scoped>
.echarts-component {
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 100%;
}

.nodata {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
