import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const form = useRef(); // Create a reference for the form

  const sendEmail = (e) => {
    e.preventDefault(); // Prevent default form submission

    emailjs
      .sendForm('service_uzkuv7l', 'template_wgckv3s', form.current, '3ERo9wAPnsHLrBSEo')
      .then(
        (result) => {
          console.log('SUCCESS!', result.text);
          alert("Email sent successfully!"); // Notify the user
          form.current.reset(); // Reset the form after submission
        },
        (error) => {
          console.log('FAILED...', error.text);
          alert("Failed to send email. Please try again."); // Notify the user of failure
        }
      );
  };

  return (
    <div className="flex flex-col items-center p-4 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">Contact Us</h1>
      <p className="text-lg text-gray-700 mb-8">
        We would love to hear from you! Please fill out the form below and we will get back to you as soon as possible.
      </p>
      <form ref={form} onSubmit={sendEmail} className="w-full flex flex-col gap-4">
        <label className="flex flex-col">
          <span className="text-lg font-medium text-gray-800">Name:</span>
          <input
            type="text"
            name="from_name" // Match this with your emailJS template fields
            className="p-2 border border-gray-300 rounded-lg"
            placeholder="Your Name"
            required
          />
        </label>
        <label className="flex flex-col">
          <span className="text-lg font-medium text-gray-800">Email:</span>
          <input
            type="email"
            name="from_email" // Match this with your emailJS template fields
            className="p-2 border border-gray-300 rounded-lg"
            placeholder="Your Email"
            required
          />
        </label>
        <label className="flex flex-col">
          <span className="text-lg font-medium text-gray-800">Contact Number:</span>
          <input
            type="text"
            name="from_phone" // Match this with your emailJS template fields
            className="p-2 border border-gray-300 rounded-lg"
            placeholder="Your Name"
            required
          />
        </label>
        <label className="flex flex-col">
          <span className="text-lg font-medium text-gray-800">Subject :</span>
          <input
            type="text"
            name="from_subject" // Match this with your emailJS template fields
            className="p-2 border border-gray-300 rounded-lg"
            placeholder="Your Name"
            required
          />
        </label>
        <label className="flex flex-col">
          <span className="text-lg font-medium text-gray-800">Message:</span>
          <textarea
            name="message" // Match this with your emailJS template fields
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

export default Contact;
