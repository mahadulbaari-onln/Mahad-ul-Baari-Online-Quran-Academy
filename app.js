/**
 * MA'HAD UL BAARI INTERNATIONAL ONLINE ACADEMY
 * Main Application Logic & Interactivity
 * Tagline: "A Global Journey of Islamic Learning"
 * Official Contact Hotline: +92 320 1291147
 * Official WhatsApp URL: https://wa.me/message/HISPC5DQYRWWP1
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';
  if (window.__mahadAppInitialized) return;
  window.__mahadAppInitialized = true;

  // ==========================================================================
  // 1. GLOBAL PRICING & CURRENCY STATE
  // ==========================================================================
  const pricingData = {
    USD: { symbol: '$', label: 'USD ($)', starter: 35, standard: 50, intensive: 80, weekend: 40 },
    GBP: { symbol: '£', label: 'GBP (£)', starter: 28, standard: 40, intensive: 65, weekend: 32 },
    EUR: { symbol: '€', label: 'EUR (€)', starter: 32, standard: 46, intensive: 74, weekend: 37 },
    AUD: { symbol: 'A$', label: 'AUD (A$)', starter: 55, standard: 78, intensive: 125, weekend: 62 },
    CAD: { symbol: 'C$', label: 'CAD (C$)', starter: 48, standard: 68, intensive: 110, weekend: 55 }
  };

  let currentCurrency = 'USD';
  let isSiblingDiscountActive = false;

  const currencySelector = document.getElementById('currencySelector');
  const mobileCurrencySelector = document.getElementById('mobileCurrencySelector');
  const currentCurrencyLabel = document.getElementById('currentCurrencyLabel');
  const siblingDiscountToggle = document.getElementById('siblingDiscountToggle');

  const priceStarterEl = document.getElementById('priceStarter');
  const priceStandardEl = document.getElementById('priceStandard');
  const priceIntensiveEl = document.getElementById('priceIntensive');
  const priceWeekendEl = document.getElementById('priceWeekend');

  const strikeStarterEl = document.getElementById('strikeStarter');
  const strikeStandardEl = document.getElementById('strikeStandard');
  const strikeIntensiveEl = document.getElementById('strikeIntensive');
  const strikeWeekendEl = document.getElementById('strikeWeekend');

  const currencySymbolEls = document.querySelectorAll('[data-currency-symbol]');

  function updatePricingDisplay() {
    const data = pricingData[currentCurrency] || pricingData.USD;
    const discountFactor = isSiblingDiscountActive ? 0.8 : 1.0;

    currencySymbolEls.forEach(el => {
      el.textContent = data.symbol;
    });

    if (currentCurrencyLabel) {
      currentCurrencyLabel.textContent = `${data.label} ${isSiblingDiscountActive ? '(20% Sibling Discount Applied)' : ''}`;
    }

    // Calculate discounted prices
    const starterPrice = Math.round(data.starter * discountFactor);
    const standardPrice = Math.round(data.standard * discountFactor);
    const intensivePrice = Math.round(data.intensive * discountFactor);
    const weekendPrice = Math.round(data.weekend * discountFactor);

    if (priceStarterEl) priceStarterEl.textContent = starterPrice;
    if (priceStandardEl) priceStandardEl.textContent = standardPrice;
    if (priceIntensiveEl) priceIntensiveEl.textContent = intensivePrice;
    if (priceWeekendEl) priceWeekendEl.textContent = weekendPrice;

    // Show/hide strikethrough original prices
    if (isSiblingDiscountActive) {
      if (strikeStarterEl) {
        strikeStarterEl.textContent = `${data.symbol}${data.starter}/mo regular`;
        strikeStarterEl.classList.add('active');
      }
      if (strikeStandardEl) {
        strikeStandardEl.textContent = `${data.symbol}${data.standard}/mo regular`;
        strikeStandardEl.classList.add('active');
      }
      if (strikeIntensiveEl) {
        strikeIntensiveEl.textContent = `${data.symbol}${data.intensive}/mo regular`;
        strikeIntensiveEl.classList.add('active');
      }
      if (strikeWeekendEl) {
        strikeWeekendEl.textContent = `${data.symbol}${data.weekend}/mo regular`;
        strikeWeekendEl.classList.add('active');
      }
    } else {
      [strikeStarterEl, strikeStandardEl, strikeIntensiveEl, strikeWeekendEl].forEach(el => {
        if (el) el.classList.remove('active');
      });
    }
  }

  if (currencySelector) {
    currencySelector.addEventListener('change', (e) => {
      currentCurrency = e.target.value;
      if (mobileCurrencySelector) mobileCurrencySelector.value = currentCurrency;
      updatePricingDisplay();
      showToast(`Currency changed to ${currentCurrency}`);
    });
  }

  if (mobileCurrencySelector) {
    mobileCurrencySelector.addEventListener('change', (e) => {
      currentCurrency = e.target.value;
      if (currencySelector) currencySelector.value = currentCurrency;
      updatePricingDisplay();
      showToast(`Currency changed to ${currentCurrency}`);
    });
  }

  if (siblingDiscountToggle) {
    siblingDiscountToggle.addEventListener('change', (e) => {
      isSiblingDiscountActive = e.target.checked;
      updatePricingDisplay();
      if (isSiblingDiscountActive) {
        showToast('🎉 20% Sibling & Family Discount applied to all plans!');
      } else {
        showToast('Standard individual student pricing restored');
      }
    });
  }

  // ==========================================================================
  // 2. STICKY HEADER SCROLL EFFECT & MOBILE DRAWER
  // ==========================================================================
  const siteHeader = document.getElementById('siteHeader');
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerOverlay = document.getElementById('drawerOverlay');
  const drawerCloseBtn = document.getElementById('drawerCloseBtn');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  }, { passive: true });

  function openDrawer() {
    mobileDrawer.classList.add('active');
    drawerOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer.classList.remove('active');
    drawerOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (mobileMenuToggle) mobileMenuToggle.addEventListener('click', openDrawer);
  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // Update current year in footer
  const currentYearEl = document.getElementById('currentYear');
  if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
  }

  // ==========================================================================
  // 3. COURSE FILTER TABS
  // ==========================================================================
  const filterBtns = document.querySelectorAll('.course-filter-btn');
  const courseCards = document.querySelectorAll('.course-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      courseCards.forEach(card => {
        const category = card.getAttribute('data-category') || '';
        if (filter === 'all' || category.includes(filter)) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.35s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ==========================================================================
  // 4. FAQ ACCORDION INTERACTIVITY
  // ==========================================================================
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const headerBtn = item.querySelector('.faq-header-btn');
    if (headerBtn) {
      headerBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Optional: Close others
        faqItems.forEach(other => {
          if (other !== item) other.classList.remove('active');
        });

        if (isActive) {
          item.classList.remove('active');
        } else {
          item.classList.add('active');
        }
      });
    }
  });

  // ==========================================================================
  // 5. INTERACTIVE DIGITAL MUSHAF & AUDIO RECITATION
  // ==========================================================================
  const quranData = {
    fatiha: {
      name: "Surah Al-Fatihah (The Opening)",
      verses: [
        {
          num: 1,
          arabic: "بِسْمِ اللَّـهِ الرَّحْمَـٰنِ الرَّحِيمِ",
          english: "In the name of Allah, the Entirely Merciful, the Especially Merciful.",
          audioUrl: "https://everyayah.com/data/Alafasy_128kbps/001001.mp3"
        },
        {
          num: 2,
          arabic: "الْحَمْدُ لِلَّـهِ رَبِّ الْعَالَمِينَ",
          english: "[All] praise is [due] to Allah, Lord of the worlds -",
          audioUrl: "https://everyayah.com/data/Alafasy_128kbps/001002.mp3"
        },
        {
          num: 3,
          arabic: "الرَّحْمَـٰنِ الرَّحِيمِ",
          english: "The Entirely Merciful, the Especially Merciful,",
          audioUrl: "https://everyayah.com/data/Alafasy_128kbps/001003.mp3"
        },
        {
          num: 4,
          arabic: "مَالِكِ يَوْمِ الدِّينِ",
          english: "Sovereign of the Day of Recompense.",
          audioUrl: "https://everyayah.com/data/Alafasy_128kbps/001004.mp3"
        },
        {
          num: 5,
          arabic: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
          english: "It is You we worship and You we ask for help.",
          audioUrl: "https://everyayah.com/data/Alafasy_128kbps/001005.mp3"
        },
        {
          num: 6,
          arabic: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
          english: "Guide us to the straight path -",
          audioUrl: "https://everyayah.com/data/Alafasy_128kbps/001006.mp3"
        },
        {
          num: 7,
          arabic: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",
          english: "The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray.",
          audioUrl: "https://everyayah.com/data/Alafasy_128kbps/001007.mp3"
        }
      ]
    },
    ikhlas: {
      name: "Surah Al-Ikhlas (Purity of Faith)",
      verses: [
        {
          num: 1,
          arabic: "قُلْ هُوَ اللَّـهُ أَحَدٌ",
          english: "Say, 'He is Allah, [who is] One,",
          audioUrl: "https://everyayah.com/data/Alafasy_128kbps/112001.mp3"
        },
        {
          num: 2,
          arabic: "اللَّـهُ الصَّمَدُ",
          english: "Allah, the Eternal Refuge.",
          audioUrl: "https://everyayah.com/data/Alafasy_128kbps/112002.mp3"
        },
        {
          num: 3,
          arabic: "لَمْ يَلِدْ وَلَمْ يُولَدْ",
          english: "He neither begets nor is born,",
          audioUrl: "https://everyayah.com/data/Alafasy_128kbps/112003.mp3"
        },
        {
          num: 4,
          arabic: "وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ",
          english: "Nor is there to Him any equivalent.'",
          audioUrl: "https://everyayah.com/data/Alafasy_128kbps/112004.mp3"
        }
      ]
    }
  };

  let activeSurahKey = 'fatiha';
  let activeVerseIndex = -1;
  let currentAudio = null;
  let isPlayingEntireSurah = false;

  const interactiveVersesList = document.getElementById('interactiveVersesList');
  const surahTabBtns = document.querySelectorAll('.surah-tab-btn');
  const mainAudioPlayToggle = document.getElementById('mainAudioPlayToggle');
  const mainPlayIcon = document.getElementById('mainPlayIcon');
  const mainPlayBtnText = document.getElementById('mainPlayBtnText');
  const playerStatusText = document.getElementById('playerStatusText');

  // Hero Audio elements
  const heroAudioToggle = document.getElementById('heroAudioToggle');
  const heroAudioIcon = document.getElementById('heroAudioIcon');
  let heroAudio = null;
  let isHeroPlaying = false;

  function renderVerses() {
    if (!interactiveVersesList) return;
    const surah = quranData[activeSurahKey];
    interactiveVersesList.innerHTML = '';

    surah.verses.forEach((verse, index) => {
      const row = document.createElement('div');
      row.className = `interactive-verse-row ${index === activeVerseIndex ? 'playing' : ''}`;
      row.dataset.index = index;

      row.innerHTML = `
        <div class="verse-arabic">${verse.arabic}</div>
        <div class="verse-translation">
          <span>${verse.english}</span>
          <span class="verse-num-badge">${verse.num}</span>
        </div>
      `;

      row.addEventListener('click', () => {
        playSingleVerse(index);
      });

      interactiveVersesList.appendChild(row);
    });
  }

  function stopCurrentAudio() {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      currentAudio = null;
    }
  }

  function playSingleVerse(index) {
    stopCurrentAudio();
    isPlayingEntireSurah = false;
    const surah = quranData[activeSurahKey];
    const verse = surah.verses[index];
    if (!verse) return;

    activeVerseIndex = index;
    renderVerses();

    if (playerStatusText) {
      playerStatusText.innerHTML = `<i class="fa-solid fa-volume-high" style="color: #38BDF8;"></i> <span>Reciting Ayah ${verse.num}...</span>`;
    }

    if (mainPlayIcon) {
      mainPlayIcon.className = 'fa-solid fa-pause';
    }
    if (mainPlayBtnText) {
      mainPlayBtnText.textContent = 'Pause';
    }

    try {
      currentAudio = new Audio(verse.audioUrl);
      currentAudio.play().catch(err => {
        console.warn('Audio play restricted by browser policy:', err);
        // Visual fallback
        if (playerStatusText) {
          playerStatusText.innerHTML = `<i class="fa-solid fa-check" style="color: #34D399;"></i> <span>Ayah ${verse.num} Selected (Click again if muted)</span>`;
        }
      });

      currentAudio.onended = () => {
        activeVerseIndex = -1;
        renderVerses();
        if (playerStatusText) {
          playerStatusText.innerHTML = `<i class="fa-solid fa-check" style="color: #34D399;"></i> <span>Completed &bull; Select any Ayah</span>`;
        }
        if (mainPlayIcon) mainPlayIcon.className = 'fa-solid fa-play';
        if (mainPlayBtnText) mainPlayBtnText.textContent = 'Play Surah';
      };
    } catch (e) {
      console.error(e);
    }
  }

  function playSurahSequence(startIndex = 0) {
    const surah = quranData[activeSurahKey];
    if (startIndex >= surah.verses.length) {
      isPlayingEntireSurah = false;
      activeVerseIndex = -1;
      renderVerses();
      if (playerStatusText) {
        playerStatusText.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #34D399;"></i> <span>Recitation completed</span>`;
      }
      if (mainPlayIcon) mainPlayIcon.className = 'fa-solid fa-play';
      if (mainPlayBtnText) mainPlayBtnText.textContent = 'Play Surah';
      return;
    }

    stopCurrentAudio();
    isPlayingEntireSurah = true;
    activeVerseIndex = startIndex;
    renderVerses();

    const verse = surah.verses[startIndex];
    if (playerStatusText) {
      playerStatusText.innerHTML = `<i class="fa-solid fa-volume-high" style="color: #38BDF8;"></i> <span>Reciting Ayah ${verse.num} of ${surah.verses.length}...</span>`;
    }

    try {
      currentAudio = new Audio(verse.audioUrl);
      currentAudio.play().catch(err => {
        console.warn('Browser auto-play restriction:', err);
      });

      currentAudio.onended = () => {
        playSurahSequence(startIndex + 1);
      };
    } catch (e) {
      console.error(e);
    }
  }

  if (surahTabBtns) {
    surahTabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        surahTabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeSurahKey = btn.dataset.surah;
        stopCurrentAudio();
        activeVerseIndex = -1;
        isPlayingEntireSurah = false;
        renderVerses();
        if (mainPlayIcon) mainPlayIcon.className = 'fa-solid fa-play';
        if (mainPlayBtnText) mainPlayBtnText.textContent = 'Play Surah';
        if (playerStatusText) {
          playerStatusText.innerHTML = `<i class="fa-solid fa-book-quran" style="color: #38BDF8;"></i> <span>${quranData[activeSurahKey].name} loaded</span>`;
        }
      });
    });
  }

  if (mainAudioPlayToggle) {
    mainAudioPlayToggle.addEventListener('click', () => {
      if (isPlayingEntireSurah || currentAudio) {
        stopCurrentAudio();
        isPlayingEntireSurah = false;
        activeVerseIndex = -1;
        renderVerses();
        mainPlayIcon.className = 'fa-solid fa-play';
        mainPlayBtnText.textContent = 'Play Surah';
        if (playerStatusText) {
          playerStatusText.innerHTML = `<i class="fa-solid fa-pause" style="color: #94A3B8;"></i> <span>Recitation paused</span>`;
        }
      } else {
        mainPlayIcon.className = 'fa-solid fa-pause';
        mainPlayBtnText.textContent = 'Pause';
        playSurahSequence(0);
      }
    });
  }

  // Hero Quick Recitation Sample
  if (heroAudioToggle) {
    heroAudioToggle.addEventListener('click', () => {
      if (isHeroPlaying && heroAudio) {
        heroAudio.pause();
        heroAudio.currentTime = 0;
        isHeroPlaying = false;
        heroAudioIcon.className = 'fa-solid fa-play';
        showToast('Audio sample paused');
      } else {
        stopCurrentAudio();
        heroAudio = new Audio('https://everyayah.com/data/Alafasy_128kbps/001001.mp3');
        isHeroPlaying = true;
        heroAudioIcon.className = 'fa-solid fa-pause';
        showToast('Playing Surah Al-Fatihah sample');

        heroAudio.play().catch(e => {
          console.warn('Playback error:', e);
          showToast('Click again to allow browser audio');
        });

        heroAudio.onended = () => {
          isHeroPlaying = false;
          heroAudioIcon.className = 'fa-solid fa-play';
        };
      }
    });
  }

  // Initial render of showcase verses
  renderVerses();

  // ==========================================================================
  // 6. INTERACTIVE TRIAL BOOKING MODAL & IN-PAGE FORMS
  // ==========================================================================
  const trialModalOverlay = document.getElementById('trialModalOverlay');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const openTrialModalBtns = document.querySelectorAll('.open-trial-modal-btn');
  const modalFormContainer = document.getElementById('modalFormContainer');
  const modalSuccessContainer = document.getElementById('modalSuccessContainer');
  const modalResetBtn = document.getElementById('modalResetBtn');
  const modalDirectWhatsappBtn = document.getElementById('modalDirectWhatsappBtn');
  const successTicketDetails = document.getElementById('successTicketDetails');

  const modalTrialForm = document.getElementById('modalTrialForm');
  const inPageTrialForm = document.getElementById('inPageTrialForm');

  function openModal(courseName = '', tutorPref = '') {
    if (courseName) {
      const modalCourseSelect = document.getElementById('modalCourse');
      if (modalCourseSelect) {
        for (let i = 0; i < modalCourseSelect.options.length; i++) {
          if (modalCourseSelect.options[i].value.includes(courseName)) {
            modalCourseSelect.selectedIndex = i;
            break;
          }
        }
      }
    }

    if (tutorPref) {
      const radio = document.querySelector(`input[name="modalTutorGender"][value*="${tutorPref}"]`);
      if (radio) radio.checked = true;
    }

    // Reset view
    modalFormContainer.style.display = 'block';
    modalSuccessContainer.style.display = 'none';
    trialModalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    trialModalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  openTrialModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const course = btn.getAttribute('data-course') || btn.getAttribute('data-plan-name') || '';
      const tutorPref = btn.getAttribute('data-tutor-pref') || '';
      openModal(course, tutorPref);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (trialModalOverlay) {
    trialModalOverlay.addEventListener('click', (e) => {
      if (e.target === trialModalOverlay) closeModal();
    });
  }

  // Keyboard escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && trialModalOverlay.classList.contains('active')) {
      closeModal();
    }
  });

  if (modalResetBtn) {
    modalResetBtn.addEventListener('click', () => {
      modalFormContainer.style.display = 'block';
      modalSuccessContainer.style.display = 'none';
      if (modalTrialForm) modalTrialForm.reset();
    });
  }

  /**
   * Generates a clean pre-filled WhatsApp message URL
   */
  function buildWhatsAppLink(data) {
    const rawMessage = `*NEW TRIAL CLASS BOOKING — MA'HAD UL BAARI ACADEMY*
━━━━━━━━━━━━━━━━━━━━
*Student / Parent:* ${data.name}
*Email:* ${data.email}
*Phone / WhatsApp:* ${data.phone}
*Age Group:* ${data.ageGroup}
*Course Chosen:* ${data.course}
*Tutor Preference:* ${data.tutorPreference}
*Timezone:* ${data.timezone}
*Preferred Timing:* ${data.timing || 'Flexible'}
*Student Notes:* ${data.notes || 'None provided'}
*Booking Ref ID:* ${data.refId}
━━━━━━━━━━━━━━━━━━━━
Assalamu Alaikum! I have just booked my free 30-minute trial class on your website. Please confirm my evaluation schedule.`;

    const encoded = encodeURIComponent(rawMessage);
    // WhatsApp direct link with message
    return `https://wa.me/message/HISPC5DQYRWWP1?text=${encoded}`;
  }

  /**
   * Common handler for form submissions
   */
  function handleTrialBooking(formData) {
    // Generate Booking Reference
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const refId = `MUB-${new Date().getFullYear()}-${randomCode}`;
    formData.refId = refId;
    formData.date = new Date().toISOString();

    // Store in LocalStorage
    try {
      const existing = JSON.parse(localStorage.getItem('mahad_ul_baari_bookings') || '[]');
      existing.unshift(formData);
      localStorage.setItem('mahad_ul_baari_bookings', JSON.stringify(existing));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }

    const whatsappUrl = buildWhatsAppLink(formData);

    // Update Success Ticket
    if (successTicketDetails) {
      successTicketDetails.innerHTML = `
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem; font-weight: 700;">
          <span style="color: #1565B8;">Booking Reference:</span>
          <span style="color: #0F1D2F;">${formData.refId}</span>
        </div>
        <div style="font-size: 0.88rem; line-height: 1.6; color: #334155;">
          <strong>Student:</strong> ${formData.name}<br>
          <strong>Course:</strong> ${formData.course}<br>
          <strong>Tutor:</strong> ${formData.tutorPreference}<br>
          <strong>Timezone:</strong> ${formData.timezone} (${formData.timing || 'Flexible'})
        </div>
      `;
    }

    if (modalDirectWhatsappBtn) {
      modalDirectWhatsappBtn.href = whatsappUrl;
    }

    // Show modal success screen
    modalFormContainer.style.display = 'none';
    modalSuccessContainer.style.display = 'block';
    trialModalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    showToast(`✅ Free Trial Booked! Ref: ${formData.refId}`);
  }

  // Handle Modal Form Submit
  if (modalTrialForm) {
    modalTrialForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('modalFullName').value.trim();
      const email = document.getElementById('modalEmail').value.trim();
      const countryCode = document.getElementById('modalCountryCode').value;
      const phoneNum = document.getElementById('modalPhone').value.trim();
      const ageGroup = document.getElementById('modalAgeGroup').value;
      const course = document.getElementById('modalCourse').value;
      const tutorGenderRadio = document.querySelector('input[name="modalTutorGender"]:checked');
      const tutorPreference = tutorGenderRadio ? tutorGenderRadio.value : 'Either';
      const timezone = document.getElementById('modalTimezone').value;
      const timing = document.getElementById('modalTiming').value;
      const notes = document.getElementById('modalNotes').value.trim();

      handleTrialBooking({
        name,
        email,
        phone: `${countryCode} ${phoneNum}`,
        ageGroup,
        course,
        tutorPreference,
        timezone,
        timing,
        notes
      });
    });
  }

  // Handle In-Page Form Submit
  if (inPageTrialForm) {
    inPageTrialForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('formFullName').value.trim();
      const email = document.getElementById('formEmail').value.trim();
      const countryCode = document.getElementById('formCountryCode').value;
      const phoneNum = document.getElementById('formPhone').value.trim();
      const ageGroup = document.getElementById('formAgeGroup').value;
      const course = document.getElementById('formCourse').value;
      const tutorGenderRadio = document.querySelector('input[name="tutorGender"]:checked');
      const tutorPreference = tutorGenderRadio ? tutorGenderRadio.value : 'Either';
      const timezone = document.getElementById('formTimezone').value;
      const timing = document.getElementById('formTiming').value;
      const notes = document.getElementById('formNotes').value.trim();

      handleTrialBooking({
        name,
        email,
        phone: `${countryCode} ${phoneNum}`,
        ageGroup,
        course,
        tutorPreference,
        timezone,
        timing,
        notes
      });

      inPageTrialForm.reset();
    });
  }

  // ==========================================================================
  // 7. TOAST NOTIFICATION UTILITY
  // ==========================================================================
  function showToast(message, duration = 3500) {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <i class="fa-solid fa-circle-info" style="color: #38BDF8;"></i>
      <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }

  // ==========================================================================
  // 8. AUTO-DETECT USER TIMEZONE FOR FRIENDLY GREETING
  // ==========================================================================
  try {
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const tzSelect = document.getElementById('formTimezone');
    const modalTzSelect = document.getElementById('modalTimezone');

    if (userTimezone) {
      if (userTimezone.includes('London') || userTimezone.includes('Europe/London')) {
        if (tzSelect) tzSelect.value = 'UK (GMT / BST)';
        if (modalTzSelect) modalTzSelect.value = 'UK (GMT / BST)';
        if (currencySelector) {
          currencySelector.value = 'GBP';
          currentCurrency = 'GBP';
          updatePricingDisplay();
        }
      } else if (userTimezone.includes('Sydney') || userTimezone.includes('Melbourne') || userTimezone.includes('Australia')) {
        if (tzSelect) tzSelect.value = 'Australia (Sydney / AEST)';
        if (modalTzSelect) modalTzSelect.value = 'Australia (Sydney / AEST)';
        if (currencySelector) {
          currencySelector.value = 'AUD';
          currentCurrency = 'AUD';
          updatePricingDisplay();
        }
      } else if (userTimezone.includes('Toronto') || userTimezone.includes('Canada')) {
        if (tzSelect) tzSelect.value = 'Canada (Toronto / EST)';
        if (modalTzSelect) modalTzSelect.value = 'Canada (Toronto / EST)';
        if (currencySelector) {
          currencySelector.value = 'CAD';
          currentCurrency = 'CAD';
          updatePricingDisplay();
        }
      }
    }
  } catch (err) {
    console.debug('Timezone detection silent fallback');
  }

  // Initial update
  updatePricingDisplay();
});
