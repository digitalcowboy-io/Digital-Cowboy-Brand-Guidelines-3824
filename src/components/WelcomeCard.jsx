import React from 'react';
import {motion} from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const {FiEye, FiZap, FiArrowRight} = FiIcons;

const WelcomeCard = ({nextStep}) => {
  return (
    <motion.div
      initial={{scale: 0.9, opacity: 0}}
      animate={{scale: 1, opacity: 1}}
      transition={{duration: 0.5, ease: 'easeOut'}}
      className="max-w-2xl mx-auto"
    >
      <div className="relative bg-cosmos/80 backdrop-blur-xl rounded-2xl p-8 md:p-12 border border-quantum/20 shadow-2xl overflow-hidden">
        {/* Temet Nosce Background Effect */}
        <span className="temet-bg absolute inset-0 pointer-events-none font-mono text-6xl md:text-8xl text-ignite opacity-0 animate-temet mix-blend-screen flex items-center justify-center select-none">
          TEMET NOSCE
        </span>

        {/* Header */}
        <div className="text-center mb-8 relative z-10">
          <motion.h1
            initial={{y: -20, opacity: 0}}
            animate={{y: 0, opacity: 1}}
            transition={{delay: 0.3, duration: 0.5}}
            className="text-4xl md:text-5xl font-lexend font-bold text-white mb-4"
          >
            Choose the Frequency
          </motion.h1>
          <motion.div
            initial={{y: -20, opacity: 0}}
            animate={{y: 0, opacity: 1}}
            transition={{delay: 0.4, duration: 0.5}}
            className="mb-6"
          >
            <span className="block text-2xl md:text-3xl bg-gradient-to-r from-ignite to-quantum bg-clip-text text-transparent font-lexend font-bold">
              Hero Frequency
            </span>
          </motion.div>
          <motion.p
            initial={{y: -20, opacity: 0}}
            animate={{y: 0, opacity: 1}}
            transition={{delay: 0.5, duration: 0.5}}
            className="text-lg text-white/80 font-inter leading-relaxed"
          >
            Once you see your own signal, you can&apos;t un-see it. <br />
            <span className="text-white/70">Grab your chart, tap a few truths, and watch the world rearrange around them.</span>
          </motion.p>
        </div>

        {/* Binary Choice Cards */}
        <motion.div
          initial={{y: 20, opacity: 0}}
          animate={{y: 0, opacity: 1}}
          transition={{delay: 0.6, duration: 0.5}}
          className="grid md:grid-cols-2 gap-6 mb-8"
        >
          {/* Stay Curious Card */}
          <div className="flex items-start space-x-4 p-6 rounded-xl bg-quantum/10 border border-quantum/20 hover:bg-quantum/15 transition-all duration-300 hover:scale-105">
            <div className="flex-shrink-0 mt-1">
              <SafeIcon icon={FiEye} className="text-3xl text-quantum" />
            </div>
            <div>
              <h3 className="font-lexend font-semibold text-white mb-3 text-lg">Stay Curious</h3>
              <p className="text-sm text-white/70 leading-relaxed">
                Skim the surface, collect quick wins, come back any time.
              </p>
            </div>
          </div>

          {/* Go Deeper Now Card */}
          <div className="flex items-start space-x-4 p-6 rounded-xl bg-ignite/10 border border-ignite/20 hover:bg-ignite/15 transition-all duration-300 hover:scale-105">
            <div className="flex-shrink-0 mt-1">
              <SafeIcon icon={FiZap} className="text-3xl text-ignite" />
            </div>
            <div>
              <h3 className="font-lexend font-semibold text-white mb-3 text-lg">Go Deeper Now</h3>
              <p className="text-sm text-white/70 leading-relaxed">
                Crack the code, plug into your living blueprint, ride the ripple.
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{y: 20, opacity: 0}}
          animate={{y: 0, opacity: 1}}
          transition={{delay: 0.7, duration: 0.5}}
          className="text-center"
        >
          <button
            onClick={nextStep}
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-lexend font-semibold text-white bg-gradient-to-r from-ignite to-catalyst rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:rotate-1"
          >
            <span className="relative z-10">Take the Orange Arrow</span>
            <SafeIcon icon={FiArrowRight} className="ml-2 text-xl transition-transform group-hover:translate-x-1" />
            <div className="absolute inset-0 bg-gradient-to-r from-catalyst to-ignite rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
          
          {/* Micro-note */}
          <motion.p
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{delay: 0.8, duration: 0.5}}
            className="text-xs text-white/50 font-inter mt-3"
          >
            No sign-up • 5-minute dive • Restart anytime
          </motion.p>
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute -top-4 -right-4 w-32 h-32 bg-quantum/10 rounded-full blur-xl" />
        <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-ignite/10 rounded-full blur-xl" />
      </div>
    </motion.div>
  );
};

export default WelcomeCard;