// Injected synchronously — appears before any Contentful await
const overlay = document.createElement('div');
overlay.id = 'contentful-loader';
overlay.innerHTML = '<div class="loader"></div>';
document.body.appendChild(overlay);

export function hideLoader() {
    const el = document.getElementById('contentful-loader');
    if (!el) return;
    el.classList.add('hidden');
    el.addEventListener('transitionend', () => el.remove(), { once: true });
}
