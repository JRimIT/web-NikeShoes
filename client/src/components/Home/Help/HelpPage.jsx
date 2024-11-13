import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Search, ChevronRight, X, Loader, Phone, Mail, MapPin, ArrowUp, PhoneCall, PhoneOff } from 'lucide-react';
import './HelpPage.scss';

const HelpPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTopics, setFilteredTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [showCallModal, setShowCallModal] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [showLearnMore, setShowLearnMore] = useState(false);
  const [showContactSupport, setShowContactSupport] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [callStatus, setCallStatus] = useState('idle'); // 'idle', 'calling', 'connected', 'ended'
  const [callDuration, setCallDuration] = useState(0);

  const helpTopics = useMemo(() => [
    { title: "ORDERS", icon: "📦", category: "shopping", keywords: ["order", "purchase", "buy"], description: "Get help with your orders, track shipments, and manage your purchases." },
    { title: "PRODUCTS", icon: "👟", category: "shopping", keywords: ["product", "item", "gear"], description: "Find information about our products, sizing, and availability." },
    { title: "NIKE MEMBERSHIP", icon: "🏅", category: "account", keywords: ["member", "benefits", "rewards"], description: "Learn about Nike Membership benefits and how to make the most of your account." },
    { title: "GIFT CARDS", icon: "🎁", category: "shopping", keywords: ["gift", "card", "present"], description: "Purchase gift cards, check balances, and learn about our gift card policies." },
    { title: "CORPORATE", icon: "🏢", category: "other", keywords: ["business", "company", "enterprise"], description: "Information for corporate inquiries and business-related questions." },
    { title: "CONTACT US", icon: "📞", category: "support", keywords: ["contact", "help", "assistance"], description: "Get in touch with our customer support team for personalized assistance." },
    { title: "RETURNS", icon: "🔄", category: "shopping", keywords: ["return", "exchange", "refund"], description: "Learn about our return policy and how to initiate a return or exchange." },
    { title: "SHIPPING", icon: "🚚", category: "shopping", keywords: ["delivery", "shipping", "track"], description: "Find information about shipping options, costs, and delivery times." },
    { title: "PRODUCT CARE", icon: "🧼", category: "other", keywords: ["care", "clean", "maintain"], description: "Get tips on how to care for and maintain your Nike products." },
  ], []);

  const [faqItems, setFaqItems] = useState([
    { 
      question: "How do I track my order?", 
      answer: "You can track your order by logging into your account and visiting the 'Order Status' page. Alternatively, you can use the tracking number provided in your shipping confirmation email.",
      isOpen: false
    },
    { 
      question: "What is Nike's return policy?", 
      answer: "Nike offers a 30-day return policy for most items. You can return items for free at any Nike store or by mail. Some exclusions apply, such as personalized items.",
      isOpen: false
    },
    { 
      question: "How do I become a Nike Member?", 
      answer: "You can become a Nike Member for free by signing up on our website or through the Nike app. Membership gives you access to exclusive products, free shipping, and more.",
      isOpen: false
    },
    {
      question: "How can I get size recommendations?",
      answer: "Nike offers a size chart on each product page. You can also use our online fit guide or visit a Nike store for a personalized fitting.",
      isOpen: false
    },
    {
      question: "Does Nike offer student discounts?",
      answer: "Yes, Nike offers a 10% discount for students. You'll need to verify your student status through a third-party service to receive the discount.",
      isOpen: false
    },
    {
      question: "How can I cancel my order?",
      answer: "You can cancel your order within 30 minutes of placing it by contacting our customer service. After 30 minutes, you may need to wait for the order to arrive and then initiate a return.",
      isOpen: false
    },
    {
      question: "What payment methods does Nike accept?",
      answer: "Nike accepts major credit cards, PayPal, Apple Pay, and Nike gift cards. Payment options may vary depending on your location and the Nike store you're shopping from.",
      isOpen: false
    },
    {
      question: "How long does shipping take?",
      answer: "Shipping times vary depending on your location and chosen shipping method. Standard shipping typically takes 3-5 business days, while express shipping can deliver within 1-2 business days.",
      isOpen: false
    },
    {
      question: "Can I modify my order after it's been placed?",
      answer: "Unfortunately, we can't modify orders once they've been placed. If you need to make changes, please cancel your order (if possible) and place a new one with the correct items.",
      isOpen: false
    },
    {
      question: "How do I clean my Nike shoes?",
      answer: "The best way to clean your Nike shoes depends on the material. Generally, use a soft brush or cloth with mild soap and warm water. Always air dry and avoid direct heat. For specific instructions, check the product care guide on our website.",
      isOpen: false
    }
  ]);

  const filterTopics = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      if (activeTab === 'all' && searchQuery === '') {
        setFilteredTopics(helpTopics);
      } else {
        const lowercaseQuery = searchQuery.toLowerCase();
        setFilteredTopics(helpTopics.filter(topic => 
          (activeTab === 'all' || topic.category === activeTab) &&
          (topic.title.toLowerCase().includes(lowercaseQuery) ||
           topic.keywords.some(keyword => keyword.toLowerCase().includes(lowercaseQuery)))
        ));
      }
      setIsLoading(false);
    }, 300);
  }, [activeTab, searchQuery, helpTopics]);

  useEffect(() => {
    filterTopics();
  }, [activeTab, searchQuery, filterTopics]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    let timer;
    if (callStatus === 'connected') {
      timer = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [callStatus]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const toggleFaqItem = (index) => {
    setFaqItems(faqItems.map((item, i) => 
      i === index ? { ...item, isOpen: !item.isOpen } : item
    ));
  };

  const handleTopicClick = (topic) => {
    setSelectedTopic(topic);
  };

  const closeModal = () => {
    setSelectedTopic(null);
    setShowLearnMore(false);
    setShowContactSupport(false);
  };

  const handleLearnMore = () => {
    setShowLearnMore(true);
  };

  const handleContactSupport = () => {
    setShowContactSupport(true);
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    // Implement email submission logic here
    console.log("Email submitted:", email, message);
    alert("Thank you for your message. We'll get back to you soon!");
    setShowEmailForm(false);
    setEmail('');
    setMessage('');
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleCallButtonClick = () => {
    if (callStatus === 'idle') {
      setCallStatus('calling');
      setTimeout(() => {
        setCallStatus('connected');
      }, 2000);
    } else if (callStatus === 'connected') {
      setCallStatus('ended');
      setTimeout(() => {
        setShowCallModal(false);
        setCallStatus('idle');
        setCallDuration(0);
      }, 2000);
    }
  };

  const formatCallDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const filteredFaqItems = useMemo(() => 
    faqItems.filter(item => 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase())
    ), [faqItems, searchQuery]
  );

  return (
    <div className="help-page">
      <main className="container">
        <section className="hero-section">
          <h2 className="animated-text">How can we help you today?</h2>
          <div className="search-bar">
            <input 
              type="text" 
              placeholder="Search for help" 
              value={searchQuery}
              onChange={handleSearch}
              aria-label="Search for help"
            />
            <button className="search-button" aria-label="Search">
              <Search />
            </button>
          </div>
        </section>

        <section className="help-topics">
          <div className="topics-header">
            <h3>Help Topics</h3>
            <div className="topics-tabs" role="tablist">
              {['all', 'shopping', 'account', 'support'].map((tab) => (
                <button 
                  key={tab}
                  role="tab"
                  aria-selected={activeTab === tab}
                  className={activeTab === tab ? 'active' : ''}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div className="topics-grid">
            {isLoading ? (
              <div className="loading-spinner">
                <Loader className="animate-spin" />
              </div>
            ) : (
              filteredTopics.map((topic, index) => (
                <button key={index} className="topic-button" onClick={() => handleTopicClick(topic)}>
                  <span className="topic-icon" aria-hidden="true">{topic.icon}</span>
                  <span className="topic-title">{topic.title}</span>
                  <ChevronRight className="chevron-icon" aria-hidden="true" />
                </button>
              ))
            )}
          </div>
        </section>

        <section className="faq">
          <h3>Frequently Asked Questions</h3>
          <div className="faq-list">
            {filteredFaqItems.map((item, index) => (
              <details key={index} open={item.isOpen}>
                <summary onClick={() => toggleFaqItem(index)}>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="quick-help">
          <h3>Need Quick Help?</h3>
          <div className="quick-help-options">
            <button className="quick-help-option" onClick={() => setShowCallModal(true)}>
              <Phone aria-hidden="true" />
              <span>Call Us</span>
            </button>
            {/* <button className="quick-help-option" onClick={() => setShowEmailForm(true)}>
              <Mail aria-hidden="true" />
              <span>Email Support</span>
            </button> */}
            <button className="quick-help-option" onClick={() => setShowMap(true)}>
              <MapPin aria-hidden="true" />
              <span>Find Us</span>
            </button>
          </div>
        </section>
      </main>

      {selectedTopic && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeModal} aria-label="Close">
              <X />
            </button>
            <h3>{selectedTopic.title}</h3>
            <p>{selectedTopic.description}</p>
            <div className="modal-actions">
              <button className="action-button" onClick={handleLearnMore}>Learn More</button>
              <button className="action-button secondary" onClick={handleContactSupport}>Contact Support</button>
            </div>
          </div>
        </div>
      )}

      {showLearnMore && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeModal} aria-label="Close">
              <X />
            </button>
            <h3>Learn More: {selectedTopic.title}</h3>
            <p>Here you can find more detailed information about {selectedTopic.title.toLowerCase()}. This section would typically include links to relevant articles, FAQs, or other resources specific to the selected topic.</p>
            <ul>
              <li>Detailed guide on {selectedTopic.title.toLowerCase()}</li>
              <li>Frequently asked questions about {selectedTopic.title.toLowerCase()}</li>
              <li>Video tutorials related to {selectedTopic.title.toLowerCase()}</li>
              <li>Community forums discussing {selectedTopic.title.toLowerCase()}</li>
            </ul>
          </div>
        </div>
      )}

      {showContactSupport && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeModal} aria-label="Close">
              <X />
            </button>
            <h3>Contact Support: {selectedTopic.title}</h3>
            <p>Please choose your preferred method of contacting our support team regarding {selectedTopic.title.toLowerCase()}:</p>
            <div className="contact-options">
              <button className="contact-option" onClick={() => setShowCallModal(true)}>
                <Phone aria-hidden="true" />
                <span>Phone Call </span>
              </button>
              {/* <button className="contact-option" onClick={() => setShowEmailForm(true)}>
                <Mail aria-hidden="true" />
                <span>Email Support</span>
              </button> */}
              <button className="contact-option" onClick={() => setShowMap(true)}>
                <MapPin aria-hidden="true" />
                <span>Visit Store</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {showMap && (
        <div className="modal-overlay" onClick={() => setShowMap(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={() => setShowMap(false)} aria-label="Close">
              <X />
            </button>
            <h3>Find Us</h3>
            <div className="map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15343.072139334097!2d108.25135619999999!3d15.9773125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3142116949840599%3A0x365b35580f52e8d5!2sFPT%20University%20Danang!5e0!3m2!1sen!2s!4v1625160976261!5m2!1sen!2s"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="FPT University Danang Location"
              ></iframe>
            </div>
            <p>Visit us at our World Headquarters:</p>
            <p>FPT University Danang, Khu đô thị FPT City, Ngũ Hành Sơn, Đà Nẵng</p>
          </div>
        </div>
      )}

      {/* {showEmailForm && (
        <div className="modal-overlay" onClick={() => setShowEmailForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={() => setShowEmailForm(false)} aria-label="Close">
              <X />
            </button>
            <h3>Email Support</h3>
            <form onSubmit={handleEmailSubmit} className="email-form">
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-label="Your email"
              />
              <textarea
                placeholder="Your message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                aria-label="Your message"
              ></textarea>
              <button type="submit" className="action-button">Send</button>
            </form>
          </div>
        </div>
      )} */}

      {showCallModal && (
        <div className="modal-overlay" onClick={() => callStatus === 'idle' && setShowCallModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {callStatus === 'idle' && (
              <button className="close-button" onClick={() => setShowCallModal(false)} aria-label="Close">
                <X />
              </button>
            )}
            <h3>Call Us</h3>
            <p>Our customer support team is available to assist you:</p>
            <p className="phone-number">0905890604</p>
            <p>Hours of operation: Monday-Sunday, 8AM-8PM</p>
            {/* <div className="call-status">
              {callStatus === 'idle' && (
                <button className="action-button" onClick={handleCallButtonClick}>
                  Start Call
                </button>
              )}
              {callStatus === 'calling' && (
                <div className="calling-animation">
                  <PhoneCall className="animate-pulse" />
                  <p>Calling...</p>
                </div>
              )}
              {callStatus === 'connected' && (
                <div className="call-connected">
                  <p>Call Connected</p>
                  <p>Duration: {formatCallDuration(callDuration)}</p>
                  <button className="action-button end-call" onClick={handleCallButtonClick}>
                    End Call
                  </button>
                </div>
              )}
              {callStatus === 'ended' && (
                <div className="call-ended">
                  <PhoneOff />
                  <p>Call Ended</p>
                  <p>Duration: {formatCallDuration(callDuration)}</p>
                </div>
              )}
            </div> */}
          </div>
        </div>
      )}

      {/* {showScrollToTop && (
        <button 
          className="scroll-to-top" 
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <ArrowUp />
        </button>
      )} */}
    </div>
  );
};

export default HelpPage;