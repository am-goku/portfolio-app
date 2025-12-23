import React from 'react';
import { FaPhone } from 'react-icons/fa';

type Props = {
  phone: string;
  handlePhoneChange: (value: string) => void;
  error: string | undefined;
}

function PhoneField({ error, phone, handlePhoneChange }: Props) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove all non-numeric characters except +
    let value = e.target.value.replace(/[^\d+]/g, '');

    // Ensure it starts with +
    if (!value.startsWith('+')) {
      value = '+' + value.replace(/\+/g, '');
    }

    // Remove the + for the callback (will be added back in ContactForm)
    handlePhoneChange(value.substring(1));
  };

  return (
    <div>
      <div className="relative group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-400 transition-colors duration-200">
          <FaPhone />
        </div>
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={phone}
          onChange={handleInputChange}
          className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:bg-white/15"
        />
      </div>
      <p className="text-xs text-gray-400 mt-1 italic">Include country code (e.g., +91 1234567890)</p>
      {error && <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
        <span>⚠</span> {error}
      </p>}
    </div>
  )
}

export default PhoneField