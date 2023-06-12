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
      delay: 3000
    }
  },
  {
    animation: {
      delay: 5000
    }
  },
  {
    animation: {
      delay: 3000
    }
  },
  {
    animation: {
      delay: 5000
    }
  },
  {
    animation: {
      delay: 3000
    }
  }
];

document.addEventListener("DOMContentLoaded", function (event) {
  // get the hero element
  var hero = document.getElementById("samm-hero-slider");
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

    // set the z-index of the previous slide to 0
    prevSlide.classList.remove("prev");
    prevSlide.classList.add("other");

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
    activeIndex.index = (activeIndex.index + 1) % numberOfSlides;
    stopInterval();
    startInterval(sliderElements[activeIndex.index].animation.delay);
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

  const initialLoadIsMobile = window.innerWidth < 781

  !initialLoadIsMobile && startInterval()

  const maxWidthText = window.innerWidth * (2 / 3 - 1 / 2 ) + 945 / 2 - 64;

  const titleDivs = hero.getElementsByClassName("title");
  Array.from(titleDivs).forEach((titleDiv) => {
    titleDiv.style.maxWidth = `${maxWidthText}px`;
  });


  // eventlistener on resize
  window.addEventListener("resize", function () {

    // if window size is smaller than 1025px stop Interval if it is running
    if (window.innerWidth < 781) {
      stopInterval();
      return;
    }
    else startInterval();

    const maxWidthText = window.innerWidth * (2 / 3 - 1 / 2 ) + 945 / 2 - 64;
    const titleDivs = hero.getElementsByClassName("title");
    Array.from(titleDivs).forEach((titleDiv) => {
      titleDiv.style.maxWidth = `${maxWidthText}px`;
      });
  });

  let isMobile = window.innerWidth < 781

  // after 500 ms start the animation
  setTimeout(() => {
    if (isMobile) {
      Array.from(hero.getElementsByClassName('big-slide')).forEach((slide) => {
        slide.classList.add('transition')
        slide.classList.add('trans-mobile')
      })
    }
  }, 500);

  window.addEventListener('resize', () => {
    if (window.innerWidth < 781) {
      if (!isMobile) {
        Array.from(hero.getElementsByClassName('big-slide')).forEach((slide) => {
          slide.classList.add('transition')
          slide.classList.add('trans-mobile')
        })
      }
      isMobile = true
    } else {
      if (isMobile) {
        Array.from(hero.getElementsByClassName('big-slide')).forEach((slide) => {
          slide.classList.remove('transition')
          slide.classList.remove('trans-mobile')
        })
        isMobile = false
      }
    }
  })

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
