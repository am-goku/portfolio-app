import React, { useState } from 'react';
import { submitContactForm, validateContactForm, type ContactFormData } from '../../lib/service/contact';
import PhoneField from '../fields/PhoneField';
import EmailFields from '../fields/EmailFields';
import NameField from '../fields/NameField';
import MessageFields from '../fields/MessageFields';

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
        <form
            onSubmit={handleSubmit}
            className="space-y-6 md:p-8 p-2
            md:backdrop-blur-2xl md:bg-white/5
               rounded-2xl 
               animate__animated animate__fadeIn"
        >

            <h2 className="text-2xl font-bold text-white mb-4 tracking-wide select-none">
                Get in Touch
            </h2>

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

            {/* Submit */}
            <button
                type="submit"
                disabled={status === 'loading'}
                className="
            w-full py-3 rounded-xl text-white font-semibold
            bg-linear-to-r from-indigo-600 to-purple-600
            hover:from-indigo-500 hover:to-purple-500
            disabled:opacity-60 disabled:cursor-not-allowed
            transition-all duration-300 shadow-md
            hover:shadow-lg hover:-translate-y-0.5
        "
            >
                {status === 'loading' ? 'Sending...' : 'Send Message'}
            </button>

            {/* Status messages */}
            {status === 'success' && (
                <p className="text-green-400 text-center mt-2 animate__animated animate__fadeIn">
                    Message sent successfully!
                </p>
            )}

            {status === 'error' && (
                <p className="text-red-400 text-center mt-2 animate__animated animate__fadeIn">
                    Something went wrong. Try again.
                </p>
            )}
        </form>
    );
}
