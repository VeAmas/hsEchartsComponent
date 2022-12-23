# FaisTransferList

要使用请先按照依赖 `"vue-virtual-scroll-list": "2.3.4"`

### props

(◽ 表示 h-transfer 存在该属性)

| 属性                 | 类型                                                                                              | 默认值                                             | 备注                                                                                                                                                           |
| -------------------- | ------------------------------------------------------------------------------------------------- | -------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| type (未实现)        | `'list' \| 'table' \| ('list' \| 'table')[] `                                                     | `'list'`                                           | 控制内容部分展示成列表还是表格 <span style="color: #d789c2">(支持传入数组分别控制左右列表)</span>                                                              |
| itemHeight           | `number \| number[]`                                                                              | `24`                                               | 控制列表每一项的高度 <span style="color: #d789c2">(支持传入数组分别控制左右列表)</span>                                                                        |
| keyProp              | `string`                                                                                          | `key`                                              | 作为 key 的字段                                                                                                                                                |
| titleProp            | `string`                                                                                          | `label`                                            | 作为 label 的字段                                                                                                                                              |
| listWidth            | `number \| number[]`                                                                              | `180`                                              | 列表的宽度 <span style="color: #d789c2">(支持传入数组分别控制左右列表)</span> <br/> 当在抽屉中使用时，这个值会作为 `flex-basis` 使用，实际宽度由抽屉宽度决定。 |
| data ◽              | `object[]`                                                                                        | `[] `                                              | 数据源，其中的数据将会被渲染到左边一栏中，`targetKeys` 中指定的除外。                                                                                          |
| targetKeys ◽        | `string[]`                                                                                        | `[]`                                               | 设置哪些项应该被选中                                                                                                                                           |
| renderFormat ◽      | `(h: CreateElement, data: any: index: number) => VNode \| string`                                 |                                                    | 每行数据渲染函数，该函数的入参为 `data` 中的项，返回一个 `VNode` 或 `string`                                                                                   |
| selectedKeys ◽      | `string[]`                                                                                        | `[]`                                               | 设置哪些项应该被选中                                                                                                                                           |
| listStyle ◽         | `string \| object`                                                                                |                                                    | 两个穿梭框的自定义样式                                                                                                                                         |
| titles ◽            | `(string \| Function)[]`                                                                          | `['源列表', '目的列表']`                           | 标题集合，顺序从左至右 (可以是 render 函数)                                                                                                                    |
| btns                 | `('right' \| 'left' \| 'rightAll' \| 'leftAll')[]`                                                | `['right', 'left', 'rightAll', 'leftAll']`         | 中间按钮的组合顺序(从上至下) <br/> (right: 选中项右移, left: 选中项左移, rightAll: 全部右移, leftAll: 全部左移)                                                |
| operations ◽        | `string[]`                                                                                        |                                                    | 操作文案集合，顺序与 `btns` 属性一致                                                                                                                           |
| filterable ◽        | `boolean \| boolean[]`                                                                            | `false`                                            | 是否显示搜索框 <span style="color: #d789c2">(支持传入数组分别控制左右列表)</span>                                                                              |
| filterPlaceholder ◽ | `string \| string[]`                                                                              | `'请输入搜索内容'`                                 | 搜索框的占位 <span style="color: #d789c2">(支持传入数组分别控制左右列表)</span>                                                                                |
| filterIcon           | `string \| string[]`                                                                              |                                                    | 搜索框的按钮图标 <span style="color: #d789c2">(支持传入数组分别控制左右列表)</span>                                                                            |
| filterMethod ◽      | `(data: object, query: string) => boolean`<br/> `\| ((data: object, query: string) => boolean)[]` | 默认搜索 label                                     | 自定义搜索函数，入参为 data 和 query，data 为项，query 为当前输入的搜索词 <span style="color: #d789c2">(支持传入数组分别控制左右列表)</span>                   |
| notFoundText ◽      | `string \| string[]`                                                                              | `'无匹配内容'`                                     | 当搜索为空时显示的内容 <span style="color: #d789c2">(支持传入数组分别控制左右列表)</span>                                                                      |
| notFoundData ◽      | `string \| string[]`                                                                              | `'列表为空'`                                       | 当列表为空时显示的内容 <span style="color: #d789c2">(支持传入数组分别控制左右列表)</span>                                                                      |
| showTitle ◽         | `boolean \| boolean[]`                                                                            | `false`                                            | 是否显示鼠标悬浮 title 文本，仅当 `renderFormat` 为空或者 `renderFormat` 返回字符串时生效 <span style="color: #d789c2">(支持传入数组分别控制左右列表)</span>   |
| renderTitle ◽       | `(data: object) => string \| ((data: object) => string)[]`                                        |                                                    | 自定义鼠标悬浮 title 文本 (仅当 showTitle=true 时生效) <span style="color: #d789c2">(支持传入数组分别控制左右列表)</span>                                      |
| retain (未实现)      | `boolean`                                                                                         | `false`                                            | 移动后 左侧数据是否保留移动后的数据                                                                                                                            |
| fixOrder (未实现)    | `boolean`                                                                                         | `false`                                            | 移动后 是否保持原来的顺序不变 (此时不再显示拖拽按钮)                                                                                                           |
| draggable            | `boolean \| boolean[]`                                                                            | `true`                                             | 是否可以拖拽来修改数据排序 <span style="color: #d789c2">(支持传入数组分别控制左右列表)</span>                                                                  |
| dragIcon             | `string \| string[]`                                                                              | `icon-fk50- icon-fk50-tongyong-wangzhan-tuozhuai1` | 拖拽按钮的 `class` 名称，不传则整体拖拽 <span style="color: #d789c2">(支持传入数组分别控制左右列表)</span>                                                     |
| alwaysShowHandle     | `boolean \| boolean[]`                                                                            | `true`                                             | 拖拽按钮是否常亮 <span style="color: #d789c2">(支持传入数组分别控制左右列表)</span>                                                                            |

