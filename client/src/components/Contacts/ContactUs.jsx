import React, { useState } from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaWhatsapp,
  FaPaperPlane,
  FaArrowRight
} from "react-icons/fa";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URI}contact/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative bg-gray-50 font-sans overflow-hidden">

      {/* --- BACKGROUND DECORATION --- */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gray-100 skew-x-12 transform origin-top-right z-0"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#FFEA00] opacity-5 rounded-full blur-3xl z-0"></div>

      <div className="container mx-auto px-6 lg:px-12 py-20 relative z-10">

        {/* --- SECTION HEADER --- */}
        <div className="text-center mb-16">
          <p className="text-[#FFEA00] bg-black inline-block px-3 py-1 text-xs font-bold uppercase tracking-widest mb-4">
            Get In Touch
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#111111]">
            Let's Start a <span className="relative inline-block">Conversation
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-[#FFEA00]" viewBox="0 0 200 9" fill="none"><path d="M2.00025 6.99997C25.7501 2.49994 132.5 -6.49991 198 3.99996" stroke="currentColor" strokeWidth="3" /></svg>
            </span>
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-0 shadow-2xl rounded-2xl overflow-hidden bg-white">

          {/* --- 1. LEFT SIDE: THE FORM --- */}
          <div className="w-full lg:w-3/5 p-10 md:p-14 bg-white" id="contact-form">
            <h3 className="text-2xl font-bold mb-6 text-[#111111]">Send us a message</h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="group">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-50 border-2 border-gray-100 rounded-lg px-4 py-3 focus:bg-white focus:border-[#FFEA00] outline-none transition-all font-medium placeholder-gray-400"
                    placeholder="Your Name"
                  />
                </div>
                <div className="group">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-50 border-2 border-gray-100 rounded-lg px-4 py-3 focus:bg-white focus:border-[#FFEA00] outline-none transition-all font-medium placeholder-gray-400"
                    placeholder="Your Email"
                  />
                </div>
              </div>

              <div className="group">
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-50 border-2 border-gray-100 rounded-lg px-4 py-3 focus:bg-white focus:border-[#FFEA00] outline-none transition-all font-medium placeholder-gray-400"
                  placeholder="Subject (e.g., Course Details)"
                />
              </div>

              <div className="group">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full bg-gray-50 border-2 border-gray-100 rounded-lg px-4 py-3 focus:bg-white focus:border-[#FFEA00] outline-none transition-all font-medium placeholder-gray-400 resize-none"
                  placeholder="Tell us how we can help..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#111111] text-white font-bold uppercase tracking-wider rounded hover:bg-[#FFEA00] hover:text-black transition-all duration-300 w-full sm:w-auto"
              >
                {loading ? "Sending..." : <>Send Message <FaPaperPlane /></>}
              </button>

              {/* Status Messages */}
              {status === "success" && (
                <div className="flex items-center gap-2 text-green-600 font-bold text-sm bg-green-50 p-3 rounded border border-green-200">
                   <span>✅ Message sent! We'll be in touch soon.</span>
                </div>
              )}
              {status === "error" && (
                <div className="flex items-center gap-2 text-red-600 font-bold text-sm bg-red-50 p-3 rounded border border-red-200">
                   <span>❌ Something went wrong. Please try again.</span>
                </div>
              )}
            </form>
          </div>

          {/* --- 2. RIGHT SIDE: CONTACT INFO --- */}
          <div className="w-full lg:w-2/5 bg-[#111111] text-white p-10 md:p-14 flex flex-col justify-between relative overflow-hidden">

            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFEA00] opacity-10 rounded-bl-full z-0"></div>

            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-8 text-[#FFEA00] uppercase tracking-widest border-b border-gray-800 pb-4 inline-block">
                Contact Info
              </h3>

              <div className="space-y-8">
                {/* Location */}
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-lg bg-gray-800 flex items-center justify-center text-[#FFEA00] group-hover:bg-[#FFEA00] group-hover:text-black transition-colors duration-300">
                    <FaMapMarkerAlt size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Our Location</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      BM Academy, Near Kottakuppam,<br/> Pondicherry – 605104
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4 group">
                   <div className="w-12 h-12 rounded-lg bg-gray-800 flex items-center justify-center text-[#FFEA00] group-hover:bg-[#FFEA00] group-hover:text-black transition-colors duration-300">
                    <FaPhoneAlt size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Phone Number</h4>
                    <p className="text-gray-400 text-sm mb-1">Mon-Sat from 10am to 7pm</p>
                    <a href="tel:+919944940051" className="text-white font-bold hover:text-[#FFEA00] transition-colors">
                      +91 99449 40051
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4 group">
                   <div className="w-12 h-12 rounded-lg bg-gray-800 flex items-center justify-center text-[#FFEA00] group-hover:bg-[#FFEA00] group-hover:text-black transition-colors duration-300">
                    <FaEnvelope size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Email Address</h4>
                    <p className="text-gray-400 text-sm mb-1">For general inquiries</p>
                    <a href="mailto:admin@abmgroups.org" className="text-white font-bold hover:text-[#FFEA00] transition-colors">
                      admin@abmgroups.org
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Link */}
            <div className="relative z-10 mt-12">
               <a
                 href="https://wa.me/919944940051"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="flex items-center gap-3 text-[#FFEA00] font-bold uppercase text-sm tracking-wider hover:text-white transition-colors"
               >
                 Chat on WhatsApp <FaArrowRight />
               </a>
            </div>

          </div>
        </div>
      </div>

      {/* --- 3. MAP SECTION (Dark Mode Style) --- */}
      <div className="w-full h-[300px] md:h-[400px] relative overflow-hidden bg-[#111111]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3903.626875932549!2d79.8142!3d11.9325!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDU1JzU3LjAiTiA3OcKwNDgnNTEuMSJF!5e0!3m2!1sen!2sin!4v1625634567890!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{
            border: 0,
            // The magic CSS filter for Dark Mode map
            filter: "grayscale(100%) invert(92%) contrast(83%)"
          }}
          allowFullScreen=""
          loading="lazy"
          title="BM Academy Location"
          className="transition-all duration-700 hover:filter-none"
        ></iframe>


      </div>

      {/* --- 4. MOBILE STICKY BAR --- */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-between px-8 py-3 md:hidden z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
        <a href="tel:+919876543210" className="flex flex-col items-center gap-1 text-gray-600 hover:text-[#FFEA00]">
          <FaPhoneAlt size={20} />
          <span className="text-[10px] font-bold uppercase">Call</span>
        </a>
        <a href="https://wa.me/919944940051" className="flex flex-col items-center gap-1 text-gray-600 hover:text-[#FFEA00]">
          <FaWhatsapp size={22} />
          <span className="text-[10px] font-bold uppercase">Chat</span>
        </a>
        <a href="#contact-form" className="flex flex-col items-center gap-1 text-gray-600 hover:text-[#FFEA00]">
          <FaEnvelope size={20} />
          <span className="text-[10px] font-bold uppercase">Email</span>
        </a>
      </div>

    </section>
  );
};

export default ContactUs;
