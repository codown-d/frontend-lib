# Card

> 卡片组件

## [Props](https://ant-design.antgroup.com/components/card-cn#api)

```js
interface ICardHeaderState {
  title: any;
  errorInfo?: any;
  subText?: any;
}
```

## Example

```jsx
import { TzCard, TzCardHeaderState } from '@tz/antd';

const ErrorInfo = () => <p style={{ color: 'red' }}>我是ErrorInfo</p>;

export default () => {
  return (
    <div>
      <h1>TzCard</h1>
      <TzCard title="Default size card" extra={<a href="#">More</a>} style={{ width: 300 }}>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </TzCard>
      <h1>TzCard</h1>
      <TzCard size="small" title="Small size card" extra={<a href="#">More</a>} style={{ width: 300 }}>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </TzCard>
      <h1>TzCardHeaderState</h1>
      <TzCardHeaderState title="我是title" subText="我是subText" />
      <h1>TzCardHeaderState</h1>
      <TzCardHeaderState title="我是title" errorInfo={<ErrorInfo />} />
    </div>
  );
};
```
