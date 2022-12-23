export const instructionNames = ['moved', 'added', 'removed'];

// This class is responsible for ensuring Draggable policies.
export default class DraggablePolicy {
  dataKey = undefined;
  dataSources = undefined;
  visibleRange = undefined;

  constructor(dataKey, dataSources, visibleRange) {
    this.dataKey = dataKey;
    this.dataSources = dataSources;
    this.visibleRange = visibleRange;
  }

  // Find the real item from item.
  findRealItem(item) {
    const idx = this.dataSources.findIndex(
      x => x[this.dataKey] === item[this.dataKey]
    );
    return this.dataSources[this.visibleRange.start + idx];
  }

  // Returns a new list which is created based on
  // the update `instruction`.
  updatedSources(instruction, draggingRealIndex) {
    const newList = [...this.dataSources];

    if ('moved' in instruction) {
      const { newIndex } = instruction.moved;
      const start = this.visibleRange.start + newIndex;
      const deleteCount = 0;
      const item = newList.splice(draggingRealIndex, 1)[0];
      newList.splice(start, deleteCount, item);
    } else if ('added' in instruction) {
      const { newIndex, element } = instruction.added;
      const start = this.visibleRange.start + newIndex;
      const deleteCount = 0;
      const item = element;
      newList.splice(start, deleteCount, item);
    } else if ('removed' in instruction) {
      const { oldIndex } = instruction.removed;
      const start = this.visibleRange.start + oldIndex;
      const deleteCount = 1;
      newList.splice(start, deleteCount);
    }

    return newList;
  }
}
