import { css } from '@emotion/css';

export const container = () => css`
  object-fit: cover;
`;

export const container__fill = (ratioWidth?: number, ratioHeight?: number) => {
  if (ratioWidth && ratioHeight) {
    return css`
      height: 100%;
      position: relative;
      width: 100%;
      aspect-ratio: ${ratioWidth} / ${ratioHeight};
    `;
  }

  return css`
    height: 100%;
    inset: 0;
    position: relative;
    width: 100%;
  `;
};
