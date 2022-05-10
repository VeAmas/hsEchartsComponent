/**
 * 这个文件定义了所有组件的「链式参数」
 * 即某些属性的嵌套深度很深,例如「xAxis」的「axisLine.lineStyle.color」
 * 这种时候需要写一个很大的参数，来修改color值
 * 且经常会覆盖其他的属性
 * 而「链式参数」可以这样定义一个prop：
 * <EcXaxis :axisLine:lineStyle:color="currentColor"></EcXaxis>
 * 这样就只会影响color一个属性,且写起来比较方便(属性不能用「.」因此用「:」代替)
 * 这里需要注意的是 链式属性较长的链优先级会高于较短的链
 * 即 「:axisLine:lineStyle="{color: 'blur'}"」 的优先级低于 「:axisLine:lineStyle:color="'red'"」
 * 以下的属性写的不全,如果发现有些属性不在参数列表里可以补充
 * 补充到 propsObjectXXX 中就行了(每个key的value都是0)
 *
 * 补充完要更新一下type文件
 * 更新Type文件 需要到当前目录(src\hsfundFuncanal\components\EchartsComponent\propsObjects)下,
 * 执行 `node update.js`
 * 脚本会自动覆盖 type.d.ts文件
 */

/**
 * Object -> { [key: string]: PropOptions<any> }
 * @param {Object} obj
 */
const extrude = obj => {
  /** @type {string[]} */
  const list = [];
  /**
   * @param {Object} obj
   * @param {string} [prefix]
   */
  const loop = (obj, prefix) => {
    if (prefix && prefix.includes(':')) {
      list.push(prefix);
    }
    if (!obj) {
      return;
    }
    for (const key in obj) {
      if (Object.hasOwnProperty.call(obj, key)) {
        loop(obj[key], (prefix ? prefix + ':' : '') + key);
      }
    }
  };

  loop(obj);

  /** @type {any} */
  const res = {};

  list.forEach(v => {
    res[v] = {
      default: undefined
    };
  });

  return res;
};

/** @type {import("./type").PropsObjectYAxis} */
export const propsObjectYAxis = extrude({
  axisLine: {
    show: 0,
    lineStyle: {
      color: 0,
      width: 0,
      type: 0
    },
    onZero: 0,
    onZeroAxisIndex: 0,
    symbol: 0,
    symbolSize: 0
  },
  axisTick: {
    show: 0,
    lineStyle: {
      color: 0,
      width: 0
    },
    inside: 0,
    length: 0
  },
  axisLabel: {
    color: 0,
    fontSize: 0,
    show: 0,
    textStyle: {
      color: 0
    },
    inside: 0,
    rotate: 0,
    showMinLabel: 0,
    showMaxLabel: 0,
    margin: 0,
    formatter: 0
  },
  splitLine: {
    lineStyle: {
      color: 0,
      width: 0,
      type: 0
    },
    show: 0
  },
  splitArea: {
    show: 0,
    areaStyle: {
      color: 0
    }
  },
  minorTick: {
    show: 0,
    splitNumber: 0,
    length: 0,
    lineStyle: {}
  },
  minorSplitLine: {
    show: 0,
    lineStyle: {
      color: 0,
      width: 0
    }
  },
  nameTruncate: {
    maxWidth: 0,
    ellipsis: 0,
    placeholder: 0
  },
  tooltip: {
    show: 0
  }
});

