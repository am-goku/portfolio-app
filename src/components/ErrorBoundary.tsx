import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

/**
 * Error Boundary component to catch and handle React errors gracefully.
 * Displays a user-friendly error message instead of crashing the entire app.
 */
class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): State {
        // Update state so the next render will show the fallback UI
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // Log error to console for debugging
        console.error('Error caught by boundary:', error, errorInfo);

        // TODO: Send to error tracking service (e.g., Sentry, LogRocket)
        // Example: Sentry.captureException(error, { extra: errorInfo });
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-100 p-6">
                    <div className="max-w-md text-center">
                        <h1 className="text-2xl font-bold mb-4">Oops! Something went wrong</h1>
                        <p className="text-gray-400 mb-6">
                            We're sorry for the inconvenience. Please refresh the page to try again.
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                        >
                            Refresh Page
                        </button>
                        {import.meta.env.DEV && this.state.error && (
                            <details className="mt-6 text-left">
                                <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-400">
                                    Error Details (Development Only)
                                </summary>
                                <pre className="mt-2 p-4 bg-gray-800 rounded text-xs overflow-auto">
                                    {this.state.error.toString()}
                                </pre>
                            </details>
                        )}
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
