import { useEffect, useState } from 'react';
import messageIcon from '/message-icon.png';
import SignUpForm from './SignUpForm';
import LoginForm from './LoginForm';

const Home = () => {
  const PHoptions1 = ["message", "confession", "question", "opinion"];
  const PHoptions2 = ["a friend", "a crush", "an admirer", "a family"];

  const [text1, setText1] = useState("");
  const [textIndex1, setTextIndex1] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentIndex2, setCurrentIndex2] = useState(0);
  const [slideUpClass, setSlideUpClass] = useState("slide-in");

  const [animateIcon, setAnimateIcon] = useState(false);
  const [showSignUpForm, setShowSignUpForm] = useState(false); // Track SignUpForm
  const [showLoginForm, setShowLoginForm] = useState(false);   // Track LoginForm

  // Typing effect logic for PHoptions1
  useEffect(() => {
    let typingSpeed = isDeleting ? 75 : 150;
    const handleTyping = setTimeout(() => {
      const currentText = PHoptions1[textIndex1];
      setText1(
        isDeleting
          ? currentText.substring(0, text1.length - 1)
          : currentText.substring(0, text1.length + 1)
      );

      // Toggle deleting state when the word is fully typed or deleted
      if (!isDeleting && text1 === currentText) {
        setTimeout(() => setIsDeleting(true), 1000); // Pause before deleting
      } else if (isDeleting && text1 === "") {
        setIsDeleting(false);
        setTextIndex1((prevIndex) => (prevIndex + 1) % PHoptions1.length);
      }
    }, typingSpeed);

    return () => clearTimeout(handleTyping);
  }, [text1, isDeleting, textIndex1, PHoptions1]);

  // Slide-up effect logic for PHoptions2
  useEffect(() => {
    const interval2 = setInterval(() => {
      setSlideUpClass("slide-out"); // Slide out the current text

      setTimeout(() => {
        setCurrentIndex2((prevIndex) => (prevIndex + 1) % PHoptions2.length);
        setSlideUpClass("slide-in"); // Slide in the new text
      }, 600); // Duration of slide-out animation

    }, 3000); // Changes every 3 seconds

    return () => clearInterval(interval2);
  }, [PHoptions2.length]);

  // Trigger animation on mount
  useEffect(() => {
    setAnimateIcon(true);
  }, []);

  return (
    <div className="py-16 relative isolate px-4 lg:px-10">
      <h1 className="text-center font-bold text-4xl text-near-white p-10 mb-6">
        Get an anonymous
        <br />
        <span className="font-Salsa text-gradient typewriter h-[40px]">
          {text1}
        </span>
        <br />
        <span className="inline-block">from</span>{" "}
        <span className="overflow-hidden">
          <span
            className={`font-Salsa text-gradient inline-block ${slideUpClass}`}
          >
            {PHoptions2[currentIndex2]}
          </span>
        </span>
      </h1>

      {/* Buttons */}
      <div className="flex mx-auto w-fit gap-6">
        <button
          className="bg-near-white py-2 px-4 rounded-full font-semibold text-center block hover:bg-white hover:scale-110 transition-transform"
          onClick={() => setShowSignUpForm(true)} // Show SignUpForm
        >
          Create Profile
        </button>
        <button
          className="bg-gradient py-2 px-4 rounded-full font-semibold text-center text-near-white block hover:bg-white hover:scale-110 transition-transform"
          onClick={() => setShowLoginForm(true)} // Show LoginForm
        >
          Login
        </button>
      </div>

      {/* Description */}
      <div className="description py-10">
        <h1 className="text-3xl font-bold mb-4 text-white">How It Works</h1>
        <p className="text-lg text-near-white leading-relaxed">
          Create your anonymous messaging profile and start receiving messages from friends, fans, and secret admirers! 
          Share your unique link across social media platforms and let others send you anonymous messages, confessions, and questions without revealing their identity.
          View and manage all your anonymous messages in one place. Whether it’s for fun, curiosity, or finding out hidden opinions, our app offers a safe and exciting way to discover what people really think about you. 
          It's simple, secure, and totally anonymous — share, receive, and engage!
        </p>
      </div>

      <div className="flex mx-auto w-fit gap-6">
        <button
          className="bg-near-white py-2 px-4 rounded-full font-semibold text-center block hover:bg-white hover:scale-110 transition-transform"
          onClick={() => setShowSignUpForm(true)} // Show SignUpForm
        >
          Create Profile
        </button>
        <button
          className="bg-gradient py-2 px-4 rounded-full font-semibold text-center text-near-white block hover:bg-white hover:scale-110 transition-transform"
          onClick={() => setShowLoginForm(true)} // Show LoginForm
        >
          Login
        </button>
      </div>

      {/* Message icon animation */}
      {animateIcon && (
        <img
          src={messageIcon}
          alt="Message Icon"
          className="icon-slide-up w-[250px] lg:w-[400px]"
        />
      )}

      {/* Conditional rendering of forms */}
      {showSignUpForm && <SignUpForm onClose={() => setShowSignUpForm(false)} />}
      {showLoginForm && <LoginForm onClose={() => setShowLoginForm(false)} />}
    </div>
  );
};

export default Home;