/** @type {import("./type").PropsObjectXAxis} */
export const propsObjectXAxis = extrude({
  axisLine: {
    lineStyle: {
      color: 0,
      width: 0,
      type: 0
    },
    show: 0,
    onZero: 0,
    onZeroAxisIndex: 0,
    symbol: 0,
    symbolSize: 0
  },
  axisTick: {
    show: 0,
    lineStyle: {
      color: 0,
      width: 0
    },
    alignWithLabel: 0,
    interval: 0,
    inside: 0,
    length: 0
  },
  axisLabel: {
    color: 0,
    fontSize: 0,
    show: 0,
    textStyle: {
      color: 0
    },
    interval: 0,
    inside: 0,
    rotate: 0,
    showMinLabel: 0,
    showMaxLabel: 0,
    margin: 0,
    formatter: 0
  },
  data: 0,
  axisPointer: {
    lineStyle: {
      color: 0,
      type: 0
    },
    z: 0,
    status: 0,
    value: 0,
    seriesDataIndices: 0
  },

  splitLine: {
    show: 0,
    lineStyle: {
      color: 0,
      width: 0,
      type: 0
    }
  },
  splitArea: {
    show: 0,
    areaStyle: {
      color: 0
    }
  },
  nameTruncate: {
    maxWidth: 0,
    ellipsis: 0,
    placeholder: 0
  },
  tooltip: {
    show: 0
  }
});

/** @type {import("./type").PropsObjectGrid} */
export const propsObjectGrid = extrude({
  grid: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    containLabel: 0,
    show: 0,
    zlevel: 0,
    z: 0,
    backgroundColor: 0,
    borderWidth: 0,
    borderColor: 0
  }
});

/** @type {import("./type").PropsObjectSeriesBar} */
export const propsObjectSeriesBar = extrude({
  itemStyle: {
    barBorderWidth: 0,
    barBorderColor: 0
  },
  emphasis: {
    label: 0
  },
  backgroundStyle: {
    color: 0,
    borderColor: 0,
    borderWidth: 0,
    borderType: 0,
    borderRadius: 0,
    shadowBlur: 0,
    shadowColor: 0,
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    opacity: 0
  }
});

/** @type {import("./type").PropsObjectSeriesLine} */
export const propsObjectSeriesLine = extrude({
  label: {
    position: 0
  },
  areaStyle: {
    color: 0,
    origin: 0,
    shadowBlur: 0,
    shadowColor: 0,
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    opacity: 0
  },
  lineStyle: {
    width: 0,
    type: 0
  },
  emphasis: {
    label: 0
  }
});

/** @type {import("./type").PropsObjectSeriesPie} */
export const propsObjectSeriesPie = extrude({
  label: {
    position: 0,
    rotate: 0,
    show: 0,
    alignTo: 0,
    margin: 0,
    bleedMargin: 0,
    distanceToLabelLine: 0
  },
  labelLine: {
    show: 0,
    length: 0,
    length0: 0,
    smooth: 0,
    lineStyle: {
      width: 0,
      type: 0
    }
  },
  itemStyle: {
    borderWidth: 0
  },
  emphasis: {
    label: {
      show: 0
    },
    labelLine: {
      show: 0
    }
  }
});

