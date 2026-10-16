document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".about-testimonials-section");

  if (!section) return;

  const testimonials = [
    {
      text: "The perfect blend of rich flavours and warmth. Every cup feels like a little celebration of tradition.",
      name: "Saritha",
      role: "Chai Darbar  Special Guest",
    },
    {
      text: "A welcoming atmosphere, comforting chai, and a lovely place to slow down and enjoy the moment.",
      name: "Minnu",
      role: "Chai Darbar Guest",
    },
    {
      text: "The aroma, the flavours, and the experience make sharing a cup of chai feel extra special.",
      name: "Ayesha",
      role: "Chai Darbar Guest",
    },
  ];

  const textElement = section.querySelector("#testimonialText");
  const nameElement = section.querySelector("#testimonialName");
  const roleElement = section.querySelector("#testimonialRole");
  const currentElement = section.querySelector("#testimonialCurrent");
  const totalElement = section.querySelector("#testimonialTotal");
  const previousButton = section.querySelector("#testimonialPrev");
  const nextButton = section.querySelector("#testimonialNext");

  if (
    !textElement ||
    !nameElement ||
    !roleElement ||
    !currentElement ||
    !totalElement ||
    !previousButton ||
    !nextButton
  ) {
    return;
  }

  let currentIndex = 0;

  totalElement.textContent = String(testimonials.length).padStart(2, "0");

  function showTestimonial(index) {
    currentIndex = (index + testimonials.length) % testimonials.length;

    const testimonial = testimonials[currentIndex];

    textElement.textContent = testimonial.text;
    nameElement.textContent = testimonial.name;
    roleElement.textContent = testimonial.role;

    currentElement.textContent = String(currentIndex + 1).padStart(2, "0");
  }

  previousButton.addEventListener("click", () => {
    showTestimonial(currentIndex - 1);
  });

  nextButton.addEventListener("click", () => {
    showTestimonial(currentIndex + 1);
  });

  showTestimonial(0);

  if (window.lucide) {
    window.lucide.createIcons();
  }
});
