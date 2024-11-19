"use strict";

const stakedPhotoContainer = document.querySelector(".staked-photo_wrapper");
const photoElements = document.querySelectorAll(".photo-wrapper");

const stakePhotoTl = gsap.timeline({ paused: true, ease: "back.inOut(1.7)" });

const createStakePhotoTimeline = () => {
  const translateValues = [
    { xPercent: "50% + .5rem", yPercent: "50% + .5rem" },
    { xPercent: "-45% - .5rem", yPercent: "40% + .5rem", rotation: "-12deg" },
    { xPercent: "42% + .5rem", yPercent: "-70% - .5rem", rotation: "12deg" },
    { xPercent: "-55% - .5rem", yPercent: "-55% - .5rem" },
  ];

  photoElements.forEach((photo, index) => {
    stakePhotoTl.to(
      photo,
      { ...translateValues[index], ease: "back.inOut(1.2)", duration: 0.65 },
      0
    );
  });
};

createStakePhotoTimeline();

let isAnimationReversed = false;

stakedPhotoContainer.addEventListener("click", () => {
  if (isAnimationReversed) {
    stakePhotoTl.reverse();
  } else {
    stakePhotoTl.play();
  }
  isAnimationReversed = !isAnimationReversed;
});
