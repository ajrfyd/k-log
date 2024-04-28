const zIndex = {
  tagSlider: 10,
  toast: 20,
  backDrop: 1000,
  upperBackDrop: 1001
};

const fontSize = {
  mega: 5,
  big: 2.5,
  large: 1.5,
  medium: 1.2,
  regular: 1,
  small: 0.8
};

const colors = {
  brown: 'var(--brown)',
  beige: 'var(--beige)',
  teal: 'var(--teal)',
  purple: 'var(--purple)',
  white: 'var(--white)',
  red: 'var(--red)',
  blue: 'var(--blue)',
  green: 'var(--green)',
  grey: 'var(--grey)'
};

const themes = {
  zIndex,
  fontSize,
  colors
};

export type ThemesKeys = typeof themes;
export type fontSizeKeys = keyof typeof fontSize;
export type zIndexKeys = keyof typeof zIndex;
export type colorKeys = keyof typeof colors;

export default themes;
