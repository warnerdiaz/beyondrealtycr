import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  errorMessage: string;
  errorTitle: string;
  tryAgainLabel: string;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Uncaught error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[90vh] flex-col items-center justify-center bg-surface px-4 text-center text-ink">
          <h2 className="mb-3 text-2xl font-semibold">
            {this.props.errorTitle}
          </h2>
          <p className="mb-6 text-muted">{this.props.errorMessage}</p>
          <button
            type="button"
            className="rounded-md bg-accent px-5 py-2 font-medium text-accent-contrast transition-colors hover:bg-accent-hover"
            onClick={() => this.setState({ hasError: false })}
          >
            {this.props.tryAgainLabel}
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
