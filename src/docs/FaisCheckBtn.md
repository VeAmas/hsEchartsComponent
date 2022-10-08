# FaisCheckBtnGroup

| 属性             | 类型                                                             | 默认值      | 备注                                                                                                                     |
| ---------------- | ---------------------------------------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------ |
| trackIdPrefix          | `string`                                                         | -           | 埋点 目前只有对于点击事件的埋点，若 trackIdPrefix 为`indexCenter.topPage`时，最后触发路径为 `indexCenter.topPage.FaisCheckBtn` |
| readonly         | `boolean`                                                        | -           | 是否只读,查看模式使用 , group 禁用则子组件强制禁用                                                                       |
| disabled         | `boolean`                                                        | -           | 是否禁用, group 只读则子组件强制只读                                                                                     |
| tabindex         | `number`                                                         | -1          | 不为空时可以通过 tab 来 focus                                                                                            |
| value            | `string[] \| number[] \| string`                                 | -           | v-model 值, isString 时为 string 类型                                                                                    |
| needLeader       | `boolean`                                                        | false       | 是否显示最左侧的「不限」按钮                                                                                             |
| leaderValue      | `string \| number`                                               | -           | 「不限」按钮被选中时的值                                                                                                 |
| leaderText       | `string`                                                         | '不限'      | 「不限」按钮的文字                                                                                                       |
| leaderType       | `'exclusive' \| 'strictly'`                                      | 'exclusive' | 「不限」按钮的操作逻辑                                                                                                   |
| leaderCanUncheck | `boolean`                                                        | false       | 'exclusive'模式下,「不限」按钮的是否可以取消选中 (leaderValue 不能为空)                                                  |
| leaderPlacement  | `'start' \| 'end'`                                               | 'start'     | 「不限」按钮的位置                                                                                                       |
| reclickTrigger   | `boolean`                                                        | false       | 「不限」按钮重复点击时是否会触发@input 和@on-change                                                                      |
| type             | `'info' \| 'success' \| 'warning' \| 'danger'`                   | -           | 子组件的颜色                                                                                                             |
| icon             | `string`                                                         | -           | 右上角的图标                                                                                                             |
| options          | `{label: string; value: string \| number; disabled?: boolean}[]` | -           | 内部的子组件数组 这个值不为空时会忽略 slot。 label:子组件文字 value: 选中时的值 disabled: 是否禁用                       |
| size             | `'small' \| 'large'`                                             | -           | 组件尺寸                                                                                                                 |
| isString         | `boolean`                                                        | false       | 将多选时双向绑定的变量的格式变为`string`类型，多个选项用','隔开                                                          |

| 事件名称   | 参数                                      | 备注                                                     |
| ---------- | ----------------------------------------- | -------------------------------------------------------- |
| @input     | `(value: string[] \| number[] \| string)` | 组件值发生变化时触发                                     |
| @on-change | `(value: string[] \| number[] \| string)` | 组件值发生变化时触发                                     |
| @on-blur   | `(index: number)`                         | 当子组件 blur 时触发，会返回第几个组件触发了 blur 事件   |
| @on-focus  | `(index: number)`                         | 当子组件 focus 时触发，会返回第几个组件触发了 focus 事件 |

| 方法名称 | 参数               | 备注                       |
| -------- | ------------------ | -------------------------- |
| checkAll | `(check: boolean)` | 全选/全不选 会触发响应事件 |

# FaisCheckBtn

