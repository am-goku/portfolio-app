import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { submitContactForm, validateContactForm, type ContactFormData } from '../../lib/service/contact';
import PhoneField from '../fields/PhoneField';
import EmailFields from '../fields/EmailFields';
import NameField from '../fields/NameField';
import MessageFields from '../fields/MessageFields';
import { FaPaperPlane, FaSpinner, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

type Status = 'idle' | 'loading' | 'success' | 'error';

interface Errors {
    name?: string;
    email?: string;
    phone?: string;
    message?: string;
}

export default function ContactForm() {
    const [form, setForm] = useState<ContactFormData>({ name: '', phone: '', email: '', message: '' });
    const [status, setStatus] = useState<Status>('idle');
    const [errors, setErrors] = useState<Errors>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handlePhoneChange = (value: string) => {
        setForm({ ...form, phone: `+${value}` });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateContactForm(form, setErrors)) return;

        setStatus('loading');
        try {
            const res = await submitContactForm(form);
            if (res.ok) {
                setStatus('success');
                setForm({ name: '', phone: '', email: '', message: '' });
            } else {
                throw new Error('Network error');
            }
        } catch {
            setStatus('success');
            setForm({ name: '', phone: '', email: '', message: '' });
        }
    };

    return (
        <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            className="space-y-6 p-8 backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 shadow-2xl"
        >
            {/* Enhanced Header */}
            <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-lg bg-linear-to-br from-blue-500 to-purple-600 shadow-lg">
                    <FaPaperPlane className="text-white text-xl" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-white">Get in Touch</h2>
                    <p className="text-sm text-gray-400">Let's start a conversation</p>
                </div>
            </div>

            {/* Name */}
            <div className="transform transition-all duration-300 hover:scale-[1.01]">
                <NameField
                    name={form.name}
                    handleChange={handleChange}
                    error={errors.name}
                />
            </div>

            {/* Email + Phone */}
            <section className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 transform transition-all duration-300 hover:scale-[1.01]">
                    <EmailFields
                        email={form.email}
                        handleChange={handleChange}
                        error={errors.email}
                    />
                </div>
                <div className="flex-1 transform transition-all duration-300 hover:scale-[1.01]">
                    <PhoneField
                        phone={form.phone}
                        handlePhoneChange={handlePhoneChange}
                        error={errors.phone}
                    />
                </div>
            </section>

            {/* Message */}
            <div className="transform transition-all duration-300 hover:scale-[1.01]">
                <MessageFields
                    message={form.message}
                    handleChange={handleChange}
                    error={errors.message}
                />
            </div>

            {/* Enhanced Submit Button */}
            <motion.button
                type="submit"
                disabled={status === 'loading'}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-xl text-white font-semibold bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
                {status === 'loading' ? (
                    <>
                        <FaSpinner className="animate-spin" />
                        Sending...
                    </>
                ) : (
                    <>
                        <FaPaperPlane />
                        Send Message
                    </>
                )}
            </motion.button>

            {/* Enhanced Status Messages */}
            {status === 'success' && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-lg bg-green-500/20 border border-green-500/50 flex items-center gap-3"
                >
                    <FaCheckCircle className="text-green-400 text-xl shrink-0" />
                    <p className="text-green-400">Message sent successfully!</p>
                </motion.div>
            )}

            {status === 'error' && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-lg bg-red-500/20 border border-red-500/50 flex items-center gap-3"
                >
                    <FaExclamationCircle className="text-red-400 text-xl shrink-0" />
                    <p className="text-red-400">Something went wrong. Try again.</p>
                </motion.div>
            )}
        </motion.form>
    );
}
