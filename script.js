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

// footer portion @HyBhaskarMishra 
document.addEventListener('DOMContentLoaded', function() {
  const currentYearElement = document.getElementById('current-year');
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
  }

  // Add hover animation to footer links
  const footerLinks = document.querySelectorAll('.footer-link');
  footerLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
      const dot = this.querySelector('.link-dot');
      if (dot) {
        dot.style.transition = 'transform 0.3s, background-color 0.3s';
        dot.style.backgroundColor = '#27D195';
        dot.style.transform = 'scale(1.2)';
      }
    });

    link.addEventListener('mouseleave', function() {
      const dot = this.querySelector('.link-dot');
      if (dot) {
        dot.style.backgroundColor = 'rgba(39, 209, 149, 0.2)';
        dot.style.transform = 'scale(1)';
      }
    });
  });

  // Add pulse animation to feedback button
  const feedbackButton = document.querySelector('.feedback-button');
  if (feedbackButton) {
    feedbackButton.addEventListener('mouseenter', function() {
      this.style.transition = 'all 0.3s';
      this.style.transform = 'translateY(-2px)';
      this.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
    });

    feedbackButton.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = 'none';
    });
  }

  // Logo hover effect
  const logoContainer = document.querySelector('.ecoclub-logo');
  if (logoContainer) {
    logoContainer.addEventListener('mouseenter', function() {
      const logoCircle = this.querySelector('.logo-circle');
      const logoText = this.querySelector('.logo-text');
      
      if (logoCircle) {
        logoCircle.style.transition = 'transform 0.3s';
        logoCircle.style.transform = 'rotate(15deg)';
      }
      
      if (logoText) {
        logoText.style.transition = 'color 0.3s';
        logoText.style.color = '#33e2a8'; // Lighter green on hover
      }
    });

    logoContainer.addEventListener('mouseleave', function() {
      const logoCircle = this.querySelector('.logo-circle');
      const logoText = this.querySelector('.logo-text');
      
      if (logoCircle) {
        logoCircle.style.transform = 'rotate(0)';
      }
      
      if (logoText) {
        logoText.style.color = '#27D195';
      }
    });
  }

  // Social links hover effect
  const socialLinks = document.querySelectorAll('.social-link');
  socialLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
      const icon = this.querySelector('i');
      if (icon) {
        icon.style.transition = 'transform 0.3s';
        icon.style.transform = 'scale(1.2)';
      }
    });

    link.addEventListener('mouseleave', function() {
      const icon = this.querySelector('i');
      if (icon) {
        icon.style.transform = 'scale(1)';
      }
    });
  });
});