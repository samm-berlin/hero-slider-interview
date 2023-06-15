/**
 * Siemens Hero JS
 *
 *
 */

var animation = {
  animationTime: 2000,
  animationDelay: 5000
};

var sliderElements = [
  {
    animation: {
      delay: 5000
    }
  },
  {
    animation: {
      delay: 5000
    }
  },
  {
    animation: {
      delay: 5000
    }
  },
  {
    animation: {
      delay: 5000
    }
  },
];

document.addEventListener("DOMContentLoaded", function (event) {
  // get the hero element
  var hero = document.getElementById("samm-hero-slider-interview");
  // get the hero images
  var slides = hero.getElementsByClassName("slide");

  let _activeIndex = 0;
  const activeIndex = {
    get index() {
      return _activeIndex;
    },
    set index(value) {
      _activeIndex = value;
      updatePillContainer();
    }
  };

  const pills = hero.getElementsByClassName("pill");

  function updatePillContainer() {
    for (let i = 0; i < pills.length; i++) {
      const pill = pills[i];
      if (i === activeIndex.index) {
        pill.classList.add("active");
      } else {
        pill.classList.remove("active");
      }
    }
  }

  Array.from(pills).forEach((pill, index) => {
    pill.addEventListener("click", () => {
      setAnimationToIndex(activeIndex.index, index);
      activeIndex.index = index;
    });
  });

  var numberOfSlides = slides.length; // the number of slides

  function triggerAnimation() {

    var isMobile = window.innerWidth < 781;
    if (isMobile) {
      activeIndex.index = (activeIndex.index + 1) % numberOfSlides}

    var prevPrevSlide = slides[(activeIndex.index - 2 + numberOfSlides) % numberOfSlides];
    var prevSlide =
      slides[(activeIndex.index - 1 + numberOfSlides) % numberOfSlides];
    var currentSlide = slides[activeIndex.index];
    var nextSlideOuter = slides[(activeIndex.index + 1) % numberOfSlides];
    var nextSlideInner = nextSlideOuter.getElementsByTagName("div")[0];
    var slideAfterNextSlideInner = slides[
      (activeIndex.index + 2) % numberOfSlides
    ].getElementsByTagName("div")[0];
    var slideAfterNextSlideOuter =
      slides[(activeIndex.index + 2) % numberOfSlides];

    prevPrevSlide.classList.remove("other-lower");

    // set the z-index of the previous slide to 0
    prevSlide.classList.remove("prev");
    prevSlide.classList.add("other");
    prevSlide.classList.add("other-lower");

    // move the sliderAfterNextSlide to the start position
    slideAfterNextSlideInner.classList.remove("transform-inner-end");
    slideAfterNextSlideInner.classList.add("transform-inner-start");
    slideAfterNextSlideOuter.classList.remove("transform-outer-end");
    slideAfterNextSlideOuter.classList.add("transform-outer-start");

    // set the zIndex of the current slide to 1
    currentSlide.classList.remove("next");
    currentSlide.classList.add("prev");

    // set the zIndex of the next slide to 2
    nextSlideOuter.classList.remove("other");
    nextSlideOuter.classList.add("next");

    // start the animation
    nextSlideInner.classList.remove("transform-inner-start");
    nextSlideInner.classList.add("transform-inner-end");
    nextSlideOuter.classList.remove("transform-outer-start");
    nextSlideOuter.classList.add("transform-outer-end");

    // update the activeIndex
    if (!isMobile) {
      activeIndex.index = (activeIndex.index + 1) % numberOfSlides
    }
  }

  function stopAnimations() {
    for (let i = 0; i < slides.length; i++) {
      const slide = slides[i];
      const slideInner = slide.getElementsByTagName("div")[0];
      slide.classList.remove("anim");
      slideInner.classList.remove("anim");
    }
  }

  function startAnimations() {
    for (let i = 0; i < slides.length; i++) {
      const slide = slides[i];
      const slideInner = slide.getElementsByTagName("div")[0];
      slide.classList.add("anim");
      slideInner.classList.add("anim");
    }
  }

  function setAnimationToIndex(oldIndex, newIndex) {
    stopInterval();
    stopAnimations();

    if (oldIndex === newIndex) {
      startAnimations();
      startInterval();
      return;
    }

    // position newIndex slide
    const newSlide = slides[newIndex];
    const newSlideInner = newSlide.getElementsByTagName("div")[0];

    // turn off mobile transition 
    Array.from(slides).forEach(slide => {
      slide.querySelector('.big-slide').classList.add('no-transition');
      slide.querySelector('.small-slide').classList.add('no-transition');
    });

    const beforeNewSlide = slides[(newIndex - 1 + numberOfSlides) % numberOfSlides];
    beforeNewSlide.classList.add("other-lower");

    // z-index
    newSlide.classList.remove("other");
    newSlide.classList.remove("prev");
    newSlide.classList.add("next");

    const oldNextSlide = slides[(oldIndex + 1) % numberOfSlides];
    oldNextSlide.classList.remove("next");
    oldNextSlide.classList.remove("prev");
    oldNextSlide.classList.add("other");

    newSlide.classList.remove("transform-outer-start");
    newSlide.classList.add("transform-outer-end");
    newSlideInner.classList.remove("transform-inner-start");
    newSlideInner.classList.add("transform-inner-end");

    const oldPrevSlide = slides[(oldIndex - 1 + numberOfSlides) % numberOfSlides];
    oldPrevSlide.classList.remove("next");
    oldPrevSlide.classList.remove("prev");
    oldPrevSlide.classList.add("other");

    // position oldIndex slide
    const oldSlide = slides[oldIndex];
    const oldSlideInner = oldSlide.getElementsByTagName("div")[0];

    const beforeOldSlide = slides[(oldIndex - 1 + numberOfSlides) % numberOfSlides];
    beforeOldSlide.classList.remove("other-lower");

    oldSlide.classList.remove("prev");
    oldSlide.classList.remove('next')
    oldSlide.classList.add("other");

    // move oldSlide to end position
    oldSlide.classList.remove("transform-outer-start");
    oldSlide.classList.add("transform-outer-end");
    oldSlideInner.classList.remove("transform-inner-start");
    oldSlideInner.classList.add("transform-inner-end");

    const nextSlideOuter = slides[(newIndex + 1) % numberOfSlides];
    const nextSlideInner = nextSlideOuter.getElementsByTagName("div")[0];

    // move nextSlide to start position
    nextSlideInner.classList.remove("transform-inner-end");
    nextSlideInner.classList.add("transform-inner-start");
    nextSlideOuter.classList.remove("transform-outer-end");
    nextSlideOuter.classList.add("transform-outer-start");

    // set newSlide to prev
    newSlide.classList.add("prev");
    newSlide.classList.remove("other");
    newSlide.classList.remove("next");

    // set nextSlide to next
    nextSlideOuter.classList.add("next");
    nextSlideOuter.classList.remove("other");
    nextSlideOuter.classList.remove("prev");


    // restart Animations
    setTimeout(() => {
      // turn on mobile transition
      Array.from(slides).forEach(slide => {
        slide.querySelector('.big-slide').classList.remove('no-transition');
        slide.querySelector('.small-slide').classList.remove('no-transition');
      });
      startAnimations();
    }, 500);
    startInterval();
  }

  let isRunning = false;
  let animationIntervalId = null;

  function startInterval(delay) {
    if (!isRunning) {
      animationIntervalId = setInterval(
        triggerAnimation,
        delay || animation.animationDelay
      );
      isRunning = true;
    }
  }

  function stopInterval() {
    if (isRunning) {
      clearInterval(animationIntervalId);
      isRunning = false;
    }
  }

  startInterval()

  let startX, startY

  hero.addEventListener("touchstart", (e) => {
    stopInterval();
    startX = e.touches[0].clientX
    startY = e.touches[0].clientY
    console.log('touchstart', startX)
  })

  hero.addEventListener("touchend", (e) => {
    const threshold = 50
    const distX = e.changedTouches[0].clientX - startX
    const distY = e.changedTouches[0].clientY - startY
    if (Math.abs(distX) > Math.abs(distY) && Math.abs(distX) > threshold)
      if (distX > 0) {
        console.log('triggering anim')
        
      } else {
        triggerAnimation()
      }
      
    startInterval()
  })

  const buttonStartStop = document.querySelector(".button-start-stop");

  buttonStartStop.addEventListener("click", function () {
    if (isRunning) {
      stopInterval();
      buttonStartStop.innerHTML = "Start";
    } else {
      startInterval();
      buttonStartStop.innerHTML = "Stop";
    }
  })

  const maxWidthText = window.innerWidth * (2 / 3 - 1 / 2 ) + 945 / 2 - 64;

  const titleDivs = hero.getElementsByClassName("title");
  Array.from(titleDivs).forEach((titleDiv) => {
    titleDiv.style.maxWidth = `${maxWidthText}px`;
  });


  // eventlistener on resize
  window.addEventListener("resize", function () {
    const maxWidthText = window.innerWidth * (2 / 3 - 1 / 2 ) + 945 / 2 - 64;
    const titleDivs = hero.getElementsByClassName("title");
    Array.from(titleDivs).forEach((titleDiv) => {
      titleDiv.style.maxWidth = `${maxWidthText}px`;
      });
  });

  const arrowDownButton = hero.getElementsByClassName("arrow-down-button")[0];
  arrowDownButton &&
    arrowDownButton.addEventListener("click", function () {
      console.log('asdf')
      const heroHeight = hero.clientHeight;
      window.scrollTo({
        top: heroHeight + 80,
        behavior: "smooth",
      });
    });
});