import Draggable from 'vuedraggable';
import VirtualList from 'vue-virtual-scroll-list';

import DraggablePolicy from './broker/draggable-policy';
import createBroker, { sortableEventHandlers } from './broker';

const Broker = createBroker(VirtualList);

// SortableJS/Vue.Draggable + tangbc/vue-virtual-scroll-list.
export default {
  props: {
    value: {
      default: () => []
    },
    dataSources: Array
  },
  provide() {
    return {
      Draggable,
      DraggablePolicy
    };
  },
  render(h) {
    return h(Broker, {
      props: this.$props,
      attrs: this.$attrs,
      on: {
        // Propagate VirtualList's input event.
        input: this.$emit.bind(this, 'input'),

        // Propagate draggable.sortable's events.
        ...sortableEventHandlers(this)
      }
    });
  }
};
