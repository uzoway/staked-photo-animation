// Update Footer Year to Current Year
const yearElement = document.querySelector(".copyright-year");
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

const featureBlockAnim = () => {
  // [Features Section - Home Page] Pin and clip-path section reveal animation
  const featureBlocks = gsap.utils.toArray("[js-section-clip-path]");

  const featureBlockTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".section_features",
      pin: true,
      start: "top top",
      end: "+=200%",
      scrub: 1,
    },
  });

  featureBlocks.forEach((block) => {
    featureBlockTl.to(block, {
      "clip-path": "polygon(0% 0%, 0% 0%, -25% 100%, 0% 100%)",
      duration: 1,
    });
  });
};

const createImageRevealAnimation = (
  imageSelectors,
  fillSelectors,
  duration = 5,
  easeType = "power4.inOut"
) => {
  const tl = gsap.timeline({ repeat: -1 });

  imageSelectors.forEach((image, index) => {
    tl.to(fillSelectors[index], {
      "clip-path": "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
      duration,
    }).to(image, {
      "clip-path":
        index === imageSelectors.length - 1
          ? "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
          : "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
      duration: 1,
      ease: easeType,
    });
  });

  return tl;
};

// [Home Page Hero Section] Rotating tabs animation with progress bar
const initHeroSlideshow = () => {
  const images = document.querySelectorAll(".hero-slideshow-image");
  const progressBar = document.querySelector(".tab-indicator-progress");
  const heroSection = document.querySelector(".section_hero");
  let currentIndex = 0;
  const duration = 5;

  // Set up initial GSAP timeline
  const tl = gsap.timeline({
    repeat: -1,
    onRepeat: () => {
      currentIndex = 0;
    },
  });

  tl.to(progressBar, {
    scaleX: "1",
    transformOrigin: "left",
    duration: duration,
    ease: "none",
  })
    .to(images[2], {
      opacity: 0,
      duration: 0.5,
      ease: "power2.inOut",
    })
    .fromTo(
      images[1],
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: "power2.inOut" },
      "<"
    )

    .to(progressBar, {
      scaleX: "0",
      transformOrigin: "right",
      duration: duration,
      ease: "none",
    })
    .to(images[1], {
      opacity: 0,
      duration: 0.5,
      ease: "power2.inOut",
    })
    .fromTo(
      images[0],
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: "power2.inOut" },
      "<"
    )
    .to(progressBar, {
      scaleX: "1",
      transformOrigin: "right",
      duration: duration,
      ease: "none",
    })
    .to(progressBar, {
      scaleX: "0",
      transformOrigin: "left",
      ease: "power4.out",
      duration: 1,
    });

  // Start the animation
  tl.play();

  // Observe visibility changes to pause/resume
  const observer = new IntersectionObserver(
    ([entry]) => (entry.isIntersecting ? tl.play() : tl.pause()),
    { threshold: 0.2 }
  );

  observer.observe(heroSection);
};

const earnBlockPinAnim = () => {
  // Create a shared ScrollTrigger configuration
  const scrollConfig = {
    trigger: ".section_how-to-earn",
    start: "top top",
    scrub: 1,
    end: "+=300%",
  };

  const earnBlocks = gsap.utils.toArray("[masked-earn-image]");

  const earnBlockTl = gsap.timeline({
    scrollTrigger: {
      ...scrollConfig,
      pin: ".section_how-to-earn",
    },
  });

  earnBlocks.forEach((block) => {
    earnBlockTl.to(block, {
      "clip-path": "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
      duration: 1,
    });
  });

  const pathTracker = document.querySelectorAll("[js-path-anim-tracker]");
  const pathHeading = document.querySelectorAll("[js-path-anim-heading]");
  const pathMainText = document.querySelectorAll("[js-path-anim-text]");

  // Same scroll config for GSAP timeline
  const linkedPathTl = gsap.timeline({
    scrollTrigger: scrollConfig,
  });

  // Normalize your animation timings to match Lottie duration
  linkedPathTl
    // First transition at 33% of scroll
    .to(pathTracker[2], { duration: 0.4, opacity: 0 }, "33%")
    .to(pathTracker[1], { duration: 0.4, opacity: 1 }, ">")
    .to(pathHeading[2], { duration: 0.4, opacity: 0 }, "33%")
    .to(pathHeading[1], { duration: 0.4, opacity: 1 }, ">")
    .to(pathMainText[2], { duration: 0.4, opacity: 0 }, "33%")
    .to(pathMainText[1], { duration: 0.4, opacity: 1 }, ">")

    // Second transition at 66% of scroll
    .to(pathTracker[1], { duration: 0.4, opacity: 0 }, "66%")
    .to(pathTracker[0], { duration: 0.4, opacity: 1 }, ">")
    .to(pathHeading[1], { duration: 0.4, opacity: 0 }, "66%")
    .to(pathHeading[0], { duration: 0.4, opacity: 1 }, ">")
    .to(pathMainText[1], { duration: 0.4, opacity: 0 }, "66%")
    .to(pathMainText[0], { duration: 0.4, opacity: 1 }, ">");
};