| 属性             | 类型                                     | 默认值  | 备注                                                                                                                                                                                 |
| ---------------- | ---------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| trackIdPrefix          | `string`                                 | -       | 埋点 目前只有对于点击事件的埋点，若 trackIdPrefix 为`indexCenter.topPage`时，最后触发路径为 `indexCenter.topPage.FaisCheckBtn`。<br /> 若外层有 FaisCheckBtnGroup 的时候，子组件的埋点失效 |
| tabindex         | `number`                                 | -1      | 不为空时可以通过 tab 来 focus                                                                                                                                                        |
| value            | `any`                                    | -       | v-model 值, 会根据 trueValue 来变化                                                                                                                                                  |
| trueValue        | `string\|number\|boolean`                | true    | 选中时的值，当使用类似 1 和 0 来判断是否选中时会很有用                                                                                                                               |
| falseValue       | `string\|number\|boolean`                | false   | 未选时的值，当使用类似 1 和 0 来判断是否选中时会很有用                                                                                                                               |
| readonly         | `boolean`                                | false   | 是否只读,查看模式使用                                                                                                                                                                |
| disabled         | `boolean`                                | false   | 是否禁用                                                                                                                                                                             |
| type             | `'info'\|'success'\|'warning'\|'danger'` | 'info'  | 子组件的颜色                                                                                                                                                                         |
| icon             | `string`                                 | 'right' | 右上角的图标                                                                                                                                                                         |
| size             | `'small'\|'large'`                       | 'small' | 组件尺寸                                                                                                                                                                             |
| emitUnknownValue | `boolean`                                | false   | 当 value 不为 trueValue 或 falseValue 的时候 是否会触发 input 事件 返回 falseValue                                                                                                   |

| 事件名称   | 参数                               | 备注                  |
| ---------- | ---------------------------------- | --------------------- |
| @on-blur   | -                                  | 当子组件 blur 时触发  |
| @on-focus  | -                                  | 当子组件 focus 时触发 |
| @input     | `(value: string\|number\|boolean)` | 组件值发生变化时触发  |
| @on-change | `(value: string\|number\|boolean)` | 组件值发生变化时触发  |

# FaisCheckBtnGroup

## trackIdPrefix

```template?{"height":"400"};
<div class="f-p-12">
  <p>请在控制台查看接口调用情况</p>
  <FaisCheckBtnGroup v-model="value1" trackIdPrefix="test1">
    <FaisCheckBtn trueValue="n1" trackIdPrefix="test2">第一项</FaisCheckBtn>
    <FaisCheckBtn trueValue="n2">第二项</FaisCheckBtn>
  </FaisCheckBtnGroup>
  <br/>
  <small> 在group内部的FaisCheckBtn的埋点是不起作用的 </small>
</div>
```

```script
{
  data() {
    return {
      value1: undefined
    }
  }
}
/* track的配置: 
export default {
  fais: {
    test1:{ FaisCheckBtn: 'fais-test1-FaisCheckBtn' },
    test2:{ FaisCheckBtn: 'fais-test2-FaisCheckBtn' }
  }
}
*/
```

## group 的取值

```template?{"height":"400"};
<div class="f-p-12">
  <p>使用插槽的方式 (每一个FaisCheckBtn的trueValue会作为v-model的值)</p>
  <FaisCheckBtnGroup v-model="value1">
    <FaisCheckBtn trueValue="n1">第一项</FaisCheckBtn>
    <FaisCheckBtn trueValue="n2">第二项</FaisCheckBtn>
  </FaisCheckBtnGroup>
  <br/>

  <p>使用options的方式 (options每一项的value值会作为v-model的值)</p>
  <FaisCheckBtnGroup v-model="value2" :options="options">
  </FaisCheckBtnGroup>
  <br/>

  第一个v-model的值: {{ value1 }} <br/>
  第二个v-model的值: {{ value2 }}
</div>
```

```script
{
  data() {
    return {
      value1: undefined,
      value2: undefined,
      options: [{
        value: 'x1',
        label: '第一项'
      }, {
        value: 'x2',
        label: '第二项'
      }]
    }
  }
}
```

## tabindex / type / icon

