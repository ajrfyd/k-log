import { ThemesKeys } from './styles/themes';

declare module 'styled-components' {
  export interface DefaultTheme extends ThemesKeys {}
}
