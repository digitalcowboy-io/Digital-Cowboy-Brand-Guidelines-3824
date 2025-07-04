import React, {useState, useEffect} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import supabase from '../lib/supabase';

const {FiArrowRight, FiUsers, FiMessageCircle, FiTarget, FiEye, FiStar, FiBookOpen, FiMoon} = FiIcons;

const ProfileCard = ({userData, updateUserData, nextStep}) => {
  const [selectedProfile, setSelectedProfile] = useState(userData.profile || '');
  const [showWisdom, setShowWisdom] = useState(false);
  const [showRichContent, setShowRichContent] = useState(false);
  const [profileData, setProfileData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fallback profile data (in case Supabase fails)
  const fallbackProfileData = [
    {
      id: '1/3',
      title: '1/3 Investigator–Martyr',
      archetype: 'Trailblazing Researcher',
      motto: 'Research it, then crash-test it.',
      conscious: 'Investigator – craves bedrock knowledge.',
      unconscious: 'Martyr – learns by trial & error.',
      need_to_know: 'Security = research • Wisdom = real-world oops.',
      rarity: '≈14% of population',
      famous: 'Sigmund Freud, Tim Ferriss',
      quote: 'There are no mistakes, only discoveries.'
    },
    {
      id: '1/4',
      title: '1/4 Investigator–Opportunist',
      archetype: 'Specialist with a Network',
      motto: 'Master it deeply—share it with my circle.',
      conscious: 'Investigator – builds unshakable foundation.',
      unconscious: 'Opportunist – spreads insight through friends.',
      need_to_know: 'Become the go-to expert for your trusted crew.',
      rarity: '≈2%',
      famous: 'Albert Einstein, Beyoncé',
      quote: 'Knowledge only matters once it is shared.'
    },
    {
      id: '2/4',
      title: '2/4 Hermit–Opportunist',
      archetype: 'Natural Talent Called Out',
      motto: 'I hide to hone; my friends pull me onstage.',
      conscious: 'Hermit – needs solo time to perfect gifts.',
      unconscious: 'Opportunist – community spots & launches you.',
      need_to_know: 'Honor retreat; answer only the right invitations.',
      rarity: '≈7%',
      famous: 'Billie Eilish, Bruce Lee',
      quote: 'Absorb what is useful, ignore the rest.'
    },
    {
      id: '2/5',
      title: '2/5 Hermit–Heretic',
      archetype: 'Reluctant Savior',
      motto: 'Leave me be… unless you need a miracle.',
      conscious: 'Hermit – thrives in quiet mastery.',
      unconscious: 'Heretic – carries universal quick-fix aura.',
      need_to_know: 'Discern which rescue calls are truly yours.',
      rarity: '≈2%',
      famous: 'J.K. Rowling, Keanu Reeves',
      quote: 'The right quest finds you in silence.'
    },
    {
      id: '3/5',
      title: '3/5 Martyr–Heretic',
      archetype: 'Ultimate Problem-Solver',
      motto: 'I break it, learn it, then teach the fix.',
      conscious: 'Martyr – fearless experimenter.',
      unconscious: 'Heretic – projected savior with practical answers.',
      need_to_know: 'Your failures are everyone else safety manual.',
      rarity: '≈12%',
      famous: 'Steve Jobs, Brené Brown',
      quote: 'Real artists ship.'
    },
    {
      id: '3/6',
      title: '3/6 Martyr–Role Model',
      archetype: 'Wise & Resilient Leader',
      motto: 'Crash-test now, embody wisdom later.',
      conscious: 'Martyr – discovery through bumps.',
      unconscious: 'Role Model – 3-stage life to embodied sage.',
      need_to_know: 'Your chaos becomes collective wisdom after 50.',
      rarity: '≈1%',
      famous: 'Tony Robbins, Elizabeth Gilbert',
      quote: 'Failure is the tuition you pay for success.'
    },
    {
      id: '4/6',
      title: '4/6 Opportunist–Role Model',
      archetype: 'Community Trusted Example',
      motto: 'I nurture my circle, become its wise pillar.',
      conscious: 'Opportunist – network-centric influencer.',
      unconscious: 'Role Model – matures into objective elder.',
      need_to_know: 'Reputation is your retirement plan.',
      rarity: '≈2%',
      famous: 'Dalai Lama, Alicia Keys',
      quote: 'Practice kindness, then teach it.'
    },
    {
      id: '4/1',
      title: '4/1 Opportunist–Investigator',
      archetype: 'Unshakeable Authority',
      motto: 'My truth + my tribe = legacy.',
      conscious: 'Opportunist – warm connector.',
      unconscious: 'Investigator – fixed, deep foundation.',
      need_to_know: 'Friendly facade, immovable core data.',
      rarity: '≈2% (unique destiny profile)',
      famous: 'Serena Williams, Eckhart Tolle',
      quote: 'Stand still inside yourself.'
    },
    {
      id: '5/1',
      title: '5/1 Heretic–Investigator',
      archetype: 'Visionary General',
      motto: 'I fix the system—receipts included.',
      conscious: 'Heretic – wide-impact problem-solver.',
      unconscious: 'Investigator – relentless fact-finder.',
      need_to_know: 'Universal solutions must rest on solid research.',
      rarity: '≈7%',
      famous: 'Winston Churchill, Oprah Winfrey',
      quote: 'Turn wounds into wisdom.'
    },
    {
      id: '5/2',
      title: '5/2 Heretic–Hermit',
      archetype: 'Unsuspecting Leader',
      motto: 'Quiet genius, public rescuer.',
      conscious: 'Heretic – projected savior role.',
      unconscious: 'Hermit – craves solitude for mastery.',
      need_to_know: 'Filter calls; the right ones scale your impact.',
      rarity: '≈2%',
      famous: 'Prince, Greta Thunberg',
      quote: 'Silence can be a form of protest.'
    },
    {
      id: '6/2',
      title: '6/2 Role Model–Hermit',
      archetype: 'Wise Sage in Sanctuary',
      motto: 'Being is teaching.',
      conscious: 'Role Model – three-stage life arc.',
      unconscious: 'Hermit – natural wisdom craves refuge.',
      need_to_know: 'Your presence teaches more than your words.',
      rarity: '≈3%',
      famous: 'Thich Nhat Hanh, Miyazaki Hayao',
      quote: 'My actions are my teaching.'
    },
    {
      id: '6/3',
      title: '6/3 Role Model–Martyr',
      archetype: 'Wisdom Through Experience',
      motto: 'Always learning, always guiding.',
      conscious: 'Role Model – observer toward embodiment.',
      unconscious: 'Martyr – perpetual experimenter beneath.',
      need_to_know: 'You prove wisdom is a living process.',
      rarity: '≈1%',
      famous: 'Maya Angelou, Richard Branson',
      quote: 'Still I rise.'
    }
  ];

  // Profile grid data (simplified for selection)
  const profileOptions = [
    {id: '1/3', short: 'Investigator–Martyr'},
    {id: '1/4', short: 'Investigator–Opportunist'},
    {id: '2/4', short: 'Hermit–Opportunist'},
    {id: '2/5', short: 'Hermit–Heretic'},
    {id: '3/5', short: 'Martyr–Heretic'},
    {id: '3/6', short: 'Martyr–Role Model'},
    {id: '4/6', short: 'Opportunist–Role Model'},
    {id: '4/1', short: 'Opportunist–Investigator'},
    {id: '5/1', short: 'Heretic–Investigator'},
    {id: '5/2', short: 'Heretic–Hermit'},
    {id: '6/2', short: 'Role Model–Hermit'},
    {id: '6/3', short: 'Role Model–Martyr'}
  ];

  // Fetch profile data from Supabase with fallback
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const {data, error} = await supabase
          .from('profile_data_9m4x7k2z')
          .select('*')
          .order('id');
        
        if (error) throw error;
        
        if (data && data.length > 0) {
          setProfileData(data);
        } else {
          // Use fallback data if no data returned
          setProfileData(fallbackProfileData);
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
        // Use fallback data on error
        setProfileData(fallbackProfileData);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const handleProfileSelect = async (profileId) => {
    setSelectedProfile(profileId);
    updateUserData({profile: profileId});
    
    // Animate card fade-in after 0.3s
    setTimeout(() => {
      setShowWisdom(true);
      setShowRichContent(false);
    }, 300);
  };

  const handleContinue = () => {
    if (selectedProfile) {
      nextStep();
    }
  };

  // Get selected profile data
  const selectedProfileData = profileData.find(p => p.id === selectedProfile);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="bg-cosmos/80 backdrop-blur-xl rounded-2xl p-8 border border-quantum/20 shadow-2xl">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-quantum mx-auto mb-4"></div>
            <p className="text-white/70">Loading profiles...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{scale: 0.9, opacity: 0}}
      animate={{scale: 1, opacity: 1}}
      transition={{duration: 0.5}}
      className="max-w-6xl mx-auto"
    >
      <div className="bg-cosmos/80 backdrop-blur-xl rounded-2xl p-8 border border-quantum/20 shadow-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-lexend font-bold text-white mb-4">
            Profile Lines
          </h2>
          <p className="text-lg text-white/80 font-inter">
            Which Profile is printed on your chart?
          </p>
        </div>

        {/* Profile Selection Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          {profileOptions.map((profile, index) => (
            <motion.button
              key={profile.id}
              initial={{opacity: 0, y: 20}}
              animate={{opacity: 1, y: 0}}
              transition={{delay: index * 0.05, duration: 0.3}}
              onClick={() => handleProfileSelect(profile.id)}
              className={`group relative p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                selectedProfile === profile.id
                  ? 'border-ignite bg-ignite/20 shadow-lg shadow-ignite/30'
                  : 'border-white/20 bg-white/5 hover:border-quantum/50'
              }`}
            >
              <div className="text-center">
                <div className="text-2xl font-mono font-bold text-white mb-2">
                  {profile.id}
                </div>
                <div className="text-sm text-white/70 font-inter">
                  {profile.short}
                </div>
              </div>
              
              {selectedProfile === profile.id && (
                <motion.div
                  initial={{scale: 0}}
                  animate={{scale: 1}}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-ignite rounded-full flex items-center justify-center"
                >
                  <div className="w-2 h-2 bg-white rounded-full" />
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>

        {/* Profile Wisdom Card */}
        <AnimatePresence>
          {showWisdom && selectedProfileData && (
            <motion.div
              initial={{opacity: 0, y: 20}}
              animate={{opacity: 1, y: 0}}
              exit={{opacity: 0, y: -20}}
              transition={{duration: 0.3}}
              className="mb-8"
            >
              <div className="bg-gradient-to-r from-quantum/20 to-ignite/20 rounded-xl p-6 border border-quantum/30">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-lexend font-bold text-2xl text-white">
                    {selectedProfileData.title}
                  </h3>
                  <button
                    onClick={() => setShowRichContent(!showRichContent)}
                    className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300"
                  >
                    <span className="text-white/70 text-sm">
                      {showRichContent ? 'Less' : 'More'}
                    </span>
                    <SafeIcon icon={showRichContent ? FiArrowRight : FiBookOpen} className="text-white/70" />
                  </button>
                </div>

                {/* Core Profile Display - Following Greta Flow */}
                <div className="space-y-4">
                  {/* Archetype (sub-headline) */}
                  <div className="bg-cosmos/30 rounded-lg p-4 border-l-4 border-ignite">
                    <div className="flex items-center mb-2">
                      <SafeIcon icon={FiTarget} className="text-ignite mr-2" />
                      <span className="font-lexend font-semibold text-ignite">Archetype</span>
                    </div>
                    <p className="text-white/90 text-lg">{selectedProfileData.archetype}</p>
                  </div>

                  {/* Motto (italic) */}
                  <div className="bg-cosmos/30 rounded-lg p-4 border-l-4 border-quantum">
                    <div className="flex items-center mb-2">
                      <SafeIcon icon={FiMessageCircle} className="text-quantum mr-2" />
                      <span className="font-lexend font-semibold text-quantum">Motto</span>
                    </div>
                    <p className="text-white/90 text-lg italic">{selectedProfileData.motto}</p>
                  </div>

                  {/* Rarity (single line) */}
                  <div className="bg-cosmos/30 rounded-lg p-3 border border-white/20">
                    <div className="flex items-center justify-between">
                      <span className="text-white/70 text-sm">Population Rarity:</span>
                      <span className="text-ignite font-semibold flex items-center">
                        <SafeIcon icon={FiStar} className="mr-1" />
                        {selectedProfileData.rarity}
                      </span>
                    </div>
                  </div>

                  {/* Need to Know (bold label) */}
                  <div className="bg-gradient-to-r from-catalyst/20 to-ignite/20 rounded-lg p-4 border border-catalyst/30">
                    <h4 className="font-lexend font-semibold text-catalyst mb-2 flex items-center">
                      <SafeIcon icon={FiTarget} className="mr-2" />
                      Key Insight
                    </h4>
                    <p className="text-white/90 text-sm">{selectedProfileData.need_to_know}</p>
                  </div>

                  {/* Famous Examples (comma list) */}
                  <div className="bg-gradient-to-r from-solar/20 to-ignite/20 rounded-lg p-4 border border-solar/30">
                    <h4 className="font-lexend font-semibold text-solar mb-2 flex items-center">
                      <SafeIcon icon={FiUsers} className="mr-2" />
                      Famous Examples
                    </h4>
                    <p className="text-white/90 text-sm">{selectedProfileData.famous}</p>
                  </div>

                  {/* Quote (blockquote) */}
                  <div className="bg-gradient-to-r from-evergreen/20 to-quantum/20 rounded-lg p-4 border border-evergreen/30">
                    <h4 className="font-lexend font-semibold text-evergreen mb-2 flex items-center">
                      <SafeIcon icon={FiMessageCircle} className="mr-2" />
                      Signature Quote
                    </h4>
                    <blockquote className="text-white/90 text-lg italic border-l-4 border-evergreen pl-4">
                      "{selectedProfileData.quote}"
                    </blockquote>
                  </div>
                </div>

                {/* Rich Content (Expandable) */}
                <AnimatePresence>
                  {showRichContent && (
                    <motion.div
                      initial={{opacity: 0, height: 0}}
                      animate={{opacity: 1, height: 'auto'}}
                      exit={{opacity: 0, height: 0}}
                      transition={{duration: 0.3}}
                      className="mt-6 pt-6 border-t border-white/20"
                    >
                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Conscious/Unconscious */}
                        <div className="space-y-4">
                          <div className="bg-gradient-to-r from-ignite/20 to-catalyst/20 rounded-lg p-4 border border-ignite/30">
                            <h4 className="font-lexend font-semibold text-ignite mb-2 flex items-center">
                              <SafeIcon icon={FiEye} className="mr-2" />
                              Conscious Mind
                            </h4>
                            <p className="text-white/90 text-sm">{selectedProfileData.conscious}</p>
                          </div>
                          
                          <div className="bg-gradient-to-r from-quantum/20 to-evergreen/20 rounded-lg p-4 border border-quantum/30">
                            <h4 className="font-lexend font-semibold text-quantum mb-2 flex items-center">
                              <SafeIcon icon={FiMoon} className="mr-2" />
                              Unconscious Drive
                            </h4>
                            <p className="text-white/90 text-sm">{selectedProfileData.unconscious}</p>
                          </div>
                        </div>

                        {/* Additional Insights */}
                        <div className="space-y-4">
                          <div className="bg-cosmos/50 rounded-lg p-4 border-l-4 border-solar">
                            <h4 className="font-lexend font-semibold text-solar mb-2">Core Wisdom</h4>
                            <p className="text-white font-inter text-sm leading-relaxed">
                              {selectedProfileData.conscious.split('–')[0].trim()} meets {selectedProfileData.unconscious.split('–')[0].trim()}. 
                              Your journey balances these two forces.
                            </p>
                          </div>

                          <div className="bg-gradient-to-r from-catalyst/20 to-quantum/20 rounded-lg p-4 border border-catalyst/20">
                            <h4 className="font-lexend font-semibold text-catalyst mb-2">Living This Profile</h4>
                            <p className="text-white/90 text-sm">
                              Honor both your {selectedProfileData.conscious.split('–')[0].trim().toLowerCase()} nature and your {selectedProfileData.unconscious.split('–')[0].trim().toLowerCase()} drive. 
                              They work together to create your unique contribution.
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Continue Button - Unlocks after 1s (prevents mis-taps) */}
        {selectedProfile && (
          <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{delay: 1, duration: 0.5}} // 1s delay as per Greta flow
            className="text-center"
          >
            <button
              onClick={handleContinue}
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-lexend font-semibold text-white bg-gradient-to-r from-ignite to-catalyst rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <span className="relative z-10">Next</span>
              <SafeIcon icon={FiArrowRight} className="ml-2 text-xl transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ProfileCard;