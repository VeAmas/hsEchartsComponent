# 通用散点图布局

已封装组件`EcLayoutScatter`

### EcLayoutScatter props

| 属性   | 说明   | 类型 | 默认值 |
| ------ | ------ | ---- | ------ |
| 继承自`EchartComponent` | 
| color | 图表默认的色值 | `string[]` | `[ '#3987DF', '#F2BB1C', '#3A6081', '#59BE7F', '#7E5DB4', '#64C4E6', '#5657DC', '#E87D2A', '#0A7460', '#E682A0']` |
| grid | 图表的grid属性 | [`echarts.EChartOption.Grid \| echarts.EChartOption.Grid[]`](https://echarts.apache.org/v4/zh/option.html#grid) <br/><span style="color: red">(TODO: 数组类型的grid未实现)</span>| `{ top: 20, left: '12px', right: '12px', bottom: 12, containLabel: true }` |
| showTooltip | 是否在无Tooltip组件的情况下默认展示Tooltip | `boolean` | true |
| showLegend | 是否在无Legend组件的情况下默认展示Legend | `boolean` | false |
| showNoData | 是否在无数据的时候展示「暂无数据」 | `boolean` | true |
| `EcLayoutScatter`特有 | 
| tooltipTextFormatter | tooltip文字的formatter | `TooltipTextFormatter`(详见tooltip章节) | undefined |
| avoidOverlap | 是否防止Legend与y轴的名称重叠 <br/> <span style="color: red">FIXME: 切换显示箭头的时候会导致selected状态重置</span>  | `boolean` | false |
| showDataZoom | 是否展示DataZoom的Inside (不展示滚动条) | `boolean` | true |
| xScale | x轴是否是脱离 0 值比例。设置成 true 后坐标刻度不会强制包含零刻度。 | `boolean` | true | 
| yScale | y轴是否是脱离 0 值比例。设置成 true 后坐标刻度不会强制包含零刻度。 | `boolean` | true | 
| xName | x轴的名称。 | `string` | undefined | 
| yName | y轴的名称。 | `string` | undefined | 
| data | 系列的数据 | [`SeriesScatter['data'][]`](https://echarts.apache.org/v4/zh/option.html#series-scatter.data) | undefined |
| symbolSize | 散点的尺寸 | [`number | number[] | {(value: number | number[], param: Object): number | number[]}`](https://echarts.apache.org/v4/zh/option.html#series-scatter.data) | undefined |


### 示例
```template?{"height":"400"};
<EcLayoutScatter
  :data="chartData.data"
  :tooltipTextFormatter="formatter"
  xName="beta"
  yName="VaR"
  :symbolSize="symbolSize"
>
</EcLayoutScatter>
```
```script
{
  data() {
    return {
      chartData: {
        data: [[
          [10.0, 8.04, '邮件营销0'],
          [8.0, 6.95, '邮件营销1'],
          [13.0, 7.58, '邮件营销2'],
          [9.0, 8.81, '邮件营销3'],
          [11.0, 8.33, '邮件营销4'],
          [14.0, 9.96, '邮件营销5'],
          [6.0, 7.24, '邮件营销6'],
          [4.0, 4.26, '邮件营销7'],
          [12.0, 10.84, '邮件营销8'],
          [7.0, 4.82, '邮件营销9'],
          [5.0, 5.68, '邮件营销10']
        ]]
      }
    }
  },
  methods: {
    symbolSize(v) {
      console.log(v)
      return (v[0] * v[1]) ** 0.9
    },
    formatter(param) {
      return {
          seriesDatas: param.seriesDatas.map(v => {
            return {
              ...v,
              value: `${v.data[0]}/${v.data[1]}`,
              name: v.data[2]
            };
          })
        };
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