function homeAnimations() {
  gsap.registerPlugin(ScrollTrigger);

  // mouse animation
  const wheelAnimation = gsap.timeline({ repeat: -1 });
  wheelAnimation.to("#wheel", { y: 10, duration: 1, ease: "easeIn" });
  wheelAnimation.to("#wheel", { y: 0, duration: 1, ease: "easeIn" });
  gsap.to(".mouse", {
    autoAlpha: 0,
    scrollTrigger: {
      trigger: ".hero",
      start: "70px top",
      end: "+=150",
      scrub: true,
    },
  });

  // project appearance animation
}

// BARBA

async function leaveAnimation(elements, direction) {
  await gsap.to(elements, {
    duration: 1.5,
    x: direction === "left" ? -600 : 600,
    opacity: 0,
    ease: "power2.inOut",
    stagger: 0.3,
  });
}

async function enterAnimation(elements, direction) {
  await gsap.from(elements, {
    duration: 1.5,
    x: direction === "left" ? 600 : -600,
    opacity: 0,
    ease: "power2.inOut",
    stagger: 0.3,
  });
}

async function d(elements) {
  await gsap.from(elements, {
    duration: 1,
    y: 100,
    // opacity: 0,
    ease: "power2.inOut",
    // stagger: 0.3,
  });
}

const transitions = [
  {
    name: "default",
    async once({ next }) {
      await d(next.container.querySelectorAll("h1"));
    },
  },
  {
    name: "slide-left",
    async leave({ current }) {
      await leaveAnimation(current.container.querySelectorAll("h1"), "left");
      current.container.remove();
    },
    async enter({ next }) {
      await enterAnimation(next.container.querySelectorAll("h1"), "left");
    },
    from: {
      namespace: ["home", "contact"],
    },
    to: {
      namespace: ["about", "home"],
    },
  },
  {
    name: "slide-right",
    async leave({ current }) {
      await leaveAnimation(current.container.querySelectorAll("h1"), "right");
      current.container.remove();
    },
    async enter({ next }) {
      await enterAnimation(next.container.querySelectorAll("h1"), "right");
    },
    from: {
      namespace: ["home", "about"],
    },
    to: {
      namespace: ["contact", "home"],
    },
  },
];

const views = [
  {
    namespace: "home",
    beforeEnter() {
      homeAnimations()
    },
  },
];

barba.init({
  views: [...views],
  transitions: [...transitions],
});
