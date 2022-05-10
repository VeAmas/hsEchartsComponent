/**
 * @typedef {import('echarts').EChartOption} Option
 * @typedef {import('echarts').EChartOption.YAxis} YAxisOption
 * @typedef {import('echarts').EChartOption.XAxis} XAxisOption
 * @typedef {import('echarts').EChartOption.Legend} LegendOption
 * @typedef {import('echarts').EChartOption.SeriesLine} SeriesLineOption
 * @typedef {import('echarts').EChartOption.SeriesBar} SeriesBarOption
 * @typedef {import('echarts').EChartOption.Tooltip} TooltipOption
 * @typedef {import('echarts').EChartTitleOption} TitleOption
 */

// @ts-ignore
import echarts, { util as zrUtil } from 'echarts';
// import { measureText } from '@hsfundFuncanal/scripts/utils';
// @ts-ignore
import { calcLeftValueToAvoidOverlap } from './Legend/index.vue';
import {
  GRID_BOTTOM,
  GRID_BOTTOM_WIDTH_DATAZOOM,
  GRID_TOP,
  GRID_TOP_WIDTH_LEGEND,
  LEGEND_TOP
} from './constant.js';

import { variable as blackTheme } from './Theme/black';
import { variable as lightblueTheme } from './Theme/lightblue';
import lodash from 'lodash';

export const barLegendIcon = 'path://M2,1L2,13L14,13L16,16L14,13L14,1L2,1L0,0';
export const lineLegendIcon = 'path://M0,0L0,16L0,6L0,8L16,8L16,6L0,6';

const themeVariable = {
  dark: blackTheme,
  blue: lightblueTheme
};

let measureText = function (text, font = '12px 微软雅黑') {
  this.font = font;
  // @ts-ignore
  return this.measureText(text).width;
};
/** 这样写主要是为了让方法提示能正常显示 */
(function () {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  measureText = measureText.bind(ctx);
})();
export { measureText };

/**
 * 传入一个对象obj,一个路径path
 * 确保obj下存在该路径, 且路径的末尾使用defaultValue填充
 * @param {object} obj 对象
 * @param {string} path 路径
 * @param {any} defaultValue 初始值
 */
const guaranteePath = (obj, path, defaultValue = {}) => {
  let n = obj;
  let last = n;
  path.split('.').forEach((v, i, l) => {
    last = n;
    if (v in obj) {
      n = obj[n];
    } else {
      if (i < l.length) {
        obj[n] = {};
      } else {
        obj[n] = defaultValue;
      }
    }
  });
  return last[path.split('.').pop()];
};

/**
 * y轴的名称用title代替
 * @type {typeof optionExtraProcess}
 */
function tilteMutation(option, vm) {
  if (option.yAxis && Array.isArray(option.yAxis)) {
    option.yAxis.forEach((_v, i) => {
      /** @type {typeof _v & {titleAsName?: boolean}} 添加titleAsName属性 */
      const v = _v;
      if (v.titleAsName && v.name) {
        /** @type {TitleOption & {fromName?: boolean}} */
        const title = {
          text: v.name,
          [i === 1 ? 'right' : 'left']: 6,
          top: 8,
          textStyle: v.nameTextStyle || {
            color: themeVariable[vm.theme]?.nameTextStyle,
            fontWeight: 'normal',
            fontSize: 12
          },
          fromName: true
        };
        if (option.title) {
          if (!Array.isArray(option.title)) {
            option.title = [option.title];
          }
          option.title.push(title);
        } else {
          option.title = [title];
        }
        delete v.titleAsName;
        delete v.name;
      }
    });
  }
}

/**
 * 鼠标移上去的颜色根据series类型变化
 * 如果有Bar类型 就是shadow 否则是 line
 * @type {typeof optionExtraProcess}
 */
