import { useDebounce, useEventListener, useMemoizedFn, useScroll } from 'ahooks';
import { cloneDeep } from 'lodash';
import { createContext, Key, useEffect, useRef, useState } from 'react';
import { TNodesScrollPosition, TOffScreen, TOutlet } from './type';

export const useActivity = (props: TOffScreen) => {
  const { action, location, outlet } = props;
  const [outlets, setOutlets] = useState<TOutlet[]>();
  const { pathname, key, state } = location ?? {};
  const { keepAlive } = state ?? {};
  const topRef = useRef<number>();
  let cacheNodeRef = useRef<HTMLDivElement | undefined | null>(undefined);
  let cacheNodesScrollRef = useRef<TNodesScrollPosition[] | undefined>(undefined);

  // layout容器滚动位置
  const layoutScrollTo = useMemoizedFn((top) => document.getElementById('tz-container')?.scrollTo?.({ top }));

  const { top = 0 } = useScroll(document.getElementById('tz-container')) ?? {};
  topRef.current = top;

  const saveCompsScrollInOutlets = useMemoizedFn(() => {
    const nodeList: undefined | NodeListOf<Element> = cacheNodeRef.current?.querySelectorAll('*');
    if (!nodeList?.length) {
      cacheNodesScrollRef.current = undefined;
      return;
    }
    cacheNodesScrollRef.current = Array.from(nodeList)
      ?.filter((node) => {
        const bb = node.scrollWidth > node.clientWidth + 2 || node.scrollHeight > node.clientHeight + 2;
        return bb;
      })
      .map((node) => [node, { x: node.scrollLeft, y: node.scrollTop }]);
  });
  const saveCompsScrollInOutletsDebounce = useDebounce(() => saveCompsScrollInOutlets, {
    wait: 500,
  });

  useEventListener('mouseover', () => {
    cacheNodeRef.current && saveCompsScrollInOutletsDebounce();
  });
  useEventListener('wheel', () => {
    cacheNodeRef.current && saveCompsScrollInOutletsDebounce();
  });

  useEffect(() => {
    setOutlets((prev) => {
      const draft: TOutlet[] = prev ? cloneDeep(prev) : [];
      const index = draft.findIndex((v) => v.key === key);
      const initItem: TOutlet = {
        scrollOffset: 0,
        key,
        pathname,
        outlet,
      };

      if (action === 'REPLACE') {
        return keepAlive ? prev?.filter((v) => v.pathname !== pathname).concat(initItem) : [initItem];
      }
      if (index < 0) {
        return [initItem,...(prev ?? [])];
      }
      if (action !== 'POP') {
        return [initItem,...(prev?.filter((v) => v.key !== key) ?? [])];
      }
      cacheNodeRef.current = draft[index]?.compRef;
      return prev;
    });
    return () => {
      const cacheScrollNodes = cacheNodesScrollRef.current;
      const compRef = cacheNodeRef.current;
      setOutlets((prev) => {
        const draft: TOutlet[] = prev ? cloneDeep(prev) : [];
        const index = draft.findIndex((v) => v.key === key);
        cacheNodesScrollRef.current = undefined;
        cacheNodeRef.current = undefined;
        if (index !== -1) {
          return prev?.map((v) =>
            v.key === key
              ? {
                  ...v,
                  scrollOffset: topRef.current ?? 0,
                  cacheScrollNodes,
                  compRef,
                }
              : v,
          );
        }
        return prev;
      });
    };
  }, [pathname, key, keepAlive, action]);

  useEffect(() => {
    if (!outlets?.length) {
      return;
    }
    const index = outlets.findIndex((v) => v.key === key);
    if (index > -1) {
      if (action !== 'POP') {
        layoutScrollTo(0);
      } else {
        outlets[index].cacheScrollNodes?.forEach(([node, { x, y }]) => {
          node.scrollTo?.({ top: y, left: x });
        });
        layoutScrollTo(outlets[index].scrollOffset);
      }
    }
  }, [outlets, action, key]);

  const registryCompScroll = useMemoizedFn((node, isPopOver = true) => {
    cacheNodeRef.current = isPopOver ? node?.parentNode?.parentNode : node;
  });

  return { outlets, registryCompScroll, key };
};

export type TzOffScreenBack = {
  registryCompScroll: (ref: HTMLDivElement | null, isPopOver?: boolean) => void;
  outlets: any;
  key: Key;
};

export const OffScreenContext = createContext<TzOffScreenBack>({
  registryCompScroll: () => null,
  outlets: null,
  key: '',
});
