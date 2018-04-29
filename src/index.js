import './index.scss';

export default class Swipnimate {
  constructor(args) {
    if (!args.target) throw Error('Target must be defined');
    this.target = args.target;
    this.content = args.slides;
    this.wrapper = document.querySelector('.swip-wrapper');
    this.slides = document.querySelectorAll('.swip-slide');
    this.element = ['background', 'image', 'title', 'tagline', 'button'];
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
        let swip = {};

        slide.classList.add(config.theme);
        slide.classList.add(unique);
        slide.classList.add('swiper-slide');

        let parent = `.swip-slide.${unique}`;

        this.element.map(item => {
          swip[item] = document.querySelector(`${parent} .swip-${item}`);

          if (config.animation[item]) {
            let animation = config.animation[item];

            swip[item].setAttribute('data-animation', animation[0]);
            swip[item].setAttribute('data-delay', `animation-duration-${animation[1]}`);
          }
        });

        swip['background'].style.backgroundColor = config.background;
        swip['image'].style.backgroundImage = `url(${config.image})`;
        swip['title'].innerHTML = config.title;
        swip['tagline'].innerHTML = config.tagline;
        swip['button'].innerHTML = config.button;
      }
    });

    /*eslint-disable */
    const startAnimation = () => {
      let swip = {}
      
      this.element.map(item => {
        swip[item] = document.querySelector(`.swiper-slide-active .swip-${item}`);

        let getAnimate = swip[item].getAttribute('data-animation')
        let getDelay = swip[item].getAttribute('data-delay')
        let getDelayNumber = parseInt(getDelay.match(/\d/g).join(''))
        
        setTimeout(() => {
          swip[item].style.display = 'block'
        }, getDelayNumber)

        swip[item].classList.add('animated')
        swip[item].classList.add(getAnimate)
        swip[item].classList.add(getDelay)
      });
    }

    const s = new Swiper(this.target, {
      pagination: {
        el: '.swiper-pagination'
      },
      paginationClickable: true,
      spaceBetween: 0,
      autoplay: {
        delay: 5000
      },
      loop: true
    })
    .on('slideChangeTransitionStart', () => {
      let swip = {};

      this.element.map(item => {
        swip[item] = document.querySelectorAll(`.swip-${item}`);
        swip[item].forEach(item => {
          let getAnimate = item.getAttribute('data-animation')
          let getDelay = item.getAttribute('data-delay')
  
          item.classList.remove('animated')
          item.classList.remove(getAnimate)
          item.classList.remove(getDelay)
          item.style.display = 'none'
        })
      });
    })
    .on('slideChangeTransitionEnd', () => {
      startAnimation();
    })

    startAnimation();
  }
}
