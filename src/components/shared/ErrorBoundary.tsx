import React from 'react';
// import FullScreenMessage from './FullScreenMessage';

type ErrorBoundaryProps = {
  children: React.ReactNode;
  fallbackUI?: React.ReactNode;
};

export type GlobalErrorType = 'error' | 'loading' | '404' | 'down';

type ErrorBoundartState = {
  hasError: boolean;
  message: string;
  type: GlobalErrorType;
};

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundartState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, message: '', type: 'error' };
  }

  static getDerivedStateFromError(err: Error) {
    // 다음 렌더링에서 폴백 UI가 보이도록 상태를 업데이트 합니다.
    if (!err) {
      return {
        hasError: true,
        message: '서버가 재실행 중입니다.',
        type: 'down'
      };
    }

    return {
      hasError: true,
      message: err.message ? err.message : '알수 없는 에러.'
    };
  }

  componentDidCatch(error: Error, _: React.ErrorInfo) {
    // 에러 리포팅 서비스에 에러를 기록할 수도 있습니다.
    console.log(error, '<<<<<<<<<<<<<<ComponentDidCatch');
    // console.log(errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // 폴백 UI를 커스텀하여 렌더링할 수 있습니다.
      console.log(this.props.fallbackUI);
      // return this.props.fallbackUI;
      return (
        // <FullScreenMessage
        //   type={this.state.type}
        //   errorMessage={this.state.message || '500'}
        //   error={null}
        //   resetErrorBoundary={() => {}}
        // />
        <div></div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
