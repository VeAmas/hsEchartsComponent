# 通用柱状图布局

已封装组件`EcLayoutBar`

### EcLayoutBar props

| 属性   | 说明   | 类型 | 默认值 |
| ------ | ------ | ---- | ------ |
| 继承自`EchartComponent` | 
| color | 图表默认的色值 | `string[]` | `[ '#3987DF', '#F2BB1C', '#3A6081', '#59BE7F', '#7E5DB4', '#64C4E6', '#5657DC', '#E87D2A', '#0A7460', '#E682A0']` |
| grid | 图表的grid属性 | [`echarts.EChartOption.Grid \| echarts.EChartOption.Grid[]`](https://echarts.apache.org/v4/zh/option.html#grid) <br/><span style="color: red">(TODO: 数组类型的grid未实现)</span>| `{ top: 20, left: '12px', right: '12px', bottom: 12, containLabel: true }` |
| showTooltip | 是否在无Tooltip组件的情况下默认展示Tooltip | `boolean` | true |
| showLegend | 是否在无Legend组件的情况下默认展示Legend | `boolean` | true |
| dataZoomThreshold | showDataZoom为true的前提下, DataZoom出现的数据阈值 | `number` | 31 |
| showDataZoom | 是否在无DataZoom组件的情况下默认展示DataZoom | `boolean` | true |
| showNoData | 是否在无数据的时候展示「暂无数据」 | `boolean` | true |
| 继承自`CartesianBase` | 
| tooltipTextFormatter |  tooltip文字的formatter | `TooltipTextFormatter`(详见tooltip章节) | undefined |
| avoidOverlap | 是否防止Legend与y轴的名称重叠 <br/> <span style="color: red">FIXME: 切换显示箭头的时候会导致selected状态重置</span>  | `boolean` | false |
| xAxisNumber | x轴的个数 | `boolean` | 1 |
| yAxisNumber | y轴的个数 | `boolean` | 1 |
| stacks | 数据是否堆叠, 数组对应每一个series的stack字段, 数组项传入''表示不堆叠 | `string[]` | [] |
| xAxisIndexes | series对于x轴的序号列表<br/>例如`[{type: 'bar', xIndex: 0}, {type: 'bar', xIndex: 1}]` 等价于传入 `[0, 1]`  <br/> 若传入单个数字, 则表示都使用同一个x轴 | `number[] | number` | [] |
| yAxisIndexes | series对于y轴的序号列表<br/>例如`[{type: 'bar', yIndex: 0}, {type: 'bar', yIndex: 1}]` 等价于传入 `[0, 1]`  <br/> 若传入单个数字, 则表示都使用同一个y轴 | `number[] | number` | [] |
| alignAxis | 双y轴是否对齐 | `boolean` | false |
| xData | x轴的数据, 若x轴的type为value,则不需要传入 | [`XAxis['data'] \| XAxis['data'][]`](https://echarts.apache.org/zh/option.html#xAxis.data) | undefined |
| xName | x轴的名称 多个x轴则传入数组 | `string[] | string` | undefined |
| yData | x轴的数据, 若x轴的type为value,则不需要传入 | [`YAxis['data'] \| YAxis['data'][]`](https://echarts.apache.org/zh/option.html#yAxis.data) | undefined |
| yName | y轴的名称 多个y轴则传入数组 | `string[] | string` | undefined |
| data | series的数据 | `{name: string; data: (string | number | null)[]}[]` | undefined |
| `EcLayoutBar`特有 | 
| xType | x轴的类型 传入字符串则表示所有x轴都为对应的类型 | `('value' | 'category') | ('value' | 'category')[]` | 'category' |
| yType | y轴的类型 传入字符串则表示所有y轴都为对应的类型 | `('value' | 'category') | ('value' | 'category')[]` | 'value' |

### 堆叠
```template?{"height":"400"};
<EcLayoutBar
  :avoidOverlap="true"
  :data="chartData.data"
  :xData="chartData.xData"
  :stacks="['0', '0', '1', '1', '1']"
  :yName="'市场占比'"
></EcLayoutBar>
```
```script
{
  data() {
    return {
      chartData: {
        data: [
          {
            name: '邮件营销',
            data: [15, 12, 21, 54, 40]
          },
          {
            name: '联盟广告',
            data: [37, 80, 60, 44, 60]
          },
          {
            name: '视频广告',
            data: [54, 52, 0, 15, 36]
          },
          {
            name: '搜索引擎2',
            data: [21, 25, 67, 37, 78]
          },
          {
            name: '搜索引擎3',
            data: [21, 25, 67, 37, 78]
          }
        ],
        xData: ['2021-1', '2021-2', '2021-3', '2021-4', '2021-5'],
        stacks: ['邮件营销', '邮件营销', '邮件营销', '搜索引擎2', '搜索引擎2']
      }
    }
  }
}
```
### 柱状图对应多个y轴

```template?{"height":"400"};
<EcLayoutBar
  :avoidOverlap="true"
  :data="chartData.data"
  :xData="chartData.xData"
  :alignAxis="true"
  :yAxisNumber="2"
  :yAxisIndexes="[0,0,0,1,1]"
  :yName="['市场占比', '收益率']"
></EcLayoutBar>
```
```script
{
  data() {
    return {
      chartData: {
        data: [
          {
            name: '邮件营销',
            data: [15, 12, 21, 54, 40]
          },
          {
            name: '联盟广告',
            data: [37, 80, 60, 44, 60]
          },
          {
            name: '视频广告',
            data: [54, 52, 0, 15, 36]
          },
          {
            name: '搜索引擎2',
            data: [21, 25, 67, 37, 78]
          },
          {
            name: '搜索引擎3',
            data: [21, 25, 67, 37, 78]
          }
        ],
        xData: ['2021-1', '2021-2', '2021-3', '2021-4', '2021-5'],
        stacks: ['邮件营销', '邮件营销', '邮件营销', '搜索引擎2', '搜索引擎2']
      }
    }
  }
}
```
### 自定义tooltip以及axisLabel文本

```template?{"height":"400"};
<EcLayoutBar
  :avoidOverlap="true"
  :data="chartData.data"
  :xData="chartData.xData"
  :yName="'市场占比'"
  :tooltipTextFormatter="tooltipTextFormatter"
  :xLabelFormatter="xLabelFormatter"
  :yLabelFormatter="yLabelFormatter"
></EcLayoutBar>
```
```script
{
  data() {
    return {
      chartData: {
        data: [
          {
            name: '邮件营销',
            data: [15, 12, 21, 54, 40]
          },
          {
            name: '联盟广告',
            data: [37, 80, 60, 44, 60]
          },
          {
            name: '视频广告',
            data: [54, 52, 0, 15, 36]
          },
          {
            name: '搜索引擎2',
            data: [21, 25, 67, 37, 78]
          },
          {
            name: '搜索引擎3',
            data: [21, 25, 67, 37, 78]
          }
        ],
        xData: ['2021-1', '2021-2', '2021-3', '2021-4', '2021-5'],
        stacks: ['邮件营销', '邮件营销', '邮件营销', '搜索引擎2', '搜索引擎2']
      }
    }
  },
  methods: {
    tooltipTextFormatter(param) {
      const seriesDatas = param.seriesDatas
      seriesDatas.map(v => {
        v.color = 'red';
        v.name = v.name + '_test';
        v.value = v.value * 10;
      })
      seriesDatas.push({
        color: 'blue',
        name: '合计',
        value: seriesDatas.reduce((ret, next) => ret + next.value, 0)
      })
      return {seriesDatas}
    },
    yLabelFormatter(text) {
      return text + '%'
    },
    xLabelFormatter(text) {
      // 2021-1 => 2021年1月
      return text.split('-').join('年') + '月'
    },
  }
}
```
### 显示DataZoom/legend/tooltip
```template?{"height":"460"};
<div style="height: 100%">
  <EcLayoutBar
    style="height:calc(100% - 60px)"
    :avoidOverlap="true"
    :showLegend="showLegend"
    :showTooltip="showTooltip"
    :data="chartData.data"
    :xData="chartData.xData"
    :alignAxis="true"
    :yName="'市场占比'"
    :showDataZoom="showDataZoom"
  ></EcLayoutBar>
  <h-switch v-model="showDataZoom" size="small"></h-switch> 是否展示DataZoom
  <h-switch v-model="showLegend" size="small"></h-switch> 是否展示Legend
  <h-switch v-model="showTooltip" size="small"></h-switch> 是否展示Tooltip
  <br/>
  <h-button @click="appendData">添加一条数据</h-button>
  <h-button @click="appendSeries">添加一个系列</h-button>
  <h-button @click="removeData">删除一条数据</h-button>
  <h-button @click="removeSeries">删除一个系列</h-button>
</div>
```
```script
{
  data() {
    return {
      showDataZoom: true,
      showLegend: true,
      showTooltip: true,
      dataSize: 0,
      chartData: {
        data: [
          {
            name: '系列1',
            data: []
          },
        ],
        xData: []
      }
    }
  },
  methods: {
    appendData() {
      this.chartData.data.forEach(v => {
        v.data.push((Math.random() * 50).toFixed(2))
      })
      this.chartData.xData.push('2011-' + (this.chartData.xData.length + 1))
    },
    appendSeries() {
      this.chartData.data.push({
        name: '系列' + (this.chartData.data.length + 1),
        data: new Array(this.chartData.data[0].data.length).fill().map(() => (Math.random() * 50).toFixed(2))
      })
    },
    removeData() {
      if (this.chartData.xData.length > 0) {
        this.chartData.data.forEach(v => {
          v.data.pop()
        })
        this.chartData.xData.pop()
      }
    },
    removeSeries() {
      if (this.chartData.data.length > 1) {
        this.chartData.data.pop()
      }
    },
  }
}
```
### 横向数据
```template?{"height":"460"};  
<EcLayoutBar
  :yAxisNumber="2"
  xType="value"
  :yType="['category', 'category']"
  :data="chartData.data"
  :yData="chartData.xData"
  :stacks="chartData.stacks"
  :yName="['市场占比', '市场']"
></EcLayoutBar>
```
```script
{
  data() {
    return {
      chartData: {
        data: [
          {
            name: '搜索引擎2',
            data: [21, 25, 67, 37, 78]
          },
          {
            name: '搜索引擎3',
            data: [21, 25, 67, 37, 78]
          }
        ],
        xData: [
          ['2021-1', '2021-2', '2021-3', '2021-4', '2021-5'],
          ['4', '65', '22', '5', '1']
        ],
        stacks: ['搜索引擎2', '搜索引擎']
      }
    }
  },
  methods: {}
}
```