function axisPointerMutation(option) {
  if (option.xAxis) {
    if (option.series) {
      let xAxes = option.xAxis;
      if (!Array.isArray(xAxes)) {
        xAxes = [xAxes];
      }
      xAxes.forEach(xAxis => {
        if (xAxis.type !== 'category' && xAxis.type) {
          return;
        }
        if (!xAxis.axisPointer) {
          xAxis.axisPointer = {};
        }
        if (option.series?.find(v => v.type === 'bar')) {
          xAxis.axisPointer.type = 'shadow';
        } else {
          xAxis.axisPointer.type = 'line';
        }
      });
    }
  }

  if (option.yAxis) {
    if (option.series) {
      let xAxes = option.yAxis;
      if (!Array.isArray(xAxes)) {
        xAxes = [xAxes];
      }
      xAxes.forEach(yAxis => {
        if (yAxis.type !== 'category' && yAxis.type) {
          return;
        }
        if (!yAxis.axisPointer) {
          yAxis.axisPointer = {};
        }
        if (option.series?.find(v => v.type === 'bar')) {
          yAxis.axisPointer.type = 'shadow';
        } else {
          yAxis.axisPointer.type = 'line';
        }
      });
    }
  }
}

/**
 *  自动填充legend的data属性
 * @type {typeof optionExtraProcess}
 */
function legendDataFillMutation(option) {
  // @ts-ignore
  if (option.legend && option.legend.autoSetData && !option.legend.data) {
    /** @type {LegendOption & {autoSetData?: boolean}} */
    const legend = option.legend;

    const legendData = [];

    /** TODO: 这里option可能没有series属性 需要引入getOption返回的option */
    option.series?.forEach(v => {
      if (v.type === 'line') {
        legendData.push({
          name: v.name,
          icon: lineLegendIcon
        });
      } else if (v.type === 'bar') {
        legendData.push({
          name: v.name,
          icon: barLegendIcon
        });
      }

      legend.data = legendData;
      /** 如果没事数据就删掉 */
      if (legend.data.length === 0) {
        delete legend.data;
      }
      delete legend.autoSetData;
    });
  }
}

/**
 * legend和y轴名字重叠的时候, 设置left和right
 * @type {typeof optionExtraProcess}
 */
function legendAvoidOverlapMutation(option, vm) {
  if (option.legend) {
    const legend =
      /** @type {echarts.EChartOption.Legend & {leftValueToAvoidOverlap: number[]; avoidOverlap: boolean;}} */ (
        option.legend
      );
    if (legend.leftValueToAvoidOverlap?.length > 0) {
      legend.left = legend.leftValueToAvoidOverlap[0];
      legend.right = legend.leftValueToAvoidOverlap[1];
    } else if (legend.avoidOverlap) {
      // @ts-ignore
      const yAxes = vm.optionFrame.yaxis;
      const yNames = yAxes
        ?.slice()
        .sort((a, b) => (a.yAxisIndex || 0) - (b.yAxisIndex || 0))
        .map(v => v.name)
        .filter(v => v);

      const { legendWidth, nameWidth } = calcLeftValueToAvoidOverlap({
        ...legend,
        names: legend.data.map(v => v.name),
        yNames
      });
      const leftValueToAvoidOverlap =
        // @ts-ignore
        vm.$el.offsetWidth / 2 -
          Math.max.apply(0, nameWidth) -
          legendWidth / 2 <
        0
          ? nameWidth
          : [];

      if (leftValueToAvoidOverlap.length > 0) {
        legend.left = leftValueToAvoidOverlap[0];
        legend.right = leftValueToAvoidOverlap[1];
      }
    }
    delete legend.leftValueToAvoidOverlap;
    delete legend.avoidOverlap;
  }
}

/**
 * tooltip内容格式化相关
 * @type {typeof optionExtraProcess}
 */
function tooltipMutation(option) {
  if (
    option.tooltip &&
    !option.tooltip.formatter &&
    ['textFormatter'].some(v => v in option.tooltip && option.tooltip[v])
  ) {
    /**
     * @type {TooltipOption & {
     *   textFormatter?: import('./type').TooltipTextFormatter
     * }}
     */
    const tooltip = option.tooltip;
    const textFormatter = tooltip.textFormatter;

    delete tooltip.textFormatter;

    tooltip.formatter = generateTooltipFormatter(textFormatter);
  }
}

/**
 * 双y轴对齐
 * @type {typeof optionExtraProcess}
 */
