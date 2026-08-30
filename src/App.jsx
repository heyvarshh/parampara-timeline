import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, X, Compass, Award, Bookmark } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const PERIODS_DATA = [
  {
    id: 'indus-valley',
    num: '01',
    name: 'Indus Valley Civilization',
    date: 'c. 2500 - 1500 BCE',
    desc: 'The foundations of Indian art were laid in the urban brick cities of the Indus Valley. Artists worked with terracotta, bronze, and stone, capturing human and animal forms with naturalistic detail. These early works reveal a sophisticated understanding of craft, form, and spiritual symbolism.',
    artifacts: [
      {
        name: 'Priest-King',
        context: 'A soapstone bust exhibiting detailed facial grooming and a stylized trefoil-patterned robe, representing elite status.',
        tags: ['Sculpture', 'Steatite', 'Mohenjo-daro']
      },
      {
        name: 'Dancing Girl',
        context: 'A masterfully cast bronze figurine showcasing a lively, self-assured posture and bangled arms, demonstrating lost-wax expertise.',
        tags: ['Bronze', 'Metalwork', 'Mohenjo-daro']
      },
      {
        name: 'Unicorn Seal',
        context: 'A steatite seal engraved with a mythical one-horned bull-like creature and Indus script pictographs, used for trade.',
        tags: ['Seal', 'Steatite', 'Harappa']
      }
    ]
  },
  {
    id: 'mauryan',
    num: '02',
    name: 'Mauryan Period',
    date: 'c. 322 - 185 BCE',
    desc: 'Under the patronage of Emperor Ashoka, Mauryan art rose as a monumental expression of statecraft and spiritual devotion. Heavy sandstone pillars were erected across the subcontinent, capped with polished animal capitals that symbolized Buddhist teachings. This era established stone sculpture as a dominant medium of royal and sacred expression.',
    artifacts: [
      {
        name: 'Lion Capital of Ashoka',
        context: 'A polished sandstone sculpture of four Asiatic lions standing back-to-back, now the National Emblem of India.',
        tags: ['Sculpture', 'Chunar Sandstone', 'Sarnath']
      },
      {
        name: 'Didarganj Yakshi',
        context: 'A life-sized, polished chunar sandstone figure representing a female fly-whisk bearer with exquisite proportions and mirror-like polish.',
        tags: ['Sculpture', 'Patna Museum', 'Yakshi']
      },
      {
        name: 'Dhauli Elephant',
        context: 'A rock-cut sculpture carved out of a living cliffside, representing a gentle giant stepping out of the stone to guide Buddhists.',
        tags: ['Rock-Cut', 'Monumental', 'Odisha']
      }
    ]
  },
  {
    id: 'gupta',
    num: '03',
    name: 'Gupta Empire',
    date: 'c. 320 - 550 CE',
    desc: 'Often regarded as the Classical Golden Age of Indian art, the Gupta period refined religious iconography to its highest aesthetic standard. Sculptures of Buddha, Vishnu, and Shiva achieved an unparalleled sense of inner peace, soft sensuality, and spiritual poise. The walls of Ajanta caves were illuminated with fluid, expressive murals depicting Jataka tales.',
    artifacts: [
      {
        name: 'Sarnath Standing Buddha',
        context: 'A sandstone sculpture of Buddha in Dharmachakra Pravartana Mudra, displaying serene meditative bliss and elegant transparent drapery.',
        tags: ['Buddha', 'Sarnath', 'Golden Age']
      },
      {
        name: 'Ajanta Caves Cave 1 Murals',
        context: 'Breathtaking wall paintings of Bodhisattva Padmapani and Vajrapani holding lotus flowers, displaying fluid postures and compassion.',
        tags: ['Mural', 'Painting', 'Ajanta']
      },
      {
        name: 'Varaha at Udayagiri',
        context: 'A colossal rock-cut relief depicting Vishnu\'s boar incarnation rescue of the earth goddess Bhudevi, symbolizing cosmic balance.',
        tags: ['Rock-Cut Relief', 'Madhya Pradesh', 'Vishnu']
      }
    ]
  },
  {
    id: 'chola',
    num: '04',
    name: 'Chola & Temple Art',
    date: 'c. 850 - 1279 CE',
    desc: 'The Chola dynasty marked the peak of south Indian bronze casting and Dravidian temple architecture. Majestic stone temples like the Brihadisvara soared toward the heavens, decorated with dense reliefs of deities and dancers. The bronze artists perfected the lost-wax technique, creating fluid divine forms designed for festive processions.',
    artifacts: [
      {
        name: 'Shiva Nataraja',
        context: 'A masterpiece bronze depicting the cosmic dance of creation, preservation, and destruction within a ring of fire.',
        tags: ['Bronze', 'Lost-Wax', 'Cosmic Shiva']
      },
      {
        name: 'Brihadisvara Temple Reliefs',
        context: 'Massive granite temple carvings portraying cosmic forms of Shiva and celestial dancers, showing dynamic structural layouts.',
        tags: ['Architecture', 'Granite', 'Thanjavur']
      },
      {
        name: 'Chola Queen Sembiyan Mahadevi Bronze',
        context: 'A refined, stylized representation of a royal patron portrayed as a goddess, honoring temple builders.',
        tags: ['Bronze', 'Portraiture', 'Royal Patronage']
      }
    ]
  },
  {
    id: 'mughal',
    num: '05',
    name: 'Mughal Miniature Painting',
    date: 'c. 1526 - 1857 CE',
    desc: 'Born from the synthesis of Persian refinement and Indian vibrancy, Mughal miniatures documented royal life with botanical precision and rich colors. These highly detailed paintings depicted courtly scenes, hunts, historical battles, and natural flora and fauna. The use of fine squirrel-hair brushes and burnished gold leaf gave these works a jewel-like quality.',
    artifacts: [
      {
        name: 'Emperor Akbar Hunting Wild Cheetahs',
        context: 'An action-packed composition from the Akbarnama showcasing energetic human and animal figures and complex perspective layering.',
        tags: ['Miniature', 'Manuscript', 'Akbarnama']
      },
      {
        name: 'The Emperor Jahangir Triumphing Over Poverty',
        context: 'A highly symbolic allegorical portrait painted by Abu\'l Hasan using rich gold pigments, celebrating imperial vision.',
        tags: ['Painting', 'Allegory', 'Jahangir']
      },
      {
        name: 'Zebra by Mansur',
        context: 'A legendary natural history study of a zebra gifted to Jahangir, showing precise anatomical detail and royal scientific interest.',
        tags: ['Painting', 'Ustad Mansur', 'Fauna']
      }
    ]
  },
  {
    id: 'rajput-pahari',
    num: '06',
    name: 'Rajput & Pahari Schools',
    date: 'c. 16th - 19th Century CE',
    desc: 'Thriving in the royal courts of Rajasthan and the Himalayan foothills, these paintings celebrated romantic legends and devotional themes. They rejected courtly stiffness in favor of bold primary colors, emotional intensity, and lyrical landscape settings. Their favorite subjects were the divine romance of Radha and Krishna and seasonal ragas.',
    artifacts: [
      {
        name: 'Gita Govinda Paintings',
        context: 'Lyrical Kangra-style illustrations capturing the mystic love of Radha and Krishna in lush green forests and hills.',
        tags: ['Kangra School', 'Miniature', 'Devotional']
      },
      {
        name: 'Ragamala Miniatures',
        context: 'Paintings representing specific musical modes (ragas) as visual narratives of love, longing, and seasonal rhythms.',
        tags: ['Mewar School', 'Ragamala', 'Music Visuals']
      },
      {
        name: 'Bani Thani',
        context: 'A famous Kishangarh painting showing a lady with elongated almond eyes and arched eyebrows, dubbed the Indian Mona Lisa.',
        tags: ['Kishangarh', 'Nihal Chand', 'Iconic']
      }
    ]
  },
  {
    id: 'colonial-company',
    num: '07',
    name: 'Company / Colonial-era Art',
    date: 'c. 18th - 20th Century CE',
    desc: 'As European traders and administrators established power, a new hybrid style emerged to cater to their tastes. Indian artists adopted Western watercolor techniques, linear perspective, and scientific realism to document local flora, fauna, and trades. Later, figures like Raja Ravi Varma blended academic oil painting with traditional Indian mythology.',
    artifacts: [
      {
        name: 'Raja Ravi Varma\'s Shakuntala',
        context: 'An oil painting blending Western academic realism with Indian classical mythology and dramatic composition.',
        tags: ['Oil on Canvas', 'Raja Ravi Varma', 'Mythological']
      },
      {
        name: 'Hook-swinging Festival Study',
        context: 'A Company school watercolor painting capturing local religious ceremonies with documentary precision.',
        tags: ['Watercolor', 'Company Style', 'Ethnography']
      },
      {
        name: 'Flora and Fauna Studies for Lady Impey',
        context: 'Exquisite botanical and zoological watercolor paintings commissioned by British patrons, painted by Calcutta artists.',
        tags: ['Natural Study', 'Company School', 'Kolkata']
      }
    ]
  },
  {
    id: 'bengal-school',
    num: '08',
    name: 'Bengal School of Art',
    date: 'c. early 20th Century CE',
    desc: 'Rising as a nationalist reaction against Western academic art, the Bengal School sought inspiration in ancient heritage and pan-Asian techniques. Led by Abanindranath Tagore, artists used wash techniques to create misty, ethereal paintings filled with spiritual sentiment. This movement laid the foundation for modern Indian art by reclaiming indigenous forms.',
    artifacts: [
      {
        name: 'Bharat Mata',
        context: 'A landmark painting by Abanindranath Tagore depicting India as a four-armed saffron-clad goddess holding food, cloth, and manuscript.',
        tags: ['Watercolor Wash', 'Nationalist', 'Abanindranath']
      },
      {
        name: 'Santhal Family',
        context: 'A monumental outdoor sculpture by Ramkinkar Baij capturing the dignity, strength, and vitality of tribal life.',
        tags: ['Sculpture', 'Outdoor', 'Santiniketan']
      },
      {
        name: 'Ganesh Janani',
        context: 'A delicate wash painting by Abanindranath Tagore depicting the elephant-headed child deity in the loving arms of Parvati.',
        tags: ['Wash Technique', 'Mythological', 'Aesthetic']
      }
    ]
  },
  {
    id: 'contemporary',
    num: '09',
    name: 'Contemporary Indian Art',
    date: 'c. 1947 - Present',
    desc: 'Following Independence, Indian artists broke away from both colonial realism and nationalist romanticism to forge a global modern identity. The Progressive Artists\' Group embraced bold lines, abstraction, and social critiques, addressing urban alienation and structural shifts. Today, contemporary Indian artists work across digital media, large installations, and performance to engage with global narratives.',
    artifacts: [
      {
        name: 'Self-Portrait by Amrita Sher-Gil',
        context: 'A melancholic painting blending post-impressionist techniques with Indian subject matter, reflecting global hybrid identity.',
        tags: ['Painting', 'Amrita Sher-Gil', 'Modernist']
      },
      {
        name: 'Mahabharata Series by M.F. Husain',
        context: 'Vibrant, cubist-influenced paintings capturing the dynamism, movement, and epic scale of Indian mythology.',
        tags: ['PAG', 'M.F. Husain', 'Cubism']
      },
      {
        name: 'Metamorphosis by Nasreen Mohamedi',
        context: 'Minimalist, geometric ink-and-pencil line drawings representing silent meditative spaces and architectural grid-lines.',
        tags: ['Drawing', 'Minimalism', 'Abstract']
      }
    ]
  }
];

