export default () => {
  // Slider

  let slideIndex = 1;

  const currentSlide = (n) => {
    runSlider((slideIndex = n));
  };
  const changeSlide = (n) => {
    runSlider((slideIndex += n));
  };

  // run slider
  runSlider(slideIndex);

  function runSlider(n) {
    const slides = document.querySelectorAll(".js-slider");
    var indicator = document.querySelectorAll(".js-indicator");
    if (n > slides.length) {
      slideIndex = 1;
    }
    if (n < 1) {
      slideIndex = slides.length;
    }
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
      indicator[i].classList.remove("active");
    }

    slides[slideIndex - 1].style.display = "block";
    indicator[slideIndex - 1].classList.add("active");
  }

  // Handle indicator click

  const indicators = document.querySelector(".js-indicators");
  indicators.addEventListener("click", (ele) => {
    const targetEle = ele.target;
    if (targetEle.classList.contains("js-indicator")) {
      currentSlide(targetEle.dataset.item);
    }
    if (targetEle.classList.contains("btn-next")) {
      changeSlide(1);
    }
    if (targetEle.classList.contains("btn-prev")) {
      changeSlide(-1);
    }
  });
};
