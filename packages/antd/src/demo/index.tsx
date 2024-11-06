import React, { FC, useState } from 'react';
// 引用当前 package 中的其他模块
import { TzButton } from '../button';
// 引用其他 package 中的模块
import { Add } from '@tz/utils';

interface IProps {
  /**
   * @description 我是属性描述
   * @default 我是默认值
   */
  title?: string;
}

export const Demo: FC<IProps> = () => {
  const [num, setNum] = useState(0);

  return (
    <div>
      <p>{num}</p>
      <TzButton
        onClick={() => {
          setNum((a) => Add(a, 2));
        }}
      >
        点击 +num
      </TzButton>
    </div>
  );
};
