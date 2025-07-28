import React, { useState } from "react";
import ChatWindow from "./components/ChatWindow";
import { motion } from "framer-motion";
import { TypewriterEffect } from "./components/ui/typewriter-effect";
import { DraggableCardBody, DraggableCardContainer } from "./components/ui/draggable-cards";
import logo from './assets/logo.jpg';

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
  const [showStudents, setShowStudents] = useState(false);

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
    { text: "CoPilot.CS", className: "text-blue-400" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-slate-600 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-1000"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-12 animate-pulse delay-500"></div>
      </div>

      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex items-center justify-center px-6 py-6"
      >
        <div className="flex items-center space-x-4 bg-black/20 backdrop-blur-md rounded-full px-6 py-3 border border-white/30">
          <img src={logo} alt="CSS USLS Logo" className="h-10 w-10 rounded-full ring-2 ring-white/50" />
          <div className="text-white">
            <h1 className="text-lg font-bold">Computer Science Society</h1>
            <p className="text-sm text-blue-300">University of St. La Salle</p>
          </div>
        </div>
      </motion.header>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-12"
        >
          <div className="mb-8">
            <TypewriterEffect words={words} className="text-4xl md:text-6xl font-bold" />
          </div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="text-xl text-gray-200 max-w-3xl mx-auto mb-8"
          >
            Ask me anything about our organization, events, officers, or computer science programs at USLS. 
            I'm here to help you learn more about our amazing community!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            <div className="flex items-center space-x-2 bg-blue-600/30 backdrop-blur-sm rounded-full px-4 py-2 border border-blue-400/50">
              <div className="w-2 h-2 bg-blue-300 rounded-full animate-pulse"></div>
              <span className="text-blue-300 text-sm font-medium">AI Powered</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 border border-white/50">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse delay-300"></div>
              <span className="text-white text-sm font-medium">Real-time Responses</span>
            </div>
            <div className="flex items-center space-x-2 bg-slate-600/30 backdrop-blur-sm rounded-full px-4 py-2 border border-slate-400/50">
              <div className="w-2 h-2 bg-slate-200 rounded-full animate-pulse delay-700"></div>
              <span className="text-slate-200 text-sm font-medium">Voice Enabled</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <div className="bg-black/20 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
            <div className="h-[600px]">
              <ChatWindow />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="text-center"
        >
          <button
            onClick={() => setShowStudents(!showStudents)}
            className="group bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
          >
            <span className="flex items-center space-x-2">
              <span>{showStudents ? 'Hide' : 'Meet'} Our Amazing Team</span>
              <motion.span
                animate={{ rotate: showStudents ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-lg"
              >
                ↓
              </motion.span>
            </span>
          </button>
        </motion.div>

        {showStudents && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-16"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">The Students Behind CSS</h2>
              <p className="text-xl text-gray-300">Our dedicated officers working to build an amazing CS community</p>
            </div>
            
            <div className="bg-black/20 backdrop-blur-xl rounded-3xl border border-white/20 p-8">
              <DraggableCardContainer className="relative flex min-h-screen w-full items-center justify-center overflow-hidden">
                {studentCards.map((student, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <DraggableCardBody
                      className={student.className + " absolute flex flex-col items-center justify-center bg-white/15 backdrop-blur-md rounded-xl shadow-2xl border border-white/30 min-h-96 w-80 hover:bg-white/25 transition-all duration-300 group cursor-grab active:cursor-grabbing"}
                    >
                      <div className="relative overflow-hidden rounded-lg w-full h-full">
                        <img
                          src={student.image}
                          alt={student.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        <div className="absolute bottom-4 left-4 right-4 text-white">
                          <h3 className="font-bold text-lg">{student.name}</h3>
                          <p className="text-sm text-gray-200">{student.role}</p>
                        </div>
                      </div>
                    </DraggableCardBody>
                  </motion.div>
                ))}
              </DraggableCardContainer>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default App;