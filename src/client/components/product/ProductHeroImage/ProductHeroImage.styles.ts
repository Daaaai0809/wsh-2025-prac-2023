import { css } from '@emotion/css';

export const container = () => css`
  opacity: 1;
  position: relative;
  transition-duration: 300ms;
  transition-property: opacity;
  transition-timing-function: linear;

  &:hover {
    opacity: 0.8;
  }
`;

export const image = (ratioWidth: number, ratioHeight: number) => css`
  object-fit: cover;
  width: 100%;
  height: 100%;
  aspect-ratio: ${ratioWidth} / ${ratioHeight};
  display: block;
  position: relative;
  object-position: center;
  z-index: 1;
`;

export const overlay = () => css`
  align-items: flex-start;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.5) 0, transparent);
  bottom: 0;
  display: flex;
  flex-direction: column;
  height: 30%;
  justify-content: flex-end;
  left: 0;
  padding: 16px 24px;
  position: absolute;
  right: 0;
  z-index: 2;
`;

export const title = () => css`
  color: #ffffff;
  font-weight: 700;
  letter-spacing: 1px;
`;

export const title__desktop = () => css`
  font-size: 1.5rem;
`;

export const title__mobile = () => css`
  font-size: 1.125rem;
`;

export const description = () => css`
  color: #ffffff;
  margin-top: 8px;
`;

export const description__desktop = () => css`
  font-size: 1rem;
`;

export const description__mobile = () => css`
  font-size: 0.875rem;
`;
