document.addEventListener('DOMContentLoaded', function() {
    // Akkordeon-Funktionalität
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(button => {
        button.addEventListener('click', () => {
            const faqItem = button.closest('.faq-item');
            const faqAnswer = faqItem.querySelector('.faq-answer');

            button.classList.toggle('active');

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

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();

        faqItems.forEach(item => {
            const questionText = item.querySelector('.faq-question h3').textContent.toLowerCase();
            const answerText = item.querySelector('.faq-answer p').textContent.toLowerCase();

            if (questionText.includes(searchTerm) || answerText.includes(searchTerm)) {
                item.style.display = 'block'; 
            } else {
                item.style.display = 'none'; 
            }
        });
    });
});