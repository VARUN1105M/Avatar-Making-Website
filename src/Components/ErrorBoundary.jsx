import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMessage: "" };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, errorMessage: error.message || "An unexpected error occurred." };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
    
    // Optional: log to an external service
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, errorMessage: "" });
    // Optionally refresh the page or reset state globally
    if (this.props.onRetry) {
      this.props.onRetry();
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: "20px",
          backgroundColor: "#ffe5e5",
          color: "#b00020",
          borderRadius: "10px",
          margin: "20px auto",
          maxWidth: "600px",
          fontFamily: "Arial",
          textAlign: "center"
        }}>
          <h2>Oops! Something went wrong.</h2>
          <pre style={{
            whiteSpace: "pre-wrap",
            margin: "10px 0",
            fontSize: "14px"
          }}>{this.state.errorMessage}</pre>
          <button
            onClick={this.handleRetry}
            style={{
              marginTop: "10px",
              padding: "10px 20px",
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
