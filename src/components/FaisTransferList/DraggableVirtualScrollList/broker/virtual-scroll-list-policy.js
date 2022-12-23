export default class VirtualScrollListPolicy {
  draggingVNode = null;
  draggingIndex = undefined;
  draggingRealIndex = undefined;

  onDragStart(e, range, slots) {
    this.draggingIndex = e.oldIndex;
    this.draggingRealIndex = range.start + e.oldIndex;
    this.draggingVNode = slots[e.oldIndex];
  }

  onDragEnd() {
    this.draggingVNode = null;
  }
}