```template?{"height":"400"};
<h-form class="f-p-12">
  <h-form-item label="group的type" class="f-mb-6">
    <h-radio-group v-model="groupType" type="button" size="small">
      <h-radio label="info"></h-radio>
      <h-radio label="success"></h-radio>
      <h-radio label="warn"></h-radio>
      <h-radio label="danger"></h-radio>
      <h-radio label="">不设置</h-radio>
    </h-radio-group>
  </h-form-item>
  <h-form-item label="group的icon" class="f-mb-6">
    <h-radio-group v-model="groupIcon" type="button" size="small">
      <h-radio label="right"></h-radio>
      <h-radio label="android-add"></h-radio>
      <h-radio label="warning"></h-radio>
      <h-radio label="android-close"></h-radio>
      <h-radio label="">不设置</h-radio>
    </h-radio-group>
  </h-form-item>
  <h-form-item label="group的tabindex" class="f-mb-6">
    <h-radio-group v-model="groupTabindex" type="button" size="small">
      <h-radio label="1"></h-radio>
      <h-radio label="">不设置</h-radio>
    </h-radio-group>
  </h-form-item>
  <p>group的tabindex、icon和type会覆盖子组件的tabindex、icon和type</p>

  <FaisCheckBtnGroup v-model="value1" :type="groupType" :icon="groupIcon" :tabindex="+groupTabindex || undefined">
    <FaisCheckBtn
      v-for="(item, index) in types"
      :key="index + '1a'"
      :type="item"
      :icon="icons[index]"
      :trueValue="item"
      :tabindex="tabindexs[index]"
    >
      {{ item }}
    </FaisCheckBtn>
  </FaisCheckBtnGroup>

  当前v-model的值: {{ value1 }}
</h-form>
```

```script
{
  data() {
    return {
      value1: [ "info", "success", "warn", "danger" ],
      groupType: undefined,
      groupIcon: undefined,
      groupTabindex: undefined,
      types: ["info", "success", "warn", "danger"],
      icons: [undefined, "android-add", "warning", "android-close"],
      tabindexs: [0, 1, 2, undefined]
    }
  }
}
```

## disabled / readonly

```template?{"height":"400"};
<h-form class="f-p-12">
  <h-form-item label="group的disabled" class="f-mb-6">
    <h-radio-group v-model="groupDisabled" type="button" size="small">
      <h-radio label="true"></h-radio>
      <h-radio label="false"></h-radio>
      <h-radio label="">不设置</h-radio>
    </h-radio-group>
  </h-form-item>
  <h-form-item label="group的readOnly" class="f-mb-6">
    <h-radio-group v-model="groupReadonly" type="button" size="small">
      <h-radio label="true"></h-radio>
      <h-radio label="false"></h-radio>
      <h-radio label="">不设置</h-radio>
    </h-radio-group>
  </h-form-item>
  <p>group的readonly和disabled会覆盖子组件的readonly和disabled</p>

  <FaisCheckBtnGroup v-model="value2" :disabled="toBoolean(groupDisabled)" :readonly="toBoolean(groupReadonly)">
    <FaisCheckBtn
      readonly
      trueValue="readonly"
    >
      readonly
    </FaisCheckBtn>
    <FaisCheckBtn
      disabled
      trueValue="disabled"
    >
      disabled
    </FaisCheckBtn>
  </FaisCheckBtnGroup>

  当前v-model的值: {{ value2 }}
</h-form>
```

```script
{
  data() {
    return {
      value2: ['readonly', 'disabled'],
      groupDisabled: undefined,
      groupReadonly: undefined,
    }
  },
  methods: {
    toBoolean(v) {
      return v === 'true' ? true : v === 'false' ? false : undefined
    }
  }
}
```

## leaderType

```template?{"height":"400"};
<div class="f-p-12">
  <p> 当needLeader为true的时候 就会显示「不限」按钮 </p>
  <p> 「不限」按钮有两种类型 </p>
  <h3> exclusive: </h3>
  <FaisCheckBtnGroup v-model="value1" needLeader leaderType="exclusive">
    <FaisCheckBtn trueValue="n1">第一项</FaisCheckBtn>
    <FaisCheckBtn trueValue="n2">第二项</FaisCheckBtn>
  </FaisCheckBtnGroup>
  <br>
  当前v-model的值: {{ value1 }}
  <br>
  <h3> strictly: </h3>
  <FaisCheckBtnGroup v-model="value2" needLeader leaderType="strictly" leaderText="全部">
    <FaisCheckBtn trueValue="n1">第一项</FaisCheckBtn>
    <FaisCheckBtn trueValue="n2">第二项</FaisCheckBtn>
  </FaisCheckBtnGroup>
  <br>
  当前v-model的值: {{ value2 }}
</div>
```

