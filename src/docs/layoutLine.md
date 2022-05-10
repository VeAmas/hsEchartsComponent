# 通用折线图布局

已封装组件`EcLayoutLine`

### EcLayoutLine props

| 属性   | 说明   | 类型 | 默认值 |
| ------ | ------ | ---- | ------ |
| 继承自`EchartComponent` | 
| color | 图表默认的色值 | `string[]` | `[ '#3987DF', '#F2BB1C', '#3A6081', '#59BE7F', '#7E5DB4', '#64C4E6', '#5657DC', '#E87D2A', '#0A7460', '#E682A0']` |
| grid | 图表的grid属性 | [`echarts.EChartOption.Grid \| echarts.EChartOption.Grid[]`](https://echarts.apache.org/v4/zh/option.html#grid) <br/><span style="color: red">(TODO: 数组类型的grid未实现)</span>| `{ top: 20, left: '12px', right: '12px', bottom: 12, containLabel: true }` |
| showTooltip | 是否在无Tooltip组件的情况下默认展示Tooltip | `boolean` | true |
| showLegend | 是否在无Legend组件的情况下默认展示Legend | `boolean` | true |
| dataZoomThreshold | showDataZoom为true的前提下, DataZoom出现的数据阈值 | `number` | 31 |
| showNoData | 是否在无数据的时候展示「暂无数据」 | `boolean` | true |
| 继承自`CartesianBase` | 
| tooltipTextFormatter |  tooltip文字的formatter | `TooltipTextFormatter`(详见tooltip章节) | undefined |
| avoidOverlap | 是否防止Legend与y轴的名称重叠 <br/> <span style="color: red">FIXME: 切换显示箭头的时候会导致selected状态重置</span>  | `boolean` | false |
| xAxisNumber | x轴的个数 | `boolean` | 1 |
| yAxisNumber | y轴的个数 | `boolean` | 1 |
| xScale | x轴是否是脱离 0 值比例。设置成 true 后坐标刻度不会强制包含零刻度。<br/> 为数组的时候,可以为多个轴分别设置scale。否则表示全部设置为当前值 | `boolean[] | boolean` | false | 
| yScale | y轴是否是脱离 0 值比例。设置成 true 后坐标刻度不会强制包含零刻度。<br/> 为数组的时候,可以为多个轴分别设置scale。否则表示全部设置为当前值 | `boolean[] | boolean` | false | 
| stacks | 数据是否堆叠, 数组对应每一个series的stack字段, 数组项传入''表示不堆叠 | `string[]` | [] |
| areas | 表示line类型的series是否为区域图 <br/> 为数组的时候,可以为多个series分别设置area。否则表示全部设置为当前值| `boolean[] | boolean` | false |
| xAxisIndexes | series对于x轴的序号列表<br/>例如`[{type: 'bar', xIndex: 0}, {type: 'bar', xIndex: 1}]` 等价于传入 `[0, 1]`  <br/> 若传入单个数字, 则表示都使用同一个x轴 | `number[] | number` | [] |
| yAxisIndexes | series对于y轴的序号列表<br/>例如`[{type: 'bar', yIndex: 0}, {type: 'bar', yIndex: 1}]` 等价于传入 `[0, 1]`  <br/> 若传入单个数字, 则表示都使用同一个y轴 | `number[] | number` | [] |
| alignAxis | 双y轴是否对齐 | `boolean` | false |
| xData | x轴的数据, 若x轴的type为value,则不需要传入 | [`XAxis['data'] \| XAxis['data'][]`](https://echarts.apache.org/zh/option.html#xAxis.data) | undefined |
| xName | x轴的名称 多个x轴则传入数组 | `string[] | string` | undefined |
| yData | x轴的数据, 若x轴的type为value,则不需要传入 | [`YAxis['data'] \| YAxis['data'][]`](https://echarts.apache.org/zh/option.html#yAxis.data) | undefined |
| yName | y轴的名称 多个y轴则传入数组 | `string[] | string` | undefined |
| data | series的数据 | `{name: string; data: (string | number | null)[]}[]` | undefined |
| showDataZoom | 是否在无DataZoom组件的情况下默认展示DataZoom | `boolean` | false |

### 区域图+堆叠
```template?{"height":"400"};
<EcLayoutLine
  :avoidOverlap="true"
  :data="chartData.data"
  :xData="chartData.xData"
  :stacks="['1', '1', '1', '1', '1']"
  :areas="true"
  :yName="'市场占比'"
></EcLayoutLine>
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
### 曲线图对应多个y轴

```template?{"height":"400"};
<EcLayoutLine
  :avoidOverlap="true"
  :data="chartData.data"
  :xData="chartData.xData"
  :alignAxis="true"
  :yAxisNumber="2"
  :yAxisIndexes="[0,0,0,1,1]"
  :yName="['市场占比', '收益率']"
></EcLayoutLine>
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
<EcLayoutLine
  :avoidOverlap="true"
  :data="chartData.data"
  :xData="chartData.xData"
  :yName="'市场占比'"
  :tooltipTextFormatter="tooltipTextFormatter"
  :xLabelFormatter="xLabelFormatter"
  :yLabelFormatter="yLabelFormatter"
></EcLayoutLine>
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
### 显示DataZoom/legend/tooltip/Scale
```template?{"height":"400"};
<div style="height: 100%">
  <EcLayoutLine
    style="height:calc(100% - 30px)"
    :avoidOverlap="true"
    :showLegend="showLegend"
    :showTooltip="showTooltip"
    :data="chartData.data"
    :yScale="yScale"
    :xData="chartData.xData"
    :alignAxis="true"
    :yName="'市场占比'"
    :showDataZoom="showDataZoom"
  ></EcLayoutLine>
  <h-switch v-model="showDataZoom" size="small"></h-switch> 是否展示DataZoom
  <h-switch v-model="showLegend" size="small"></h-switch> 是否展示Legend
  <h-switch v-model="showTooltip" size="small"></h-switch> 是否展示Tooltip
  <h-switch v-model="yScale" size="small"></h-switch> 是否Scale
</div>
```
```script
{
  data() {
    return {
      showDataZoom: true,
      showLegend: true,
      showTooltip: true,
      yScale: true,
      chartData: {
        data: [
          {
            name: '邮件营销',
            data: [150, 120, 121, 540, 400]
          },
          {
            name: '联盟广告',
            data: [370, 800, 160, 440, 600]
          },
          {
            name: '视频广告',
            data: [540, 520, 100, 150, 360]
          },
          {
            name: '搜索引擎2',
            data: [210, 250, 167, 370, 780]
          },
          {
            name: '搜索引擎3',
            data: [210, 250, 167, 370, 780]
          }
        ],
        xData: ['2021-1', '2021-2', '2021-3', '2021-4', '2021-5'],
        stacks: ['邮件营销', '邮件营销', '邮件营销', '搜索引擎2', '搜索引擎2']
      }
    }
  }
}
```
### 无数据的情况
```template?{"height":"400"};
<div style="height: 100%; padding: 6px">
  <EcLayoutLine
    style="height:calc(100% - 30px)"
    :data="chartData.data"
    :xData="chartData.xData"
    :yName="'市场占比'"
  ></EcLayoutLine>
  <h-button @click="appendData">添加一条数据</h-button>
</div>
```
```script
{
  data() {
    return {
      chartData: {
        data: [{          
          name: '搜索引擎',
          data: []
        }],
        xData: [],
      },
      dateStart: 1
    }
  },
  methods: {
    appendData() {
      this.chartData.data[0].data.push((Math.random() * 50).toFixed(2))
      this.chartData.xData.push('05-' + String(this.dateStart++).padStart('0', 1))
    }
  }
}
```