### event

| 事件名称         | 参数                                                                       | 备注                                                                        |
| ---------------- | -------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| @on-change       | `(targetKeys: string[], direction: 'left' \| 'right', moveKeys: string[])` | 选项在两栏之间转移时的回调函数 (仅单独使用时响应)                           |
| @on-left-drag    | `(data: object[])`                                                         | 右侧拖拽改变顺序后的回调函数，并返回改变后右侧对应的数据 (仅单独使用时响应) |
| @on-right-drag   | `(data: object[])`                                                         | 左侧拖拽改变顺序后的回调函数，并返回改变后左侧对应的数据 (仅单独使用时响应) |
| @on-double-click | `(data: { item: object (当前点击的节点); direcPanel: 'left' \| 'right' })` | 双击节点时触发 (仅单独使用时响应)                                           |

### method

| 方法名称        | 参数                                                                                                                                                                                                                                                                                                                     | 备注                                                        |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------- |
| getTargetData   | -                                                                                                                                                                                                                                                                                                                        | 手动获取组件的值                                            |
| moveToByOutside | `(` <br/> <span style="margin-right: 24px"></span>` direction: 'left' \| 'right', // 移动方向` <br/> <span style="margin-right: 24px"></span> ` key: number \| string \| (number \| string)[], // 移动项目的key` <br/> <span style="margin-right: 24px"></span> ` disableMoved: boolean // 是否移动禁用的项目` <br/> `)` | 外部调用该方法，控制节点去指定的面板 (返回是否有项目移动了) |

### slot

| 名称 | 备注                |
| ---- | ------------------- |
| btns | 中间按钮部分的 slot |

## 带抽屉使用

### 基本用法

```js
import FaisTransferList from '@fais/tzjc-comps/UiComps/FaisTransferList';
export default {
  components: {
    FaisTransferListDrawer: FaisTransferList,
    FaisTransferList: FaisTransferList.TransferList
  }
};
```