```script
{
  data() {
    return {
      value1: [],
      value2: [],
    }
  }
}
```

## leaderPlacement

```template?{"height":"400"};
<div class="f-p-12">
  <p> leaderPlacement可以控制「不限」按钮放在前面还是后面 </p>
  <h3> start: </h3>
  <FaisCheckBtnGroup v-model="value1" needLeader leaderPlacement="start">
    <FaisCheckBtn trueValue="n1">第一项</FaisCheckBtn>
    <FaisCheckBtn trueValue="n2">第二项</FaisCheckBtn>
  </FaisCheckBtnGroup>
  <br>
  <h3> end: </h3>
  <FaisCheckBtnGroup v-model="value2" needLeader leaderPlacement="end">
    <FaisCheckBtn trueValue="n1">第一项</FaisCheckBtn>
    <FaisCheckBtn trueValue="n2">第二项</FaisCheckBtn>
  </FaisCheckBtnGroup>
</div>
```

```script
{
  data() {
    return {
      value1: [],
      value2: [],
    }
  }
}
```

## leaderValue / leaderText

```template?{"height":"400"};
<div class="f-p-12">
  <p> leaderValue可以控制「不限」按钮在被选中的情况下的值(仅限exclusive类型) </p>
  <FaisCheckBtnGroup v-model="value1" needLeader :leaderValue="-1">
    <FaisCheckBtn trueValue="n1">第一项</FaisCheckBtn>
    <FaisCheckBtn trueValue="n2">第二项</FaisCheckBtn>
  </FaisCheckBtnGroup>
  <br>
  当前v-model的值: {{ value1 }}
  <br>
  <p> leaderValue可以控制「不限」按钮显示的文字 </p>
  <FaisCheckBtnGroup v-model="value2" needLeader leaderText="其他" leaderPlacement="end">
    <FaisCheckBtn trueValue="n1">第一项</FaisCheckBtn>
    <FaisCheckBtn trueValue="n2">第二项</FaisCheckBtn>
  </FaisCheckBtnGroup>
  <br>
  当前v-model的值: {{ value2 }}
  <br>
</div>
```

```script
{
  data() {
    return {
      value1: [],
      value2: [],
    }
  }
}
```

## leaderCanUncheck

```template?{"height":"400"};
<div class="f-p-12">
  <p> leaderCanUncheck为true的时候, 「不限」按钮可以通过点击自身取消勾选(仅限exclusive类型, 且leaderValue不为空) </p>
  <FaisCheckBtnGroup v-model="value1" needLeader :leaderValue="-1" leaderCanUncheck>
    <FaisCheckBtn trueValue="n1">第一项</FaisCheckBtn>
    <FaisCheckBtn trueValue="n2">第二项</FaisCheckBtn>
  </FaisCheckBtnGroup>
  <br>
  当前v-model的值: {{ value1 }}
</div>
```

```script
{
  data() {
    return {
      value1: []
    }
  }
}
```

## reclickTrigger