function yAxesAlignMutation(option) {
  if (
    Array.isArray(option.yAxis) &&
    option.yAxis?.length > 1 &&
    option.series?.length > 0
  ) {
    /** @type {(YAxisOption & {alignAxis?: boolean; alignPadding?: number})[]} */
    const yAxisList = option.yAxis;
    const alignedList = yAxisList.filter(v => v.alignAxis);

    /** y轴1对应的系列 */
    const y1Series = option.series.filter(
      (/** @type {SeriesLineOption | SeriesBarOption} */ v) =>
        ['line', 'bar'].includes(v.type) &&
        (v.yAxisIndex || 0) ===
          (alignedList[0]?.gridIndex ?? yAxisList.indexOf(alignedList[0]))
    );
    /** y轴2对应的系列 */
    const y2Series = option.series.filter(
      (/** @type {SeriesLineOption | SeriesBarOption} */ v) =>
        ['line', 'bar'].includes(v.type) &&
        (v.yAxisIndex || 0) ===
          (alignedList[0]?.gridIndex ?? yAxisList.indexOf(alignedList[1]))
    );

    if (alignedList.length > 1 && y1Series.length > 0 && y2Series.length > 0) {
      const { min, max, interval, axisLabelFormatters } = doubleYAxisGenerator({
        datas: [
          y1Series.flatMap(s =>
            (s.data ?? [])?.map(v => (v && typeof v === 'object' ? v.data : v))
          ),
          y2Series.flatMap(s =>
            (s.data ?? [])?.map(v => (v && typeof v === 'object' ? v.data : v))
          )
        ],
        padding: alignedList.find(v => v.alignPadding)?.alignPadding || 0,
        splitNumber: alignedList.find(v => v.interval)?.interval || 6,
        type: [...y1Series, ...y2Series].find(v => v.type === 'bar')
          ? 'bar'
          : 'line'
      });

      alignedList.forEach((v, i) => {
        v.min = min[i];
        v.max = max[i];
        v.interval = interval[i];
        if (!v.axisLabel) {
          v.axisLabel = {};
        }
        v.axisLabel.formatter = axisLabelFormatters[i];
      });
    }

    alignedList.forEach(v => {
      delete v.alignAxis;
      delete v.alignPadding;
    });
  }
}

/**
 * 保证x轴文字不超过grid的范围
 * @type {typeof optionExtraProcess}
 */
function xAxisLabelClampMutation(option, vm) {
  if (option.xAxis) {
    const xAxis = Array.isArray(option.xAxis) ? option.xAxis : [option.xAxis];
    xAxis.forEach(
      (/** @type {XAxisOption & {clampAxisLabel: boolean}} */ v) => {
        if (v.clampAxisLabel) {
          xAxis.forEach((v, xAxisIndex) => {
            /** @type {XAxisOption['axisLabel']} */
            const axisLabel = guaranteePath(v, 'axisLabel');

            /** formatter为富文本的时候, 不做处理 */
            if (typeof axisLabel.formatter !== 'string') {
              /** 保存原先的formatter方法 */
              const originFunction = axisLabel.formatter;

              axisLabel.formatter = (value, index) => {
                /** 计算原先的formatter的结果 如果没有定义formatter方法 则为原始值 */
                const label = originFunction
                  ? originFunction?.(value, index)
                  : value;
                try {
                  const chart = vm.chartInstance;
                  /** 筛选当前x轴所在的坐标系 */
                  const coordSys = chart
                    .getModel()
                    .getSeries()
                    .find(
                      v => v.coordinateSystem._axes.x.index === xAxisIndex
                    ).coordinateSystem;
                  /** grid的范围 */
                  const coordSysRect = coordSys.getArea();
                  /** 坐标轴的实例 */
                  const axes = coordSys._axes.x;

                  if (index === undefined) {
                    // eslint-disable-next-line no-param-reassign
                    index = axes.scale.getTicks().indexOf(value);
                  }

                  // /** 不是第一个或者最后一个 直接返回label */
                  // if (
                  //   index !== 0 &&
                  //   index !== axes.scale.getTicks().length - 1
                  // ) {
                  //   return label;
                  // }

                  /** 坐标轴文字的宽度 */
                  const textWidth = measureText(label);

                  /** 计算每一个tick离左边的距离 */
                  const ticks = zrUtil.map(
                    axes.scale.getTicks(),
                    axes.dataToCoord,
                    axes
                  );

                  if (index < ticks.length / 2) {
                    const delta =
                      textWidth - (coordSysRect.x + ticks[index]) * 2;
                    /** 如果超过左侧 则补充对应数量的空格 */
                    if (delta > 0) {
                      return (
                        new Array(Math.ceil(delta / measureText(' ')))
                          .fill(' ')
                          .join('') + label
                      );
                    }
                  } else {
                    const rightWidth =
                      chart.getWidth() - coordSysRect.x - coordSysRect.width;
                    const delta =
                      (textWidth / 2 -
                        rightWidth -
                        (coordSysRect.width - ticks[index])) *
                      2;
                    /** 如果超过右侧 则补充对应数量的空格 */
                    if (delta > 0) {
                      return (
                        label +
                        new Array(Math.ceil(delta / measureText(' ')))
                          .fill(' ')
                          .join('')
                      );
                    }
                  }
                  return label;
                } catch (e) {
                  console.warn(e);
                  return label;
                }
              };
            }
          });
        }
      }
    );
  }
}

