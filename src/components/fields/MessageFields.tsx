import React from 'react'

type Props = {
    message: string;
    handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    error: string | undefined;
}

function MessageFields({ message, handleChange, error }: Props) {
    return (
        <div>
            <textarea
                name="message"
                placeholder="Your Message"
                rows={4}
                value={message}
                onChange={handleChange}
                className="w-full p-2 rounded-md bg-white/10 border border-white/20 text-gray-200 placeholder-gray-400"
            />
            {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
        </div>
    )
}

export default MessageFields