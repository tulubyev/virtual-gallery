import React from 'react';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('[ErrorBoundary]', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 px-4 text-center">
          <div className="text-4xl">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-800">Что-то пошло не так</h2>
          <p className="text-sm text-gray-500 max-w-md">
            {this.state.error?.message || 'Произошла непредвиденная ошибка.'}
          </p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            className="mt-2 px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm hover:bg-indigo-700 transition-colors"
          >
            Попробовать снова
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