```template?{"height":"400"};
<div class="f-p-12">
  <a @click="showDrawer = true"> 打开抽屉 </a> <br/>
  <a @click="data = getMockData(50000)"> 点我变成5w条数据 </a>
  <FaisTransferListDrawer
    v-model="showDrawer"
    filterable
    showTitle
    width="642px"
    :listWidth="[200, 400]"
    title="组合选择器"
    :data="data"
    :target-keys="targetKeys"
    @on-confirm="onConfirm"
  ></FaisTransferListDrawer>
</div>
```

```script
{
  data() {
    return {
      showDrawer: false,
      data: this.getMockData(),
      targetKeys: this.getTargetKeys()
    };
  },
  methods: {
    getMockData(n = 20) {
      let mockData = [];
      for (let i = 1; i <= n; i++) {
        mockData.push({
          key: i.toString(),
          label: "内容" + i,
          description: "内容" + i + "的描述信息",
          disabled: Math.random() * 3 < 1,
        });
      }
      return mockData;
    },
    getTargetKeys() {
      return this.getMockData()
        .filter(() => Math.random() * 2 > 1)
        .map((item) => item.key);
    },
    onConfirm({targetKeys}) {
      this.targetKeys = targetKeys
    }
  },
};
```

<br/>
<br/>
<br/>
<br/>

## 单独使用

### 基本用法

```template?{"height":"400"};
<div class="f-p-12">
  <FaisTransferList
    :data="data"
    showTitle
    filterable
    :target-keys="targetKeys"
  ></FaisTransferList>
</div>
```

```script
{
  data() {
    return {
      data: this.getMockData(),
      targetKeys: this.getTargetKeys()
    };
  },
  methods: {
    getMockData() {
      let mockData = [];
      for (let i = 1; i <= 20; i++) {
        mockData.push({
          key: i.toString(),
          label: "内容" + i,
          description: "内容" + i + "的描述信息",
          disabled: Math.random() * 3 < 1,
        });
      }
      return mockData;
    },
    getTargetKeys() {
      return this.getMockData()
        .filter(() => Math.random() * 2 > 1)
        .map((item) => item.key);
    }
  },
};
```

### 调整组件尺寸

通过 `listWidth` 调整列表的尺寸, 通过 `height` 样式来跳转组件的高度。  
`listWidth` 传入数组可以分别调整左右列表的宽度。

```template?{"height":"400"};
<div class="f-p-12">
  <FaisTransferList
    listWidth="240"
    style="height: 300px"
    :data="data"
  ></FaisTransferList>
</div>
```

```script
{
  data() {
    return {
      data: new Array(50).fill().map((_, i) => ({
        key: i + '',
        label: '第' + (i + 1) + '条数据'
      })),
    };
  }
};
```

### type

### itemHeight / renderFormat

当 `renderFormat` 返回一个 `VNode` 的时候,  
需要手动设置 `itemHeight`, 同时需要添加 `f-ellipsis` 类。

```template?{"height":"400"};
<div class="f-p-12">
  <FaisTransferList
    :data="data"
    :renderFormat="renderFormat"
    :itemHeight="40"
    showTitle
  ></FaisTransferList>
</div>
```

```script
{
  data() {
    return {
      data: this.getMockData(),
      renderFormat(h, row, index) {
        return h('div',
        {
          class: 'f-p-6 f-pr-0 f-ellipsis ',
          style: 'height: 40px; '
        },
        [
          h('p', ['第', h('span', {style: row.disabled || 'color: red'}, index), '条数据']),
          h('p', {class: 'f-ellipsis'}, row.label)
        ])
      }
    };
  },
  methods: {
    getMockData() {
      let mockData = [];
      for (let i = 1; i <= 20; i++) {
        mockData.push({
          key: i.toString(),
          label: "内容" + i + ' 特别长的尾巴,特别长的尾巴,特别长的尾巴,特别长的尾巴,特别长的尾巴,特别长的尾巴',
          description: "内容" + i + "的描述信息",
          disabled: Math.random() * 3 < 1,
        });
      }
      return mockData;
    }
  },
};
```

