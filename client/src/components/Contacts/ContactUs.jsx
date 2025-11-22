// src/components/Contacts/ContactUs.jsx
import React, { useState } from "react";

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
        setStatus("✅ Your message has been sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("❌ Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus("⚠️ Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="bg-gradient-to-br from-yellow-50 to-white py-20 px-6"
    >
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
        {/* Left Content */}
        <div>
          <h2 className="text-3xl font-bold text-yellow-600 mb-4 pt-20">
            📞 Contact Us – Let’s Get You Started!
          </h2>
          <p className="text-gray-700 mb-4">
            🎓 Let’s Build Your Career Together! Whether you’re a student, job
            seeker, or career switcher — our team is here to help you take the
            right step forward.
          </p>
          <p className="text-sm text-gray-600 mb-6">
            🟡 Free Guidance | Fast Response | 1000+ Students Helped
          </p>

          <div className="space-y-3 text-gray-700">
            <p>
              📍 <b>BM Academy</b>, Near Kottakuppam, Pondicherry – 605104 <br />
              (Easily accessible from ECR Road and Auroville)
            </p>
            <p>
              📞 Call Us:{" "}
              <a
                href="tel:+919876543210"
                className="text-yellow-600 font-semibold"
              >
                +91-98765-43210
              </a>
            </p>
            <p>
              📧 Email:{" "}
              <a
                href="mailto:admin@abmgroups.org"
                className="text-yellow-600 font-semibold"
              >
                admin@abmgroups.org
              </a>
            </p>
            <p>⏱ Support Hours: Mon–Sat 10am–7pm | Sun – Online Support Only</p>
          </div>

          <div className="flex gap-4 mt-6">
            <a
              href="https://wa.me/919876543210"
              className="px-5 py-3 bg-green-500 text-white rounded-xl shadow hover:bg-green-600"
            >
              📲 WhatsApp Us
            </a>
            <a
              href="#contact-form"
              className="px-5 py-3 bg-yellow-400 text-black rounded-xl shadow hover:bg-yellow-500"
            >
              📝 Submit Query
            </a>
          </div>
        </div>

        {/* Right Form */}
        <div
          id="contact-form"
          className="bg-white rounded-2xl shadow-2xl p-8 pt-20"
        >
          <h3 className="text-xl font-semibold mb-6">📝 Quick Contact Form</h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="👤 Full Name"
              required
              className="w-full p-4 border rounded-xl"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="📧 Email Address"
              required
              className="w-full p-4 border rounded-xl"
            />
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="📘 Subject / Interested Course"
              required
              className="w-full p-4 border rounded-xl"
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="✍️ Message / Question"
              required
              className="w-full p-4 border rounded-xl"
            ></textarea>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-yellow-500 text-black font-bold rounded-xl shadow hover:bg-yellow-400"
            >
              {loading ? "⏳ Sending..." : "✅ Submit & Get Brochure"}
            </button>
          </form>

          {status && (
            <p className="mt-4 text-center text-sm text-gray-700">{status}</p>
          )}

          <div className="mt-6 text-sm text-gray-600">
            <p>✅ Instant confirmation email</p>
            <p>📘 Free PDF brochure</p>
            <p>📞 Call / WhatsApp follow-up within 24 hours</p>
          </div>
        </div>
      </div>

      {/* Sticky Footer CTA (Mobile Only) */}
      <div className="fixed bottom-0 left-0 right-0 bg-yellow-400 flex justify-around py-3 shadow-lg md:hidden">
        <a href="tel:+919876543210" className="font-bold">
          📞 Call Now
        </a>
        <a href="https://wa.me/919876543210" className="font-bold">
          📲 WhatsApp
        </a>
        <a href="#contact-form" className="font-bold">
          📝 Contact
        </a>
      </div>
    </section>
  );
};

export default ContactUs;
