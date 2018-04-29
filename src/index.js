import './index.scss';

export default class Swipnimate {
  constructor(args) {
    if (!args.target) throw Error('Target must be defined');
    this.target = args.target;
    this.content = args.slides;
    this.wrapper = document.querySelector('.swip-wrapper');
    this.slides = document.querySelectorAll('.swip-slide');

    this.initialize();
  }

  uniqueId() {
    return '_' + Math.random().toString(36).substr(2, 9);
  }

  initialize() {
    let slides = this.slides;
    let content = this.content;

    this.wrapper.classList.add('swiper-wrapper');
    slides.forEach((slide, index) => {
      if (content[index]) {
        let config = content[index];
        let unique = this.uniqueId();

        slide.classList.add(config.theme);
        slide.classList.add(unique);
        slide.classList.add('swiper-slide');

        let parent = `.swip-slide.${unique}`;
        let swipBackground = document.querySelector(`${parent} .swip-background`);
        let swipImage = document.querySelector(`${parent} .swip-image`);
        let swipTitle = document.querySelector(`${parent} .swip-title`);
        let swipTagline = document.querySelector(`${parent} .swip-tagline`);
        let swipButton = document.querySelector(`${parent} .swip-button`);

        swipBackground.style.backgroundColor = config.background;
        swipImage.style.backgroundImage = `url(${config.image})`;
        swipTitle.innerHTML = config.title;
        swipTagline.innerHTML = config.tagline;
        swipButton.innerHTML = config.button;
      }
    });
  }
}