当`renderFormat` 返回 `string` 的时候, 则不需要提供 `itemHeight` 或指定 `f-ellipsis` 类。

```template?{"height":"400"};
<div class="f-p-12">
  <FaisTransferList
    showTitle
    :data="data"
    :renderFormat="renderFormat"
  ></FaisTransferList>
</div>
```

```script
{
  data() {
    return {
      data: this.getMockData(),
      renderFormat(h, row, index) {
        return `第 ${index} 条数据 -- ` + row.label
      }
    };
  },
  methods: {
    getMockData() {
      let mockData = [];
      for (let i = 1; i <= 20; i++) {
        mockData.push({
          key: i.toString(),
          label: "内容" + i + ' 特别长的尾巴,特别长的尾巴,特别长的尾巴,特别长的尾巴,特别长的尾巴,特别长的尾巴',
          description: "内容" + i + "的描述信息",
          disabled: Math.random() * 3 < 1,
        });
      }
      return mockData;
    }
  },
};
```

### selectedKeys

`selectedKeys` 中的选项会被勾选中, 无论在左侧还是右侧

```template?{"height":"400"};
<div class="f-p-12">
  <FaisTransferList
    style="height: 300px"
    :data="data"
    :targetKeys="['1', '2']"
    :selectedKeys="selectedKeys"
  ></FaisTransferList>
</div>
```

```script
{
  data() {
    return {
      data: new Array(50).fill().map((_, i) => ({
        key: i + '',
        label: '第' + (i + 1) + '条数据'
      })),
      selectedKeys : new Array(20).fill().map((_, i) => i + '')
    };
  }
};
```

### listStyle

用来控制列表的样式，不包括标题部分，不是很常用

```template?{"height":"400"};
<div class="f-p-12">
  <FaisTransferList listStyle="backgroundColor: antiquewhite" :data="data"></FaisTransferList>
  <br/>
  <FaisTransferList :listStyle="{backgroundColor: 'khaki'}" :data="data"></FaisTransferList>
</div>
```

```script
{
  data() {
    return {
      data: new Array(50).fill().map((_, i) => ({
        key: i + '',
        label: '第' + (i + 1) + '条数据'
      })),
    };
  }
};
```

### titles

标题的文字, 可以是 render 函数

```template?{"height":"400"};
<div class="f-p-12">
  <FaisTransferList :titles="titles1" :data="data"></FaisTransferList>
  <br/>
  <FaisTransferList :titles="titles2" :data="data"></FaisTransferList>
</div>
```

```script
{
  data() {
    return {
      data: new Array(50).fill().map((_, i) => ({
        key: i + '',
        label: '第' + (i + 1) + '条数据'
      })),
      titles1: ['左侧标题', '右侧标题 很长后面点点点点点点点点点点点点点点点点点点'],
      titles2: [
        (h) =>
          h('span', { class: 'f-fw-700' }, [
            h('h-tooltip', { props: {content: '我是提示信息', placement: 'top' } }, [
              h('h-icon', { props: { name: 'ios-information' } })
            ]),
            '左侧标题'
          ]),
        (h) =>
          h('span', { class: 'f-fw-700' }, [
            h('h-tooltip', { props: {content: '我是提示信息', placement: 'top' } }, [
              h('h-icon', { props: { name: 'ios-information' } })
            ]),
            '右侧很长的标题右侧很长的标题右侧很长的标题右侧很长的标题'
          ])
      ]
    };
  }
};
```

### btns / operations

`btns` 是中间按钮的组合顺序  
`right`: 选中项右移, `left`: 选中项左移, `rightAll`: 全部右移, `leftAll`: 全部左移  
(可以是其中的部分按钮)  
`operations` 为 btns 对应按钮的文字 为空时显示对应的符号

