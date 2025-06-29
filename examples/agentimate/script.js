document.addEventListener('DOMContentLoaded', () => {
    const sections = Array.from(document.querySelectorAll('.section'));
    const burst = document.getElementById('burst');

    if (!sections.length || !burst) {
        console.error('Required elements not found');
        return;
    }

    let currentIndex = 0;

    function animateBurst(section) {
        // Remove active class from all sections
        sections.forEach(s => s.classList.remove('active'));
        
        // Add active class to current section
        section.classList.add('active');

        const rect = section.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Position and scale up burst
        burst.style.left = `${centerX - 20}px`;
        burst.style.top = `${centerY - 20}px`;
        burst.style.opacity = '1';
        burst.style.transform = 'scale(2.5)';

        // Reset burst after animation
        setTimeout(() => {
            burst.style.opacity = '0';
            burst.style.transform = 'scale(0)';
        }, 500);

        // Remove active class after delay
        setTimeout(() => {
            section.classList.remove('active');
        }, 2000);
    }

    function animateNextSection() {
        const section = sections[currentIndex];
        animateBurst(section);
        currentIndex = (currentIndex + 1) % sections.length;
    }

    // Start animation loop
    requestAnimationFrame(() => {
        animateNextSection(); // Run first animation immediately
        setInterval(animateNextSection, 3000);
    });
}); 