/** @type {import("./type").PropsObjectSeriesScatter} */
export const propsObjectSeriesScatter = extrude({
  label: {
    show: 0,
    position: 0,
    distance: 0,
    rotate: 0,
    offset: 0,
    formatter: 0,
    color: 0,
    fontStyle: 0,
    fontWeight: 0,
    fontFamily: 0,
    fontSize: 0,
    align: 0,
    verticalAlign: 0,
    lineHeight: 0,
    backgroundColor: 0,
    borderColor: 0,
    borderWidth: 0,
    borderRadius: 0,
    padding: 0,
    shadowColor: 0,
    shadowBlur: 0,
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    width: 0,
    height: 0,
    textBorderColor: 0,
    textBorderWidth: 0,
    textShadowColor: 0,
    textShadowBlur: 0,
    textShadowOffsetX: 0,
    textShadowOffsetY: 0
  },
  itemStyle: {
    color: 0,
    borderColor: 0,
    borderWidth: 0,
    borderType: 0,
    shadowBlur: 0,
    shadowColor: 0,
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    opacity: 0
  },
  emphasis: {
    label: {
      show: 0,
      position: 0,
      distance: 0,
      rotate: 0,
      offset: 0,
      formatter: 0,
      color: 0,
      fontStyle: 0,
      fontWeight: 0,
      fontFamily: 0,
      fontSize: 0,
      align: 0,
      verticalAlign: 0,
      lineHeight: 0,
      backgroundColor: 0,
      borderColor: 0,
      borderWidth: 0,
      borderRadius: 0,
      padding: 0,
      shadowColor: 0,
      shadowBlur: 0,
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      width: 0,
      height: 0,
      textBorderColor: 0,
      textBorderWidth: 0,
      textShadowColor: 0,
      textShadowBlur: 0,
      textShadowOffsetX: 0,
      textShadowOffsetY: 0
    },
    itemStyle: {
      color: 0,
      borderColor: 0,
      borderWidth: 0,
      borderType: 0,
      shadowBlur: 0,
      shadowColor: 0,
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      opacity: 0
    }
  },

  markPoint: {
    symbol: 0,
    symbolSize: 0,
    symbolRotate: 0,
    symbolKeepAspect: 0,
    symbolOffset: 0,
    silent: 0,
    label: {
      show: 0,
      position: 0,
      distance: 0,
      rotate: 0,
      offset: 0,
      formatter: 0,
      color: 0,
      fontStyle: 0,
      fontWeight: 0,
      fontFamily: 0,
      fontSize: 0,
      align: 0,
      verticalAlign: 0,
      lineHeight: 0,
      backgroundColor: 0,
      borderColor: 0,
      borderWidth: 0,
      borderRadius: 0,
      padding: 0,
      shadowColor: 0,
      shadowBlur: 0,
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      width: 0,
      height: 0,
      textBorderColor: 0,
      textBorderWidth: 0,
      textShadowColor: 0,
      textShadowBlur: 0,
      textShadowOffsetX: 0,
      textShadowOffsetY: 0,
      emphasis: {
        show: 0,
        position: 0,
        distance: 0,
        rotate: 0,
        offset: 0,
        formatter: 0,
        color: 0,
        fontStyle: 0,
        fontWeight: 0,
        fontFamily: 0,
        fontSize: 0,
        align: 0,
        verticalAlign: 0,
        lineHeight: 0,
        backgroundColor: 0,
        borderColor: 0,
        borderWidth: 0,
        borderRadius: 0,
        padding: 0,
        shadowColor: 0,
        shadowBlur: 0,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        width: 0,
        height: 0,
        textBorderColor: 0,
        textBorderWidth: 0,
        textShadowColor: 0,
        textShadowBlur: 0,
        textShadowOffsetX: 0,
        textShadowOffsetY: 0
      }
    },
    itemStyle: {
      color: 0,
      borderColor: 0,
      borderWidth: 0,
      borderType: 0,
      shadowBlur: 0,
      shadowColor: 0,
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      opacity: 0,
      emphasis: {
        color: 0,
        borderColor: 0,
        borderWidth: 0,
        borderType: 0,
        shadowBlur: 0,
        shadowColor: 0,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        opacity: 0
      }
    },
    data: {
      name: 0,
      type: 0,
      valueIndex: 0,
      valueDim: 0,
      coord: 0,
      x: 0,
      y: 0,
      value: 0,
      symbol: 0,
      symbolSize: 0,
      symbolRotate: 0,
      symbolKeepAspect: 0,
      symbolOffset: 0,
      itemStyle: {
        color: 0,
        borderColor: 0,
        borderWidth: 0,
        borderType: 0,
        shadowBlur: 0,
        shadowColor: 0,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        opacity: 0,
        emphasis: {
          color: 0,
          borderColor: 0,
          borderWidth: 0,
          borderType: 0,
          shadowBlur: 0,
          shadowColor: 0,
          shadowOffsetX: 0,
          shadowOffsetY: 0,
          opacity: 0
        }
      },
      label: {
        show: 0,
        position: 0,
        distance: 0,
        rotate: 0,
        offset: 0,
        color: 0,
        fontStyle: 0,
        fontWeight: 0,
        fontFamily: 0,
        fontSize: 0,
        align: 0,
        verticalAlign: 0,
        lineHeight: 0,
        backgroundColor: 0,
        borderColor: 0,
        borderWidth: 0,
        borderRadius: 0,
        padding: 0,
        shadowColor: 0,
        shadowBlur: 0,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        width: 0,
        height: 0,
        textBorderColor: 0,
        textBorderWidth: 0,
        textShadowColor: 0,
        textShadowBlur: 0,
        textShadowOffsetX: 0,
        textShadowOffsetY: 0,
        emphasis: {
          show: 0,
          position: 0,
          distance: 0,
          rotate: 0,
          offset: 0,
          color: 0,
          fontStyle: 0,
          fontWeight: 0,
          fontFamily: 0,
          fontSize: 0,
          align: 0,
          verticalAlign: 0,
          lineHeight: 0,
          backgroundColor: 0,
          borderColor: 0,
          borderWidth: 0,
          borderRadius: 0,
          padding: 0,
          shadowColor: 0,
          shadowBlur: 0,
          shadowOffsetX: 0,
          shadowOffsetY: 0,
          width: 0,
          height: 0,
          textBorderColor: 0,
          textBorderWidth: 0,
          textShadowColor: 0,
          textShadowBlur: 0,
          textShadowOffsetX: 0,
          textShadowOffsetY: 0
        }
      }
    },
    animation: 0,
    animationThreshold: 0,
    animationDuration: 0,
    animationEasing: 0,
    animationDelay: 0,
    animationDurationUpdate: 0,
    animationEasingUpdate: 0,
    animationDelayUpdate: 0
  },
  markLine: {
    silent: 0,
    symbol: 0,
    symbolSize: 0,
    precision: 0,
    label: {
      show: 0,
      position: 0,
      formatter: 0,
      emphasis: { show: 0, position: 0, formatter: 0 }
    },
    lineStyle: {
      color: 0,
      width: 0,
      type: 0,
      shadowBlur: 0,
      shadowColor: 0,
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      opacity: 0,
      curveness: 0,
      emphasis: {
        color: 0,
        width: 0,
        type: 0,
        shadowBlur: 0,
        shadowColor: 0,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        opacity: 0
      }
    },
    animation: 0,
    animationThreshold: 0,
    animationDuration: 0,
    animationEasing: 0,
    animationDelay: 0,
    animationDurationUpdate: 0,
    animationEasingUpdate: 0,
    animationDelayUpdate: 0
  },
  markArea: {
    silent: 0,
    label: {
      show: 0,
      position: 0,
      distance: 0,
      rotate: 0,
      offset: 0,
      color: 0,
      fontStyle: 0,
      fontWeight: 0,
      fontFamily: 0,
      fontSize: 0,
      align: 0,
      verticalAlign: 0,
      lineHeight: 0,
      backgroundColor: 0,
      borderColor: 0,
      borderWidth: 0,
      borderRadius: 0,
      padding: 0,
      shadowColor: 0,
      shadowBlur: 0,
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      width: 0,
      height: 0,
      textBorderColor: 0,
      textBorderWidth: 0,
      textShadowColor: 0,
      textShadowBlur: 0,
      textShadowOffsetX: 0,
      textShadowOffsetY: 0,
      emphasis: {
        show: 0,
        position: 0,
        distance: 0,
        rotate: 0,
        offset: 0,
        color: 0,
        fontStyle: 0,
        fontWeight: 0,
        fontFamily: 0,
        fontSize: 0,
        align: 0,
        verticalAlign: 0,
        lineHeight: 0,
        backgroundColor: 0,
        borderColor: 0,
        borderWidth: 0,
        borderRadius: 0,
        padding: 0,
        shadowColor: 0,
        shadowBlur: 0,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        width: 0,
        height: 0,
        textBorderColor: 0,
        textBorderWidth: 0,
        textShadowColor: 0,
        textShadowBlur: 0,
        textShadowOffsetX: 0,
        textShadowOffsetY: 0
      }
    },
    itemStyle: {
      color: 0,
      borderColor: 0,
      borderWidth: 0,
      borderType: 0,
      shadowBlur: 0,
      shadowColor: 0,
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      opacity: 0,
      emphasis: {
        color: 0,
        borderColor: 0,
        borderWidth: 0,
        borderType: 0,
        shadowBlur: 0,
        shadowColor: 0,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        opacity: 0
      }
    },
    animation: 0,
    animationThreshold: 0,
    animationDuration: 0,
    animationEasing: 0,
    animationDelay: 0,
    animationDurationUpdate: 0,
    animationEasingUpdate: 0,
    animationDelayUpdate: 0
  }
});

