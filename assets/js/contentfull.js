import { createClient } from "https://esm.sh/contentful@latest";

// --- Helpers ---
function createContentfulIndex(data) {
  const entriesById = new Map();

  for (const item of data?.items ?? []) {
    const id = item?.sys?.id;
    if (!id) continue;
    entriesById.set(id, item);
  }

  return {
    get: (id) => entriesById.get(id) ?? null,
  };
}

export function asHttpsUrl(maybeProtocolRelativeUrl) {
  if (!maybeProtocolRelativeUrl) return "";
  return maybeProtocolRelativeUrl.startsWith("//")
    ? "https:" + maybeProtocolRelativeUrl
    : maybeProtocolRelativeUrl;
}

// --- Contentful client ---
const client = createClient({
  space: "r61lo1276p2e",
  environment: "master",
  accessToken: "Dxvf0iMsIdyPwPTkQ70oq30tGueT4qRRe9Kv83morMA",
});

// Hent entries tagget med et givet tag (eksporteret helper)
export async function getEntries(tag = "") {
  let res = await client.getEntries({
    "metadata.tags.sys.id[all]": tag,
  });

  console.log("Contentful response:", res);

  return createContentfulIndex(res);
}

export function createFeature(event) {
  const article = document.createElement("article");

  const img = document.createElement("img");
  img.setAttribute("class", "image fit");
  img.style.objectFit = "cover";
  img.setAttribute("src", asHttpsUrl(event.fields.file.url));
  img.setAttribute("alt", event.fields.title);

  const h3 = document.createElement("h3");
  h3.setAttribute("class", "major");
  h3.innerHTML = event.fields.title;

  const p = document.createElement("p");
  p.innerHTML = event.fields.description;

  article.appendChild(img);
  article.appendChild(h3);
  article.appendChild(p);

  return article;
}
