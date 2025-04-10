//Initialzing gsap
let tl = gsap.timeline();
let section3Ele = document.querySelector(".section3").children;

//Adding animations to section1 of page
tl.from(".section1 h2", {
  opacity: 0,
  y: 150,

  duration: 1,
});
tl.from(".section1 .content", {
  opacity: 0,
  y: 100,
  duration: 1,
});

gsap.from(".section2", {
  opacity: 0,
  y: 300,
  scrollTrigger: {
    trigger: ".section2",
    start: "top 80%",
    end: "top 40%",
    // markers:true,
    scrub: true,
    // pin: true,
  },
  duration: 1,
});

gsap.to('.section2 img',{
  y:-10,
  repeat:-1,
  duration:1,
  ease: "power1.inOut",
  yoyo: true
})
for (let index = 0; index < section3Ele.length - 1; index++) {
  const element = section3Ele[index];
  gsap.to(`.${element.className}`, {
    opacity: 0,
    transform: "Scale(.7)",
    scrollTrigger: {
      trigger: `.${element.className}`,
      start: "top 10%",
      end: "bottom 5%",
      //   markers:true,
      // pin:true,
      scrub: true,
      staggered: 1,
    },
  });
}
let section3Children = document.querySelectorAll(".section3 > *");

section3Children.forEach((element) => {
  if (
    !element.classList.contains("split-container") &&
    !element.classList.contains("timeline-wrapper")
  ) {
    gsap.to(element, {
      opacity: 0,
      scale: 0.7,
      scrollTrigger: {
        trigger: element,
        start: "top 10%",
        end: "bottom 5%",
        scrub: true,
      },
    });
  }
});
