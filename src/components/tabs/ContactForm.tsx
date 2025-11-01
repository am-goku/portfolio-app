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
        <form onSubmit={handleSubmit} className='space-y-4 md:p-6'>

            <h2 className="text-xl font-semibold text-gray-100 mb-2">Get in Touch</h2>

            {/* Name */}
            <NameField name={form.name} handleChange={handleChange} error={errors.name} />

            {/* Email + Phone */}
            <section className="flex flex-col md:flex-row gap-5">
                <EmailFields email={form.email} handleChange={handleChange} error={errors.email} />

                <PhoneField phone={form.phone} handlePhoneChange={handlePhoneChange} error={errors.phone} />
            </section>

            {/* Message */}
            <MessageFields message={form.message} handleChange={handleChange} error={errors.message} />

            {/* Submit */}
            <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-indigo-600 hover:bg-indigo-500 py-2 rounded-md text-white font-medium transition-colors"
            >
                {status === 'loading' ? 'Sending...' : 'Send Message'}
            </button>

            {status === 'success' && (
                <p className="text-green-400 text-sm text-center mt-2">Message sent successfully!</p>
            )}
            {status === 'error' && (
                <p className="text-red-400 text-sm text-center mt-2">Something went wrong. Try again.</p>
            )}
        </form>
    );
}