```template?{"height":"400"};
<h-form class="f-p-12">
  <p> reclickTrigger为true时 反复点击「不限」按钮会重复触发事件 </p>
  <h-form-item class="f-mb-6" label="reclickTrigger为true">
    <FaisCheckBtnGroup v-model="value1" reclickTrigger needLeader @input="log">
      <FaisCheckBtn trueValue="n1">第一项</FaisCheckBtn>
      <FaisCheckBtn trueValue="n2">第二项</FaisCheckBtn>
    </FaisCheckBtnGroup>
  </h-form-item>
  <h-form-item class="f-mb-6" label="reclickTrigger为false">
    <FaisCheckBtnGroup v-model="value2" needLeader @input="log">
      <FaisCheckBtn trueValue="n1">第一项</FaisCheckBtn>
      <FaisCheckBtn trueValue="n2">第二项</FaisCheckBtn>
    </FaisCheckBtnGroup>
  </h-form-item>
  <br>
  <h-button size="small" @click="logs=''">清空</h-button>

  <br>
  <div v-html="logs"></div>
</h-form>
```

```script
{
  data() {
    return {
      logs: '',
      value1: [],
      value2: []
    }
  },
  methods: {
    log() {
      this.logs+= '触发input' + '<br/>'
    }
  }
}
```

## isString

```template?{"height":"400"};
<div class="f-p-12">
  <p> isString会让v-model绑定的值变为「逗号隔开的字符串」 </p>
  <FaisCheckBtnGroup v-model="value1" needLeader leaderValue="-1" isString>
    <FaisCheckBtn trueValue="n1">第一项</FaisCheckBtn>
    <FaisCheckBtn trueValue="n2">第二项</FaisCheckBtn>
  </FaisCheckBtnGroup>
  <br>
  当前v-model的值: {{ value1 }}
  <br>
  <br>

  <p> 但是请注意 isString为true时要确保所有value相关的值都为string类型 </p>
  <p> 包括leaderValue和CheckBtn的trueValue </p>
  <br>

  <p> leaderValue不为string的情况: </p>
  <FaisCheckBtnGroup v-model="value2" needLeader :leaderValue="-1" isString>
    <FaisCheckBtn trueValue="n1">第一项</FaisCheckBtn>
    <FaisCheckBtn trueValue="n2">第二项</FaisCheckBtn>
  </FaisCheckBtnGroup>
  <br>
  当前v-model的值: {{ value2 }}
  <br>
  <p> trueValue不为string的情况(trueValue转化为String后相等): </p>
  <FaisCheckBtnGroup v-model="value3" needLeader leaderValue="-1" isString>
    <FaisCheckBtn trueValue="1">第一项</FaisCheckBtn>
    <FaisCheckBtn :trueValue="1">第二项</FaisCheckBtn>
  </FaisCheckBtnGroup>
  <br>
  当前v-model的值: {{ value3 }},

  <p> isString为false时(trueValue转化为String后相等): </p>
  <FaisCheckBtnGroup v-model="value4" needLeader leaderValue="-1">
    <FaisCheckBtn trueValue="1">第一项</FaisCheckBtn>
    <FaisCheckBtn :trueValue="1">第二项</FaisCheckBtn>
  </FaisCheckBtnGroup>
  <br>
  当前v-model的值: {{ value4 }}


</div>
```

```script
{
  data() {
    return {
      value1: '-1',
      value2: '-1',
      value3: '-1',
      value4: ['-1'],
    }
  }
}
```

## options

```template?{"height":"400"};
<div class="f-p-12">
  <p> options可以代替slot </p>
  <p> options不为空时,slot将失效 </p>
  <FaisCheckBtnGroup
    v-model="value1"
    needLeader
    leaderValue="-1"
    isString
    :options="options"
  >
  </FaisCheckBtnGroup>
  <br>
  当前v-model的值: {{ value1 }}
  <br>
  <br>


</div>
```

```script
{
  data() {
    return {
      value1: 'n1',
      options: [{
        label: '第一项',
        value: 'n1',
        disabled: true
      }, {
        label: '第二项',
        value: 'n2'
      }]
    }
  }
}
```

## 表单校验

