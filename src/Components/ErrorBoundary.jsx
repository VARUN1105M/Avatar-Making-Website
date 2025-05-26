import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMessage: "" };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render shows the fallback UI
    return { hasError: true, errorMessage: error.message };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error to an external service here
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
    // Example: logErrorToService(error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, errorMessage: "" });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: "20px",
          backgroundColor: "#ffe5e5",
          color: "#b00020",
          borderRadius: "10px",
          margin: "20px",
          fontFamily: "Arial"
        }}>
          <h2>Something went wrong:</h2>
          <pre style={{ whiteSpace: "pre-wrap" }}>{this.state.errorMessage}</pre>
          <button
            onClick={this.handleRetry}
            style={{
              marginTop: "10px",
              padding: "8px 16px",
              backgroundColor: "#b00020",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
