import {
  forwardRef,
  ElementType,
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
  ReactNode
} from 'react';

type ChameleonProps<T extends ElementType> = {
  as?: T;
} & ComponentPropsWithoutRef<T>;

type ChameleonComponent = <C extends ElementType = 'div'>(
  props: ChameleonProps<C> & { ref?: ComponentPropsWithRef<C>['ref'] }
) => ReactNode | null;

const Chameleon: ChameleonComponent = forwardRef(
  <T extends ElementType = 'div'>(
    { as, ...props }: ChameleonProps<T>,
    ref: ComponentPropsWithRef<T>['ref']
  ) => {
    const Element = as || 'div';
    return <Element {...props} ref={ref} />;
  }
);

export default Chameleon;
