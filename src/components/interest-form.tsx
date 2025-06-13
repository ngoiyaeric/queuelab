"use client";

import { useState, FormEvent } from 'react';
import { Button } from "@/components/ui/button"; // Assuming you have a Button component

interface InterestFormProps {
  formTitle: string;
  submissionContext: string;
  onSuccessCallback?: () => void;
}

export function InterestForm({ formTitle, submissionContext, onSuccessCallback }: InterestFormProps) {
    const [email, setEmail] = useState('');
    const [identity, setIdentity] = useState('');
    const [message, setMessage] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSubmitting(true);
        setError(null);
        setSuccess(null);

        if (!email || !identity || !message) {
            setError("Please fill in all required fields.");
            setSubmitting(false);
            return;
        }

        // Basic email validation
        if (!/\S+@\S+\.\S+/.test(email)) {
            setError("Please enter a valid email address.");
            setSubmitting(false);
            return;
        }

        try {
            const response = await fetch('/api/submit-interest-form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, identity, message, submissionContext }),
            });

            const result = await response.json();

            if (response.ok) {
                setSuccess(result.message || "Form submitted successfully!");
                setEmail('');
                setIdentity('');
                setMessage('');
                if (onSuccessCallback) {
                    onSuccessCallback();
                }
            } else {
                setError(result.message || "An error occurred while submitting the form.");
            }
        } catch (err) {
            setError("An unexpected error occurred. Please try again later.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 p-6 md:p-8 bg-gray-800/30 backdrop-blur-sm rounded-lg shadow-xl border border-gray-700/50">
            <h2 className="text-2xl md:text-3xl font-semibold text-center text-white">{formTitle}</h2>
<div className="text-center text-sm text-white/80 tracking-tight px-4 mt-3 mb-4">
    <p>
        We’re looking for engineers and researchers that are trying to positively impact the world. Innovators and curious minds of exceptional ability. Fill this form out if you fit the description.
    </p>
    <p className="mt-2">
        If you’re currently a student, we operate a summer open source internship program.
    </p>
</div>
            {error && <p className="text-red-400 bg-red-900/30 p-3 rounded-md text-center">{error}</p>}
            {success && <p className="text-green-400 bg-green-900/30 p-3 rounded-md text-center">{success}</p>}

            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                    What is your email address? <span className="text-red-400">*</span>
                </label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="mt-1 block w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-md shadow-sm text-white placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                    placeholder="you@example.com"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                    How do you identify? <span className="text-red-400">*</span>
                </label>
                <div className="mt-2 space-y-2 md:space-y-0 md:flex md:space-x-4">
                    {['Research', 'Engineering', 'Administration'].map((option) => (
                        <div key={option} className="flex items-center">
                            <input
                                id={`identity-${option.toLowerCase().replace(' ', '-')}`}
                                name="identity"
                                type="radio"
                                value={option}
                                checked={identity === option}
                                onChange={(e) => setIdentity(e.target.value)}
                                required
                                className="focus:ring-sky-500 h-4 w-4 text-sky-600 border-gray-500 bg-gray-700"
                            />
                            <label htmlFor={`identity-${option.toLowerCase().replace(' ', '-')}`} className="ml-2 block text-sm text-gray-300">
                                {option}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                    Evidence of Exceptional Ability <span className="text-red-400">*</span>
                </label>
                <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    className="mt-1 block w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-md shadow-sm text-white placeholder-gray-400 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                    placeholder="Your message..."
                ></textarea>
            </div>

            <div className="text-center text-xs text-gray-400">
                <p>We Are Pre-Selling our software to help us launch. <a href="https://www.queue.cx/#pricing" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline">Learn more</a>.</p>
                <p>Closed alpha available on request. <a href="https://vimeo.com/1014706363" target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:underline">Watch video</a>.</p>
            </div>

            <Button
                type="submit"
                disabled={submitting}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-sky-500 disabled:opacity-50"
            >
                {submitting ? 'Submitting...' : 'Submit'}
            </Button>

            <div className="text-center mt-4">
                <a href="https://discord.com/invite/NqGY9EWjWj" target="_blank" rel="noopener noreferrer" className="text-sm text-sky-400 hover:underline">
                    Join our community on Discord
                </a>
            </div>
        </form>
    );
}