/**
 * 保证x轴文字设置最大宽度
 * @type {typeof optionExtraProcess}
 */
function xAxisLabelMaxWidthMutation(option) {
  if (option.xAxis) {
    const xAxisList = Array.isArray(option.xAxis)
      ? option.xAxis
      : [option.xAxis];
    xAxisList.forEach(a => {
      const xAxis =
        /** @type {echarts.EChartOption.XAxis & {maxAxisLabelWidth?: number}} */ (
          a
        );
      if (xAxis.maxAxisLabelWidth > 0) {
        let axisLabel = xAxis.axisLabel;
        if (!axisLabel) {
          xAxis.axisLabel = axisLabel = {};
        }
        const originFormatter =
          typeof axisLabel.formatter === 'function'
            ? axisLabel.formatter
            : v => v;
        axisLabel.formatter = v => {
          return echarts.format.truncateText(
            originFormatter(v),
            xAxis.maxAxisLabelWidth,
            '12px',
            '...'
          );
        };
      }
    });
  }
}

/**
 * 超过DataZoom阈值才显示DataZoom
 * @type {typeof optionExtraProcess}
 */
function DataZoomToggleMutation(option, vm) {
  if (vm.dataZoomThreshold && vm.dataZoomThreshold > 0) {
    const barSeries = option.series?.filter(v => v.type === 'bar') ?? [];
    if (
      barSeries.length > 0 &&
      barSeries.reduce((ret, next) => ret + next.data.length, 0) <
        vm.dataZoomThreshold
    ) {
      delete option.dataZoom;
    }
  }
}

/**
 * grid上下的位置调整
 * @type {typeof optionExtraProcess}
 */
function gridMutation(option) {
  const getPosValue = value => {
    return value && String(value).replace('px', '');
  };

  const grid = Array.isArray(option.grid) ? option.grid[0] : option.grid;

  if (grid) {
    if (
      option.dataZoom &&
      option.dataZoom.find(v => v.type === 'slider') &&
      getPosValue(grid.bottom) === String(GRID_BOTTOM)
    ) {
      grid.bottom = GRID_BOTTOM_WIDTH_DATAZOOM;
    }
    if (
      option.legend &&
      option.legend.show &&
      option.legend.data?.some(v => v.name) &&
      getPosValue(option.legend.top) === String(LEGEND_TOP) &&
      getPosValue(grid.top) === String(GRID_TOP)
    ) {
      grid.top = GRID_TOP_WIDTH_LEGEND;
    } else if (
      (Array.isArray(option.yAxis)
        ? option.yAxis.find(v => v.name)
        : option.yAxis?.name) ||
      // @ts-ignore
      (Array.isArray(option.title) && option.title.find(v => v.fromName))
    ) {
      grid.top = GRID_TOP_WIDTH_LEGEND;
    }

    if (
      getPosValue(grid.right) === '12' &&
      (Array.isArray(option.xAxis)
        ? option.xAxis.find(v => v.name)
        : option.xAxis?.name)
    ) {
      const names = (
        Array.isArray(option.xAxis)
          ? option.xAxis.map(v => v.name)
          : [option.xAxis.name]
      ).filter(v => v);

      const maxLength = Math.max.apply(
        0,
        names.map(v => measureText(v, '微软雅黑 12px'))
      );

      grid.right = maxLength + 12 + 12;
    }
  }
}

