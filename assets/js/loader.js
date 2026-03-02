const loaderStartTime = Date.now();
const MIN_DISPLAY_MS = 500;

export function hideLoader() {
    const elapsed = Date.now() - loaderStartTime;
    const delay = Math.max(0, MIN_DISPLAY_MS - elapsed);

    setTimeout(() => {
        const el = document.getElementById('contentful-loader');
        if (!el) return;

        const pageWrapper = document.getElementById('page-wrapper');
        if (pageWrapper) pageWrapper.style.opacity = '1';

        el.classList.add('hidden');
        el.addEventListener('transitionend', () => el.remove(), { once: true });
    }, delay);
}
