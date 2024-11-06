# Button

用法参考 [antd](https://ant.design/components/overview-cn/) 文档，封装只修改样式

## [Props](https://ant-design.antgroup.com/components/button-cn#api)

### type 属性类型

| 属性 | 说明         | 类型                                          | 默认值    |
| ---- | ------------ | --------------------------------------------- | --------- |
| type | 设置按钮类型 | `primary、ghost、dashed、link、text、default` | `default` |

- default:

> `color`: `#2177D1`
>
> > `:hover`:
> >
> > > `background`: `#F3F5F8` > > `:active`:
> > > `background`: `#EFF0F2`

- 圆角

默认为`8px`的圆角，属性 ~~cancel~~ 弃用

## Example

```tsx
import { TzButton } from '@tz/antd';

const styVal = {
  marginRight: '12px',
};

export default () => {
  return (
    <div>
      <section>
        <TzButton style={styVal} type={'primary'}>
          primary
        </TzButton>
        <TzButton style={styVal} type={'ghost'}>
          ghost
        </TzButton>
        <TzButton style={styVal} type={'dashed'}>
          dashed
        </TzButton>
        <TzButton style={styVal} type={'link'}>
          link
        </TzButton>
        <TzButton style={styVal} type={'text'}>
          text
        </TzButton>
        <TzButton style={styVal} type={'default'}>
          default
        </TzButton>
      </section>
      <section>
        <p>字体颜色：默认为:#2177d1，如果要改为灰色(取消按钮)，可添加类名`cancel-btn`</p>
        <TzButton style={styVal} className="cancel-btn">
          default
        </TzButton>
      </section>
    </div>
  );
};
```
