import { basic10Colors } from '../constant';
export default variable => ({
  color: basic10Colors,
  backgroundColor: 'rgba(0,0,0,0)',
  textStyle: {},
  title: {
    textStyle: {
      color: variable['title']
    },
    subtextStyle: {
      color: variable['title']
    }
  },
  categoryAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: variable['axisLine']
      }
    },
    nameTextStyle: {
      color: variable['nameTextStyle']
    },
    axisTick: {
      show: true,
      lineStyle: {
        color: variable['axisLine']
      }
    },
    axisLabel: {
      show: true,
      textStyle: {
        color: variable['axisLabel']
      }
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: variable['splitLine']
      }
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: ['transparent']
      }
    },
    axisPointer: {
      lineStyle: {
        color: variable['axisPointer']
      }
    }
  },
  valueAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: variable['axisLine']
      }
    },
    nameTextStyle: {
      color: variable['nameTextStyle']
    },
    axisTick: {
      show: false,
      lineStyle: {
        color: variable['axisLine']
      }
    },
    axisLabel: {
      show: true,
      textStyle: {
        color: variable['axisLabel']
      }
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: variable['splitLine']
      }
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: ['transparent']
      }
    },
    axisPointer: {
      lineStyle: {
        color: variable['axisPointer']
      }
    }
  },
  toolbox: {
    iconStyle: {
      normal: {
        borderColor: variable['pageIconInactiveColor']
      },
      emphasis: {
        borderColor: variable['pageIconInactiveColor']
      }
    }
  },
  legend: {
    pageIconColor: variable['pageIconColor'],
    pageIconInactiveColor: variable.pageIconInactiveColor,
    pageTextStyle: {
      color: variable.pageTextStyle
    },
    inactiveColor: variable['legendInactive'],
    textStyle: {
      color: variable['legend']
    }
  },
  tooltip: {
    extraCssText: `box-shadow: 0 6px 16px ${variable['toolTipCssTest']};`,
    backgroundColor: variable['toolTipBg'],
    textStyle: {
      color: variable['title']
    }
  },
  dataZoom: {
    backgroundColor: 'rgba(0,0,0,0)',
    dataBackgroundColor: 'rgba(255,255,255,0)',
    fillerColor: 'rgba(91,143,249,0.25)',
    handleColor: 'rgba(0,0,0,0)',
    handleSize: '100%',
    textStyle: {
      color: variable['title']
    }
  },
  markPoint: {
    label: {
      color: variable['title']
    },
    emphasis: {
      label: {
        color: variable['title']
      }
    }
  },
  tree: {
    label: {
      backgroundColor: variable['treeLabelBackground'],
      color: variable['title']
    }
  }
});
