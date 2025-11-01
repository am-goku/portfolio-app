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
                className={`px-4 py-2 rounded-full text-sm ${tab === 'home' ? 'bg-indigo-600' : 'bg-white/5'}`}
            >
                Home
            </button>
            <button
                onClick={() => setTab('projects')}
                className={`px-4 py-2 rounded-full text-sm ${tab === 'projects' ? 'bg-indigo-600' : 'bg-white/5'}`}
            >
                Projects
            </button>
            {/* <button
                onClick={() => setTab('testimonials')}
                className={`px-4 py-2 rounded-full text-sm ${tab === 'testimonials' ? 'bg-indigo-600' : 'bg-white/5'}`}
            >
                Testimonials
            </button> */}
            <button
                onClick={() => setTab('contact')}
                className={`px-4 py-2 rounded-full text-sm ${tab === 'contact' ? 'bg-indigo-600' : 'bg-white/5'}`}
            >
                Contact
            </button>
        </div>
    )
}

export default TabSwitchButtons