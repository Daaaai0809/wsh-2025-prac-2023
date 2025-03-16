import classNames from 'classnames';
import type { ComponentProps, FC } from 'react';

import * as styles from './Image.styles';

type Props = Omit<ComponentProps<'img'>, 'className'> & {
  fill?: boolean;
  ratioHeight?: number;
  ratioWidth?: number;
};

export const Image: FC<Props> = ({ fill, ratioHeight, ratioWidth, ...rest }) => {
  return (
    <img
      className={classNames(styles.container(), {
        [styles.container__fill(ratioWidth, ratioHeight)]: fill === true,
      })}
      loading={rest.loading ?? 'eager'}
      {...rest}
    />
  );
};
