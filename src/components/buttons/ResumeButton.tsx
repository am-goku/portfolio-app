import React, { useState } from 'react';

type Props = {
    resume: string;
    filename?: string; // Optional: Override default filename (e.g., 'my-resume.pdf')
};

function ResumeButton({ resume, filename }: Props) {
    const [isLoading, setIsLoading] = useState(false);

    const handleDownload = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Fetch the file
            const response = await fetch(resume, {
                method: 'GET',
                // Add headers if needed (e.g., for auth): headers: { Authorization: 'Bearer token' }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch resume');
            }

            const blob = await response.blob();

            // Create object URL for download
            const url = window.URL.createObjectURL(blob);

            // Trigger download
            const a = document.createElement('a');
            a.href = url;
            a.download = filename || resume.substring(resume.lastIndexOf('/') + 1) || 'resume.pdf';
            document.body.appendChild(a); // Required for Firefox
            a.click();
            document.body.removeChild(a);

            // Clean up
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Download failed:', error);
            alert('Failed to download resume. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button
            onClick={handleDownload}
            disabled={isLoading}
            className={`flex items-center justify-center px-4 py-2 rounded-md shadow-md text-white text-sm transition-all ${isLoading
                ? 'bg-indigo-400 cursor-not-allowed opacity-75'
                : 'bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700'
                }`}
        >
            {isLoading ? (
                <>
                    {/* Tailwind-compatible spinner SVG */}
                    <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                    </svg>
                    Downloading...
                </>
            ) : (
                'Download Resume'
            )}
        </button>
    );
}

export default ResumeButton;