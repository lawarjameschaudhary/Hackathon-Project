
import React from 'react';

const ContactUs = () => {
  return (
    <div className="flex flex-col items-center p-4 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">Contact Us</h1>
      <p className="text-lg text-gray-700 mb-8">
        We would love to hear from you! Please fill out the form below and we will get back to you as soon as possible.
      </p>
      <form className="w-full flex flex-col gap-4">
        <label className="flex flex-col">
          <span className="text-lg font-medium text-gray-800">Name:</span>
          <input
            type="text"
            className="p-2 border border-gray-300 rounded-lg"
            placeholder="Your Name"
            required
          />
        </label>
        <label className="flex flex-col">
          <span className="text-lg font-medium text-gray-800">Email:</span>
          <input
            type="email"
            className="p-2 border border-gray-300 rounded-lg"
            placeholder="Your Email"
            required
          />
        </label>
        <label className="flex flex-col">
          <span className="text-lg font-medium text-gray-800">Message:</span>
          <textarea
            className="p-2 border border-gray-300 rounded-lg"
            rows="4"
            placeholder="Your Message"
            required
          ></textarea>
        </label>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactUs;
