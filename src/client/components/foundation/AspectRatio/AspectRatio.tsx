import type { FC, ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
// import { throttle } from 'throttle-debounce';

import * as styles from './AspectRatio.styles';

type Props = {
  ratioWidth: number;
  ratioHeight: number;
  children: ReactNode;
};

export const AspectRatio: FC<Props> = ({ children, ratioHeight, ratioWidth }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [clientHeight, setClientHeight] = useState<number>(0);

  useEffect(() => {
    const updateClientHeight = () => {
      const width = containerRef.current?.getBoundingClientRect().width ?? 0;
      const height = (width * ratioHeight) / ratioWidth;
      setClientHeight(height);
    };

    // setImmediate で、一定間隔で処理を繰り返す
    let timer = (function tick() {
      return setImmediate(() => {
        updateClientHeight();
        timer = tick();
      });
    })();

    return () => {
      clearImmediate(timer);
    };
  }, [ratioHeight, ratioWidth]);

  return (
    <div ref={containerRef} className={styles.container({ clientHeight })}>
      {children}
    </div>
  );
};