window.addEventListener("DOMContentLoaded", (event) => {
  // Split and reveal (in lines) headings and paragraphs when entering the viewport
  setTimeout(() => {
    $("[js-line-animation]").each(function (index) {
      gsap.set($(this), {
        autoAlpha: 1,
      });
      let textEl = $(this);
      let textContent = $(this).text();
      let tl;

      function splitText() {
        new SplitType(textEl, {
          types: "lines",
          tagName: "span",
        });
        textEl.find(".line").each(function (index) {
          let lineContent = $(this).html();
          $(this).html("");
          $(this).append(
            `<span class="line-inner" style="display: block;">${lineContent}</span>`
          );
        });
        tl = gsap.timeline({
          scrollTrigger: {
            trigger: textEl,
            start: "top bottom",
            end: "bottom bottom",
            toggleActions: "none play none reset",
          },
        });
        tl.fromTo(
          textEl.find(".line-inner"),
          {
            yPercent: 100,
          },
          {
            yPercent: 0,
            duration: 1.3,
            ease: "power4.out",
            stagger: {
              each: 0.1,
            },
          }
        );
      }
      splitText();

      let windowWidth = window.innerWidth;
      window.addEventListener("resize", function () {
        if (windowWidth !== window.innerWidth) {
          windowWidth = window.innerWidth;
          tl.kill();
          textEl.text(textContent);
          splitText();
        }
      });
    });
  }, 200);

  featureBlockAnim();

  // [Small Large Mask Reveal - Mulitple Pages] Utility function for reusable GSAP image reveal animation

  createImageRevealAnimation(
    [
      "[js-masked-image-one]",
      "[js-masked-image-two]",
      "[js-masked-image-three]",
    ],
    ["[js-masked-fill-one]", "[js-masked-fill-two]", "[js-masked-fill-three]"]
  );

  // Initialize the slideshow
  initHeroSlideshow();

  earnBlockPinAnim();
});

document.addEventListener("DOMContentLoaded", function () {
  // Select all phone input fields
  const inputs = document.querySelectorAll("input[type='tel']");

  // Initialize intlTelInput for each phone input field
  const itiInstances = [];
  inputs.forEach((input) => {
    itiInstances.push(
      window.intlTelInput(input, {
        initialCountry: "us", // Set default country (change if needed)
        separateDialCode: true, // Shows country code separately in UI
        utilsScript:
          "https://cdn.jsdelivr.net/npm/intl-tel-input@19.5.4/build/js/utils.js", // Needed for validation & formatting
      })
    );
  });

  // Attach form validation & formatting before submission
  document.querySelectorAll("form").forEach((form) => {
    form.addEventListener("submit", function (e) {
      let input = form.querySelector("input[type='tel']"); // Get phone input inside the form
      let iti = itiInstances[Array.from(inputs).indexOf(input)]; // Get the corresponding intlTelInput instance

      if (!iti.isValidNumber()) {
        e.preventDefault();
        alert("Please enter a valid phone number!");
      } else {
        // Set input value to the full international format before submission
        input.value = iti.getNumber();
      }
    });
  });
});
