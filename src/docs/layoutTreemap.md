# 通用矩形树图布局

已封装组件`EcLayoutTreemap`

### EcLayoutTreemap props

| 属性   | 说明   | 类型 | 默认值 |
| ------ | ------ | ---- | ------ |
| 继承自`EchartComponent` | 
| color | 图表默认的色值 | `string[]` | `[ '#3987DF', '#F2BB1C', '#3A6081', '#59BE7F', '#7E5DB4', '#64C4E6', '#5657DC', '#E87D2A', '#0A7460', '#E682A0']` |
| grid | 图表的grid属性 | [`echarts.EChartOption.Grid \| echarts.EChartOption.Grid[]`](https://echarts.apache.org/v4/zh/option.html#grid) <br/><span style="color: red">(TODO: 数组类型的grid未实现)</span>| `{ top: 20, left: '12px', right: '12px', bottom: 12, containLabel: true }` |
| showTooltip | 是否在无Tooltip组件的情况下默认展示Tooltip | `boolean` | true |
| showLegend | 是否在无Legend组件的情况下默认展示Legend | `boolean` | false |
| showNoData | 是否在无数据的时候展示「暂无数据」 | `boolean` | true |
| `EcLayoutTreemap`特有 | 
| tooltipTextFormatter | tooltip文字的formatter | `TooltipTextFormatter`(详见tooltip章节) | undefined |
| filterZero | 是否过滤掉数据中为0的数据(其实没什么用) | `boolean` | true |
| format | 格式化用的字符串 | string | undefined |
| aggregateThreshold | 合并的阈值 超过几个时剩下的会合并成「其他」。 为0的时候为不合并 <br/> <span style="color: red">FIXME: 当「其他」的数据总数大于非「其他」的数据时, 其他会出现在左侧</span> | `number` | 0 |
| data | 系列的数据 | [`SeriesTreemap['data'][]`](https://echarts.apache.org/v4/zh/option.html#series-scatter.data) | undefined |

### 示例
```template?{"height":"400"};
<EcLayoutTreemap
  :data="chartData.data"
  :aggregateThreshold="13"
></EcLayoutTreemap>
```
```script
{
  data() {
    return {
      chartData: {
        data: [
          { name: '邮件营销', value: '111' },
          { name: '联盟广告', value: '215' },
          { name: '视频广告', value: '422' },
          { name: '搜索引擎', value: '156' },
          ...new Array(20).fill('').map((v, i) => ({
            name: '分类' + i,
            value: (Math.random() * 100).toFixed(0)
          }))
        ]
      }
    }
  }
}
```