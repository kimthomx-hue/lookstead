const HELP_FEATURED_COUNT = 6;

const HELP_FAQS = [
  {
    q: 'I paid but the app still shows a paywall. What gives?',
    a: 'Tap Restore purchases in Settings or on the paywall. Use the same Apple ID or Google account you paid with. If it still fails, email support with your receipt and we will check RevenueCat and your account.',
  },
  {
    q: 'How do I cancel my subscription or free trial?',
    a: 'Subscriptions are managed by Apple or Google, not inside Lookstead. On iPhone: Settings, your name, Subscriptions, Lookstead, Cancel. On Android: Google Play, Payments and subscriptions, Subscriptions.',
  },
  {
    q: 'I want a refund. How do I get one?',
    a: 'Refund requests go through the App Store or Google Play. Apple: reportaproblem.apple.com. Google: play.google.com/store/account/subscriptions. We cannot issue store refunds from our side.',
  },
  {
    q: 'The app misread my photo or gave a useless answer.',
    a: 'Try a clearer photo, better lighting, and a specific question. If the answer says Demo, the live service is not connected on that build. Email support with what you asked and we can improve from your example.',
  },
  {
    q: 'The app keeps crashing or will not open.',
    a: 'Update to the latest version, restart your phone, and free some storage. If it persists, email support with your device model and iOS or Android version.',
  },
  {
    q: 'How do I ask my first question?',
    a: 'From Home, tap Take a photo or Choose from photos. Preview the image, pick or type your question, then submit. Camera and library access are requested only when you start that flow.',
  },
  {
    q: 'Why does my answer say "Demo"?',
    a: 'Live vision needs the Lookstead backend connected. Until that is set up on a build, you will see clearly labelled demo answers so you can test the app without fake "live" analysis.',
  },
  {
    q: 'What is "Save to My Home"?',
    a: 'After a useful answer, save the item with a name and category. Future questions can link to that item so context stays in one place.',
  },
  {
    q: 'When does Lookstead access my camera or photos?',
    a: 'Only when you tap take or upload a photo, not during onboarding.',
  },
  {
    q: 'Can Lookstead diagnose gas, electrical or structural problems?',
    a: 'No. Lookstead gives cautious visual guidance and tells you when to stop and call a qualified professional or emergency services. Never work on live electrics or suspected gas leaks based on app advice alone.',
  },
  {
    q: 'How do I delete a question or photo?',
    a: 'Open History, long-press an entry to delete it, or use Clear history. Saved items can be deleted from My Home, item, Delete item.',
  },
  {
    q: 'How do I delete all local data on this device?',
    a: 'Go to Settings, Privacy and data, Delete all data on this device. This clears saved items, question history and onboarding preferences on the phone. It does not cancel App Store subscriptions.',
  },
  {
    q: 'Do I need an account?',
    a: 'The core experience works without sign-in today. Account sign-in will sync preferences and saved items across devices when cloud features launch.',
  },
  {
    q: 'How do subscriptions work?',
    a: 'Free tier includes a limited number of photo questions per month. Plus and Family plans increase limits and features. Manage or cancel in your Apple or Google subscription settings.',
  },
  {
    q: 'How do I contact support?',
    a: 'Email support@lookstead.com with your device type, app version and a short description. Do not send passwords or payment card numbers.',
  },
];

(function initHelpFaq() {
  const list = document.getElementById('faq-list');
  const seeAllBtn = document.getElementById('faq-see-all');
  if (!list) {
    return;
  }

  let showAll = false;

  function render() {
    const items = showAll ? HELP_FAQS : HELP_FAQS.slice(0, HELP_FEATURED_COUNT);
    list.innerHTML = '';

    items.forEach((item, index) => {
      const details = document.createElement('details');
      details.className = 'faq-item';
      try {
        details.setAttribute('name', 'lookstead-faq');
      } catch {
        /* Exclusive accordion group: unsupported on some browsers */
      }

      const summary = document.createElement('summary');
      summary.className = 'faq-question';
      summary.innerHTML =
        '<span class="faq-question-text"></span><span class="faq-chevron" aria-hidden="true"></span>';
      summary.querySelector('.faq-question-text').textContent = item.q;

      const answer = document.createElement('p');
      answer.className = 'faq-answer';
      answer.textContent = item.a;

      details.appendChild(summary);
      details.appendChild(answer);
      list.appendChild(details);
    });

    if (seeAllBtn) {
      seeAllBtn.hidden = showAll || HELP_FAQS.length <= HELP_FEATURED_COUNT;
    }
  }

  seeAllBtn?.addEventListener('click', () => {
    showAll = true;
    render();
    list.lastElementChild?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });

  render();
})();
