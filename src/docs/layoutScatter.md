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
