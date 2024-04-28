import {
  FocusEventHandler,
  forwardRef,
  InputHTMLAttributes,
  useState
} from 'react';
import Text from './Text';
import Input from './Input';

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: React.ReactNode;
  hasError?: boolean;
  helpMsg?: React.ReactNode;
};

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, hasError, helpMsg, onFocus, onBlur }, ref) => {
    const [focused, setFocused] = useState(false);
    const labelColor = hasError ? 'red' : focused ? 'blue' : 'purple';

    const handleFocus: FocusEventHandler<HTMLInputElement> = (e) => {
      setFocused(true);
      onFocus?.(e);
    };
    const handleBlur: FocusEventHandler<HTMLInputElement> = (e) => {
      setFocused(false);
      onBlur?.(e);
    };

    return (
      <div>
        {label && (
          <Text
            text={label}
            size="regular"
            color={labelColor}
            display="inline-block"
            style={{
              marginBottom: 6
            }}
          />
        )}
        <Input onFocus={handleFocus} onBlur={handleBlur} ref={ref} />
        {helpMsg && (
          <Text
            text={helpMsg}
            size="small"
            color={labelColor}
            display="inline-block"
            style={{ marginTop: 5 }}
          />
        )}
      </div>
    );
  }
);

export default TextField;
