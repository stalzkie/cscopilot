import React, { useState, useRef, useEffect } from "react"; // Import useRef and useEffect
import ChatWindow from "./components/ChatWindow";
import { motion } from "framer-motion";
import {
  Navbar,
  NavBody,
  MobileNav,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "./components/ui/resizable-navbar";
import { TypewriterEffect } from "./components/ui/typewriter-effect";
import { DraggableCardBody, DraggableCardContainer } from "./components/ui/draggable-cards";

// Import the logo image from src/assets
import logo from './assets/logo.jpg';

// Import student images
import academicAffairsImg from './assets/cards/academic-affairs.jpg';
import advocaciesImg from './assets/cards/advocacies.jpg';
import budgetImg from './assets/cards/budget.jpg';
import humanRelationsImg from './assets/cards/human-relations.jpg';
import logisticsImg from './assets/cards/logistics.jpg';
import presidentImg from './assets/cards/president.jpg';
import publicRelationsImg from './assets/cards/public-relations.jpg';
import secretaryImg from './assets/cards/secretary.jpg';
import sportsImg from './assets/cards/sports.jpg';
import treasurerImg from './assets/cards/treasurer.jpg';
import vicePresidentImg from './assets/cards/vice-president.jpg';


// Dummy data for navigation items (still used for mobile menu)
const navItems = [
  { name: "Home", link: "#" },
  { name: "About", link: "#about" },
  { name: "Services", link: "#services" },
  { name: "Contact", link: "#contact" },
];

// Data for the student cards
const studentCards = [
  { name: "President", image: presidentImg, role: "President", className: "top-10 left-[20%] rotate-[-5deg]" },
  { name: "Vice President", image: vicePresidentImg, role: "Vice President", className: "top-40 left-[25%] rotate-[-7deg]" },
  { name: "Secretary", image: secretaryImg, role: "Secretary", className: "top-5 left-[40%] rotate-[8deg]" },
  { name: "Treasurer", image: treasurerImg, role: "Treasurer", className: "top-32 left-[55%] rotate-[10deg]" },
  { name: "Academic Affairs", image: academicAffairsImg, role: "Academic Affairs", className: "top-20 right-[35%] rotate-[2deg]" },
  { name: "Advocacies", image: advocaciesImg, role: "Advocacies", className: "top-24 left-[45%] rotate-[-7deg]" },
  { name: "Budget", image: budgetImg, role: "Budget", className: "top-8 left-[30%] rotate-[4deg]" },
  { name: "Human Relations", image: humanRelationsImg, role: "Human Relations", className: "top-10 left-[10%] rotate-[5deg]" },
  { name: "Logistics", image: logisticsImg, role: "Logistics", className: "top-50 left-[5%] rotate-[-3deg]" },
  { name: "Public Relations", image: publicRelationsImg, role: "Public Relations", className: "top-15 right-[10%] rotate-[6deg]" },
  { name: "Sports", image: sportsImg, role: "Sports", className: "top-25 left-[60%] rotate-[-9deg]" },
];


const App: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true); // State for navbar visibility
  const studentsHeaderRef = useRef<HTMLDivElement>(null); // Ref for the target header section

  // Define words for the TypewriterEffect
  const words = [
    { text: "Build" },
    { text: "awesome" },
    { text: "things" },
    { text: "at" },
    { text: "CSS" },
    { text: "USLS," },
    { text: "like" },
    { text: "this" },
    { text: "AI" },
    { text: "Chatbot" },
    { text: "called" },
    { text: "CoPilot.CS", className: "text-blue-500" }, // This class applies the blue color
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (studentsHeaderRef.current) {
        const headerTop = studentsHeaderRef.current.getBoundingClientRect().top;
        // The Navbar will hide when the top of the "The Students behind CSS" header
        // is within 100 pixels from the top of the viewport.
        const threshold = 100;
        setIsNavbarVisible(headerTop > threshold);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty dependency array means this runs once on mount and cleans up on unmount

  return (
    <div className="flex min-h-screen flex-col bg-neutral-900">
      <motion.div // Wrap Navbar with motion.div for animation
        initial={{ y: 0 }}
        animate={{ y: isNavbarVisible ? 0 : -100 }} // Moves the navbar up by 100px to hide it
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 right-0 z-50 pt-4" // Added pt-4 for padding above the navbar
      >
        <Navbar>
          {/* Desktop Navbar */}
          <NavBody className="justify-center">
            <div className="flex items-center justify-center w-full">
              <img src={logo} alt="Logo" className="h-8 w-auto rounded-full mr-2" />
              <span className="text-xl font-semibold text-white">Welcome to CoPilot.CS</span>
            </div>
          </NavBody>

          {/* Mobile Navbar */}
          <MobileNav>
            <MobileNavHeader className="justify-center">
              <div className="flex items-center">
                <img src={logo} alt="Logo" className="h-6 w-auto rounded-full mr-2" />
                <span className="text-lg font-semibold text-white">Welcome to CoPilot.CS</span>
              </div>
              <MobileNavToggle
                  isOpen={isMobileMenuOpen}
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                />
            </MobileNavHeader>
            <MobileNavMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
              {navItems.map((item, idx) => (
                <a
                  key={idx}
                  href={item.link}
                  className="block px-4 py-2 text-neutral-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </MobileNavMenu>
          </MobileNav>
        </Navbar>
      </motion.div>

      {/* Main Content Area */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        // Adjusted pt-20 to pt-28 to account for the navbar's padding-top
        className="flex-1 w-full px-4 md:px-8 lg:px-16 xl:px-60 pt-28 pb-10"
      >
        <div className="mt-20 mb-10">
          <TypewriterEffect words={words} />
        </div>
        <ChatWindow />

        {/* New Section: The Students behind CSS - Ref attached here for scroll tracking */}
        <div ref={studentsHeaderRef} className="mt-20 mb-10 text-center">
          <h2 className="text-4xl font-bold text-white mb-10">The Students behind CSS</h2>
          <DraggableCardContainer className="relative flex min-h-screen w-full items-center justify-center overflow-hidden">
            {studentCards.map((student, index) => (
              <DraggableCardBody
                key={index}
                className={student.className + " absolute flex flex-col items-center justify-center bg-neutral-700 rounded-lg shadow-md min-h-96 w-80"}
              >
                <img
                  src={student.image}
                  alt={student.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </DraggableCardBody>
            ))}
          </DraggableCardContainer>
        </div>
      </motion.div>
    </div>
  );
};

export default App;