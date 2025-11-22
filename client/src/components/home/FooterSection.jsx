import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 px-4 sm:px-6 md:px-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Section */}
        <div>
          <h3 className="text-lg sm:text-xl font-semibold mb-2">BM Academy</h3>
          <p className="text-sm sm:text-base">
            Empowering students with skills, career clarity, and scholarship
            support across Tamil Nadu and Pondicherry.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg sm:text-xl font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-2 text-sm sm:text-base">
            <li>
              <a href="/courses" className="hover:underline">
                Courses
              </a>
            </li>
            <li>
              <a href="/sact" className="hover:underline">
                SACT Test
              </a>
            </li>
            <li>
              <a href="/about" className="hover:underline">
                About Us
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="text-lg sm:text-xl font-semibold mb-2">Get in Touch</h3>
          <p className="text-sm sm:text-base">📍 Kottakuppam, Pondicherry</p>
          <p className="text-sm sm:text-base">📱 +91-98765-43210</p>
          <p className="text-sm sm:text-base">📧 info@bmacademy.in</p>
          <p className="mt-2 text-sm sm:text-base">
            💬{" "}
            <a
              href="https://wa.me/919876543210"
              className="text-green-400 hover:underline"
            >
              WhatsApp Us
            </a>
          </p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-8 text-center text-xs sm:text-sm text-gray-400">
        © {new Date().getFullYear()} BM Academy | Powered by ABM GROUPS
      </div>
    </footer>
  );
};

export default Footer;
