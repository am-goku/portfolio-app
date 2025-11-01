import type React from "react";

type Props = {
    setTab: React.Dispatch<React.SetStateAction<'home' | 'projects' | 'testimonials'>>;
    tab: 'home' | 'projects' | 'testimonials';
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
        </div>
    )
}

export default TabSwitchButtons