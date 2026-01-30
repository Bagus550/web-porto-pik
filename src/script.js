// 1. Inisialisasi Lucide Icons
lucide.createIcons();

// 2. Elemen Sidebar & Hamburger
const menuBtn = document.getElementById('menu-btn');
const navLinks = document.getElementById('nav-links');
const overlay = document.getElementById('overlay');
const menuIcon = document.getElementById('menu-icon');
const allNavLinks = document.querySelectorAll('.nav-link');

// 3. Elemen Dropdown (Buat Mobile & Desktop Click)
const dropdownBtn = document.getElementById('dropdown-btn');
const dropdownMenu = document.getElementById('dropdown-menu');
const dropdownIcon = document.getElementById('dropdown-icon');

// --- FUNGSI SIDEBAR ---
function toggleMenu() {
    navLinks.classList.toggle('translate-x-full');
    overlay.classList.toggle('hidden');

    const isMenuOpen = !navLinks.classList.contains('translate-x-full');
    menuIcon.setAttribute('data-lucide', isMenuOpen ? 'x' : 'menu');
    lucide.createIcons();
}

menuBtn.addEventListener('click', toggleMenu);
overlay.addEventListener('click', toggleMenu);

allNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (!navLinks.classList.contains('translate-x-full')) {
            toggleMenu();
        }
    });
});

// --- FUNGSI DROPDOWN (Click Logic) ---
if (dropdownBtn) {
    dropdownBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isHidden = dropdownMenu.classList.contains('invisible');

        if (isHidden) {
            dropdownMenu.classList.remove('opacity-0', 'invisible');
            dropdownIcon.classList.add('rotate-180');
        } else {
            dropdownMenu.classList.add('opacity-0', 'invisible');
            dropdownIcon.classList.remove('rotate-180');
        }
    });
}

// Tutup dropdown kalau klik di mana aja
window.addEventListener('click', () => {
    if (dropdownMenu) {
        dropdownMenu.classList.add('opacity-0', 'invisible');
        dropdownIcon.classList.remove('rotate-180');
    }
});

// --- FUNGSI SCROLL REVEAL (Fix Error) ---
const observerOptions = {
    threshold: 0.15
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            // Pakai class Tailwind yang lo mau
            entry.target.classList.remove('opacity-0', 'translate-y-12');
            entry.target.classList.add('opacity-100', 'translate-y-0');
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach((section) => {
    revealObserver.observe(section);
});