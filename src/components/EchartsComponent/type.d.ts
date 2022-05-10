export type TooltipTextFormatter = {
  (param0: {
    xAxisInfo: string;
    params: Parameters<echarts.EChartOption.Tooltip.Formatter>[0];
    seriesDatas: {
      color: string;
      name: string;
      value: string;
      data: any;
    }[];
  }):
    | {
        xAxisInfo?: string;
        seriesDatas: {
          color: string;
          name: string;
          value: string;
          format?: string;
        }[];
      }
    | string;
};
