import React, {useState} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const {FiArrowRight, FiSun, FiGlobe} = FiIcons;

const DesignCard = ({userData, updateUserData, nextStep}) => {
  const [radianceGate, setRadianceGate] = useState(userData.radianceGate || '');
  const [purposeGate, setPurposeGate] = useState(userData.purposeGate || '');
  const [showWisdom, setShowWisdom] = useState(false);

  const handleReveal = () => {
    if (radianceGate && purposeGate) {
      updateUserData({radianceGate, purposeGate});
      setShowWisdom(true);
    }
  };

  const handleContinue = () => {
    if (radianceGate && purposeGate) {
      nextStep();
    }
  };

  const getGateWisdom = (gate) => {
    const gateWisdoms = {
      '46': 'Gate 46 • Radiance – Love of the body. Vitality rises when you treat the physical vessel as sacred ground others may follow.',
      '47': 'Gate 47 • Radiance – Realization. Your insights transform confusion into clarity for all who witness.',
      '48': 'Gate 48 • Radiance – The Well. You are the deep source others draw from in times of need.',
      '49': 'Gate 49 • Radiance – Revolution. Your principles ignite necessary change in the collective.',
      '50': 'Gate 50 • Radiance – Values. You hold the sacred codes that preserve what matters most.',
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
            Design Codes
          </h2>
          <p className="text-lg text-white/80 font-inter">
            Enter the Gate numbers for the bottom-left sun & earth on your chart
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-3 mb-3">
              <SafeIcon icon={FiSun} className="text-2xl text-solar" />
              <h3 className="font-lexend font-semibold text-white text-lg">Radiance Gate</h3>
            </div>
            <input
              type="number"
              value={radianceGate}
              onChange={(e) => setRadianceGate(e.target.value)}
              placeholder="Enter gate number (1-64)"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:border-solar focus:outline-none transition-all duration-300"
              min="1"
              max="64"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3 mb-3">
              <SafeIcon icon={FiGlobe} className="text-2xl text-evergreen" />
              <h3 className="font-lexend font-semibold text-white text-lg">Purpose Gate</h3>
            </div>
            <input
              type="number"
              value={purposeGate}
              onChange={(e) => setPurposeGate(e.target.value)}
              placeholder="Enter gate number (1-64)"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:border-evergreen focus:outline-none transition-all duration-300"
              min="1"
              max="64"
            />
          </div>
        </div>

        {radianceGate && purposeGate && !showWisdom && (
          <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.5}}
            className="text-center mb-8"
          >
            <button
              onClick={handleReveal}
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-lexend font-semibold text-white bg-gradient-to-r from-solar to-ignite rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
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
                <div className="bg-gradient-to-r from-solar/20 to-ignite/20 rounded-xl p-6 border border-solar/30">
                  <h3 className="font-lexend font-bold text-xl text-white mb-3 flex items-center">
                    <SafeIcon icon={FiSun} className="text-2xl text-solar mr-3" />
                    Radiance Gate
                  </h3>
                  <div className="bg-cosmos/50 rounded-lg p-4 border-l-4 border-solar">
                    <p className="text-white font-inter text-lg leading-relaxed">
                      {getGateWisdom(radianceGate)}
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-evergreen/20 to-quantum/20 rounded-xl p-6 border border-evergreen/30">
                  <h3 className="font-lexend font-bold text-xl text-white mb-3 flex items-center">
                    <SafeIcon icon={FiGlobe} className="text-2xl text-evergreen mr-3" />
                    Purpose Gate
                  </h3>
                  <div className="bg-cosmos/50 rounded-lg p-4 border-l-4 border-evergreen">
                    <p className="text-white font-inter text-lg leading-relaxed">
                      {getGateWisdom(purposeGate)}
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
            <button
              onClick={handleContinue}
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-lexend font-semibold text-white bg-gradient-to-r from-ignite to-catalyst rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <span className="relative z-10">Complete Journey</span>
              <SafeIcon icon={FiArrowRight} className="ml-2 text-xl transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default DesignCard;