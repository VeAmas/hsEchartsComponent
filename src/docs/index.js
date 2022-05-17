import intro from './intro.md';
import layoutLine from './layoutLine.md';
import layoutBar from './layoutBar.md';
import layoutLineBar from './layoutLineBar.md';
import layoutPie from './layoutPie.md';
import layoutScatter from './layoutScatter.md';
import layoutTreemap from './layoutTreemap.md';

export default [
  {
    name: '概览',
    url: '/',
    md: intro
  },
  {
    name: '通用折线图布局',
    url: '/layoutLine',
    md: layoutLine
  },
  {
    name: '通用柱状图布局',
    url: '/layoutBar',
    md: layoutBar
  },
  {
    name: '通用折线+柱状图布局',
    url: '/layoutLineBar',
    md: layoutLineBar
  },
  {
    name: '通用饼图布局',
    url: '/layoutPie',
    md: layoutPie
  },
  {
    name: '通用散点图布局',
    url: '/layoutScatter',
    md: layoutScatter
  },
  {
    name: '通用矩形树图布局',
    url: '/layoutTreemap',
    md: layoutTreemap
  }
];
