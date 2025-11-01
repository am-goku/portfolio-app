import { useEffect } from 'react';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css';

type Props = {
    phone: string;
    handlePhoneChange: (value: string) => void;
    error: string | undefined;
}

function PhoneField({ error, phone, handlePhoneChange }: Props) {

    useEffect(() => {
        const style = document.createElement("style");
        style.textContent = `
      /* === Force dark theme for all dropdown parts === */
      .react-tel-input .selected-flag,
      .react-tel-input .flag-dropdown,
      .react-tel-input .country-list,
      .react-tel-input .country-list .country {
        background-color: rgba(17,24,39,0.95) !important;
        color: #e5e7eb !important;
        border-color: rgba(255,255,255,0.1) !important;
      }

      /* Dropdown hover state */
      .react-tel-input .country-list .country:hover {
        background-color: rgba(79,70,229,0.3) !important; /* indigo-600/30 */
        color: #fff !important;
      }

      /* Flag dropdown hover */
      .react-tel-input .flag-dropdown:hover,
      .react-tel-input .selected-flag:hover {
        background-color: rgba(79,70,229,0.25) !important;
        border-color: rgba(79,70,229,0.4) !important;
      }

      /* Active country highlight */
      .react-tel-input .country-list .country.highlight {
        background-color: rgba(79,70,229,0.4) !important;
        color: #fff !important;
      }

      /* Search box inside dropdown */
      .react-tel-input .country-list .search-box {
        background-color: rgba(17,24,39,0.8) !important;
        color: #e5e7eb !important;
        border: 1px solid rgba(255,255,255,0.1) !important;
      }

      /* Scrollbar (kept from before) */
      .react-tel-input .country-list::-webkit-scrollbar {
        width: 8px;
      }
      .react-tel-input .country-list::-webkit-scrollbar-track {
        background: rgba(31,41,55,0.6);
      }
      .react-tel-input .country-list::-webkit-scrollbar-thumb {
        background: rgba(79,70,229,0.6);
        border-radius: 4px;
      }
      .react-tel-input .country-list::-webkit-scrollbar-thumb:hover {
        background: rgba(99,102,241,0.8);
      }
    `;
        document.head.appendChild(style);
        return () => style.remove();
    }, []);

    return (
        <div className="flex-1">
            <PhoneInput
                country={"in"}
                value={phone.replace("+", "")}
                onChange={handlePhoneChange}
                inputProps={{ name: "phone", required: false }}
                containerStyle={{ width: "100%" }}
                inputStyle={{
                    width: "100%",
                    backgroundColor: "rgba(17,24,39,0.8)",
                    color: "#e5e7eb",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "0.5rem",
                    height: "2.75rem",
                    paddingLeft: "3rem",
                    fontSize: "0.875rem",
                }}
                buttonStyle={{
                    backgroundColor: "rgba(31,41,55,0.8)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "0.5rem 0 0 0.5rem",
                    width: "2.5rem",
                }}
                dropdownStyle={{
                    backgroundColor: "rgba(17,24,39,0.95)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#e5e7eb",
                    fontSize: "0.875rem",
                    backdropFilter: "blur(8px)",
                }}
                searchStyle={{
                    backgroundColor: "rgba(17,24,39,0.8)",
                    color: "#e5e7eb",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "0.375rem",
                }}
            />
            {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
        </div>
    )
}

export default PhoneField