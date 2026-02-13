let faqInitialized = false;

function initFAQ() {
    if (faqInitialized) {
        return;
    }

    // Akkordeon-Funktionalitat
    const faqQuestions = document.querySelectorAll('.faq-question');

    if (faqQuestions.length === 0) {
        return;
    }

    faqQuestions.forEach(button => {
        button.replaceWith(button.cloneNode(true));
    });

    const freshFaqQuestions = document.querySelectorAll('.faq-question');

    freshFaqQuestions.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            const faqItem = this.closest('.faq-item');
            const faqAnswer = faqItem.querySelector('.faq-answer');

            document.querySelectorAll('.faq-question.active').forEach(activeBtn => {
                if (activeBtn !== this) {
                    activeBtn.classList.remove('active');
                    const otherAnswer = activeBtn.closest('.faq-item').querySelector('.faq-answer');
                    otherAnswer.style.maxHeight = null;
                }
            });

            this.classList.toggle('active');

            if (faqAnswer.style.maxHeight) {
                faqAnswer.style.maxHeight = null;
            } else {
                faqAnswer.style.maxHeight = faqAnswer.scrollHeight + "px";
            }
        });
    });

    // Suchfunktion
    const searchInput = document.getElementById('faq-search');
    const faqItems = document.querySelectorAll('.faq-item');
    const faqSections = document.querySelectorAll('.faq-section');

    if (searchInput) {
        searchInput.addEventListener('input', function (e) {
            const searchTerm = e.target.value.toLowerCase().trim();

            faqItems.forEach(item => {
                const questionEl = item.querySelector('.faq-question h3');
                const answerEl = item.querySelector('.faq-answer p');

                const questionText = questionEl ? questionEl.textContent.toLowerCase() : '';
                const answerText = answerEl ? answerEl.textContent.toLowerCase() : '';

                if (searchTerm.length === 0 || questionText.includes(searchTerm) || answerText.includes(searchTerm)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });

            faqSections.forEach(section => {
                const hasGeneralInfo = section.querySelector('.general-info-block');

                let visibleCount = 0;
                section.querySelectorAll('.faq-item').forEach(item => {
                    if (item.style.display !== 'none') {
                        visibleCount++;
                    }
                });

                if (searchTerm.length > 0) {
                    if (hasGeneralInfo || visibleCount === 0) {
                        section.style.display = 'none';
                    } else {
                        section.style.display = 'block';
                    }
                } else {
                    section.style.display = 'block';
                }
            });
        });
    }

    faqInitialized = true;
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFAQ);
} else {
    initFAQ();
}