```template?{"height":"400"};
<h-form :model="model" class="f-p-12">
  <p> 组件可以支持表单原生的required属性 (isString为false和true都支持) </p>
  <h-form-item class="f-mb-6" label="我是表单的label" required prop="value1" inline :labelWidth="116">
    <FaisCheckBtnGroup v-model="model.value1" reclickTrigger isString>
      <FaisCheckBtn trueValue="n1">第一项</FaisCheckBtn>
      <FaisCheckBtn trueValue="n2">第二项</FaisCheckBtn>
    </FaisCheckBtnGroup>
  </h-form-item>
  <br>
  当前v-model的值: {{ model.value1 }}

</h-form>
```

```script
{
  data() {
    return {
      model: {
        value1: ''
      }
    }
  }
}
```

## 事件

```template?{"height":"400"};
<div class="f-p-12">
  <p> on-focus和on-blur的参数为ChencBtn的下标(「不限按钮的下标为-1」) </p>
  <FaisCheckBtnGroup
    v-model="value"
    needLeader
    leaderValue="-1"
    :tabindex="12"
    @on-blur="onBlur"
    @on-focus="onFocus"
    @input="input"
    @on-change="onChange"
  >
    <FaisCheckBtn trueValue="n1">第一项</FaisCheckBtn>
    <FaisCheckBtn trueValue="n2">第二项</FaisCheckBtn>
  </FaisCheckBtnGroup>
  <h-button size="small" @click="logs=''">清空</h-button>
  <br/>
  logs:
  <div v-html="logs"></div>
</div>
```

```script
{
  data() {
    return {
      value: [],
      logs: ''
    }
  },
  methods: {
    onBlur(index) {
      this.logs+= 'on-blur:' + index + '<br/>'
    },
    onFocus(index) {
      this.logs+= 'on-focus:' + index + '<br/>'
    },
    input(value) {
      this.logs+= 'input:' + JSON.stringify(value) + '<br/>'
    },
    onChange(value) {
      this.logs+= 'on-change:' + JSON.stringify(value) + '<br/>'
    },
  }
}
```

# FaisCheckBtn 单独使用

## trackIdPrefix

```template?{"height":"400"};
<div class="f-p-12">
  <p>请在控制台查看接口调用情况</p>
  <FaisCheckBtn
    trackIdPrefix="test2"
    v-model="value"
  >
    FaisCheckBtn
  </FaisCheckBtn>
  <br/>
</div>
```

```script
{
  data() {
    return {
      value: undefined
    }
  }
}
/* track的配置: 
export default {
  fais: {
    test2:{ FaisCheckBtn: 'fais-test2-FaisCheckBtn' }
  }
}
*/
```

## type / icon

```template?{"height":"400"};
<div class="f-p-12">
  <span class="f-dib f-tr" style="width: 60px">一般: </span>
  <FaisCheckBtn
    v-for="(item, index) in types"
    :key="index + 'a'"
    v-model="value"
    :tabindex="tabindex"
    :type="item"
    :icon="icons[index]"
    :trueValue="trueValue"
  >
    {{ item }}
  </FaisCheckBtn>

  <br />
  <br />

  <span class="f-dib f-tr" style="width: 60px">只读(查看): </span>
  <FaisCheckBtn
    v-for="(item, index) in types"
    :key="index + 'b'"
    v-model="value"
    readonly
    :tabindex="tabindex"
    :type="item"
    :icon="icons[index]"
    :trueValue="trueValue"
  >
    {{ item }}-readonly
  </FaisCheckBtn>

  <br />
  <br />

  <span class="f-dib f-tr" style="width: 60px">禁用: </span>
  <FaisCheckBtn
    v-for="(item, index) in types"
    :key="index + 'c'"
    v-model="value"
    disabled
    :tabindex="tabindex"
    :type="item"
    :icon="icons[index]"
    :trueValue="trueValue"
  >
    {{ item }}-disabled
  </FaisCheckBtn>

  <br />
  <br />

  当前v-model的值: {{ value }}
</div>
```

```script
{
  data() {
    return {
      value: false,
      trueValue: 'TV',
      tabindex: 0,
      types: ["info", "success", "warn", "danger"],
      icons: [undefined, "android-add", "warning", "android-close"]
    }
  }
}
```