/** @type {import("./type").PropsObjectSeriesBoxplot} */
export const propsObjectSeriesBoxplot = extrude({
  itemStyle: {
    color: 0,
    borderColor: 0,
    borderWidth: 0,
    borderType: 0,
    shadowBlur: 0,
    shadowColor: 0,
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    opacity: 0
  },
  emphasis: {
    itemStyle: {
      color: 0,
      borderColor: 0,
      borderWidth: 0,
      borderType: 0,
      shadowBlur: 0,
      shadowColor: 0,
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      opacity: 0
    }
  },
  markPoint: {
    symbol: 0,
    symbolSize: 0,
    symbolRotate: 0,
    symbolKeepAspect: 0,
    symbolOffset: 0,
    silent: 0,
    label: {
      show: 0,
      position: 0,
      distance: 0,
      rotate: 0,
      offset: 0,
      formatter: 0,
      color: 0,
      fontStyle: 0,
      fontWeight: 0,
      fontFamily: 0,
      fontSize: 0,
      align: 0,
      verticalAlign: 0,
      lineHeight: 0,
      backgroundColor: 0,
      borderColor: 0,
      borderWidth: 0,
      borderRadius: 0,
      padding: 0,
      shadowColor: 0,
      shadowBlur: 0,
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      width: 0,
      height: 0,
      textBorderColor: 0,
      textBorderWidth: 0,
      textShadowColor: 0,
      textShadowBlur: 0,
      textShadowOffsetX: 0,
      textShadowOffsetY: 0,
      rich: 0,
      emphasis: {
        show: 0,
        position: 0,
        distance: 0,
        rotate: 0,
        offset: 0,
        formatter: 0,
        color: 0,
        fontStyle: 0,
        fontWeight: 0,
        fontFamily: 0,
        fontSize: 0,
        align: 0,
        verticalAlign: 0,
        lineHeight: 0,
        backgroundColor: 0,
        borderColor: 0,
        borderWidth: 0,
        borderRadius: 0,
        padding: 0,
        shadowColor: 0,
        shadowBlur: 0,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        width: 0,
        height: 0,
        textBorderColor: 0,
        textBorderWidth: 0,
        textShadowColor: 0,
        textShadowBlur: 0,
        textShadowOffsetX: 0,
        textShadowOffsetY: 0,
        rich: 0
      }
    },
    itemStyle: {
      color: 0,
      borderColor: 0,
      borderWidth: 0,
      borderType: 0,
      shadowBlur: 0,
      shadowColor: 0,
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      opacity: 0,
      emphasis: {
        color: 0,
        borderColor: 0,
        borderWidth: 0,
        borderType: 0,
        shadowBlur: 0,
        shadowColor: 0,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        opacity: 0
      }
    },
    animation: 0,
    animationThreshold: 0,
    animationDuration: 0,
    animationEasing: 0,
    animationDelay: 0,
    animationDurationUpdate: 0,
    animationEasingUpdate: 0,
    animationDelayUpdate: 0
  },
  markLine: {
    silent: 0,
    symbol: 0,
    symbolSize: 0,
    precision: 0,
    label: {
      show: 0,
      position: 0,
      formatter: 0,
      emphasis: { show: 0, position: 0, formatter: 0 }
    },
    lineStyle: {
      color: 0,
      width: 0,
      type: 0,
      shadowBlur: 0,
      shadowColor: 0,
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      opacity: 0,
      curveness: 0,
      emphasis: {
        color: 0,
        width: 0,
        type: 0,
        shadowBlur: 0,
        shadowColor: 0,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        opacity: 0
      }
    },
    animation: 0,
    animationThreshold: 0,
    animationDuration: 0,
    animationEasing: 0,
    animationDelay: 0,
    animationDurationUpdate: 0,
    animationEasingUpdate: 0,
    animationDelayUpdate: 0
  },
  markArea: {
    silent: 0,
    label: {
      show: 0,
      position: 0,
      distance: 0,
      rotate: 0,
      offset: 0,
      color: 0,
      fontStyle: 0,
      fontWeight: 0,
      fontFamily: 0,
      fontSize: 0,
      align: 0,
      verticalAlign: 0,
      lineHeight: 0,
      backgroundColor: 0,
      borderColor: 0,
      borderWidth: 0,
      borderRadius: 0,
      padding: 0,
      shadowColor: 0,
      shadowBlur: 0,
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      width: 0,
      height: 0,
      textBorderColor: 0,
      textBorderWidth: 0,
      textShadowColor: 0,
      textShadowBlur: 0,
      textShadowOffsetX: 0,
      textShadowOffsetY: 0,
      rich: 0,
      emphasis: {
        show: 0,
        position: 0,
        distance: 0,
        rotate: 0,
        offset: 0,
        color: 0,
        fontStyle: 0,
        fontWeight: 0,
        fontFamily: 0,
        fontSize: 0,
        align: 0,
        verticalAlign: 0,
        lineHeight: 0,
        backgroundColor: 0,
        borderColor: 0,
        borderWidth: 0,
        borderRadius: 0,
        padding: 0,
        shadowColor: 0,
        shadowBlur: 0,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        width: 0,
        height: 0,
        textBorderColor: 0,
        textBorderWidth: 0,
        textShadowColor: 0,
        textShadowBlur: 0,
        textShadowOffsetX: 0,
        textShadowOffsetY: 0,
        rich: 0
      }
    },
    itemStyle: {
      color: 0,
      borderColor: 0,
      borderWidth: 0,
      borderType: 0,
      shadowBlur: 0,
      shadowColor: 0,
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      opacity: 0,
      emphasis: {
        color: 0,
        borderColor: 0,
        borderWidth: 0,
        borderType: 0,
        shadowBlur: 0,
        shadowColor: 0,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        opacity: 0
      }
    },
    animation: 0,
    animationThreshold: 0,
    animationDuration: 0,
    animationEasing: 0,
    animationDelay: 0,
    animationDurationUpdate: 0,
    animationEasingUpdate: 0,
    animationDelayUpdate: 0
  }
});

