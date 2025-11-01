import React from 'react'

type Props = {
    email: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error: string | undefined;
}

function EmailFields({ email, handleChange, error }: Props) {
    return (
        <div className="flex-1">
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={handleChange}
                className="w-full p-2 rounded-md bg-white/10 border border-white/20 text-gray-200 placeholder-gray-400"
            />
            {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
        </div>
    )
}

export default EmailFields