## size

```template?{"height":"400"};
<div class="f-p-12">
  <FaisCheckBtn
    v-model="value1"
    size="small"
  >
    small
  </FaisCheckBtn>
  <FaisCheckBtn
    v-model="value2"
    size="large"
  >
    large
  </FaisCheckBtn>
</div>
```

```script
{
  data() {
    return {
      value1: false,
      value2: false,
    }
  }
}
```

## emitUnknownValue

```template?{"height":"400"};
<div class="f-p-12">
  <FaisCheckBtn
    v-model="value1"
    :falseValue="'FV1'"
    @input="onInput(1)"
  >
    emitUnknownValue=false
  </FaisCheckBtn>
  <FaisCheckBtn
    v-model="value2"
    :falseValue="'FV2'"
    emitUnknownValue
    @input="onInput(2)"
  >
    emitUnknownValue=true
  </FaisCheckBtn>
  <br />
  当前v-model的值 <br />
  value1: {{ value1 }} <br />
  value2: {{ value2 }} <br />
  str: {{str}}
</div>
```

```script
{
  data() {
    return {
      str: '',
      value1: false,
      value2: false,
    }
  },
  methods: {
    onInput(v) {
      this.str += v
    }
  }
}
```

## trueValue / falseValue

```template?{"height":"400"};
<div class="f-p-12">
  <p> trueValue和falseValue可以控制组件被选中时v-model绑定的值 </p>
  trueValue: <h-input size="small" style="width: 200px" v-model="tv" /> <br />
  falseValue: <h-input size="small" style="width: 200px" v-model="fv" /> <br />

  <FaisCheckBtn
    v-model="value"
    :falseValue="fv"
    :trueValue="tv"
  >
    value={{value}}
  </FaisCheckBtn>
</div>
```

```script
{
  data() {
    return {
      value: false,
      tv: 'true',
      fv: 'false'
    }
  }
}
```

## tabindex

```template?{"height":"400"};
<div class="f-p-12">
  focus的组件可以通过点击空格或者回车来切换选中状态
  tabindex:  <br />
  checkBtn1: <h-input size="small" style="width: 50px" v-model="tabindex[0]" /> <br />
  checkBtn2: <h-input size="small" style="width: 50px" v-model="tabindex[1]" /> <br />
  checkBtn3: <h-input size="small" style="width: 50px" v-model="tabindex[2]" /> <br />
  checkBtn4: <h-input size="small" style="width: 50px" v-model="tabindex[3]" /> <br />
  checkBtn5: <h-input size="small" style="width: 50px" v-model="tabindex[4]" /> <br />


  <FaisCheckBtn
    v-for="(item, index) in value"
    :key="index"
    v-model="value[index]"
    :tabindex="tabindex[index]"
  >
    checkBtn{{index + 1}}
  </FaisCheckBtn>
  <br />
  value: {{value}}
</div>
```

```script
{
  data() {
    return {
      value: [false,false,false,false,false],
      tabindex: [100,101,102,103,104]
    }
  }
}
```

## 事件

```template?{"height":"400"};
<div class="f-p-12">
  <FaisCheckBtn
    v-model="value"
    :tabindex="0"
    @on-blur="onBlur"
    @on-focus="onFocus"
    @input="input"
    @on-change="onChange"
  >
    点击
  </FaisCheckBtn>
  <h-button size="small" @click="logs=''">清空</h-button>
  <br/>
  logs:
  <div v-html="logs"></div>
</div>
```

```script
{
  data() {
    return {
      value: false,
      logs: ''
    }
  },
  methods: {
    onBlur() {
      this.logs+= 'on-blur' + '<br/>'
    },
    onFocus() {
      this.logs+= 'on-focus' + '<br/>'
    },
    input() {
      this.logs+= 'input' + '<br/>'
    },
    onChange() {
      this.logs+= 'on-change' + '<br/>'
    },
  }
}
```
