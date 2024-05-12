import React from 'react';
import FullScreenMessage from './FullScreenMessage';

type ErrorBoundaryProps = {
  children: React.ReactNode;
  fallbackUI?: React.ReactNode;
};

type ErrorBoundartState = {
  hasError: boolean;
  message: string;
};

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundartState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  static getDerivedStateFromError(err: Error) {
    // 다음 렌더링에서 폴백 UI가 보이도록 상태를 업데이트 합니다.
    console.log(err.message, 'GetDerivedStateFromError');
    return { hasError: true, message: err.message };
  }

  componentDidCatch(error: Error, _: React.ErrorInfo) {
    // 에러 리포팅 서비스에 에러를 기록할 수도 있습니다.
    console.log(error, 'ComponentDidCatch');
    // console.log(errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // 폴백 UI를 커스텀하여 렌더링할 수 있습니다.
      console.log(this.props.fallbackUI);
      // return this.props.fallbackUI;
      return (
        <FullScreenMessage type="error" errorMessage={this.state.message} />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
