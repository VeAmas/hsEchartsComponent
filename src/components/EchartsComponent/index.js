// @ts-nocheck

import './Theme/index.js';

import EchartsComponent from './main.vue';
import EcTitle from './Title/index.vue';
import EcXaxis from './Axis/Xaxis.vue';
import EcYaxis from './Axis/Yaxis.vue';
import EcDataZoomInside from './DataZoom/Inside.vue';
import EcDataZoomSlider from './DataZoom/Slider.vue';
import EcLegend from './Legend/index.vue';
import EcTooltip from './Tooltip/index.vue';
import EcSeries from './Series/Universe.vue';
import EcSeriesLine from './Series/Line.vue';
import EcSeriesBar from './Series/Bar.vue';
import EcSeriesPie from './Series/Pie.vue';
import EcSeriesScatter from './Series/Scatter.vue';
import EcSeriesBoxplot from './Series/Boxplot.vue';
import EcSeriesTreemap from './Series/Treemap.vue';

import EcPieLegend from './Legend/customized/PieLegend.vue';
import EcLayoutPie from './Layout/Pie.vue';
import EcLayoutBar from './Layout/Bar.vue';
import EcLayoutLine from './Layout/Line.vue';
import EcLayoutLineBar from './Layout/LineBar.vue';
import EcLayoutScatter from './Layout/Scatter.vue';
import EcLayoutTreemap from './Layout/Treemap.vue';

export {
  EchartsComponent,
  EcTitle,
  EcXaxis,
  EcYaxis,
  EcTooltip,
  EcLegend,
  EcDataZoomInside,
  EcDataZoomSlider,
  EcSeries,
  EcSeriesLine,
  EcSeriesBar,
  EcSeriesPie,
  EcSeriesScatter,
  EcSeriesBoxplot,
  EcSeriesTreemap,
  /** 以下为定制化组件 */
  EcPieLegend,
  EcLayoutPie,
  EcLayoutBar,
  EcLayoutLine,
  EcLayoutLineBar,
  EcLayoutScatter,
  EcLayoutTreemap
};
export default EchartsComponent;
