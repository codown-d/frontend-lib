import { translations } from '@tz/translate';
import Button, { ButtonProps } from 'antd/lib/button';
import classNames from 'classnames';
import React, { useMemo } from 'react';
import './index.scss';

type TzButtonProps = ButtonProps;

export const TzButton = (props: TzButtonProps) => {
  let { type = 'default', children } = props;
  const realProps = useMemo(() => {
    return {
      ...props,
      className: classNames('tz-button', props.className, {
        'cancel-btn': type !== 'text' && translations.cancel === children,
      }),
      type,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  return <Button {...realProps} />;
};
