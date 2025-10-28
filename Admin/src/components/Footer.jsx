import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="bg-gray-900 text-gray-300 py-10 px-6 md:px-16">
        <div
          className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10"
          data-aos="fade-up"
        >
          <div data-aos="fade-right">
            <h2 className="text-2xl font-semibold text-yellow-400 mb-3">
              NewLand
            </h2>
            <p className="text-sm leading-relaxed">
              Building solutions through technology and creativity. We aim to
              inspire innovation for a better future.
            </p>
          </div>

          <div data-aos="fade-left">
            <h3 className="text-xl font-semibold text-yellow-400 mb-3">
              Contact
            </h3>
            <p className="text-sm">📧 gilmiercabil@gmail.com</p>
            <p className="text-sm">📞 +63 936 508 1533</p>

            <div className="flex space-x-4 mt-4">
              <a href="#" className="hover:text-yellow-400 transition">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="hover:text-yellow-400 transition">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="hover:text-yellow-400 transition">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="hover:text-yellow-400 transition">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
        </div>

        <div
          className="text-center border-t border-gray-700 mt-10 pt-5 text-sm text-gray-400"
          data-aos="fade-up"
        >
          © {new Date().getFullYear()} MyWebsite — All Rights Reserved
        </div>
      </footer>
    </div>
  );
};

export default Footer;
