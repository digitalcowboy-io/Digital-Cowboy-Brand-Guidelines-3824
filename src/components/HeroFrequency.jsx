import React, {useState, useEffect} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import MatrixBackground from './MatrixBackground';
import WelcomeCard from './WelcomeCard';
import EnergyTypeCard from './EnergyTypeCard';
import ProfileCard from './ProfileCard';
import AuthorityCard from './AuthorityCard';
import PersonalityCard from './PersonalityCard';
import DesignCard from './DesignCard';
import CompletionCard from './CompletionCard';

const HeroFrequency = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userData, setUserData] = useState({
    energyType: '',
    profile: '',
    authority: '',
    lifeWorkGate: '',
    evolutionGate: '',
    radianceGate: '',
    purposeGate: '',
  });

  const steps = [
    {component: WelcomeCard, title: 'Welcome'},
    {component: EnergyTypeCard, title: 'Energy Type'},
    {component: ProfileCard, title: 'Profile Lines'},
    {component: AuthorityCard, title: 'Authority'},
    {component: PersonalityCard, title: 'Personality Codes'},
    {component: DesignCard, title: 'Design Codes'},
    {component: CompletionCard, title: 'Your Hero Frequency'},
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateUserData = (data) => {
    setUserData(prev => ({...prev, ...data}));
  };

  const CurrentComponent = steps[currentStep].component;

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-cosmos via-evergreen to-cosmos overflow-hidden">
      <MatrixBackground />
      
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-cosmos/50 z-50">
        <motion.div
          className="h-full bg-gradient-to-r from-quantum to-ignite"
          initial={{width: 0}}
          animate={{width: `${((currentStep + 1) / steps.length) * 100}%`}}
          transition={{duration: 0.5, ease: 'easeInOut'}}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{opacity: 0, x: 50}}
              animate={{opacity: 1, x: 0}}
              exit={{opacity: 0, x: -50}}
              transition={{duration: 0.3}}
            >
              <CurrentComponent
                userData={userData}
                updateUserData={updateUserData}
                nextStep={nextStep}
                prevStep={prevStep}
                currentStep={currentStep}
                totalSteps={steps.length}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-50">
        {steps.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentStep(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentStep
                ? 'bg-quantum shadow-lg shadow-quantum/50'
                : index < currentStep
                ? 'bg-ignite'
                : 'bg-white/20'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroFrequency;