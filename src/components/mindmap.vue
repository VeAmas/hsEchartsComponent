<template>
  <div style="display: flex">
    <div>
      条件
      <textarea
        style="display: block"
        v-model="conditionMap"
        cols="50"
        rows="20"
      ></textarea>
      名称
      <textarea
        style="display: block"
        v-model="dataKindMap"
        cols="50"
        rows="20"
      ></textarea>
      <input type="file" ref="input" />
    </div>
    <div>
      结果
      <textarea v-model="result" cols="150" rows="40"></textarea>
      <button @click="download">下载</button>
      <button @click="clear">清空存储</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'mindmap',
  data() {
    return {
      dataKindMap:
        localStorage.getItem('dataKindMap') ||
        `
      {
      "组合期初权重":"Port Opening Weight",
      "当前维度市值序列":"PortMvHts",
      "组合维度市值序列":"RootPortMvHts",
      "上层维度市值序列":"ParentPortMvHts",
      "组合期末权重":"Port Closed Weight",
      "组合平均权重":"Port Mean Weight",
      "基准期初权重":"Bench Opening Weight",
      "当前维度基准权重序列":"NodeBenchOwHts",
      "当前维度内个券基准权重序列":"NodeBenchOwHtsPd",
      "上层维度基准权重序列":"ParentBenchOwHts",
      "上层维度内个券基准权重序列":"ParentBenchOwHtsPd",
      "组合维度基准权重序列":"RootBenchOwHts",
      "组合维度内个券基准权重序列":"RootBenchOwHtsPd",
      "基准期末权重":"Bench Closed Weight",
      "当前维度基准权重序列":"NodeBenchCwHts",
      "当前维度内个券基准期末权重序列":"NodeBenchCwHtsPd",
      "上层维度基准期末权重序列":"ParentBenchCwHts",
      "上层维度内个券基准期末权重序列":"ParentBenchCwHtsPd",
      "组合维度基准期末权重序列":"RootBenchCwHts",
      "组合维度内个券基准权重序列":"RootBenchCwHtsPd",
      "基准平均权重":"Bench Mean Weight",
      "新股收益贡献":"New Stock Return Contribution",
      "下层新股收益贡献":"Child New Stock Return Contribution",
      "当前维度新股收益率":"NewStockYieldHts",
      "当前维度新股收益金额":"NewStockAmountHts",
      "上层维度上日市值":"ParentLsMvHts",
      "上层维度买入":"ParentBuyHts",
      "上层维度净流入":"ParentNetFlowHts",
      "上层维度卖出":"ParentSellHts",
      "上层维度分红付息":"ParentGiveHts",
      "组合上日市值":"RootLsMvHts",
      "组合买入":"RootBuyHts",
      "组合净流入":"RootNetFlowHts",
      "组合卖出":"RootSellHts",
      "组合分红付息":"RootGiveHts",
      "上层维度组合累计收益率":"ParentRpCumHts",
      "上层维度组合收益率":"ParentRpHts",
      "上层维度当日市值":"ParentMvHts",
      "当前维度新股收益率(组合成本)":"NewStockRootYieldHts",
      "组合维度成本":"RootCostHts",
      "组合维度组合累计收益率":"RootRpCumHts",
      "组合维度组合收益率":"RootRpHts",
      "组合维度上日市值":"RootDimLsMvHts",
      "组合维度买入":"RootDimBuyHts",
      "组合维度卖出":"RootDimSellHts",
      "组合维度分红付息":"RootDimGiveHts",
      "汇兑收益贡献":"Exchange Return Contribution",
      "下层汇兑收益贡献":"Child Exchange Return Contribution",
      "当前维度汇兑收益率":"ExchangeYieldHts",
      "当前维度汇兑损益金额":"ExchangeAmountHts",
      "当前维度汇兑收益率(组合成本)":"ExchangeRootYieldHts",
      "其他收益贡献":"Other Return Contribution",
      "下层其他收益贡献":"Child Other Return Contribution",
      "当前维度其他收益率":"OtherYieldHts",
      "当前维度其他收益金额":"OtherAmountHts",
      "当前维度其他收益率(组合成本)":"OtherRootYieldHts",
      "组合收益贡献":"Investment Return Contribution",
      "下层组合收益贡献":"Child Investment Return Contribution",
      "标准组合收益贡献":"Q4Contribution",
      "当前维度占上层成本权重":"NodeWpHts",
      "当前维度成本":"DimLayerCostHts",
      "当前维度上日市值":"NodeLsMvHts",
      "当前维度买入":"NodeBuyHts",
      "当前维度净流入":"NodeNetFlowHts",
      "当前维度卖出":"NodeSellHts",
      "当前维度分红付息":"NodeGiveHts",
      "当前维度组合收益率":"NodeRpHts",
      "当前维度收益金额":"DimRpAmountHts",
      "当前维度当日市值":"NodeMvHts",
      "上层维度收益金额":"ParentRpAmountHts",
      "上层维度占组合成本权重":"ParentWrpHts",
      "组合维度收益金额":"RootRpAmountHts",
      "基准收益贡献":"Bench Return Contribution",
      "下层基准收益贡献":"Child Bench Return Contribution",
      "当前维度基准占上层权重":"NodeWbHts",
      "当前维度基准收益率":"NodeRbHts",
      "当前维度内个券基准收益率序列":"NodeRbHtsSd",
      "上层维度基准累计收益率":"ParentRbCumHts",
      "上层维度基准收益率":"ParentRbHts",
      "上层维度内个券基准收益率序列":"ParentRbHtsSd",
      "上层维度成本":"ParentCostHts",
      "组合维度资产配置组合累计收益率":"RootRaaCumHts",
      "组合维度资产配置组合收益率":"RootRaaHts",
      "第一层维度占组合成本权重":"FirstDimWpHts",
      "第一层维度成本":"FirstDimCostHts",
      "第一层维度上日市值":"FirstDimLsMvHts",
      "第一层维度买入":"FirstDimBuyHts",
      "第一层维度净流入":"FirstDimNetFlowHts",
      "第一层维度卖出":"FirstDimSellHts",
      "第一层维度分红付息":"FirstDimGiveHts",
      "第一层维度基准收益率":"FirstDimRbHts",
      "第一层维度内个券基准收益率序列":"FirstDimRbHtsSd",
      "第一层维度内个券基准权重序列":"FirstDimBenchOwHtsPd",
      "超额收益贡献":"Excess Return Contribution",
      "下层超额收益贡献":"Child Excess Return Contribution",
      "配置收益贡献":"Asset Allocation Return Contribution",
      "下层配置收益贡献":"Child Asset Allocation Return Contribution",
      "资产配置组合收益贡献":"Q2Contribution",
      "上层维度资产配置组合累计收益率":"ParentRaaCumHts",
      "上层维度资产配置组合收益率":"ParentRaaHts",
      "当前层所有维度占上层成本权重":"CurrentLayerWpHts",
      "当前层所有维度成本":"CurrentLayerCostHts",
      "当前层所有维度上日市值":"CurrentLayerLsMvHts",
      "当前层所有维度买入":"CurrentLayerBuyHts",
      "当前层所有维度净流入":"CurrentLayerNetFlowHts",
      "当前层所有维度卖出":"CurrentLayerSellHts",
      "当前层所有维度分红付息":"CurrentLayerGiveHts",
      "当前层所有维度基准收益率":"CurrentLayerRbHts",
      "当前层所有维度内个券基准收益率序列":"CurrentLayerRbHtsSd",
      "当前层所有维度内个券基准权重序列":"CurrentLayerBenchOwHtsPd",
      "选择收益贡献":"Stock Selection Return Contribution",
      "下层选择收益贡献":"Child Stock Selection Return Contribution",
      "资产选择组合收益贡献":"Q3Contribution",
      "当前维度组合收益率(替换0成本)":"NodeReplacedRpHts",
      "上层维度资产选择组合累计收益率":"ParentRssCumHts",
      "上层维度资产选择组合收益率":"ParentRssHts",
      "当前层所有维度基准占上层权重":"CurrentLayerWbHts",
      "当前层所有维度基准权重序列":"CurrentLayerBenchOwHts",
      "当前层所有维度组合收益率(替换0成本)":"CurrentLayerReplacedRpHts",
      "当前层所有维度收益金额":"CurrentLayerDimRpAmountHts",
      "当前层所有维度当日市值":"CurrentLayerMvHts",
      "当前层所有维度新股收益金额":"CurrentLayerNewStockAmountHts",
      "当前层所有维度汇兑损益金额":"CurrentLayerExchangeAmountHts",
      "当前层所有维度其他收益金额":"CurrentLayerOtherAmountHts",
      "交互收益贡献":"Interaction Return Contribution",
      "下层交互收益贡献":"Child Interaction Return Contribution",
      "调整配置收益贡献":"Adjust Asset Allocation Return Contribution",
      "下层调整配置收益贡献":"Child Adjust Asset Allocation Return Contribution",
      "调整收益贡献":"AdjustContribution",
      "当前维度组合和基准权重差":"NodeWpbDiffHts",
      "调整交互收益贡献":"Adjust Interaction Return Contribution",
      "下层调整交互收益贡献":"Child Adjust Interaction Return Contribution",
      "组合维度当日市值":"RootDimMvHts",
      }
      `,
      conditionMap:
        localStorage.getItem('conditionMap') ||
        `
      {
        某维度: 'level>1',
        组合: 'level==1',
        上层不是组合维度: 'level>1',
        上层是组合维度: 'level==1',
        维度层买卖分离: 'COSTCALCULATION==1||COSTCALCULATION==3',
        维度层净流入: 'COSTCALCULATION==2',
        维度层上日市值: 'COSTCALCULATION==4',
        组合层买卖分离: 'COSTCALCULATION==3',
        组合层净流入: 'COSTCALCULATION==1||COSTCALCULATION==2||COSTCALCULATION==4'
      }
      `,
      result: ''
    };
  },
  methods: {
    /** @param {string} content */
    run(content) {
      const createNode = name => {
        let dataKind = '';
        if (dataKindMap[name]) {
          dataKind = dataKindMap[name];
        } else {
          console.error('名称: ' + name + ' 没有对应的映射!');
        }

        return {
          cons_name: name,
          cons_kind: dataKind,
          children: []
        };
      };

      const conditionMap = new Function(
        '',
        'return ' + this.conditionMap.trim()
      )();
      const dataKindMap = new Function(
        '',
        'return ' + this.dataKindMap.trim()
      )();

      const root = createNode('');

      const stack = [root];

      content.split('\n').forEach(v => {
        if (!v) {
          return;
        }
        const dash = v.match(/^[ \t]*-/)?.[0] ?? '';
        const line = (
          dash.replace('-', '    ') + v.substring(dash.length)
        ).replace(/#|\t/g, ' ');

        const depth = line.match(/^ *[^ ]/g)[0].length - 2;
        if (depth < 0) {
          return;
        }

        const text = line.trim();
        while (stack.length > depth) {
          stack.pop();
        }
        const top = stack[stack.length - 1];

        let node;
        if (conditionMap[text]) {
          if (!top.cond) {
            top.cond = {};
          }
          node = { children: [] };
          top.cond[conditionMap[text]] = node;
          stack.push(node);
        } else {
          node = createNode(text);
          top.children.push(node);
          stack.push(node);
        }

        if (
          [
            'RiskFreeYieldHts',
            'BenchElemWeightHtsMnl',
            'BenchElemYieldHtsMnl'
          ].includes(node.cons_kind)
        ) {
          node.no_target_id = '1';
        }
      });

      this.result = JSON.stringify(root.children[0], null, 2);
    },
    download() {
      const url = window.URL.createObjectURL(new Blob([this.result]));
      const link = document.createElement('a');
      link.style.display = 'none';
      link.href = url;
      link.setAttribute('download', this.filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
    },
    clear() {
      localStorage.removeItem('conditionMap');
      localStorage.removeItem('dataKindMap');
    }
  },
  mounted() {
    /** @type {HTMLInputElement} */
    const input = this.$refs.input;
    input.addEventListener('change', () => {
      console.log(input.files);

      localStorage.setItem('conditionMap', this.conditionMap);
      localStorage.setItem('dataKindMap', this.dataKindMap);
      const filenames = input.files[0].name.split('.');
      filenames.pop();
      this.filename = filenames.join('.') + '.json';
      const fr = new FileReader();
      fr.readAsText(input.files[0]);
      fr.onloadend = () => {
        input.value = '';

        this.run(fr.result);
      };
    });
  }
};
</script>
