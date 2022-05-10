<template>
  <component :is="componentTypeMap(type)" v-bind="$attrs"></component>
</template>

<script>
import Bar from './Bar.vue';
import Line from './Line.vue';
import Pie from './Pie.vue';
import Scatter from './Scatter.vue';
import Boxplot from './Boxplot.vue';
import Heatmap from './Heatmap.vue';

export default {
  components: {
    EcBar: Bar,
    EcLine: Line,
    EcPie: Pie,
    EcScatter: Scatter,
    EcHeatmap: Heatmap,
    EcBoxplot: Boxplot
  },
  name: 'Series',
  props: {
    type: {
      type: String,
      required: true
    }
  },
  methods: {
    /** @param {string} type */
    componentTypeMap(type) {
      return 'Ec' + type[0].toUpperCase() + type.substring(1);
    }
  }
};
</script>
