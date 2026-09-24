const nodes = [...document.querySelectorAll(".flow-node")];
const lines = [...document.querySelectorAll(".flow-line")];

function resetFlow() {
  nodes.forEach((node) => node.classList.remove("active"));
  lines.forEach((line) => line.classList.remove("active"));
}

function runFlow() {
  resetFlow();

  nodes.forEach((node, index) => {
    window.setTimeout(() => {
      node.classList.add("active");

      if (lines[index]) {
        window.setTimeout(() => {
          lines[index].classList.add("active");
        }, 280);
      }
    }, index * 850);
  });
}

const instrument = document.querySelector(".settlement-instrument");

if (instrument && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        runFlow();
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.35,
    }
  );

  observer.observe(instrument);
} else {
  runFlow();
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const href = link.getAttribute("href");

    if (!href || href === "#") return;

    const target = document.querySelector(href);

    if (!target) return;

    event.preventDefault();

    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
});