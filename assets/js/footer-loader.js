import { getEntries, asHttpsUrl } from "./contentfull.js";

const container = document.getElementById('footer-container');
if (container) {
	const resp = await fetch('./shared/footer.html');
	if (resp.ok) {
		container.innerHTML = await resp.text();
	}

	const footer = await getEntries('footer');
	insertFooterContent(footer);
}

function insertFooterContent(footer) {
	const fields = footer.get("66FaTgkTK5haF45R4crwdV")?.fields;

	document.getElementById("footer-contact").innerHTML = fields?.address + "<br>" + fields?.cvr;
	document.getElementById("footer-phone").innerHTML = fields?.phone;
	document.getElementById("footer-phone").setAttribute("href", "tel:" + fields?.phone.replace(/ /g, ''));

	document.getElementById("footer-email").innerHTML = fields?.email;
	document.getElementById("footer-email").setAttribute("href", "mailto:" + fields?.email);

	document.getElementById("footer-facebook").setAttribute("href", fields?.facebook);
	document.getElementById("footer-linkedin").setAttribute("href", fields?.linkedIn);
	document.getElementById("footer-instagram").setAttribute("href", fields?.instagram);

	document.getElementById("footer-logo").setAttribute("src", asHttpsUrl(fields?.logo.fields.file.url));
}