function App() {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // Setup ScrollTrigger to detect active section in viewport
    const sections = document.querySelectorAll('.timeline-period');
    
    // Check if hero is in view
    ScrollTrigger.create({
      trigger: '.hero',
      start: 'top top',
      end: 'bottom center',
      onEnter: () => setActiveSection(0),
      onEnterBack: () => setActiveSection(0),
    });

    sections.forEach((section, index) => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setActiveSection(index + 1),
        onEnterBack: () => setActiveSection(index + 1),
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  useGSAP(() => {
    // Animate Diya Lamp along the timeline spine
    gsap.fromTo('.diya-lamp', 
      { top: '0%' },
      {
        top: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: '.timeline-outer',
          start: 'top 50%',
          end: 'bottom 50%',
          scrub: 0.5,
        }
      }
    );

    // Hero content fade-in
    gsap.from('.hero-content > *', {
      opacity: 0,
      y: 30,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out'
    });

    // Animate periods entering the view
    const cards = gsap.utils.toArray('.period-card');
    cards.forEach((card) => {
      gsap.from(card, {
        opacity: 0,
        x: card.closest('.timeline-period').classList.contains('odd') ? -60 : 60,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      });
    });

    // Animate seals entering
    const seals = gsap.utils.toArray('.period-seal-badge');
    seals.forEach((seal) => {
      gsap.from(seal, {
        scale: 0,
        rotation: -90,
        duration: 0.6,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: seal,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });
    });
  }, { scope: containerRef });

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      // Calculate offset for navbar
      const yOffset = -70; 
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenModal = (period) => {
    setSelectedPeriod(period);
    document.body.style.overflow = 'hidden'; // stop page scrolling
  };

  const handleCloseModal = () => {
    setSelectedPeriod(null);
    document.body.style.overflow = ''; // restore scrolling
  };

  // Close modal on escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handleCloseModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div ref={containerRef}>
      {/* Top Navbar */}
      <header className="navbar">
        <div className="navbar-inner">
          <a className="nav-logo" onClick={scrollToTop}>
            <svg className="nav-logo-icon" viewBox="0 0 32 32">
              <path d="M16 2 L20 10 L28 12 L22 18 L24 26 L16 22 L8 26 L10 18 L4 12 L12 10 Z" />
            </svg>
            <span>Parampara</span>
          </a>
          
          <nav className="nav-links">
            <span className="nav-link" onClick={scrollToTop}>JOURNEY</span>
            <span className="nav-link" onClick={() => scrollToSection('timeline-root')}>TIMELINE</span>
            <span className="nav-link" onClick={() => scrollToSection('about-section')}>ABOUT</span>
          </nav>
          
          <div className="nav-counter" id="live-counter">
            {activeSection === 0 ? 'START' : `${activeSection.toString().padStart(2, '0')} / 09`}
          </div>
        </div>
      </header>

      {/* Right Progress dot rail */}
      <div className="dot-rail">
        {PERIODS_DATA.map((period, idx) => (
          <div
            key={period.id}
            className={`dot-rail-item ${activeSection === idx + 1 ? 'active' : ''}`}
            onClick={() => scrollToSection(period.id)}
            title={period.name}
          >
            <div className="dot-rail-tooltip">{period.name}</div>
          </div>
        ))}
      </div>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Parampara</h1>
          <h2 className="hero-subtitle">Threads Through Time</h2>
          <p className="hero-intro">
            Embark on a visual journey across millennia of Indian artistic heritage. 
            From prehistoric brick cities to modern abstractions, experience how the continuous 
            creative flame of India redefines and sustains itself through historical transitions.
          </p>
          <div className="scroll-cue" onClick={() => scrollToSection(PERIODS_DATA[0].id)}>
            <span>SCROLL TO BEGIN</span>
            <ChevronDown className="scroll-chevron" size={24} />
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <main className="timeline-outer" id="timeline-root">
        {/* Central Dotted Spine */}
        <div className="timeline-spine"></div>

        {/* Diya Lamp */}
        <div className="diya-lamp">
          <svg className="diya-svg" viewBox="0 0 50 50">
            {/* Clay lamp base */}
            <path d="M 10 32 C 10 42, 40 42, 40 32 C 40 28, 30 26, 25 26 C 20 26, 10 28, 10 32 Z" fill="#e9a227" stroke="#c1272d" strokeWidth="2" />
            <path d="M 15 32 C 15 38, 35 38, 35 32 Z" fill="#c1272d" opacity="0.3" />
            {/* Cotton wick */}
            <line x1="25" y1="28" x2="25" y2="21" stroke="#4c7a3d" strokeWidth="3" strokeLinecap="round" />
            {/* Flickering Flame */}
            <path className="diya-flame" d="M 25 21 C 21 16, 23 10, 25 5 C 27 10, 29 16, 25 21 Z" fill="#c1272d" />
            <path className="diya-flame" d="M 25 21 C 23 18, 24 14, 25 10 C 26 14, 27 18, 25 21 Z" fill="#e9a227" />
          </svg>
        </div>

        {PERIODS_DATA.map((period, index) => {
          const isOdd = index % 2 === 0;
          return (
            <section
              key={period.id}
              id={period.id}
              className={`timeline-period ${isOdd ? 'odd' : 'even'}`}
            >
              <div className="timeline-period-inner">
                {/* Central clickable seal badge */}
                <div className="period-seal-container">
                  <div className="period-seal-badge" onClick={() => handleOpenModal(period)}>
                    <div className="period-seal-badge-inner">
                      <span className="period-seal-num">{period.num}</span>
                      <span className="period-seal-label">SEAL</span>
                    </div>
                  </div>
                </div>

                {/* Left/Right Card content */}
                <div className="period-side-content">
                  <article className="period-card">
                    <div className="period-card-border-strip"></div>
                    <div className="period-date">{period.date}</div>
                    <h3 className="period-title">{period.name}</h3>
                    <p className="period-desc">{period.desc}</p>
                    <button className="period-explore-btn" onClick={() => handleOpenModal(period)}>
                      <span>Explore Artifacts</span>
                    </button>
                  </article>
                </div>
                <div className="period-side-empty"></div>
              </div>
            </section>
          );
        })}
      </main>

      {/* About Section */}
      <section className="footer" id="about-section">
        <div className="container">
          <h2 className="footer-logo">Parampara</h2>
          <p className="footer-text" style={{ maxWidth: '600px', margin: '0 auto 16px auto', fontSize: '1rem', lineHeight: '1.5' }}>
            Parampara stands as a student submission for FM-I — Indian Art, Formative Assessment I. 
            It celebrates the temporal continuum of traditional Indian aesthetic forms and philosophy, 
            bridging visual art history from Harappan crafts to contemporary modernism.
          </p>
          <div className="footer-text">
            © {new Date().getFullYear()} — Computer Science Indian Art Submission
          </div>
        </div>
      </section>

      {/* Detail Modal */}
      {selectedPeriod && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-strip"></div>
            
            <button className="modal-close-btn" onClick={handleCloseModal} aria-label="Close detail view">
              <X size={20} />
            </button>
            
            <div className="modal-body">
              <span className="modal-date">{selectedPeriod.date}</span>
              <h2 className="modal-title">{selectedPeriod.name}</h2>
              <p className="modal-desc">{selectedPeriod.desc}</p>
              
              <h3 className="modal-section-title">Key Replicas & Artifacts</h3>
              <div className="artifact-list">
                {selectedPeriod.artifacts.map((art, idx) => (
                  <div key={idx} className="artifact-item">
                    <h4 className="artifact-name">{art.name}</h4>
                    <p className="artifact-context">{art.context}</p>
                    <div className="tag-container">
                      {art.tags.map((t, i) => (
                        <span key={i} className="tag">{t}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
