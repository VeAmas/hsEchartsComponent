# 通用饼图布局

已封装组件`EcLayoutPie`

### EcLayoutPie props

| 属性   | 说明   | 类型 | 默认值 |
| ------ | ------ | ---- | ------ |
| 继承自`EchartComponent` | 
| color | 图表默认的色值 | `string[]` | `[ '#3987DF', '#F2BB1C', '#3A6081', '#59BE7F', '#7E5DB4', '#64C4E6', '#5657DC', '#E87D2A', '#0A7460', '#E682A0']` |
| grid | 图表的grid属性 | [`echarts.EChartOption.Grid \| echarts.EChartOption.Grid[]`](https://echarts.apache.org/v4/zh/option.html#grid) <br/><span style="color: red">(TODO: 数组类型的grid未实现)</span>| `{ top: 20, left: '12px', right: '12px', bottom: 12, containLabel: true }` |
| showTooltip | 是否在无Tooltip组件的情况下默认展示Tooltip | `boolean` | true |
| showLegend | 是否在无Legend组件的情况下默认展示Legend | `boolean` | true |
| showNoData | 是否在无数据的时候展示「暂无数据」 | `boolean` | true |
| `EcLayoutPie`特有 | 
| tooltipTextFormatter | tooltip文字的formatter | `TooltipTextFormatter`(详见tooltip章节) | undefined |
| legendTextFormatter | Legend文字的formatter | [`echarts.EChartOption.Legend.Formatter`](https://echarts.apache.org/v4/zh/option.html#legend.formatter) | undefined |
| data | 饼图的数据, 如果传入数组则表示有多个饼图 | [`SeriesPie['data'] | SeriesPie['data'][]`](https://echarts.apache.org/v4/zh/option.html#series-pie.data) | undefined |
| center | 饼图的中心位置 | `(string | number)[]` | ['50%', '50%'] |
| radius | 饼图的半径 | `(string | number)[]` | [0, '75%'] |

### 多个饼图
```template?{"height":"400"};
<EcLayoutPie
  :data="chartData.data"
  :radius="[
    [0, '55%'],
    [0, '55%']
  ]"
  :center="[
    ['20%', '50%'],
    ['50%', '50%']
  ]"
></EcLayoutPie>
```
```script
{
  data() {
    return {
      chartData: {
        data: [
          [
            {
              name: '邮件营销邮件营销邮件营销邮件营销邮件营销',
              value: 15
            },
            {
              name: '联盟广告',
              value: 37
            },
            {
              name: '视频广告',
              value: 54
            },
            {
              name: '搜索引擎',
              value: 21
            }
          ],
          [
            {
              name: '邮件营销2',
              value: 50
            },
            {
              name: '联盟广告2',
              value: 27
            },
            {
              name: '视频广告2',
              value: 16
            },
            {
              name: '搜索引擎2',
              value: 33
            },
            {
              name: '视频广告3',
              value: 41
            },
            {
              name: '搜索引擎3',
              value: 12
            }
          ]
        ]
      }
    }
  }
}
```
### 自定义tooltip以及Legend文本

```template?{"height":"400"};
<EcLayoutPie
  :tooltipTextFormatter="textFormatter"
  :legendTextFormatter="text => 'a' + text"
  :data="chartData.data"
  :center="['30%', '50%']"
>
</EcLayoutPie>
```
```script
{
  data() {
    return {
      chartData: {
        data:  [
          {
            name: '邮件营销邮件营销邮件营销',
            value: 15
          },
          {
            name: '联盟广告',
            value: 37
          },
          {
            name: '视频广告',
            value: 54
          },
          {
            name: '搜索引擎',
            value: 21
          }
        ]
      }
    }
  },
  methods: {
    textFormatter: ({ seriesDatas }) => ({
      // xAxisInfo: '我是标题<br/>',
      seriesDatas: seriesDatas.map(v => {
        v.name = 'HS' + v.name;
        return v;
      })
    })
  }
}
```