/**
 * 对Option的额外处理
 * @param {Option} option
 * @param {{chartInstance: any; dataZoomThreshold: number; theme: string}} vm
 */
export const optionExtraProcess = (option, vm) => {
  tilteMutation(option, vm);
  axisPointerMutation(option);
  legendDataFillMutation(option);
  legendAvoidOverlapMutation(option, vm);
  tooltipMutation(option);
  yAxesAlignMutation(option);
  xAxisLabelClampMutation(option, vm);
  xAxisLabelMaxWidthMutation(option);
  DataZoomToggleMutation(option, vm);
  gridMutation(option);

  return option
};

/** 合并链型参数 (axisLable:textStyle:fontSize这种) */
export const mergeChainingProps = option => {
  const chainingProps = Object.keys(option).filter(v => v.includes(':'));
  chainingProps.sort((a, b) => a.localeCompare(b));

  chainingProps.forEach(v => {
    let obj = option;
    const chains = v.split(':');
    const lastChain = chains.pop();
    chains.forEach(chain => {
      if (!(chain in obj)) {
        obj[chain] = {};
      }
      obj = obj[chain];
    });
    obj[lastChain] = option[v];
    delete option[v];
  });
};

/**
 * 生成双y轴图表参数
 * @typedef {Object} DoubleYAxisGeneratorParam
 * @property {( string | number )[][]} datas 数据, 长度是2 多个系列需要加数值拼接起来
 * @property {'line' | 'bar'} type 图表类型
 * @property {number} splitNumber 坐标轴轴需要几等分 会出现 splitNumber+1 条线
 * @property {number} [padding] 两边需要空多少, 0~0.5
 * @param {DoubleYAxisGeneratorParam} param0
 * @returns {{ max: number[], min: number[], interval: number[], axisLabelFormatters: ((v: number) => number)[] }}
 */
