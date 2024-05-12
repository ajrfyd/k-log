import { css } from 'styled-components';
import { colorsMap, colorKeys } from './colors';

const btnShapeHandler = (
  color: colorKeys,
  type: 'weak' | 'normal' = 'normal'
) => ({
  backgroundColor: type === 'normal' ? colorsMap[color] : colorsMap.white,
  border: type === 'weak' ? `1px solid ${colorsMap[color]}` : 'none',
  color: type === 'normal' ? colorsMap.white : colorsMap[color]
});

export const buttonColorMap = {
  primary: css`
    ${btnShapeHandler('blue')}
  `,
  success: css`
    ${btnShapeHandler('green')}
  `,
  error: css`
    ${btnShapeHandler('red')}
  `
};

export const buttonWeakMap = {
  primary: css`
    ${btnShapeHandler('blue', 'weak')}
  `,
  success: css`
    ${btnShapeHandler('green', 'weak')}
  `,
  error: css`
    ${btnShapeHandler('red', 'weak')}
  `
};

export type buttonColorKeys = keyof typeof buttonColorMap;

export type buttonSizeKeys = keyof typeof buttonSizeMap;

export const buttonSizeMap = {
  small: css`
    font-size: 13px;
    padding: 8px 9px;
  `,
  medium: css`
    font-size: 15px;
    padding: 10px 15px;
  `,
  large: css`
    font-size: 18px;
    padding: 12px 10px;
  `
};
