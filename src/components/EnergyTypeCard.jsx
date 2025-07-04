import React, {useState, useEffect} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import supabase from '../lib/supabase';

const {FiZap, FiTarget, FiRefreshCw, FiEye, FiMoon, FiArrowRight, FiChevronDown, FiChevronUp, FiUsers, FiMessageCircle, FiBookOpen, FiStar, FiPlay} = FiIcons;

// Core type data with single quotes
const ENERGY_TYPE_DATA = {
  'Manifestor': {
    'aura': 'Impact field — compact & initiating',
    'strategy': 'Inform before action',
    'signature': 'Peace • Anger',
    'gift': 'Sparks new movements and opens locked doors.',
    'challenge': 'Push-back flares if you skip the inform step.',
    'collabTip': 'Give them autonomy once they share the plan—they move fastest solo.',
    'rarity': '≈ 9% of people',
    'description': 'Manifestors are the trailblazers and initiators of the Human Design system. Their energy is designed to start new things and get the ball rolling.',
    'insight2027': 'Post-2027 emotional waves intensify; informing calms the field quickly.'
  },
  'Generator': {
    'aura': 'Enveloping field — open & embracing',
    'strategy': 'Respond to life',
    'signature': 'Satisfaction • Frustration',
    'gift': 'Sustainable life-force and deep mastery.',
    'challenge': 'Burnout when saying yes without a sacral uh-huh.',
    'collabTip': 'Ask yes/no questions; they respond from the gut.',
    'rarity': '≈ 37% of people',
    'description': 'Generators are the life force of the planet. They have a defined Sacral center, which is a sustainable source of energy.',
    'insight2027': 'Sacral yes becomes more selective—wait for the full-body response.'
  },
  'Manifesting Generator': {
    'aura': 'Enveloping field — open & dynamic',
    'strategy': 'Respond then inform',
    'signature': 'Satisfaction • Frustration / Anger',
    'gift': 'Rapid iteration; shortcut creator.',
    'challenge': 'Confusion around you when steps are skipped mid-pivot.',
    'collabTip': 'Let them skip ahead—then circle back for the details.',
    'rarity': '≈ 33% of people',
    'description': 'Manifesting Generators are a hybrid of Manifestors and Generators. They are designed to be multi-passionate and find the quickest way to get things done.',
    'insight2027': 'Double-check the sacral yes; emotional overlay may delay clarity.'
  },
  'Projector': {
    'aura': 'Focused field — penetrating & guiding',
    'strategy': 'Wait for invitation',
    'signature': 'Success • Bitterness',
    'gift': 'Systems wisdom & laser guidance.',
    'challenge': 'Resentment if acting without recognition or invitation.',
    'collabTip': 'Invite them to advise, then credit their vision publicly.',
    'rarity': '≈ 20% of people',
    'description': 'Projectors are the natural guides and leaders of the Human Design system. They have a deep wisdom and ability to see the big picture.',
    'insight2027': 'Invitations will carry a clearer feeling-tone—wait for the warm yes.'
  },
  'Reflector': {
    'aura': 'Sampling & resisting — reflects but doesn\'t absorb',
    'strategy': 'Wait 28 days for clarity',
    'signature': 'Surprise • Disappointment',
    'gift': 'Objective lunar mirror for the tribe.',
    'challenge': 'Rushed decisions before the full 29-day lunar cycle completes.',
    'collabTip': 'Give them a month to sample; their clarity guides everyone.',
    'rarity': '≈ 1% of people',
    'description': 'Reflectors are the rarest type. They have no defined centers and their energy is a reflection of their environment and the people around them.',
    'insight2027': 'Your lunar clarity becomes a prized compass—share your cycle openly.'
  }
};

// Comprehensive fallback data (embedded for 100% reliability)
const FALLBACK_COMPREHENSIVE_DATA = {
  'Manifestor': {
    famous: [
      {name: 'Frida Kahlo', tagline: 'Painter of personal reality'},
      {name: 'Maya Angelou', tagline: 'Voice that initiated change'},
      {name: 'Elon Musk', tagline: 'Industry disruptor'}
    ],
    quotes: [
      'Nothing can dim the light which shines from within. – Maya Angelou',
      'I paint flowers so they will not die. – Frida Kahlo',
      'Some people don\'t like change, but you need to embrace disruption. – Elon Musk'
    ],
    stories: [
      {title: 'Erin Brockovich', note: 'One woman initiates corporate justice.'},
      {title: 'Mulan', note: 'Acts independently, informs later.'},
      {title: 'Iron Man', note: 'Announces vision, then builds it.'}
    ]
  },
  'Generator': {
    famous: [
      {name: 'Oprah Winfrey', tagline: 'Media maven who responded to audience energy'},
      {name: 'Stephen King', tagline: 'Daily sacral work; 60+ novels'},
      {name: 'Serena Williams', tagline: 'Consistent response → world-class mastery'}
    ],
    quotes: [
      'Do what you have to do until you can do what you want to do. – Oprah Winfrey',
      'Amateurs sit and wait; pros go to work. – Stephen King',
      'Luck has nothing to do with it. – Serena Williams'
    ],
    stories: [
      {title: 'Rocky', note: 'Pure response + stamina training montage.'},
      {title: 'Chef', note: 'Follows gut passion into food truck success.'},
      {title: 'Finding Nemo (Dory arc)', note: 'Just keep swimming.'}
    ]
  },
  'Manifesting Generator': {
    famous: [
      {name: 'Richard Branson', tagline: 'Serial founder with rapid pivots'},
      {name: 'Lady Gaga', tagline: 'Multichannel creation, fast iteration'},
      {name: 'Will Smith', tagline: 'Jumps genres, multitasks projects'}
    ],
    quotes: [
      'Screw it, let\'s do it. – Richard Branson',
      'Don\'t you ever let a soul… dim your light. – Lady Gaga',
      'Greatness exists in all of us. – Will Smith'
    ],
    stories: [
      {title: 'Spider-Man: Into the Spider-Verse', note: 'Multi-timeline jumping.'},
      {title: 'Back to the Future', note: 'Fast-pivot problem-solving.'},
      {title: 'Hamilton (Stage)', note: 'High-speed, step-skipping biography.'}
    ]
  },
  'Projector': {
    famous: [
      {name: 'Barack Obama', tagline: 'Strategic guide, waits for invitation (election)'},
      {name: 'Nelson Mandela', tagline: 'Recognised for big-picture wisdom'},
      {name: 'J. K. Rowling', tagline: 'Guided readers into new system (Wizarding World)'}
    ],
    quotes: [
      'Change will not come if we wait for some other person. – Barack Obama',
      'It always seems impossible until it is done. – Nelson Mandela',
      'Words are our most inexhaustible source of magic. – J. K. Rowling'
    ],
    stories: [
      {title: 'The King\'s Speech', note: 'Coach guides a king.'},
      {title: 'Dead Poets Society', note: 'Teacher invites students into vision.'},
      {title: 'Mary Poppins', note: 'Guide enters, reorganises family system.'}
    ]
  },
  'Reflector': {
    famous: [
      {name: 'Teal Swan', tagline: 'Mirrors audience emotion'},
      {name: 'G. W. Leibniz', tagline: 'I merely reflect'},
      {name: 'James Redfield', tagline: 'Samples collective spirituality'}
    ],
    quotes: [
      'The quieter you become, the more you can hear. – Ram Dass',
      'I am a mirror; you see in me what you are. – Teal Swan',
      'The present is pregnant with the future. – G. W. Leibniz'
    ],
    stories: [
      {title: 'Amélie', note: 'Quiet observer shifts Paris micro-cosm.'},
      {title: 'Arrival', note: 'Linguist mirrors alien meaning.'},
      {title: 'MirrorMask', note: 'Heroine reflects dream realms.'}
    ]
  }
};

