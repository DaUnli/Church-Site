import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "../components/Navbar";
import Uploads from "../components/Uploads";

const MAPS_EMBED_URL = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15777.625624915655!2d125.176479!3d6.113063!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32f51f1f2e13d98f%3A0x6b4f7a1f592d3f7e!2sGeneral%20Santos%20City%2C%20South%20Cotabato!5e0!3m2!1sen!2sph!4v1633512345678";

const Icon = ({ children, className }) => (
  <div className={`text-3xl font-bold ${className}`}>{children}</div>
);

const Home = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="font-sans antialiased text-gray-800 bg-gray-50">
      <Navbar />

      <section
        className="relative bg-cover bg-center bg-no-repeat h-screen flex items-center justify-center text-center"
        style={{ backgroundImage: "url('/images/image.jpg')" }}
      >
        <div className="absolute inset-0 bg-neutral-900/70"></div>
        <div className="relative z-10 p-6 max-w-4xl" data-aos="fade-up">
          <p className="text-xl text-yellow-400 font-semibold mb-3 tracking-widest">
            NEW LAND SEVENTH-DAY ADVENTIST CHURCH
          </p>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-white leading-tight">
            Journeying Together With Christ
          </h1>
          <a
            href="#about"
            className="inline-block bg-yellow-600 text-white hover:bg-yellow-700 transition duration-300 px-8 py-3 rounded-full text-lg font-bold shadow-lg shadow-yellow-600/50"
            data-aos="zoom-in"
            data-aos-delay="500"
          >
            Plan Your Visit 🗓️
          </a>
        </div>
      </section>

      <section id="about" className="" style={{ backgroundImage: "url('/images/image2.jpeg')" }}>
        <div className="max-w-6xl mx-auto h-screen flex flex-col md:flex-row items-center gap-12"
        
          >
          <div className="md:w-1/2" data-aos="fade-right">
            <h2 className="text-base text-yellow-600 font-bold uppercase tracking-widest mb-2">
              Our Story
            </h2>
            <h3 className="text-4xl font-extrabold text-gray-900 mb-6">
              Welcome Home to New Land SDA Church
            </h3>
            <p className="mb-4 text-gray-600 leading-relaxed">
              We are a community united by faith in Jesus Christ, called to live
              out His gospel in General Santos City and beyond. Our mission is
              to share the everlasting gospel, nurture believers, and serve our
              community with the love of God.
            </p>
            <p className="mb-6 text-gray-600 leading-relaxed font-semibold">
              <span className="text-yellow-600">Join us</span> every Sabbath as
              we journey together in faith, hope, and love.
            </p>
            <a
              href="#"
              className="text-yellow-600 font-semibold hover:text-yellow-700 transition"
            >
              Read Our Full Statement of Beliefs →
            </a>
          </div>
          <div className="md:w-1/2 relative" data-aos="fade-left">
            <div className="w-full h-80 bg-gray-200 rounded-lg shadow-2xl overflow-hidden">
              <img
                src="images/church-interior.jpg"
                alt="Church Interior"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="ministries" className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-base text-yellow-600 font-bold uppercase tracking-widest mb-2">
            Serve & Connect
          </h2>
          <h3 className="text-4xl font-extrabold text-gray-900 mb-12">
            Our Core Ministries
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            <div
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition duration-500 ease-in-out transform hover:-translate-y-1"
              data-aos="flip-up"
            >
              <Icon className="text-yellow-600 mb-4">🎓</Icon>
              <h4 className="text-xl font-bold mb-3">Youth Ministry</h4>
              <p className="text-gray-600">
                Guiding our young people to a closer walk with Christ through
                fellowship, study, and service.
              </p>
            </div>

            <div
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition duration-500 ease-in-out transform hover:-translate-y-1"
              data-aos="flip-up"
              data-aos-delay="200"
            >
              <Icon className="text-yellow-600 mb-4">🎶</Icon>
              <h4 className="text-xl font-bold mb-3">Worship & Music</h4>
              <p className="text-gray-600">
                Leading the congregation in meaningful praise and adoration,
                preparing hearts for the Word.
              </p>
            </div>

            <div
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition duration-500 ease-in-out transform hover:-translate-y-1"
              data-aos="flip-up"
              data-aos-delay="400"
            >
              <Icon className="text-yellow-600 mb-4">🕊️</Icon>
              <h4 className="text-xl font-bold mb-3">Missions & Outreach</h4>
              <p className="text-gray-600">
                Actively serving the physical and spiritual needs of our General
                Santos community.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-16 px-6 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2
            className="text-4xl font-extrabold mb-8 text-yellow-400"
            data-aos="fade-down"
          >
            Join Us This Week
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div
              className="bg-gray-800 p-6 rounded-lg shadow-xl"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <h4 className="text-xl font-bold mb-2 text-yellow-400">
                Sabbath Worship
              </h4>
              <p className="text-sm mb-4 text-gray-300">Saturdays</p>
              <p className="text-3xl font-extrabold">9:00 AM</p>
              <p className="text-gray-400 mt-2">Sabbath School starts</p>
              <p className="text-3xl font-extrabold mt-4">11:00 AM</p>
              <p className="text-gray-400">Worship Service</p>
            </div>
            <div
              className="bg-gray-800 p-6 rounded-lg shadow-xl"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <h4 className="text-xl font-bold mb-2 text-yellow-400">
                Prayer Meeting
              </h4>
              <p className="text-sm mb-4 text-gray-300">Wednesdays</p>
              <p className="text-3xl font-extrabold">7:00 PM</p>
              <p className="text-gray-400 mt-2">Mid-week spiritual renewal</p>
            </div>
            <div
              className="bg-gray-800 p-6 rounded-lg shadow-xl"
              data-aos="fade-up"
              data-aos-delay="500"
            >
              <h4 className="text-xl font-bold mb-2 text-yellow-400">
                Vespers / Fellowship
              </h4>
              <p className="text-sm mb-4 text-gray-300">Fridays</p>
              <p className="text-3xl font-extrabold">7:00 PM</p>
              <p className="text-gray-400 mt-2">Welcoming the Sabbath</p>
            </div>
          </div>
        </div>
      </section>

      <section id="events" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-base text-yellow-600 font-bold uppercase tracking-widest mb-2">
            What's Happening
          </h2>
          <h3 className="text-4xl font-extrabold text-gray-900 mb-12">
            Upcoming Events
          </h3>

          <div className="grid md:grid-cols-2 gap-8 text-left">
            <div
              className="flex bg-gray-100 rounded-xl shadow-lg overflow-hidden"
              data-aos="fade-up"
            >
              <div className="flex-shrink-0 w-24 bg-yellow-600 text-white flex flex-col items-center justify-center p-3">
                <span className="text-2xl font-extrabold">27</span>
                <span className="text-sm uppercase">OCT</span>
              </div>
              <div className="p-4 flex-grow">
                <h4 className="text-xl font-bold text-gray-900">
                  Annual Community Health Fair
                </h4>
                <p className="text-sm text-gray-600 mb-2">
                  <span className="font-semibold mr-1">Time:</span> 9:00 AM -
                  1:00 PM
                </p>
                <p className="text-sm text-gray-600">
                  Free medical checkups, dental services, and health seminars
                  for everyone.
                </p>
              </div>
            </div>

            <div
              className="flex bg-gray-100 rounded-xl shadow-lg overflow-hidden"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="flex-shrink-0 w-24 bg-yellow-600 text-white flex flex-col items-center justify-center p-3">
                <span className="text-2xl font-extrabold">10</span>
                <span className="text-sm uppercase">NOV</span>
              </div>
              <div className="p-4 flex-grow">
                <h4 className="text-xl font-bold text-gray-900">
                  Youth Rally Night (Concert)
                </h4>
                <p className="text-sm text-gray-600 mb-2">
                  <span className="font-semibold mr-1">Time:</span> 6:00 PM -
                  8:30 PM
                </p>
                <p className="text-sm text-gray-600">
                  Inspirational music, testimony, and fellowship for young
                  adults and teens.
                </p>
              </div>
            </div>
          </div>
          <a
            href="#"
            className="mt-10 inline-block text-yellow-600 font-semibold hover:text-yellow-700 transition border border-yellow-600 px-6 py-2 rounded-full"
          >
            View All Events
          </a>
        </div>
      </section>

      <section className="py-12 px-6 bg-gray-200">
        <div className="max-w-6xl mx-auto">
          <Uploads />
        </div>
      </section>

      <footer
        className="bg-neutral-900 text-gray-300 py-16 px-6"
        data-aos="fade-up"
      >
        <div className="max-w-6xl mx-auto flex flex-wrap justify-between gap-10">
          <div>
            <h3 className="text-lg font-semibold mb-5 text-white">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li className="hover:text-yellow-600 transition cursor-pointer">
                Service Times
              </li>
              <li className="hover:text-yellow-600 transition cursor-pointer">
                Contact Us
              </li>
              <li className="hover:text-yellow-600 transition cursor-pointer">
                Calendar of Events
              </li>
              <li className="hover:text-yellow-600 transition cursor-pointer">
                Donate Online
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-5 text-white">
              Contact & Location
            </h3>
            <p className="mb-2 text-yellow-400 font-medium">
              New Land Seventh-day Adventist Church
            </p>
            <p className="mb-4">
              Purok Lanton, General Santos City, 9500 South Cotabato,
              Philippines
            </p>
            <p className="text-sm">Email: church@example.com</p>
            <p className="text-sm">Phone: (083) 123-4567</p>
          </div>

          <div className="w-full md:w-1/3">
            <h3 className="text-lg font-semibold mb-5 text-white">Find Us</h3>
            <iframe
              title="New Land SDA Church Location"
              src={MAPS_EMBED_URL}
              width="100%"
              height="200"
              className="rounded-lg border-0 shadow-lg"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
        <div className="text-center pt-10 mt-10 border-t border-gray-700 text-sm text-gray-500">
          © {new Date().getFullYear()} New Land SDA Church. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Home;
