import React from "react";

function About() {
  return (
    <div className="h-screen w-screen p-6 bg-gray-50">
      <h1 className="text-purple-700 text-4xl font-bold mb-4 text-center">About Us</h1>
      <h2 className="text-gray-800 text-2xl font-semibold text-center mb-6">
        Welcome to The Blooming Pen
      </h2>

      <section className="mb-8">
        <p className="text-gray-700 text-lg mb-4">
          The Blooming Pen is your sanctuary for self-expression, a space where words blossom into 
          stories, and creativity thrives. This isn’t just another platform—it’s your canvas to craft 
          tales, share insights, and connect with a vibrant community of storytellers.
        </p>
        <p className="text-gray-700 text-lg mb-4">
          Our platform is designed for those who love the art of storytelling, enabling you to:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700 text-lg">
          <li>
            <span className="font-semibold">Unleash Your Creativity:</span> Write compelling stories, 
            thoughtful reflections, and heartfelt messages that resonate.
          </li>
          <li>
            <span className="font-semibold">Build Connections:</span> Engage with fellow writers and 
            readers who share your passion for storytelling.
          </li>
          <li>
            <span className="font-semibold">Inspire and Get Inspired:</span> Explore diverse perspectives 
            and find motivation from a community of creators.
          </li>
        </ul>
      </section>

      <section className="mb-8 bg-purple-100 p-6 rounded-lg">
        <h2 className="text-purple-700 text-3xl font-bold mb-4">Our Mission</h2>
        <p className="text-gray-700 text-lg mb-4">
          At The Blooming Pen, our mission is to empower individuals to share their unique voices 
          through the written word. Whether you’re a seasoned writer or someone just discovering the 
          joy of storytelling, our platform is here to nurture your creativity.
        </p>
        <p className="text-gray-700 text-lg">
          We believe that every story has the power to inspire, connect, and transform, and we’re 
          committed to providing a space where your ideas can bloom.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-purple-700 text-3xl font-bold mb-4">What Makes Us Unique?</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700 text-lg">
          <li>
            <span className="font-semibold">A Focus on Storytelling:</span> A platform designed 
            specifically for those who love to write and share meaningful content.
          </li>
          <li>
            <span className="font-semibold">Supportive Community:</span> Join a welcoming group of 
            writers and readers who encourage and celebrate creativity.
          </li>
          <li>
            <span className="font-semibold">Customizable Experience:</span> Tailor your posts to 
            reflect your personal style and voice.
          </li>
        </ul>
      </section>

      <section className="text-center">
        <h2 className="text-purple-700 text-3xl font-bold mb-4">Join The Blooming Pen Community</h2>
        <p className="text-gray-700 text-lg mb-4">
          Ready to start your creative journey? Whether you’re sharing your thoughts, experiences, or 
          a piece of your imagination, The Blooming Pen is the perfect place to let your ideas flourish.
        </p>
        <p className="text-gray-700 text-lg">
          Let’s grow together—one story at a time.
        </p>
      </section>
    </div>
  );
}

export default About;

