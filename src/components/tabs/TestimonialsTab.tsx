import { motion } from 'framer-motion';
import TESTIMONIALS from '../../lib/testimonial';

export default function TestimonialsTab() {
    return (
        <section>
            <h2 className="text-2xl font-semibold mb-6">Testimonials</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {TESTIMONIALS.map((t, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ scale: 1.02 }}
                        className="p-5 rounded-xl bg-white/5 border border-white/10 backdrop-blur shadow-lg"
                    >
                        <div className="flex items-center gap-4">
                            <img
                                src={t.image || '/thumb/github.png'}
                                alt={t.name}
                                className="w-14 h-14 rounded-full object-cover"
                            />
                            <div>
                                <h4 className="font-medium text-gray-100">{t.name}</h4>
                                <p className="text-xs text-gray-400">{t.role}</p>
                            </div>
                        </div>
                        <p className="text-sm text-gray-300 mt-4 leading-relaxed">“{t.text}”</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