```template?{"height":"400"};
<div class="f-p-12">
  <FaisTransferList :btns="btns" :operations="operations" :data="data"></FaisTransferList>
</div>
```

```script
{
  data() {
    return {
      data: new Array(50).fill().map((_, i) => ({
        key: i + '',
        label: '第' + (i + 1) + '条数据'
      })),
      btns: ['left', 'right'],
      operations: ['向左👈', '']
    };
  }
};
```

### btns-slot

当需要给中间按钮添加一些特殊逻辑的时候, 可以使用 `btns` 这个 slot  
该 slot 会传入一个 slot-scope, 用于获取和调用组件的方法。
`scope` 是 FaisTransferList 的实例, 可以使用以下属性和方法

| 名称            | 属性/方法 | 备注                 |
| --------------- | --------- | -------------------- |
| leftCheckedNum  | 属性      | 左侧选中数量         |
| rightCheckedNum | 属性      | 右侧选中数量         |
| leftData        | 属性      | 左侧所有数据(筛选前) |
| rightData       | 属性      | 右侧所有数据(筛选前) |
| toLeft          | 方法      | 移动到左边           |
| toRight         | 方法      | 移动到右边           |
| toLeftAll       | 方法      | 全部移动到左边       |
| toRightAll      | 方法      | 全部移动到右边       |

```template?{"height":"400"};
<div class="f-p-12">
  <h3 class="theme-text-danger">右侧最多选择5个</h3>
  <FaisTransferList :data="data">
    <template #btns="{ scope }">
      <div>
        <h-button
          v-if="scope.leftCheckedNum + scope.rightData.length <= 5"
          :disabled="scope.leftCheckedNum <= 0"
          class="f-db fais-transfer-list__btn"
          @click="scope.toRight"
        >
          <h-icon name="enter"></h-icon>
        </h-button>
        <h-tooltip
          v-else
          content="最多选择5个"
          placement="top"
          class="f-mb-6"
        >
          <h-button disabled class="f-db fais-transfer-list__btn">
            <h-icon name="enter"></h-icon>
          </h-button>
        </h-tooltip>

        <h-button
          :disabled="scope.rightCheckedNum <= 0"
          class="f-db fais-transfer-list__btn"
          @click="scope.toLeft"
        >
          <h-icon name="return"></h-icon>
        </h-button>
      </div>
    </template>
  </FaisTransferList>
</div>
```

```script
{
  data() {
    return {
      data: new Array(50).fill().map((_, i) => ({
        key: i + '',
        label: '第' + (i + 1) + '条数据'
      }))
    };
  }
};
```

### filterPlaceholder / filterIcon / filterMethod

`filterPlaceholder` 是搜索框的占位  
`filterIcon` 是搜索框的按钮图标 (只能填 hui 标准 icon)  
`filterMethod` 是搜索的方法，默认方法只搜索 label，不过滤空字符串。

```template?{"height":"400"};
<div class="f-p-12">
  <FaisTransferList
    :data="data"
    filterable
    :filterIcon="filterIcon"
    :filterPlaceholder="filterPlaceholder"
    :filterMethod="filterMethod"
  ></FaisTransferList>
</div>
```

```script
{
  data() {
    return {
      data: new Array(10).fill().map((_, i) => ({
        key: i + '',
        id: (i + 1) + '',
        label: '第00' + (i + 1) + '条数据'
      })),
      filterPlaceholder: ['左侧placeholder', '右侧placeholder'],
      filterIcon: ['headphone', 'social-youtube-outline'],
      filterMethod: [
        (data, query) => data.id.includes(query)
        /** 数组第二位不填就是用默认搜索 */
      ]
    };
  }
};
```

### notFoundText / notFoundData

