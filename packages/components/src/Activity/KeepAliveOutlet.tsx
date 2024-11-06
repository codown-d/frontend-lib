import React from 'react';
import { memo, useContext } from 'react';
import { TOutlet } from './type';
import { OffScreenContext } from './useActivity';
import { Offscreen } from './Offscreen';

export const KeepAliveOutlet = memo(() => {
  const { outlets, key } = useContext(OffScreenContext);
  return (
    <>
      {outlets?.map((o: TOutlet) => (
        <Offscreen key={o.key} mode={key === o.key ? 'visible' : 'hidden'}>
          {o.outlet}
        </Offscreen>
      ))}
    </>
  );
});