/** @type {import("./type").PropsObjectSeriesTreemap} */
export const propsObjectSeriesTreemap = extrude({
  levels: {
    visualDimension: 0,
    visualMin: 0,
    visualMax: 0,
    color: 0,
    colorAlpha: 0,
    colorSaturation: 0,
    colorMappingBy: 0,
    visibleMin: 0,
    childrenVisibleMin: 0,
    label: {
      show: 0,
      position: 0,
      distance: 0,
      rotate: 0,
      offset: 0,
      formatter: 0,
      color: 0,
      fontStyle: 0,
      fontWeight: 0,
      fontFamily: 0,
      fontSize: 0,
      align: 0,
      verticalAlign: 0,
      lineHeight: 0,
      backgroundColor: 0,
      borderColor: 0,
      borderWidth: 0,
      borderRadius: 0,
      padding: 0,
      shadowColor: 0,
      shadowBlur: 0,
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      width: 0,
      height: 0,
      textBorderColor: 0,
      textBorderWidth: 0,
      textShadowColor: 0,
      textShadowBlur: 0,
      textShadowOffsetX: 0,
      textShadowOffsetY: 0,
      rich: 0,
      ellipsis: 0
    },
    upperLabel: {
      show: 0,
      position: 0,
      distance: 0,
      rotate: 0,
      offset: 0,
      formatter: 0,
      color: 0,
      fontStyle: 0,
      fontWeight: 0,
      fontFamily: 0,
      fontSize: 0,
      align: 0,
      verticalAlign: 0,
      lineHeight: 0,
      backgroundColor: 0,
      borderColor: 0,
      borderWidth: 0,
      borderRadius: 0,
      padding: 0,
      shadowColor: 0,
      shadowBlur: 0,
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      width: 0,
      height: 0,
      textBorderColor: 0,
      textBorderWidth: 0,
      textShadowColor: 0,
      textShadowBlur: 0,
      textShadowOffsetX: 0,
      textShadowOffsetY: 0,
      rich: 0,
      ellipsis: 0
    },
    itemStyle: {
      color: 0,
      colorAlpha: 0,
      colorSaturation: 0,
      borderWidth: 0,
      gapWidth: 0,
      borderColor: 0,
      borderColorSaturation: 0,
      strokeColor: 0,
      strokeWidth: 0
    },
    emphasis: {
      label: {
        show: 0,
        position: 0,
        distance: 0,
        rotate: 0,
        offset: 0,
        formatter: 0,
        color: 0,
        fontStyle: 0,
        fontWeight: 0,
        fontFamily: 0,
        fontSize: 0,
        align: 0,
        verticalAlign: 0,
        lineHeight: 0,
        backgroundColor: 0,
        borderColor: 0,
        borderWidth: 0,
        borderRadius: 0,
        padding: 0,
        shadowColor: 0,
        shadowBlur: 0,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        width: 0,
        height: 0,
        textBorderColor: 0,
        textBorderWidth: 0,
        textShadowColor: 0,
        textShadowBlur: 0,
        textShadowOffsetX: 0,
        textShadowOffsetY: 0,
        rich: 0,
        ellipsis: 0
      },
      upperLabel: {
        show: 0,
        position: 0,
        distance: 0,
        rotate: 0,
        offset: 0,
        formatter: 0,
        color: 0,
        fontStyle: 0,
        fontWeight: 0,
        fontFamily: 0,
        fontSize: 0,
        align: 0,
        verticalAlign: 0,
        lineHeight: 0,
        backgroundColor: 0,
        borderColor: 0,
        borderWidth: 0,
        borderRadius: 0,
        padding: 0,
        shadowColor: 0,
        shadowBlur: 0,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        width: 0,
        height: 0,
        textBorderColor: 0,
        textBorderWidth: 0,
        textShadowColor: 0,
        textShadowBlur: 0,
        textShadowOffsetX: 0,
        textShadowOffsetY: 0,
        rich: 0,
        ellipsis: 0
      },
      itemStyle: {
        color: 0
      }
    }
  },
  silent: {
    link: 0,
    target: 0,
    children: 0,
    tooltip: 0
  },
  label: {
    show: 0,
    position: 0,
    distance: 0,
    rotate: 0,
    offset: 0,
    formatter: 0,
    color: 0,
    fontStyle: 0,
    fontWeight: 0,
    fontFamily: 0,
    fontSize: 0,
    align: 0,
    verticalAlign: 0,
    lineHeight: 0,
    backgroundColor: 0,
    borderColor: 0,
    borderWidth: 0,
    borderRadius: 0,
    padding: 0,
    shadowColor: 0,
    shadowBlur: 0,
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    width: 0,
    height: 0,
    textBorderColor: 0,
    textBorderWidth: 0,
    textShadowColor: 0,
    textShadowBlur: 0,
    textShadowOffsetX: 0,
    textShadowOffsetY: 0,
    rich: 0,
    ellipsis: 0
  },
  upperLabel: {
    show: 0,
    position: 0,
    distance: 0,
    rotate: 0,
    offset: 0,
    formatter: 0,
    color: 0,
    fontStyle: 0,
    fontWeight: 0,
    fontFamily: 0,
    fontSize: 0,
    align: 0,
    verticalAlign: 0,
    lineHeight: 0,
    backgroundColor: 0,
    borderColor: 0,
    borderWidth: 0,
    borderRadius: 0,
    padding: 0,
    shadowColor: 0,
    shadowBlur: 0,
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    width: 0,
    height: 0,
    textBorderColor: 0,
    textBorderWidth: 0,
    textShadowColor: 0,
    textShadowBlur: 0,
    textShadowOffsetX: 0,
    textShadowOffsetY: 0,
    rich: 0,
    ellipsis: 0
  },
  itemStyle: {
    color: 0,
    colorAlpha: 0,
    colorSaturation: 0,
    borderWidth: 0,
    gapWidth: 0,
    borderColor: 0,
    borderColorSaturation: 0,
    strokeColor: 0,
    strokeWidth: 0
  },
  emphasis: {
    label: {
      show: 0,
      position: 0,
      distance: 0,
      rotate: 0,
      offset: 0,
      formatter: 0,
      color: 0,
      fontStyle: 0,
      fontWeight: 0,
      fontFamily: 0,
      fontSize: 0,
      align: 0,
      verticalAlign: 0,
      lineHeight: 0,
      backgroundColor: 0,
      borderColor: 0,
      borderWidth: 0,
      borderRadius: 0,
      padding: 0,
      shadowColor: 0,
      shadowBlur: 0,
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      width: 0,
      height: 0,
      textBorderColor: 0,
      textBorderWidth: 0,
      textShadowColor: 0,
      textShadowBlur: 0,
      textShadowOffsetX: 0,
      textShadowOffsetY: 0,
      rich: 0,
      ellipsis: 0
    },
    upperLabel: {
      show: 0,
      position: 0,
      distance: 0,
      rotate: 0,
      offset: 0,
      formatter: 0,
      color: 0,
      fontStyle: 0,
      fontWeight: 0,
      fontFamily: 0,
      fontSize: 0,
      align: 0,
      verticalAlign: 0,
      lineHeight: 0,
      backgroundColor: 0,
      borderColor: 0,
      borderWidth: 0,
      borderRadius: 0,
      padding: 0,
      shadowColor: 0,
      shadowBlur: 0,
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      width: 0,
      height: 0,
      textBorderColor: 0,
      textBorderWidth: 0,
      textShadowColor: 0,
      textShadowBlur: 0,
      textShadowOffsetX: 0,
      textShadowOffsetY: 0,
      rich: 0,
      ellipsis: 0
    },
    itemStyle: {
      color: 0
    }
  },
  breadcrumb: {
    show: 0,
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    height: 0,
    emptyItemWidth: 0,
    itemStyle: {
      color: 0,
      borderColor: 0,
      borderWidth: 0,
      borderType: 0,
      shadowBlur: 0,
      shadowColor: 0,
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      opacity: 0,
      textStyle: {
        color: 0,
        fontStyle: 0,
        fontWeight: 0,
        fontFamily: 0,
        fontSize: 0,
        align: 0,
        verticalAlign: 0,
        lineHeight: 0,
        backgroundColor: 0,
        borderColor: 0,
        borderWidth: 0,
        borderRadius: 0,
        padding: 0,
        shadowColor: 0,
        shadowBlur: 0,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        width: 0,
        height: 0,
        textBorderColor: 0,
        textBorderWidth: 0,
        textShadowColor: 0,
        textShadowBlur: 0,
        textShadowOffsetX: 0,
        textShadowOffsetY: 0,
        rich: 0
      }
    },
    emphasis: {
      itemStyle: {
        color: 0,
        borderColor: 0,
        borderWidth: 0,
        borderType: 0,
        shadowBlur: 0,
        shadowColor: 0,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        opacity: 0,
        textStyle: {
          color: 0,
          fontStyle: 0,
          fontWeight: 0,
          fontFamily: 0,
          fontSize: 0,
          align: 0,
          verticalAlign: 0,
          lineHeight: 0,
          backgroundColor: 0,
          borderColor: 0,
          borderWidth: 0,
          borderRadius: 0,
          padding: 0,
          shadowColor: 0,
          shadowBlur: 0,
          shadowOffsetX: 0,
          shadowOffsetY: 0,
          width: 0,
          height: 0,
          textBorderColor: 0,
          textBorderWidth: 0,
          textShadowColor: 0,
          textShadowBlur: 0,
          textShadowOffsetX: 0,
          textShadowOffsetY: 0,
          rich: 0
        }
      }
    }
  }
});
