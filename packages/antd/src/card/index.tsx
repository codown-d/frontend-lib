import React, { ReactNode, useMemo } from 'react';
import Card, { CardProps } from 'antd/lib/card';
import './index.scss';

export const TzCard = (props: CardProps) => {
  const realProps = useMemo(() => {
    return {
      ...props,
      className: `tz-card ${props.className || ''}`,
    };
  }, [props]);
  let bodyStyle = useMemo(() => {
    return {
      paddingTop: '0px',
      ...realProps.bodyStyle,
    };
  }, [realProps]);
  return <Card {...realProps} bodyStyle={bodyStyle} />;
};

export interface ICardHeaderState {
  title: ReactNode;
  errorInfo?: ReactNode;
  subText?: ReactNode;
}

export const TzCardHeaderState = (props: ICardHeaderState) => {
  let { title, errorInfo, subText } = props;
  return (
    <span className="error-info">
      {title}
      {errorInfo ? (
        <span className="f12 ml8 family-r">
          <i>*</i>&nbsp;
          {errorInfo}
        </span>
      ) : (
        <span className="f12 ml8 family-r">{subText}</span>
      )}
    </span>
  );
};
