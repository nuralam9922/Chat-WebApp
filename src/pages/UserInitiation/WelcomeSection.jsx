import React from 'react';
import { Button } from '@material-tailwind/react';
import { BsArrowRight } from 'react-icons/bs';
import { FiEdit } from 'react-icons/fi';

function WelcomeSection({ onNextStep }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-10 md:py-0">
      {/* Header Section */}
      <header className="w-full py-6 bg-blue-600 text-white text-center rounded-md">
        <h1 className="text-3xl md:text-4xl font-bold">Welcome to ChatHub</h1>
        <p className="mt-2 text-lg">Connect, communicate, and share with your friends in real-time.</p>
      </header>

      {/* Features Section */}
      <section className="w-full max-w-6xl mx-auto mt-10 ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard icon={<BsArrowRight size={32} />} title="Send Messages" description="Chat with your friends in real-time with our secure messaging service." image="" />
          <FeatureCard icon={<FiEdit size={32} />} title="Search Friends" description="Easily search for friends and send them a friend request." image="" />
          <FeatureCard
            icon={<BsArrowRight size={32} />}
            title="Real-Time Notifications"
            description="Get notified instantly when you receive a message or friend request."
            image=""
          />
          <FeatureCard icon={<FiEdit size={32} />} title="Customizable Settings" description="Personalize your chat experience with various customization options." image="" />
          <FeatureCard icon={<BsArrowRight size={32} />} title="Friend Feeds" description="Stay updated with your friends' statuses and feeds." image={''} />
          <FeatureCard icon={<FiEdit size={32} />} title="Security Features" description="Enjoy a secure chat experience with advanced security features." image="" />
        </div>
      </section>

      {/* Getting Started Section */}
      <section className="w-full mt-10 px-4">
        <Button color="blue" size="lg" ripple="light" className="flex items-center justify-center w-full md:w-auto" onClick={onNextStep}>
          Get Started <BsArrowRight className="ml-2" />
        </Button>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description, image }) {
  return (
    <div className="flex flex-col items-center p-4 bg-white shadow rounded-lg">
      <div className="p-3 rounded-full bg-blue-600 text-white mb-4">{icon}</div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-center">{title}</h3>
        <p className="mt-2 text-gray-600 text-center">{description}</p>
      </div>
      {image && <img src={image} alt={title} className="w-full h-40 object-cover rounded-lg shadow-lg" />}
    </div>
  );
}

export default WelcomeSection;
