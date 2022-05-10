import template from './template';

export const variable = {
  axisLine: '#C7D1DA', // 轴线/轴点
  axisPointer: '#BFC9D5', // 辅助线
  splitLine: '#ECEFF2', // 网格线
  axisLabel: '#999', // 轴文字
  nameTextStyle: '#999', // 坐标轴名称的文字
  legend: '#666',
  legendInactive: '#bbb', // legend 未选中的文字颜色
  title: '#333', // 标题文字
  toolTipBg: '#fff',
  toolTipCssTest: 'rgba(29, 41, 62, 0.15)',
  pageIconColor: '#666',
  pageIconInactiveColor: '#999', // scroll 图标颜色
  pageTextStyle: '#333', // scroll状态下文字颜色,
  treeLabelBackground: '#EFF5FF'
};

export default template(variable);
