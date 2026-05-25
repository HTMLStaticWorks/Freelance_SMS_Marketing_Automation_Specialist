/**
 * SMSPulse - Main JavaScript Functions
 * Powered by ES6+ and premium interactive animations
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- Theme Management ---
  const initTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      document.documentElement.setAttribute('data-theme', 'dark');
      updateThemeToggles(true);
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      updateThemeToggles(false);
    }
  };

  const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeToggles(newTheme === 'dark');
  };

  const updateThemeToggles = (isDark) => {
    const themeToggles = document.querySelectorAll('.theme-toggle-btn');
    themeToggles.forEach(btn => {
      const icon = btn.querySelector('i');
      if (icon) {
        icon.className = isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
      }
    });
  };

  // --- RTL (Right-to-Left) Management ---
  const initRTL = () => {
    const savedRTL = localStorage.getItem('rtl') === 'true';
    if (savedRTL) {
      document.documentElement.setAttribute('dir', 'rtl');
      updateRTLToggles(true);
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
      updateRTLToggles(false);
    }
  };

  const toggleRTL = () => {
    const currentRTL = document.documentElement.getAttribute('dir') === 'rtl';
    const newRTL = !currentRTL;
    
    document.documentElement.setAttribute('dir', newRTL ? 'rtl' : 'ltr');
    localStorage.setItem('rtl', newRTL);
    updateRTLToggles(newRTL);
  };

  const updateRTLToggles = (isRTL) => {
    const rtlToggles = document.querySelectorAll('.rtl-toggle-btn');
    rtlToggles.forEach(btn => {
      btn.textContent = isRTL ? 'LTR' : 'RTL';
      btn.setAttribute('aria-label', isRTL ? 'Switch to Left to Right' : 'Switch to Right to Left');
    });
  };

  // --- Mobile Hamburger Navigation ---
  const initMobileNav = () => {
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.nav');
    
    if (hamburger && nav) {
      hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        hamburger.classList.toggle('open');
        nav.classList.toggle('open');
      });

      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
          hamburger.classList.remove('open');
          nav.classList.remove('open');
        }
      });

      // Close menu when clicking on a link
      const navLinks = document.querySelectorAll('.nav__link');
      navLinks.forEach(link => {
        link.addEventListener('click', () => {
          hamburger.classList.remove('open');
          nav.classList.remove('open');
        });
      });
    }
  };

  // --- Phone SMS Conversation Simulator (Home / Services Page) ---
  const initSmsSimulator = () => {
    const phoneScreen = document.querySelector('.phone-screen');
    const phoneInput = document.querySelector('.phone-input');
    const phoneSend = document.querySelector('.phone-send');
    
    if (phoneScreen && phoneInput && phoneSend) {
      const appendMessage = (text, isSent, styleClass = 'sms-bubble--received') => {
        const bubble = document.createElement('div');
        bubble.className = `sms-bubble ${isSent ? 'sms-bubble--sent' : styleClass}`;
        bubble.innerText = text;
        phoneScreen.appendChild(bubble);
        phoneScreen.scrollTop = phoneScreen.scrollHeight;
      };

      const handleSend = () => {
        const text = phoneInput.value.trim();
        if (text === '') return;
        
        appendMessage(text, true);
        phoneInput.value = '';

        // Auto automated reply after short delay
        setTimeout(() => {
          const query = text.toLowerCase();
          if (query.includes('join') || query.includes('start') || query.includes('offers')) {
            appendMessage('WellnessCo: Thank you for opting in! Reply YES to confirm. Msg&data rates may apply. Reply STOP to cancel at any time.', false, 'sms-bubble--primary');
          } else if (query.includes('yes')) {
            appendMessage('WellnessCo: Subscription Confirmed! Here is your compliant code: COMPLIANT15. Get 15% off your next checkout. Enjoy!', false, 'sms-bubble--primary');
          } else if (query.includes('stop')) {
            appendMessage('WellnessCo: You have unsubscribed and will receive no further messages. Reply START to join again.', false);
          } else {
            appendMessage('WellnessCo: Welcome! Text "JOIN" to subscribe to automated marketing flows or "COMPLIANCE" to check your status.', false);
          }
        }, 1000);
      };

      phoneSend.addEventListener('click', handleSend);
      phoneInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSend();
      });

      // Start demo sequence
      setTimeout(() => {
        appendMessage('Text "JOIN" to get compliant updates & 15% discount!', false);
      }, 500);

      setTimeout(() => {
        appendMessage('JOIN', true);
      }, 2000);

      setTimeout(() => {
        appendMessage('WellnessCo: Thank you for opting in! Reply YES to confirm. Msg&data rates may apply. Reply STOP to cancel at any time.', false, 'sms-bubble--primary');
      }, 3500);

      setTimeout(() => {
        appendMessage('YES', true);
      }, 5500);

      setTimeout(() => {
        appendMessage('WellnessCo: Subscription Confirmed! Here is your compliant code: COMPLIANT15. Get 15% off your next checkout. Enjoy!', false, 'sms-bubble--primary');
      }, 7000);
    }
  };

  // --- Real-time SMS Live Content Previewer ---
  const initSmsPreviewer = () => {
    const textSelector = document.getElementById('sms-preview-input');
    const phoneBubble = document.getElementById('live-sms-bubble');
    const characterCounter = document.getElementById('char-count');

    if (textSelector && phoneBubble) {
      textSelector.addEventListener('input', (e) => {
        const text = e.target.value;
        phoneBubble.innerText = text || '[Your SMS text will appear here in real-time...]';
        
        if (characterCounter) {
          const currentCount = text.length;
          const segments = Math.ceil(currentCount / 160) || 1;
          characterCounter.innerText = `${currentCount} chars | ${segments} SMS Segment${segments > 1 ? 's' : ''}`;
        }
      });
    }
  };

  // --- Interactive TCPA Compliance Checklist Wizard ---
  const initComplianceWizard = () => {
    const nextBtns = document.querySelectorAll('.wizard-next');
    const prevBtns = document.querySelectorAll('.wizard-prev');
    const steps = document.querySelectorAll('.checker-step');
    const scoreVal = document.getElementById('compliance-score');
    const resultBox = document.getElementById('compliance-result-msg');

    if (steps.length > 0) {
      let currentStepIdx = 0;
      let answers = {};

      const showStep = (idx) => {
        steps.forEach((step, i) => {
          step.classList.toggle('active', i === idx);
        });
      };

      nextBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const stepName = btn.dataset.step;
          const radioGroup = document.getElementsByName(stepName);
          let checkedVal = null;

          for (let radio of radioGroup) {
            if (radio.checked) {
              checkedVal = radio.value;
              break;
            }
          }

          if (!checkedVal) {
            alert('Please select an option to proceed!');
            return;
          }

          answers[stepName] = checkedVal;
          currentStepIdx++;

          if (currentStepIdx === steps.length - 1) {
            calculateResult();
          }
          showStep(currentStepIdx);
        });
      });

      prevBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          currentStepIdx--;
          showStep(currentStepIdx);
        });
      });

      const calculateResult = () => {
        let score = 0;
        let details = [];

        if (answers['consent'] === 'yes') score += 40;
        else details.push('Strict prior express written consent is mandatory under TCPA!');

        if (answers['optout'] === 'yes') score += 30;
        else details.push('A direct STOP/unsubscribe keyword is required in all communications!');

        if (answers['hours'] === 'yes') score += 30;
        else details.push('Quiet hours (8 PM - 9 AM recipient time) must be enforced by system.');

        if (scoreVal) {
          scoreVal.innerText = `${score}%`;
        }

        if (resultBox) {
          if (score === 100) {
            resultBox.innerHTML = '<strong style="color: var(--success);"><i class="fa-solid fa-circle-check"></i> Compliant!</strong> Your SMS marketing campaign strategy is TCPA/CTIA safe!';
          } else {
            resultBox.innerHTML = `<strong style="color: var(--error);"><i class="fa-solid fa-triangle-exclamation"></i> Risks Detected!</strong><br><ul style="text-align: left; margin-top: 10px; padding-left: 20px;">${details.map(d => `<li>${d}</li>`).join('')}</ul>`;
          }
        }
      };
    }
  };

  // --- Dynamic Live ROI & Fee Calculator (Services page) ---
  const initRoiCalculator = () => {
    const listSizeInput = document.getElementById('calc-list-size');
    const aovInput = document.getElementById('calc-aov');
    const calcBtn = document.getElementById('calc-trigger');
    const resultROI = document.getElementById('calc-roi-value');
    const resultSales = document.getElementById('calc-sales-value');
    
    if (listSizeInput && aovInput && calcBtn) {
      calcBtn.addEventListener('click', () => {
        const size = parseFloat(listSizeInput.value) || 0;
        const aov = parseFloat(aovInput.value) || 0;
        
        // Industry average benchmark values
        const clickRate = 0.12; // 12% click rate
        const conversionRate = 0.035; // 3.5% conversion of clicks
        const costPerSms = 0.015; // $0.015 per SMS sent
        
        const totalSmsSent = size;
        const smsCost = totalSmsSent * costPerSms;
        const clicks = totalSmsSent * clickRate;
        const salesCount = clicks * conversionRate;
        const totalRevenue = salesCount * aov;
        const netProfit = totalRevenue - smsCost;
        const roi = smsCost > 0 ? (netProfit / smsCost) * 100 : 0;
        
        if (resultSales) {
          resultSales.innerText = `$${totalRevenue.toLocaleString(undefined, {maximumFractionDigits: 2})}`;
        }
        if (resultROI) {
          resultROI.innerText = `${roi.toLocaleString(undefined, {maximumFractionDigits: 0})}%`;
        }
      });
    }
  };

  // --- Client-side Form Validation with custom UX ---
  const initFormValidation = () => {
    const forms = document.querySelectorAll('.needs-validation');
    
    forms.forEach(form => {
      form.addEventListener('submit', (e) => {
        let isValid = true;
        const requiredInputs = form.querySelectorAll('[required]');
        
        requiredInputs.forEach(input => {
          const group = input.closest('.form-group');
          if (!group) return;
          
          if (input.value.trim() === '') {
            group.classList.remove('success');
            group.classList.add('error');
            isValid = false;
          } else {
            // Specific validation
            if (input.type === 'email' && !validateEmail(input.value)) {
              group.classList.remove('success');
              group.classList.add('error');
              isValid = false;
            } else {
              group.classList.remove('error');
              group.classList.add('success');
            }
          }
        });

        if (!isValid) {
          e.preventDefault();
        }
      });
    });

    const validateEmail = (email) => {
      return String(email)
        .toLowerCase()
        .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    };
  };

  // Initialize toggles listeners
  const setupToggleListeners = () => {
    const themeBtns = document.querySelectorAll('.theme-toggle-btn');
    themeBtns.forEach(btn => btn.addEventListener('click', toggleTheme));

    const rtlBtns = document.querySelectorAll('.rtl-toggle-btn');
    rtlBtns.forEach(btn => btn.addEventListener('click', toggleRTL));
  };

  // --- Back to Top Functionality ---
  const initBackToTop = () => {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
    backToTopBtn.setAttribute('aria-label', 'Back to Top');
    document.body.appendChild(backToTopBtn);

    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('active');
      } else {
        backToTopBtn.classList.remove('active');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  };

  // Running initializations
  initTheme();
  initRTL();
  initMobileNav();
  initSmsSimulator();
  initSmsPreviewer();
  initComplianceWizard();
  initRoiCalculator();
  initFormValidation();
  setupToggleListeners();
  initBackToTop();
});
