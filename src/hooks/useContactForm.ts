import { useState } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import axios from "axios";
import { apiClient } from '@/utils/axiosConfig';


interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export const useContactForm = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: ''
  });

  const [status, setStatus] = useState<FormStatus>('idle');
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    if (!executeRecaptcha) {
      console.error('reCAPTCHA not available');
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
      return;
    }

    try {
      // Execute reCAPTCHA
      const token = await executeRecaptcha('contactus');

      // Get device fingerprint
      const fp = await FingerprintJS.load();
      const { visitorId } = await fp.get();

      // Submit with headers
      const response = await apiClient.post('/api/v1/Business/ContactUs', {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        website: '', // Honeypot - must be empty
        recaptchaToken: token
      }, {
        headers: {
          'X-Device-Fingerprint': visitorId
        }
      });

      // Handle response
      if (response.status === 429) {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
      } else if (response.status === 200) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return {
    formData,
    status,
    handleChange,
    handleSubmit
  };
};
