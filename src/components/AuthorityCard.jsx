import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiArrowRight, FiHeart, FiTarget, FiZap, FiSun, FiMic, FiBrain, FiMoon } = FiIcons;

const AuthorityCard = ({ userData, updateUserData, nextStep }) => {
  const [selectedAuthority, setSelectedAuthority] = useState(userData.authority || '');
  const [showWisdom, setShowWisdom] = useState(false);

  const authorities = [
    {
      authority: 'Emotional',
      icon: FiHeart,
      color: 'from-ignite to-catalyst',
      wisdom: 'Feel the full wave; clarity lives after the crest.'
    },
    {
      authority: 'Sacral',
      icon: FiTarget,
      color: 'from-quantum to-evergreen',
      wisdom: 'Your gut sound ("uh-huh / uh-uh") is binary truth.'
    },
    {
      authority: 'Splenic',
      icon: FiZap,
      color: 'from-solar to-ignite',
      wisdom: 'Instant knowing in the now. Trust the first impulse.'
    },
    {
      authority: 'Ego',
      icon: FiSun,
      color: 'from-evergreen to-quantum',
      wisdom: 'Heart\'s desire backed by willpower. "I want" is your compass.'
    },
    {
      authority: 'Self-Projected',
      icon: FiMic,
      color: 'from-quantum to-solar',
      wisdom: 'Speak to hear yourself. Truth emerges in conversation.'
    },
    {
      authority: 'Mental',
      icon: FiBrain,
      color: 'from-catalyst to-quantum',
      wisdom: 'Process through trusted minds. Clarity comes in dialogue.'
    },
    {
      authority: 'Lunar',
      icon: FiMoon,
      color: 'from-ignite to-evergreen',
      wisdom: 'Wait the full 29-day cycle. Time reveals the truth.'
    }
  ];

  const handleAuthoritySelect = (authority) => {
    setSelectedAuthority(authority.authority);
    updateUserData({ authority: authority.authority });
    setShowWisdom(true);
  };

  const handleContinue = () => {
    if (selectedAuthority) {
      nextStep();
    }
  };

  const selectedAuthorityData = authorities.find(a => a.authority === selectedAuthority);

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-5xl mx-auto"
    >
      <div className="bg-cosmos/80 backdrop-blur-xl rounded-2xl p-8 border border-quantum/20 shadow-2xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-lexend font-bold text-white mb-4">
            Authority
          </h2>
          <p className="text-lg text-white/80 font-inter">
            Which Authority is listed on your chart?
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {authorities.map((authority, index) => (
            <motion.button
              key={authority.authority}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              onClick={() => handleAuthoritySelect(authority)}
              className={`group relative p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105 hover:rotate-1 ${
                selectedAuthority === authority.authority
                  ? 'border-ignite bg-ignite/20 shadow-lg shadow-ignite/30'
                  : 'border-white/20 bg-white/5 hover:border-quantum/50'
              }`}
            >
              <div className="flex flex-col items-center text-center">
                <div className={`p-3 rounded-full bg-gradient-to-r ${authority.color} mb-4`}>
                  <SafeIcon icon={authority.icon} className="text-2xl text-white" />
                </div>
                <h3 className="font-lexend font-semibold text-white mb-2">
                  {authority.authority}
                </h3>
              </div>
              {selectedAuthority === authority.authority && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-ignite rounded-full flex items-center justify-center"
                >
                  <div className="w-2 h-2 bg-white rounded-full" />
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>

        <AnimatePresence>
          {showWisdom && selectedAuthorityData && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <div className="bg-gradient-to-r from-quantum/20 to-ignite/20 rounded-xl p-6 border border-quantum/30">
                <h3 className="font-lexend font-bold text-2xl text-white mb-4">
                  {selectedAuthorityData.authority} Authority
                </h3>
                <div className="bg-cosmos/50 rounded-lg p-4 border-l-4 border-ignite">
                  <p className="text-white font-inter italic text-lg leading-relaxed">
                    {selectedAuthorityData.wisdom}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {showWisdom && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mb-8"
          >
            <div className="bg-evergreen/20 rounded-xl p-6 border border-evergreen/30">
              <h3 className="font-lexend font-bold text-xl text-white mb-3">
                Strategy + Authority Guide
              </h3>
              <p className="text-white/80 font-inter mb-4">
                Tap below to download a two-page quick-start PDF for your exact type & authority.
              </p>
              <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-quantum to-evergreen rounded-lg text-white font-lexend font-semibold hover:scale-105 transition-all duration-300">
                Download Guide
                <SafeIcon icon={FiArrowRight} className="ml-2" />
              </button>
            </div>
          </motion.div>
        )}

        {selectedAuthority && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-center"
          >
            <button
              onClick={handleContinue}
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-lexend font-semibold text-white bg-gradient-to-r from-ignite to-catalyst rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <span className="relative z-10">Continue</span>
              <SafeIcon 
                icon={FiArrowRight} 
                className="ml-2 text-xl transition-transform group-hover:translate-x-1" 
              />
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default AuthorityCard;