const doubleYAxisGenerator = function ({
  datas,
  type,
  splitNumber = 6,
  padding = 0
}) {
  const originDatas = datas.map(list => list.map(v => Number(v)));
  /** 如果只传了一边的数据  复制一份 */
  if (originDatas.length === 1) {
    originDatas.push(originDatas[0]);
  }

  let min0 = type === 'bar' ? 0 : Infinity;
  let min1 = type === 'bar' ? 0 : Infinity;
  let max0 = type === 'bar' ? 0 : -Infinity;
  let max1 = type === 'bar' ? 0 : -Infinity;

  originDatas[0].forEach(v => {
    if (min0 > v) {
      min0 = v;
    }
    if (max0 < v) {
      max0 = v;
    }
  });

  originDatas[1].forEach(v => {
    if (min1 > v) {
      min1 = v;
    }
    if (max1 < v) {
      max1 = v;
    }
  });

  if (min0 === Infinity) {
    min0 = 0;
  }
  if (min1 === Infinity) {
    min1 = 0;
  }
  if (max0 === -Infinity) {
    max0 = 0;
  }
  if (max1 === -Infinity) {
    max1 = 0;
  }

  let same0 = false;
  let same1 = false;

  if (max0 - min0 < Number.MIN_VALUE) {
    same0 = true;
    max0 += 0.1 * splitNumber;
    min0 -= 0.1 * splitNumber;
  }
  if (max1 - min1 < Number.MIN_VALUE) {
    same1 = true;
    max1 += 0.1 * splitNumber;
    min1 -= 0.1 * splitNumber;
  }

  if (padding > 0) {
    const w0 = max0 - min0;
    const w1 = max1 - min1;
    if (!same0) {
      min0 -= padding * w0;
      max0 += padding * w0;
    }
    if (!same1) {
      min1 -= padding * w1;
      max1 += padding * w1;
    }
  }

  if (type === 'bar') {
    const zeroPos0 = max0 / (max0 - min0);
    const zeroPos1 = max1 / (max1 - min1);

    if (zeroPos0 < zeroPos1) {
      if (zeroPos1 === 1) {
        min1 = ((zeroPos0 - 1) * max1) / zeroPos0;
      } else {
        max0 = -(zeroPos1 * min0) / (1 - zeroPos1);
      }
    } else if (zeroPos0 > zeroPos1) {
      if (zeroPos0 === 1) {
        min0 = ((zeroPos1 - 0) * max0) / zeroPos1;
      } else {
        max1 = -(zeroPos0 * min1) / (1 - zeroPos0);
      }
    }
  }

  const ticks0Origin = new Array(splitNumber + 1).fill().map((v, i) => {
    return ((max0 - min0) / splitNumber) * i + min0;
  });
  const ticks1Origin = new Array(splitNumber + 1).fill().map((v, i) => {
    return ((max1 - min1) / splitNumber) * i + min1;
  });

  let width0 = max0 - min0;
  let scale0 = 100;
  while (width0 < 1 && width0 > 0) {
    scale0 *= 10;
    width0 *= 10;
  }
  let width1 = max1 - min1;
  let scale1 = 100;
  while (width1 < 1 && width1 > 0) {
    scale1 *= 10;
    width1 *= 10;
  }

  const ticks0 = ticks0Origin.map(v => {
    return Math.floor(v * scale0) / scale0;
  });
  const ticks1 = ticks1Origin.map(v => {
    return Math.floor(v * scale1) / scale1;
  });

  return {
    max: [max0, max1],
    min: [min0, min1],
    interval: [(max0 - min0) / splitNumber, (max1 - min1) / splitNumber],
    axisLabelFormatters: [
      function (v) {
        let hit = '';
        ticks0Origin.forEach((tick, i) => {
          if (Math.abs(v - tick) < (max0 - min0) / splitNumber / 100) {
            hit = String(i);
          }
          return undefined;
        });
        return hit ? ticks0[hit] : axisLabelFormatter(v);
      },
      function (v) {
        let hit = '';
        ticks1Origin.forEach((tick, i) => {
          if (Math.abs(v - tick) < (max1 - min1) / splitNumber / 100) {
            hit = String(i);
          }
          return undefined;
        });
        return hit ? ticks1[hit] : axisLabelFormatter(v);
      }
    ]
  };
};

/** echart图表轴刻度的formatter 防止小数位太长 */
const axisLabelFormatter = function (v) {
  if (String(v).split('.')[1]?.length > 5)
    return String(v).match(/(.*\.0*[1-9]{1,2})/)?.[0] ?? v;
  return v;
};

/**
 * 生成tooltip的formater
 * @param {import('./type').TooltipTextFormatter} [textFormatter] 参数
 */
export const generateTooltipFormatter = textFormatter => {
  return params => {
    let xAxisInfo = params[0] ? params[0].name + '</br>' : '';
    const seriesArray = (Array.isArray(params) ? params : [params]).map(v => {
      return {
        name: v.seriesType !== 'pie' ? v.seriesName : v.name,
        value: v.value,
        data: v.data,
        color: v.color
      };
    });

    const res = textFormatter({ xAxisInfo, params, seriesDatas: seriesArray });
    if (typeof res === 'string') {
      return res;
    } else {
      /** TODO: v需要支持formatNumber */
      xAxisInfo = res?.xAxisInfo ?? xAxisInfo;
      return (
        xAxisInfo +
        res?.seriesDatas
          ?.map(
            v =>
              `<span style="
          display: inline-block;
          margin-right: 5px;
          border-radius: 10px;
          width: 10px;
          height: 10px;
          background-color: ${v.color};
      "
      ></span
      >` +
              (v?.name ?? '') +
              ': ' +
              (v?.value ?? '')
          )
          .join('<br/>')
      );
    }
  };
};

/**
 * 获取一个组件的默认参数(props)
 * @param {Object} component 组件
 */
