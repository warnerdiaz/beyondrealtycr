import { Component, type ErrorInfo, type ReactNode } from "react";
import { Button, Container } from "react-bootstrap";

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
        <Container className="d-flex flex-column align-items-center justify-content-center text-light bg-dark" style={{ minHeight: "90vh" }}>
          <h2 className="mb-3">{this.props.errorTitle}</h2>
          <p className="text-secondary mb-4">{this.props.errorMessage}</p>
          <Button
            variant="outline-secondary"
            onClick={() => this.setState({ hasError: false })}
          >
            {this.props.tryAgainLabel}
          </Button>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
