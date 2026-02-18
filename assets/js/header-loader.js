(function () {
	var container = document.getElementById('header-container');
	if (!container) return;

	var isAlt = container.hasAttribute('data-alt');

	var xhr = new XMLHttpRequest();
	xhr.open('GET', './shared/header.html', false);
	xhr.send();

	if (xhr.status === 200) {
		container.insertAdjacentHTML('afterend', xhr.responseText);
		container.remove();

		if (isAlt) {
			var header = document.getElementById('header');
			if (header) header.classList.add('alt');
		}
	}

	// Initialize submenu toggles after DOM is ready
	document.addEventListener('DOMContentLoaded', function () {
		var toggles = document.querySelectorAll('#menu .submenu-toggle');
		toggles.forEach(function (toggle) {
			toggle.addEventListener('click', function (e) {
				e.preventDefault();
				var li = toggle.closest('.has-submenu');
				var isOpen = li.classList.toggle('open');
				toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
			});
		});
	});
})();
