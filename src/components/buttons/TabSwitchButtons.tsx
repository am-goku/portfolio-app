import type React from "react";

type Props = {
    setTab: React.Dispatch<React.SetStateAction<'home' | 'projects' | 'testimonials' | 'contact'>>;
    tab: 'home' | 'projects' | 'testimonials' | 'contact';
}

function TabSwitchButtons({ setTab, tab }: Props) {
    return (
        <div className="flex gap-3">
            <button
                onClick={() => setTab('home')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${tab === 'home'
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                        : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white'
                    }`}
            >
                Home
            </button>
            <button
                onClick={() => setTab('projects')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${tab === 'projects'
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                        : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white'
                    }`}
            >
                Projects
            </button>
            <button
                onClick={() => setTab('contact')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${tab === 'contact'
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                        : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white'
                    }`}
            >
                Contact
            </button>
        </div>
    )
}

export default TabSwitchButtons