import React from 'react'
import { FaEnvelope } from 'react-icons/fa';

type Props = {
    email: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error: string | undefined;
}

function EmailFields({ email, handleChange, error }: Props) {
    return (
        <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-400 transition-colors duration-200">
                <FaEnvelope />
            </div>
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:bg-white/15"
            />
            {error && <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                <span>⚠</span> {error}
            </p>}
        </div>
    )
}

export default EmailFields