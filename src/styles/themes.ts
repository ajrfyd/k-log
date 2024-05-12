import { fontSizeMap } from './fonts';
import { buttonSizeMap, buttonColorMap } from './button';
import { colorsMap } from './colors';
import { zIndexMap } from './zIndex';

const themes = {
  zIndex: zIndexMap,
  fontSize: fontSizeMap,
  colors: colorsMap,
  buttonSize: buttonSizeMap,
  buttonColor: buttonColorMap
};

export type ThemesKeys = typeof themes;

export default themes;