export const getDefaultPropDatas = component => {
  const option = /** @type {import('vue').ComponentOptions} */ (component);
  const ret = {};
  for (const key in option.props) {
    if (Object.hasOwnProperty.call(option.props, key)) {
      const v = option.props[key];
      if (typeof v === 'object') {
        if ('default' in v) {
          if (typeof v.default === 'function') {
            ret[key] = v.default();
          } else if (v.default !== undefined) {
            ret[key] = v.default;
          }
        } else if ('type' in v) {
          switch (v.type) {
            case Array: {
              ret[key] = [];
              break;
            }
            case Object: {
              ret[key] = {};
              break;
            }
            case Number: {
              // ret[key] = undefined;
              break;
            }
            case String: {
              ret[key] = '';
              break;
            }
            default: {
              // ret[key] = undefined;
              break;
            }
          }
        } else {
          // ret[key] = undefined;
        }
      } else {
        ret[key] = v;
      }
    }
  }
  return ret;
};

/**
 * @template T
 * @param {T[] | T[][]} value
 * @return {T[][]}
 */
export const alignTo2DArray = value => {
  if (value?.length > 0) {
    /**
     * @param {typeof value} x
     * @return {x is T[][]}
     */
    const is2DyArray = x => Array.isArray(x[0]);
    if (is2DyArray(value)) {
      return value;
    } else {
      return [value];
    }
  } else {
    return [];
  }
};

/**
 * 节流
 * @template T
 * @param {T} fun 被节流的方法
 * @param {number} delay 延时时间
 * @returns {( ...parameter: Parameters<T> ) => void}
 */
export function throttle(fun, delay) {
  let timer = null;
  let invoked = false;
  return function (...param) {
    if (timer) {
      invoked = true;
      return;
    }
    invoked = false;
    // @ts-ignore
    fun(...param);
    timer = setTimeout(() => {
      timer = null;
      if (invoked) {
        // @ts-ignore
        fun(...param);
      }
    }, delay);
  };
}

export const handleIcon =
  'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFyWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNi4wLWMwMDYgNzkuZGFiYWNiYiwgMjAyMS8wNC8xNC0wMDozOTo0NCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIyLjQgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAyMS0wOS0yMlQyMToxMzoyMiswODowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMS0wOS0yMlQyMToxMzoyMiswODowMCIgeG1wOk1vZGlmeURhdGU9IjIwMjEtMDktMjJUMjE6MTM6MjIrMDg6MDAiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6YjEzYTBiZGQtN2JmZi1kNDQ5LTkwMTEtNzc1NWEzZjI2NjMzIiB4bXBNTTpEb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6YjcwNDk1N2QtMjA3YS0wMDQ4LWJlYWEtMmY4NjdkOWI2ZTAzIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6MjEyOTJhM2EtYmJlZi0zZjQzLThmNzMtZGI2ZTAyMzY1YTgzIiBkYzpmb3JtYXQ9ImltYWdlL3BuZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6MjEyOTJhM2EtYmJlZi0zZjQzLThmNzMtZGI2ZTAyMzY1YTgzIiBzdEV2dDp3aGVuPSIyMDIxLTA5LTIyVDIxOjEzOjIyKzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjIuNCAoV2luZG93cykiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmIxM2EwYmRkLTdiZmYtZDQ0OS05MDExLTc3NTVhM2YyNjYzMyIgc3RFdnQ6d2hlbj0iMjAyMS0wOS0yMlQyMToxMzoyMiswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDIyLjQgKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Ps722KkAAABmSURBVEiJY/z//z/DQACmAbF1RFrMQqzCs2fPEpUYjI2NGalqMTGGEus4BoaRGMdkWYwcpKQEL8UWUwOMWjxq8ajFoxaPWjxMLUZuEBDb4qCKxdQAg7+xx8BAfqWPDTCO9iSGvcUANHcZoWxni7gAAAAASUVORK5CYII=';

/**
 * This method is like `clone` except that it recursively clones `value`.
 * Object inheritance is preserved.
 *
 * @since 1.0.0
 * @category Lang
 * @param {*} value The value to recursively clone.
 * @returns {*} Returns the deep cloned value.
 * @see clone
 * @example
 *
 * const objects = [{ 'a': 1 }, { 'b': 2 }]
 *
 * const deep = cloneDeep(objects)
 * console.log(deep[0] === objects[0])
 * // => false
 */
export function cloneDeep(value) {
  if (typeof value === 'function') {
    return value;
  }
  return lodash.cloneDeep(value);
}
