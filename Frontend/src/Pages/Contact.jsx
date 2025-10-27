import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "../components/Footer";

const MAPS_EMBED_URL = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15777.625624915655!2d125.176479!3d6.113063!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32f51f1f2e13d98f%3A0x6b4f7a1f592d3f7e!2sGeneral%20Santos%20City%2C%20South%20Cotabato!5e0!3m2!1sen!2sph!4v1633512345678";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null); 

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSubmissionStatus(null); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500)); 
      
      console.log("Form data submitted:", form); 
      setSubmissionStatus('success');
      setForm({ name: "", email: "", message: "" });
      
    } catch (error) {
      console.error("Submission error:", error);
      setSubmissionStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Navbar />

      <div
        className="min-h-screen bg-cover bg-center relative flex items-center justify-center py-20 md:py-0"
        style={{ backgroundImage: "url('/images/image.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/70"></div>

        <div className="relative z-10 flex w-full max-w-7xl mx-4 my-8 flex-col md:flex-row rounded-2xl shadow-2xl overflow-hidden backdrop-blur-sm bg-white/10 border border-white/20"> {/* Glassmorphism effect */}
          
          <div
            className="flex-1 p-8 sm:p-12 max-w-full md:max-w-xl mx-auto"
            data-aos="fade-right"
          >
            <h2 className="text-4xl font-extrabold mb-8 text-center text-white">
              Get In Touch
            </h2>

            {submissionStatus === 'success' && (
              <div className="p-4 mb-4 text-sm text-green-100 bg-green-600 rounded-lg" role="alert">
                <span className="font-medium">Success!</span> Your message has been sent. Thank you!
              </div>
            )}
            {submissionStatus === 'error' && (
              <div className="p-4 mb-4 text-sm text-red-100 bg-red-600 rounded-lg" role="alert">
                <span className="font-medium">Error!</span> There was an issue sending your message. Please try again.
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              
              <div>
                <label htmlFor="name" className="block mb-2 font-medium text-white">
                  Name:
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  aria-required="true"
                  className="w-full p-3 rounded-lg text-gray-900 bg-gray-100 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-150"
                  placeholder="Your Full Name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block mb-2 font-medium text-white">
                  Email:
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  aria-required="true"
                  className="w-full p-3 rounded-lg text-gray-900 bg-gray-100 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-150"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block mb-2 font-medium text-white">
                  Message:
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  aria-required="true"
                  className="w-full p-3 rounded-lg text-gray-900 bg-gray-100 border border-gray-300 min-h-[120px] resize-y placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-150"
                  placeholder="How can we help you?"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting} 
                className="w-full px-4 py-3 bg-yellow-500 text-white font-bold text-lg rounded-lg hover:bg-yellow-600 transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          <div
            className="flex-1 flex items-center justify-center p-0 md:p-6 bg-gray-900/50" 
            data-aos="fade-left"
          >
            <div className="p-4 md:p-0 w-full h-full min-h-[300px] md:min-h-[600px] flex items-center justify-center">
                <iframe
                    title="Location on Google Maps"
                    src={MAPS_EMBED_URL} 
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full rounded-none md:rounded-xl shadow-2xl border-none"
                    style={{minHeight: "450px"}}
                ></iframe>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;