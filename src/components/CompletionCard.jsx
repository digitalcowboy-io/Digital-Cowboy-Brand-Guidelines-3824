import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiStar, FiZap, FiTrendingUp, FiMessageCircle, FiArrowRight } = FiIcons;

const CompletionCard = ({ userData }) => {
  const handleStartJourney = () => {
    // Link to Genius Activation event
    window.open('https://example.com/genius-activation', '_blank');
  };

  const handleBuildBlueprint = () => {
    // Pass data to World-Builder module
    console.log('Building blueprint with:', userData);
    // In real app, this would navigate to blueprint builder
  };

  const handleAskOracle = () => {
    // Open RaUru GPT chat
    window.open('https://example.com/oracle-chat', '_blank');
  };

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      <div className="bg-cosmos/80 backdrop-blur-xl rounded-2xl p-8 md:p-12 border border-quantum/20 shadow-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex items-center justify-center mb-6"
          >
            <div className="relative">
              <SafeIcon 
                icon={FiStar} 
                className="text-6xl text-solar animate-pulse-glow" 
              />
              <div className="absolute -top-2 -right-2">
                <SafeIcon 
                  icon={FiZap} 
                  className="text-3xl text-ignite animate-float" 
                />
              </div>
            </div>
          </motion.div>
          
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-4xl md:text-5xl font-lexend font-bold text-white mb-4"
          >
            Your Four Codes = 
            <span className="block bg-gradient-to-r from-ignite via-quantum to-solar bg-clip-text text-transparent">
              Hero Frequency
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-lg text-white/80 font-inter leading-relaxed"
          >
            Fused together, these coordinates turn your very being into a beacon. Every next decision can now run at <em className="text-ignite">highest excitement</em>.
          </motion.p>
        </div>

        {/* Summary Cards */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="grid md:grid-cols-2 gap-6 mb-8"
        >
          <div className="bg-gradient-to-r from-ignite/20 to-catalyst/20 rounded-xl p-6 border border-ignite/30">
            <h3 className="font-lexend font-bold text-xl text-white mb-4">Your Blueprint</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-white/70">Energy Type:</span>
                <span className="text-ignite font-semibold">{userData.energyType}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/70">Profile:</span>
                <span className="text-quantum font-semibold">{userData.profile}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/70">Authority:</span>
                <span className="text-solar font-semibold">{userData.authority}</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-quantum/20 to-evergreen/20 rounded-xl p-6 border border-quantum/30">
            <h3 className="font-lexend font-bold text-xl text-white mb-4">Your Gates</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-white/70">Life's Work:</span>
                <span className="text-ignite font-semibold">Gate {userData.lifeWorkGate}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/70">Evolution:</span>
                <span className="text-quantum font-semibold">Gate {userData.evolutionGate}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/70">Radiance:</span>
                <span className="text-solar font-semibold">Gate {userData.radianceGate}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/70">Purpose:</span>
                <span className="text-evergreen font-semibold">Gate {userData.purposeGate}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="space-y-4"
        >
          <button
            onClick={handleStartJourney}
            className="group w-full relative inline-flex items-center justify-center px-8 py-4 text-lg font-lexend font-semibold text-white bg-gradient-to-r from-ignite to-catalyst rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <SafeIcon icon={FiStar} className="mr-3 text-xl" />
            <span className="relative z-10">Start My Hero's Journey</span>
            <SafeIcon 
              icon={FiArrowRight} 
              className="ml-3 text-xl transition-transform group-hover:translate-x-1" 
            />
          </button>

          <div className="grid md:grid-cols-2 gap-4">
            <button
              onClick={handleBuildBlueprint}
              className="group relative inline-flex items-center justify-center px-6 py-3 text-base font-lexend font-semibold text-white bg-gradient-to-r from-quantum to-evergreen rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <SafeIcon icon={FiTrendingUp} className="mr-2 text-lg" />
              <span className="relative z-10">Build My Brand Blueprint</span>
            </button>

            <button
              onClick={handleAskOracle}
              className="group relative inline-flex items-center justify-center px-6 py-3 text-base font-lexend font-semibold text-white bg-gradient-to-r from-solar to-ignite rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <SafeIcon icon={FiMessageCircle} className="mr-2 text-lg" />
              <span className="relative z-10">Ask the Oracle</span>
            </button>
          </div>
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute -top-6 -right-6 w-32 h-32 bg-ignite/10 rounded-full blur-xl animate-pulse-glow" />
        <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-quantum/10 rounded-full blur-xl animate-float" />
      </div>
    </motion.div>
  );
};

export default CompletionCard;