`notFoundText` 是当搜索为空时显示的内容  
`notFoundData` 是当列表为空时显示的内容 (列表为空且搜索的情况下显示 `notFoundData` 的内容)

```template?{"height":"400"};
<div class="f-p-12">
  <FaisTransferList
    :data="data"
    filterable
    notFoundText="搜不到"
    notFoundData="没数据"
  ></FaisTransferList>
</div>
```

```script
{
  data() {
    return {
      data: new Array(10).fill().map((_, i) => ({
        key: i + '',
        id: (i + 1) + '',
        label: '第00' + (i + 1) + '条数据'
      }))
    };
  }
};
```

### renderTitle

是否渲染需要自定义的 title  
renderTitle 的参数为每一行的数据
若不提供 renderTitle，且 showTitle 为 true

- 若 `renderFormat` 为空或者 `renderFormat` 的结果是字符串 则 title 为该行的值
- 若 `renderFormat` 的结果是 `VNode` 则 title 为 `label` 字段

```template?{"height":"400"};
<div class="f-p-12">
  <FaisTransferList
    :data="data"
    showTitle
    :renderTitle="renderTitle"
  ></FaisTransferList>
</div>
```

```script
{
  data() {
    return {
      data: new Array(10).fill().map((_, i) => ({
        key: i + '',
        id: (i + 1) + '',
        label: '第00' + (i + 1) + '条数据'
      })),
      renderTitle(data) {
        return data.id + ' title'
      }
    };
  }
};
```

### draggable / dragIcon

`draggable` 控制条目是否可以拖拽  
`alwaysShowHandle` 控制是否一直显示把手，若为 `false` 则只有在鼠标 hover 时显示把手  
`dragIcon` 则控制拖拽把手的图标 class, 为空时则整体拖拽

```html
<!-- 把手部分的class是这样使用的 -->
<i class="{dragIcon}"></i>
```

```template?{"height":"400"};
<div class="f-p-12">
  <h3 class="theme-text-danger">左侧替换图标(不常亮), 右侧整体拖拽</h3>
  <FaisTransferList :data="data" :dragIcon="dragIcon" :alwaysShowHandle="false"></FaisTransferList>

  <br />
  <h3 class="theme-text-danger">左侧不可拖拽:</h3>
  <FaisTransferList :data="data" :draggable="[false, true]"></FaisTransferList>
</div>
```

```script
{
  data() {
    return {
      data: new Array(10).fill().map((_, i) => ({
        key: i + '',
        id: (i + 1) + '',
        label: '第00' + (i + 1) + '条数据'
      })),
      dragIcon: ['icon iconfont icon-social-usd', '']
    };
  }
};
```

### 事件

以下事件在与抽屉同时使用时不响应

```template?{"height":"545"};
<div class="f-p-12">
  <FaisTransferList
    :data="data"
    @on-change="onChange"
    @on-left-drag="onLeftDrag"
    @on-right-drag="onRightDrag"
    @on-double-click="onDoubleClick"
  ></FaisTransferList>

  <h-button @click="logs = ''">清空日志</h-button>
  <div style="height: 250px; overflow: auto">
    <pre>{{logs}}</pre>
  </div>
</div>
```

```script
{
  data() {
    return {
      logs: '',
      data: new Array(10).fill().map((_, i) => ({
        key: i + '',
        label: '第' + (i + 1) + '条数据'
      }))
    };
  },
  methods: {
    onChange(targetKeys, direction, moveKeys) {
      this.logs += `\n--onChange      targetKeys: ${targetKeys} direction: ${direction} moveKeys: ${moveKeys}`
    },
    onLeftDrag(list) {
      this.logs += `\n--onLeftDrag    list: ${JSON.stringify(list)}`

    },
    onRightDrag(list) {
      this.logs += `\n--onRightDrag   list: ${JSON.stringify(list)}`

    },
    onDoubleClick(item) {
      this.logs += `\n--onDoubleClick list: ${JSON.stringify(item)}`
    },
  }
};
```
