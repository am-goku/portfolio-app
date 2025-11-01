export type ContactFormData = {
    name: string;
    phone: string;
    email: string;
    message: string;
}

interface Errors {
    name?: string;
    email?: string;
    phone?: string;
    message?: string;
}

export async function submitContactForm(form: ContactFormData): Promise<Response> {
    const scriptURL = import.meta.env.VITE_CONTACT_FORM_URL;
    if (!scriptURL) console.warn('Missing Google Script URL');

    const response = await fetch(scriptURL!, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        redirect: 'follow',
        body: JSON.stringify(form),
    });

    return response;
}

export function validateContactForm(form: ContactFormData, setErrors: (errors: Errors) => void): boolean {
    const newErrors: Errors = {};

    // Name
    if (!form.name.trim()) {
        newErrors.name = 'Name is required.';
    }

    // Email (simple but safe RFC-like regex)
    if (!form.email.trim()) {
        newErrors.email = 'Email is required.';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email)) {
        newErrors.email = 'Please enter a valid email address.';
    }

    // Phone (required and must be valid)
    if (!form.phone.trim()) {
        newErrors.phone = 'Phone number is required.';
    } else {
        // Remove all non-digit characters (e.g., +, spaces, dashes)
        const digits = form.phone.replace(/\D/g, '');
        if (digits.length < 6 || digits.length > 15) {
            newErrors.phone = 'Please enter a valid phone number.';
        }
    }

    // Message
    if (!form.message.trim()) {
        newErrors.message = 'Message cannot be empty.';
    } else if (form.message.trim().length < 5) {
        newErrors.message = 'Message is too short.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
}