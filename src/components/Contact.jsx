import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [globalError, setGlobalError] = useState('');

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Name is required";

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
        }

        if (!formData.message.trim()) {
            newErrors.message = "Message is required";
        } else if (formData.message.trim().length < 10) {
            newErrors.message = "Message must be at least 10 characters long";
        }

        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Dynamic live-validation for the message length
        if (name === 'message' && value.trim().length >= 10 && errors.message) {
            setErrors(prev => ({ ...prev, message: undefined }));
        }

        // Clear error when user starts typing (for name and email)
        if (name !== 'message' && errors[name]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }

        if (globalError) setGlobalError('');
    };

    const handleBlur = (field) => {
        const newErrors = { ...errors };
        if (field === 'name' && !formData.name.trim()) newErrors.name = "Name is required";

        if (field === 'email') {
            if (!formData.email.trim()) newErrors.email = "Email is required";
            else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Please enter a valid email address";
        }

        if (field === 'message') {
            if (!formData.message.trim()) newErrors.message = "Message is required";
            else if (formData.message.trim().length < 10) newErrors.message = "Message must be at least 10 characters long";
        }
        setErrors(newErrors);
    };

    // Disabled state is true if any field is empty or if there are visible errors
    const isFormValid = formData.name.trim() !== '' &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
        formData.message.trim().length >= 10;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsSubmitting(true);
        setGlobalError('');

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    access_key: "ba98f353-0a1f-413d-8fc7-57870f6d6349",
                    name: formData.name,
                    email: formData.email,
                    message: formData.message,
                    from_name: "Joelz Portfolio",
                    subject: `New Message from ${formData.name}`
                })
            });

            if (response.ok) {
                setIsSubmitted(true);
                setFormData({ name: '', email: '', message: '' });
            } else {
                throw new Error("Failed to send message");
            }
        } catch (err) {
            setGlobalError("There was an error sending your message. Please try again later or email me directly.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const styles = {
        section: {
            padding: '6rem 0 10rem 0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
        },
        container: {
            maxWidth: '650px',
            width: '100%',
            padding: '0 1.5rem',
            textAlign: 'center',
            position: 'relative',
            zIndex: 10,
        },
        title: {
            fontSize: '3rem',
            fontWeight: '800',
            color: 'var(--text-primary)',
            marginBottom: '1rem',
        },
        description: {
            fontSize: '1.2rem',
            color: 'var(--text-secondary)',
            marginBottom: '2.5rem',
            lineHeight: 1.6,
        }
    };

    return (
        <section id="contact" className="contact-section reveal">
            <div style={styles.container}>
                <h2 style={styles.title}>
                    Get In Touch
                </h2>

                <p style={styles.description}>
                    Creating unique digital experiences is my passion.
                    Whether you have a specific project or just want to talk tech,
                    my inbox is always open.
                </p>

                <div className="glass-card" style={{ padding: '2.5rem' }}>
                    {isSubmitted ? (
                        <div className="success-message fade-in-up">
                            <CheckCircle2 size={48} />
                            <div>
                                <h3 style={{ marginBottom: '0.5rem' }}>Message Sent!</h3>
                                <p style={{ margin: 0, color: 'var(--text-primary)' }}>Thanks for reaching out. I'll get back to you soon.</p>
                            </div>
                            <button
                                onClick={() => setIsSubmitted(false)}
                                className="btn-primary"
                                style={{ marginTop: '1.5rem', fontSize: '1rem', padding: '0.5rem 1.5rem', justifySelf: 'center' }}
                            >
                                Send Another
                            </button>
                        </div>
                    ) : (
                        <form className="contact-form fade-in-up" onSubmit={handleSubmit}>
                            {globalError && (
                                <div className="global-error-message">
                                    {globalError}
                                </div>
                            )}

                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    onBlur={() => handleBlur('name')}
                                    className={`form-input ${errors.name ? 'error' : ''}`}
                                    placeholder="John Doe"
                                    disabled={isSubmitting}
                                />
                                {errors.name && <span className="error-text">{errors.name}</span>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    onBlur={() => handleBlur('email')}
                                    className={`form-input ${errors.email ? 'error' : ''}`}
                                    placeholder="john@example.com"
                                    disabled={isSubmitting}
                                />
                                {errors.email && <span className="error-text">{errors.email}</span>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="message">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    onBlur={() => handleBlur('message')}
                                    className={`form-textarea ${errors.message ? 'error' : ''}`}
                                    placeholder="Tell me about your project..."
                                    disabled={isSubmitting}
                                />
                                {errors.message ? (
                                    <span className="error-text">{errors.message}</span>
                                ) : (
                                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                                        {formData.message.length < 10 ? `Minimum 10 characters (${formData.message.length}/10)` : 'Message length looks good!'}
                                    </span>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="btn-submit"
                                disabled={!isFormValid || isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>Sending...</>
                                ) : (
                                    <>
                                        <Send size={20} />
                                        <span>Send Message</span>
                                    </>
                                )}
                            </button>
                            <p style={{ fontSize: '0.85rem', marginTop: '1rem', opacity: 0.7, textAlign: 'center', marginBottom: 0 }}>
                                Alternatively, you can email me directly at <a href="mailto:godinezjoel@icloud.com" style={{ textDecoration: 'underline', color: 'var(--accent-color)' }}>godinezjoel@icloud.com</a>.
                            </p>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Contact;
