import React, {useState} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const {FiArrowRight, FiSun, FiGlobe} = FiIcons;

const PersonalityCard = ({userData, updateUserData, nextStep}) => {
  const [lifeWorkGate, setLifeWorkGate] = useState(userData.lifeWorkGate || '');
  const [evolutionGate, setEvolutionGate] = useState(userData.evolutionGate || '');
  const [showWisdom, setShowWisdom] = useState(false);

  const handleReveal = () => {
    if (lifeWorkGate && evolutionGate) {
      updateUserData({lifeWorkGate, evolutionGate});
      setShowWisdom(true);
    }
  };

  const handleContinue = () => {
    if (lifeWorkGate && evolutionGate) {
      nextStep();
    }
  };

  const getGateWisdom = (gate) => {
    const gateWisdoms = {
      '1': 'Gate 1 • Life\'s Work – Creativity in its purest form. The world meets you first as raw, restless originality—every experiment invites new art.',
      '2': 'Gate 2 • Life\'s Work – The Receptive. Your magnetic presence draws exactly what needs to be transformed.',
      '3': 'Gate 3 • Life\'s Work – Ordering. You bring structure to chaos, one careful step at a time.',
      '4': 'Gate 4 • Life\'s Work – Mental Solutions. Your mind formulates answers before problems fully form.',
      '5': 'Gate 5 • Life\'s Work – Waiting. In your patience, perfect timing reveals itself.',
    };
    return gateWisdoms[gate] || `Gate ${gate} • Unique frequency awaiting deeper exploration.`;
  };

  return (
    <motion.div
      initial={{scale: 0.9, opacity: 0}}
      animate={{scale: 1, opacity: 1}}
      transition={{duration: 0.5}}
      className="max-w-4xl mx-auto"
    >
      <div className="bg-cosmos/80 backdrop-blur-xl rounded-2xl p-8 border border-quantum/20 shadow-2xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-lexend font-bold text-white mb-4">
            Personality Codes
          </h2>
          <p className="text-lg text-white/80 font-inter">
            Enter the Gate numbers for the top-left sun & earth on your chart
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-3 mb-3">
              <SafeIcon icon={FiSun} className="text-2xl text-ignite" />
              <h3 className="font-lexend font-semibold text-white text-lg">Life's Work Gate</h3>
            </div>
            <input
              type="number"
              value={lifeWorkGate}
              onChange={(e) => setLifeWorkGate(e.target.value)}
              placeholder="Enter gate number (1-64)"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:border-ignite focus:outline-none transition-all duration-300"
              min="1"
              max="64"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3 mb-3">
              <SafeIcon icon={FiGlobe} className="text-2xl text-quantum" />
              <h3 className="font-lexend font-semibold text-white text-lg">Evolution Gate</h3>
            </div>
            <input
              type="number"
              value={evolutionGate}
              onChange={(e) => setEvolutionGate(e.target.value)}
              placeholder="Enter gate number (1-64)"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:border-quantum focus:outline-none transition-all duration-300"
              min="1"
              max="64"
            />
          </div>
        </div>

        {lifeWorkGate && evolutionGate && !showWisdom && (
          <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.5}}
            className="text-center mb-8"
          >
            <button
              onClick={handleReveal}
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-lexend font-semibold text-white bg-gradient-to-r from-quantum to-evergreen rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <span className="relative z-10">Reveal</span>
              <SafeIcon icon={FiArrowRight} className="ml-2 text-xl transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>
        )}

        <AnimatePresence>
          {showWisdom && (
            <motion.div
              initial={{opacity: 0, y: 20}}
              animate={{opacity: 1, y: 0}}
              exit={{opacity: 0, y: -20}}
              transition={{duration: 0.5}}
              className="mb-8"
            >
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-ignite/20 to-catalyst/20 rounded-xl p-6 border border-ignite/30">
                  <h3 className="font-lexend font-bold text-xl text-white mb-3 flex items-center">
                    <SafeIcon icon={FiSun} className="text-2xl text-ignite mr-3" />
                    Life's Work Gate
                  </h3>
                  <div className="bg-cosmos/50 rounded-lg p-4 border-l-4 border-ignite">
                    <p className="text-white font-inter text-lg leading-relaxed">
                      {getGateWisdom(lifeWorkGate)}
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-quantum/20 to-evergreen/20 rounded-xl p-6 border border-quantum/30">
                  <h3 className="font-lexend font-bold text-xl text-white mb-3 flex items-center">
                    <SafeIcon icon={FiGlobe} className="text-2xl text-quantum mr-3" />
                    Evolution Gate
                  </h3>
                  <div className="bg-cosmos/50 rounded-lg p-4 border-l-4 border-quantum">
                    <p className="text-white font-inter text-lg leading-relaxed">
                      {getGateWisdom(evolutionGate)}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {showWisdom && (
          <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{delay: 0.3, duration: 0.5}}
            className="text-center"
          >
            <div className="bg-evergreen/20 rounded-xl p-6 border border-evergreen/30 mb-6">
              <p className="text-white/80 font-inter text-lg mb-4">
                Ready for the Design side?
              </p>
            </div>
            <button
              onClick={handleContinue}
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-lexend font-semibold text-white bg-gradient-to-r from-ignite to-catalyst rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <span className="relative z-10">Yes → Next</span>
              <SafeIcon icon={FiArrowRight} className="ml-2 text-xl transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default PersonalityCard;