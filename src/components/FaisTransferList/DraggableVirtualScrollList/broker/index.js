import { instructionNames as draggableEvents } from './draggable-policy';
import VirtualScrollListPolicy from './virtual-scroll-list-policy';

const sortableEvents = [
  'start',
  'add',
  'remove',
  'update',
  'end',
  'choose',
  'unchoose',
  'sort',
  'filter',
  'clone'
];

// Returns handlers which propagate sortable's events.
export function sortableEventHandlers(context) {
  return sortableEvents.reduce(
    (acc, eventName) => ({
      ...acc,
      [eventName]: context.$emit.bind(context, eventName)
    }),
    {}
  );
}

// A fuctory function which will return DraggableVirtualList constructor.
export default function createBroker(VirtualList) {
  return {
    extends: VirtualList,
    props: {
      size: {
        type: Number
      },
      keeps: {
        type: Number,
        require: true
      },
      dataKey: {
        type: String,
        require: true
      },
      dataSources: {
        type: Array,
        require: true
      },
      dataComponent: {
        require: true
      }
    },
    inject: ['Draggable', 'DraggablePolicy'],
    data() {
      return {
        range: null,
        vlsPolicy: new VirtualScrollListPolicy()
      };
    },
    methods: {
      // Override
      //
      // Return the result of VirtualList.options.methods.getRenderSlots
      // which would be wrapped by Draggable.
      // Draggable's change events would be converted to input
      // events and emitted.
      getRenderSlots(h) {
        const { Draggable, DraggablePolicy } = this;
        const slots = VirtualList.options.methods.getRenderSlots.call(this, h);
        const draggablePolicy = new DraggablePolicy(
          this.dataKey,
          this.dataSources,
          this.range
        );

        if (this.vlsPolicy.draggingVNode) {
          // ドラッグ中の要素を vls に差し込む
          slots.splice(
            this.vlsPolicy.draggingIndex,
            1,
            this.vlsPolicy.draggingVNode
          );
        }

        return [
          h(
            Draggable,
            {
              props: {
                value: this.dataSources,

                // policy will find the real item from x.
                clone: x => draggablePolicy.findRealItem(x)
              },
              on: {
                // Convert Draggable's change events to input events.
                change: e => {
                  if (draggableEvents.some(n => n in e)) {
                    this.$emit(
                      'input',
                      draggablePolicy.updatedSources(
                        e,
                        this.vlsPolicy.draggingRealIndex
                      )
                    );
                  }
                },

                // Propagate Sortable events.
                ...sortableEventHandlers(this),

                start: e => {
                  this.vlsPolicy.onDragStart(e, this.range, slots);
                  this.$emit('start', e);
                },

                end: e => {
                  this.vlsPolicy.onDragEnd();
                  this.$emit('end', e);
                }
              },
              attrs: this.$attrs
            },
            slots
          )
        ];
      }
    }
  };
}
