// Injected synchronously — appears before any Contentful await
const overlay = document.createElement('div');
overlay.id = 'contentful-loader';
overlay.innerHTML = '<div class="loader"></div>';
document.body.appendChild(overlay);

// Hide page content so it doesn't flash empty before data arrives
const pageWrapper = document.getElementById('page-wrapper');
if (pageWrapper) pageWrapper.style.opacity = '0';

export function hideLoader() {
    const el = document.getElementById('contentful-loader');
    if (!el) return;

    // Cross-fade: fade out overlay while fading in page content
    const pageWrapper = document.getElementById('page-wrapper');
    if (pageWrapper) {
        pageWrapper.style.transition = 'opacity 0.4s ease';
        pageWrapper.style.opacity = '1';
    }

    el.classList.add('hidden');
    el.addEventListener('transitionend', () => el.remove(), { once: true });
}
