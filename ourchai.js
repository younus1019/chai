document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".chai-experience-section");

  if (!section) return;

  const options = section.querySelectorAll(".chai-experience-option");
  const image = section.querySelector(".chai-experience-image");
  const imageCount = section.querySelector(".chai-experience-image-count");
  const imageCaption = section.querySelector(".chai-experience-caption-text");
  const heading = section.querySelector(".chai-experience-heading");
  const description = section.querySelector(".chai-experience-description");
  const highlights = section.querySelector(".chai-experience-highlights");

  const experiences = [
    {
      image: "./images/classic chai.jfif",
      alt: "A freshly prepared cup of traditional Indian chai",
      caption: "AUTHENTIC FLAVOURS",
      headingStart: "Crafted for",
      headingEnd: "Every Sip.",
      description:
        "Discover the richness of authentic chai, aromatic spices and the traditions that make every cup a moment to savour.",
      highlights: [
        "Rich and authentic chai flavours",
        "Carefully prepared with attention",
        "A warm and welcoming experience",
      ],
    },
    {
      image: "./images/Smoky Masala Chai.jfif",
      alt: "Aromatic masala chai prepared with traditional spices",
      caption: "THE ART OF BREWING",
      headingStart: "The Beauty of",
      headingEnd: "Slow Brewing.",
      description:
        "Explore the comforting aroma of chai, where carefully combined flavours create a rich and satisfying experience.",
      highlights: [
        "Aromatic tea and spice notes",
        "Attention to flavour and balance",
        "A comforting cup to savour",
      ],
    },
    {
      image: "./images/tea 3.png",
      alt: "A welcoming tea setting inspired by Indian hospitality",
      caption: "ROYAL HOSPITALITY",
      headingStart: "Warmth in",
      headingEnd: "Every Welcome.",
      description:
        "At Chai Darbar, chai is more than a drink. It is an invitation to pause, connect and enjoy a moment together.",
      highlights: [
        "A welcoming chai experience",
        "Moments worth sharing",
        "Tradition in every gathering",
      ],
    },
  ];

  function showExperience(index) {
    const item = experiences[index];

    if (!item) return;

    options.forEach((option, optionIndex) => {
      const isActive = optionIndex === index;

      option.classList.toggle("active", isActive);
      option.setAttribute("aria-pressed", String(isActive));
    });

    image.style.opacity = "0";

    window.setTimeout(() => {
      image.src = item.image;
      image.alt = item.alt;
      imageCaption.textContent = item.caption;
      imageCount.innerHTML = `${String(index + 1).padStart(2, "0")} <span>—</span> 03`;

      heading.replaceChildren();

      heading.append(document.createTextNode(`${item.headingStart} `));

      const accent = document.createElement("span");
      accent.textContent = item.headingEnd;
      heading.append(accent);

      description.textContent = item.description;

      highlights.replaceChildren();

      item.highlights.forEach((highlight) => {
        const listItem = document.createElement("li");

        const check = document.createElement("span");
        check.className = "chai-experience-check";
        check.setAttribute("aria-hidden", "true");
        check.textContent = "✓";

        const text = document.createElement("span");
        text.textContent = highlight;

        listItem.append(check, text);
        highlights.append(listItem);
      });

      image.style.opacity = "1";
    }, 180);
  }

  options.forEach((option, index) => {
    option.addEventListener("click", () => {
      showExperience(index);
    });
  });
});
