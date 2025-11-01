import React from 'react'

type Props = {
    name?: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error: string | undefined;
}

function NameField({ name, handleChange, error }: Props) {
    return (
        <div>
            <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={name}
                onChange={handleChange}
                className="w-full p-2 rounded-md bg-white/10 border border-white/20 text-gray-200 placeholder-gray-400"
            />
            {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
        </div>
    )
}

export default NameField