const EnergyTypeCard = ({userData, updateUserData, nextStep}) => {
  const [selectedType, setSelectedType] = useState(userData.energyType || '');
  const [showWisdom, setShowWisdom] = useState(false);
  const [showExtras, setShowExtras] = useState(false);
  const [bonusItems, setBonusItems] = useState([]);
  const [sessionId, setSessionId] = useState(null);
  const [comprehensiveData, setComprehensiveData] = useState({});
  const [contentTab, setContentTab] = useState('overview');

  const energyTypes = [
    {type: 'Manifestor', icon: FiZap, color: 'from-ignite to-catalyst'},
    {type: 'Generator', icon: FiTarget, color: 'from-quantum to-evergreen'},
    {type: 'Manifesting Generator', icon: FiRefreshCw, color: 'from-solar to-ignite'},
    {type: 'Projector', icon: FiEye, color: 'from-evergreen to-quantum'},
    {type: 'Reflector', icon: FiMoon, color: 'from-quantum to-solar'}
  ];

  // Initialize session
  useEffect(() => {
    const initSession = async () => {
      try {
        const newSessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        setSessionId(newSessionId);
        
        // Save initial session to Supabase
        await supabase
          .from('hero_frequency_sessions_7x9k4m2p')
          .insert({
            session_id: newSessionId,
            user_data: userData,
            current_step: 1
          });
      } catch (error) {
        console.error('Error initializing session:', error);
      }
    };

    initSession();
  }, [userData]);

  // Fetch comprehensive data on component mount
  useEffect(() => {
    const fetchComprehensiveData = async () => {
      try {
        const {data, error} = await supabase
          .from('hd_story_data_k9x7m2n4')
          .select('*')
          .order('type_name, category, title');

        if (error) throw error;

        // Group data by type and category
        const groupedData = {};
        data.forEach(item => {
          if (!groupedData[item.type_name]) {
            groupedData[item.type_name] = {
              famous: [],
              quotes: [],
              stories: []
            };
          }
          
          if (item.category === 'famous') {
            groupedData[item.type_name].famous.push({
              name: item.title,
              tagline: item.tagline
            });
          } else if (item.category === 'quote') {
            groupedData[item.type_name].quotes.push(`${item.title} – ${item.tagline}`);
          } else if (item.category === 'story') {
            groupedData[item.type_name].stories.push({
              title: item.title,
              note: item.tagline
            });
          }
        });

        setComprehensiveData(groupedData);
      } catch (error) {
        console.error('Error fetching comprehensive data:', error);
        // Use fallback data
        setComprehensiveData(FALLBACK_COMPREHENSIVE_DATA);
      }
    };

    fetchComprehensiveData();
  }, []);

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const generateBonusItems = (typeData) => {
    const bonusPool = [
      {type: 'collabTip', label: 'Collab Tip', content: typeData.collabTip, icon: FiUsers},
      {type: 'rarity', label: 'Rarity', content: typeData.rarity, icon: FiStar},
      {type: 'insight2027', label: 'Insight 2027', content: typeData.insight2027, icon: FiEye},
      {type: 'description', label: 'Core Description', content: typeData.description, icon: FiBookOpen}
    ];

    return shuffleArray(bonusPool).slice(0, 2);
  };

  const saveToSupabase = async (updatedData) => {
    if (!sessionId) return;

    try {
      await supabase
        .from('hero_frequency_sessions_7x9k4m2p')
        .update({
          user_data: updatedData,
          updated_at: new Date().toISOString()
        })
        .eq('session_id', sessionId);
    } catch (error) {
      console.error('Error saving to Supabase:', error);
    }
  };

  const handleTypeSelect = async (type) => {
    setSelectedType(type.type);
    const updatedData = {...userData, energyType: type.type};
    updateUserData({energyType: type.type});
    setShowWisdom(true);
    setShowExtras(false);
    setContentTab('overview');

    const typeData = ENERGY_TYPE_DATA[type.type];
    if (typeData) {
      setBonusItems(generateBonusItems(typeData));
    }

    // Save to Supabase
    await saveToSupabase(updatedData);
  };

  const toggleExtras = () => {
    if (!showExtras && selectedType) {
      const typeData = ENERGY_TYPE_DATA[selectedType];
      if (typeData) {
        setBonusItems(generateBonusItems(typeData));
      }
    }
    setShowExtras(!showExtras);
  };

  const handleContinue = async () => {
    if (selectedType && sessionId) {
      // Update session step
      await supabase
        .from('hero_frequency_sessions_7x9k4m2p')
        .update({
          current_step: 2,
          updated_at: new Date().toISOString()
        })
        .eq('session_id', sessionId);

      nextStep();
    }
  };

  const selectedTypeIcon = energyTypes.find(t => t.type === selectedType);
  const selectedTypeData = ENERGY_TYPE_DATA[selectedType];

  const renderTabContent = () => {
    const currentData = comprehensiveData[selectedType] || FALLBACK_COMPREHENSIVE_DATA[selectedType];
    
    if (!currentData) return null;

    switch (contentTab) {
      case 'famous':
        return (
          <div className="space-y-4">
            <h4 className="font-lexend font-semibold text-ignite mb-4 flex items-center">
              <SafeIcon icon={FiUsers} className="mr-2" />
              Famous {selectedType}s
            </h4>
            <div className="space-y-3">
              {currentData.famous.map((person, index) => (
                <div key={index} className="bg-cosmos/30 rounded-lg p-4 border border-ignite/20">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-2 h-2 bg-ignite rounded-full mt-2"></div>
                    <div className="flex-1">
                      <h5 className="font-lexend font-semibold text-white mb-1">{person.name}</h5>
                      <p className="text-white/80 text-sm">{person.tagline}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'quotes':
        return (
          <div className="space-y-4">
            <h4 className="font-lexend font-semibold text-quantum mb-4 flex items-center">
              <SafeIcon icon={FiMessageCircle} className="mr-2" />
              Inspiring Quotes
            </h4>
            <div className="space-y-4">
              {currentData.quotes.map((quote, index) => (
                <div key={index} className="bg-cosmos/30 rounded-lg p-4 border-l-4 border-quantum">
                  <p className="text-white/90 text-sm italic leading-relaxed">"{quote}"</p>
                </div>
              ))}
            </div>
          </div>
        );
      case 'stories':
        return (
          <div className="space-y-4">
            <h4 className="font-lexend font-semibold text-solar mb-4 flex items-center">
              <SafeIcon icon={FiPlay} className="mr-2" />
              Archetypal Stories
            </h4>
            <div className="space-y-4">
              {currentData.stories.map((story, index) => (
                <div key={index} className="bg-cosmos/30 rounded-lg p-4 border-l-4 border-solar">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-2 h-2 bg-solar rounded-full mt-2"></div>
                    <div className="flex-1">
                      <h5 className="font-lexend font-semibold text-white mb-1">{story.title}</h5>
                      <p className="text-white/80 text-sm leading-relaxed">{story.note}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{scale: 0.9, opacity: 0}}
      animate={{scale: 1, opacity: 1}}
      transition={{duration: 0.5}}
      className="max-w-5xl mx-auto"
    >
      <div className="bg-cosmos/80 backdrop-blur-xl rounded-2xl p-8 border border-quantum/20 shadow-2xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-lexend font-bold text-white mb-4">
            Energy Type
          </h2>
          <p className="text-lg text-white/80 font-inter">
            Which Type is printed at the top of your chart?
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {energyTypes.map((type, index) => (
            <motion.button
              key={type.type}
              initial={{opacity: 0, y: 20}}
              animate={{opacity: 1, y: 0}}
              transition={{delay: index * 0.1, duration: 0.3}}
              onClick={() => handleTypeSelect(type)}
              className={`group relative p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105 hover:rotate-1 ${
                selectedType === type.type
                  ? 'border-ignite bg-ignite/20 shadow-lg shadow-ignite/30'
                  : 'border-white/20 bg-white/5 hover:border-quantum/50'
              }`}
            >
              <div className="flex flex-col items-center text-center">
                <div className={`p-3 rounded-full bg-gradient-to-r ${type.color} mb-4`}>
                  <SafeIcon icon={type.icon} className="text-2xl text-white" />
                </div>
                <h3 className="font-lexend font-semibold text-white mb-2 text-sm">
                  {type.type}
                </h3>
              </div>
              
              {selectedType === type.type && (
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

        <AnimatePresence>
          {showWisdom && selectedTypeData && (
            <motion.div
              initial={{opacity: 0, y: 20}}
              animate={{opacity: 1, y: 0}}
              exit={{opacity: 0, y: -20}}
              transition={{duration: 0.5}}
              className="mb-8"
            >
              <div className="bg-gradient-to-r from-quantum/20 to-ignite/20 rounded-xl p-6 border border-quantum/30">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-lexend font-bold text-2xl text-white flex items-center">
                    {selectedTypeIcon && (
                      <div className={`p-2 rounded-full bg-gradient-to-r ${selectedTypeIcon.color} mr-3`}>
                        <SafeIcon icon={selectedTypeIcon.icon} className="text-xl text-white" />
                      </div>
                    )}
                    {selectedType}
                  </h3>
                  <button
                    onClick={toggleExtras}
                    className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300"
                  >
                    <span className="text-white/70 text-sm">
                      {showExtras ? 'Less' : 'More'}
                    </span>
                    <SafeIcon icon={showExtras ? FiChevronUp : FiChevronDown} className="text-white/70" />
                  </button>
                </div>

                {/* Core Overview - always shown */}
                <div className="space-y-4">
                  <div className="bg-cosmos/30 rounded-lg p-4 border-l-4 border-ignite">
                    <p className="text-white/90 text-sm leading-relaxed">{selectedTypeData.description}</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-cosmos/50 rounded-lg p-4">
                      <h4 className="font-inter font-semibold text-quantum mb-2">Aura</h4>
                      <p className="text-white/80 text-sm">{selectedTypeData.aura}</p>
                    </div>
                    <div className="bg-cosmos/50 rounded-lg p-4">
                      <h4 className="font-inter font-semibold text-quantum mb-2">Strategy</h4>
                      <p className="text-white/80 text-sm">{selectedTypeData.strategy}</p>
                    </div>
                  </div>

                  <div className="bg-cosmos/50 rounded-lg p-4">
                    <h4 className="font-inter font-semibold text-quantum mb-2">Signature / Not-Self</h4>
                    <p className="text-white/80 text-sm">{selectedTypeData.signature}</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-cosmos/50 rounded-lg p-4 border-l-4 border-ignite">
                      <h4 className="font-inter font-semibold text-ignite mb-2">Core Gift</h4>
                      <p className="text-white text-sm">{selectedTypeData.gift}</p>
                    </div>
                    <div className="bg-cosmos/50 rounded-lg p-4 border-l-4 border-catalyst">
                      <h4 className="font-inter font-semibold text-catalyst mb-2">Challenge</h4>
                      <p className="text-white text-sm">{selectedTypeData.challenge}</p>
                    </div>
                  </div>
                </div>

                {/* Expandable rich content */}
                <AnimatePresence>
                  {showExtras && (
                    <motion.div
                      initial={{opacity: 0, height: 0}}
                      animate={{opacity: 1, height: 'auto'}}
                      exit={{opacity: 0, height: 0}}
                      transition={{duration: 0.3}}
                      className="mt-6 pt-6 border-t border-white/20"
                    >
                      {/* Content Tabs */}
                      <div className="flex space-x-4 mb-6">
                        {['famous', 'quotes', 'stories'].map((tab) => (
                          <button
                            key={tab}
                            onClick={() => setContentTab(tab)}
                            className={`px-4 py-2 rounded-lg text-sm font-lexend font-semibold transition-all duration-300 ${
                              contentTab === tab
                                ? 'bg-ignite text-white'
                                : 'bg-white/10 text-white/70 hover:bg-white/20'
                            }`}
                          >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                          </button>
                        ))}
                      </div>

                      {/* Tab Content */}
                      <motion.div
                        key={contentTab}
                        initial={{opacity: 0, x: 20}}
                        animate={{opacity: 1, x: 0}}
                        transition={{duration: 0.3}}
                      >
                        {renderTabContent()}
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {selectedType && (
          <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{delay: 0.5, duration: 0.5}}
            className="text-center"
          >
            <button
              onClick={handleContinue}
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-lexend font-semibold text-white bg-gradient-to-r from-ignite to-catalyst rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <span className="relative z-10">Continue</span>
              <SafeIcon icon={FiArrowRight} className="ml-2 text-xl transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default EnergyTypeCard;