import React from "react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate(); 

  const handleClick = () => {
    navigate("/contactus"); route
  };

  return (
    <div className="flex flex-col items-center px-4 sm:px-6 md:px-8 lg:px-12">
      <div className="flex flex-col md:flex-row md:items-baseline gap-[20px] md:gap-[40px] mt-[20px]">
        <span className="font-sabai text-2xl md:text-3xl text-gay">About</span>
        <span className="text-4xl md:text-5xl font-logo text-xer">Mero Kaam</span>
      </div>
      <div className="border border-gray-800 w-full max-w-4xl mt-4 md:mt-8 p-4">
        <div className="flex flex-col mb-4">
          <h1 className="text-black font-bold text-2xl md:text-3xl">WHO WE ARE</h1>
          <p className="text-base md:text-lg text-gray-700">
            We're a sales performance agency. We've been helping local people
            with the use of locally available workers with less hassle than in
            the traditional way of searching workers for the respective field of
            work since 2024. We're a proud Hotspot and pride ourselves on using
            the best tools to help our clients search for online jobs and
            provide help at the local level. Our team is made up of smart and
            talented people who are passionate about creating inbound
            opportunities!
          </p>
        </div>
        <div className="flex flex-col mb-4">
          <h2 className="text-black font-bold text-2xl md:text-3xl">WE'RE DIFFERENT THAN THE REST</h2>
          <p className="text-base md:text-lg text-gray-700">
            We're rooted in sales. Our agency has been helping local people get
            talented workers into performance for almost a year. Unlike other
            marketing agencies where we are often driven by commissions and poor user
            experience, we dedicate ourselves as a direct link between workers and
            people looking for job opportunities. We deliver inbound sales results
            because we've done it ourselves. <br />
            We've been through a lot to get jobs and find workers to do our jobs, so we
            needed to grow and diversify. That's why we thought of and generated
            new business at <span className="font-arkko text-xer text-lg">Mero Kaam</span>.
            Once we mastered the art of using thought leadership content for
            lead generation, we launched <span className="font-arkko text-xer text-lg">Mero Kaam</span>
            to help people do the exact same thing.
          </p>
        </div>
        <div className="flex justify-center mt-6 md:mt-8 mb-4 h-[50px]">
          <button
            className="bg-gay text-white border border-transparent rounded-xl py-2 px-4 text-base md:text-lg hover:bg-xer"
            onClick={handleClick}
          >
            Contact us
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
