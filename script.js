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
    id: "slide-0",
    boldTitle: "Gemeinsam",
    restTitle: "für nachhaltige gesellschaftliche Entwicklung",
    text: null,
    frameLeft: {
      backgroundColor: "orange",
      img: null
    },
    frameRight: {
      backgroundColor: "yellow",
      img: null
    },
    animation: {
      animationDirection: "leftToRight",
      delay: 5000
    }
  },
  {
    id: "slide-1",
    boldTitle: "Gesicherte",
    restTitle: "Grundversorgung",
    text:
      "Wir stärken Menschen und Organisationen, die bestehende Versorgungssysteme in Krisen und Konflikten verbessern. Denn gesicherte Lebensgrundlagen sind Vorraussetzung für Entwicklung.",
    frameLeft: {
      backgroundColor: "yellow",
      img: null
    },
    frameRight: {
      backgroundColor: "img",
      img: ""
    },
    animation: {
      animationDirection: "leftToRight",
      delay: 5000
    }
  },
  {
    id: "slide-2",
    boldTitle: null,
    restTitle: null,
    text: null,
    frameLeft: {
      backgroundColor: "img",
      img: ""
    },
    frameRight: {
      backgroundColor: "blue",
      img: null
    },
    animation: {
      animationDirection: "rightToLeft",
      delay: 3000
    }
  },
  {
    id: "slide-3",
    boldTitle: "Vernetzte",
    restTitle: "Gesellschaften",
    text:
      "Wir verstärken Newtzwerke für innovatives und inklusives Lernen und Wissensaustausch. Weil nachhaltige Entwicklung nur gelingt, wenn alle gleichberechtigt teilhaben.",
    frameLeft: {
      backgroundColor: "blue",
      img: null
    },
    frameRight: {
      backgroundColor: "img",
      img: ""
    },
    animation: {
      animationDirection: "leftToRight",
      delay: 5000
    }
  },
  {
    id: "slide-4",
    boldTitle: null,
    restTitle: null,
    text: null,
    frameLeft: {
      backgroundColor: "img",
      img: ""
    },
    frameRight: {
      backgroundColor: "green",
      img: null
    },
    animation: {
      animationDirection: "rightToLeft",
      delay: 3000
    }
  },
  {
    id: "slide-5",
    boldTitle: "Klima und",
    restTitle: "Nachhaltigkeit",
    text:
      "Mit sektorübergreifender Zusammenarbeit unterstützen wir die Transformation zu nachhaltigem Handeln. Für einen Gesunden Planeten und eine Lebenswerte Zukunft.",
    frameLeft: {
      backgroundColor: "green",
      img: null
    },
    frameRight: {
      backgroundColor: "img",
      img: ""
    },
    animation: {
      animationDirection: "leftToRight",
      delay: 5000
    }
  },
  {
    id: "slide-6",
    boldTitle: null,
    restTitle: null,
    text: null,
    frameLeft: {
      backgroundColor: "img",
      img: ""
    },
    frameRight: {
      backgroundColor: "orange",
      img: null
    },
    animation: {
      animationDirection: "leftToRight",
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

    // if (newIndex === oldIndex + 1 || (oldIndex === numberOfSlides - 1 && newIndex === 0)) {
    //     triggerAnimation()
    //     setTimeout(() => {
    //         startAnimations()
    //     }, 500)
    //     startInterval()
    //     return
    // }

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

  window.innerWidth > 1024 && startInterval();

  // eventlistener on resize
  window.addEventListener("resize", function () {
    // if window size is smaller than 1025px stop Interval if it is running
    if (window.innerWidth < 1025) stopInterval();
    else startInterval();
  });


  const maxWidthText = 544 //945 / 2 + window.innerWidth / 6 - 64;

  const textDivs = hero.getElementsByClassName("text");
  Array.from(textDivs).forEach((textDiv) => {
    textDiv.style.maxWidth = `${maxWidthText}px`;
    });

  const toggleBtn = document.getElementById("toggleBtn");
  toggleBtn &&
    toggleBtn.addEventListener("click", function () {
      clearInterval(animationIntervalId);
      isRunning = false;
      toggleBtn.innerText = "Resume";
    });
});
