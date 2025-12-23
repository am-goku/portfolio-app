import React from 'react'
import { FaComment } from 'react-icons/fa';

type Props = {
    message: string;
    handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    error: string | undefined;
}

function MessageFields({ message, handleChange, error }: Props) {
    return (
        <div className="relative group">
            <div className="absolute left-4 top-4 text-gray-400 group-focus-within:text-blue-400 transition-colors duration-200">
                <FaComment />
            </div>
            <textarea
                name="message"
                placeholder="Your Message"
                rows={5}
                value={message}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:bg-white/15 resize-none"
            />
            {error && <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                <span>⚠</span> {error}
            </p>}
        </div>
    )
}

export default MessageFields