import React from 'react';
import { FC, memo, Suspense } from 'react';
import { Repeater } from './Repeater';
import type { IProps } from './type';

export const Offscreen: FC<IProps> = memo((props) => {
  const { mode, children } = props;

  return (
    <Suspense fallback={null}>
      <Repeater mode={mode}>{children}</Repeater>
    </Suspense>
  );
});
