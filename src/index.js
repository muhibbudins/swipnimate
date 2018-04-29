import './index.scss';

export default class Swipnimate {
  constructor(args) {
    if (!args.target) throw Error('Target must be defined');
    this.target = args.target;
    this.duration = args.duration;
    this.content = args.slides;
    this.animateEnd = 'fadeOut';
    this.pagination = document.querySelector('.swip-pagination');
    this.loading = document.querySelector('.swip-loading');
    this.wrapper = document.querySelector('.swip-wrapper');
    this.element = ['background', 'image', 'title', 'tagline', 'button'];

    this.createSlide((done) => {
      this.slides = document.querySelectorAll('.swip-slide');
      this.initialize();
    });
  }

  uniqueId() {
    return '_' + Math.random().toString(36).substr(2, 9);
  }

  createSlide(callback) {
    let template = `
      <div class="swip-inner">
        <div class="swip-background"></div>
        <div class="swip-image"></div>
        <div class="swip-title"></div>
        <div class="swip-tagline"></div>
        <a href="" class="swip-button"></a>
      </div>
    `;
    let loading = 'Loading';
    let fragment = document.createDocumentFragment();

    this.pagination.classList.add('swiper-pagination');

    for (let i = 1; i <= this.content.length; i++) {
      let slide = document.createElement('div');

      slide.className = 'swip-slide';
      slide.innerHTML = template;

      fragment.appendChild(slide);
    }

    this.wrapper.appendChild(fragment);

    this.loading.innerHTML = loading;

    callback('done');
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

            swip[item].setAttribute('data-start', animation[0]);
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

    this.startAnimation();
  }

  startAnimation() {

    /*eslint-disable */
    const startTransition = () => {
      let swip = {}
      
      this.element.map(item => {
        swip[item] = document.querySelector(`.swiper-slide-active .swip-${item}`);

        let animateStart = swip[item].getAttribute('data-start')
        let getDelay = swip[item].getAttribute('data-delay')
        let getDelayNumber = parseInt(getDelay.match(/\d/g).join(''))
        
        setTimeout(() => {
          swip[item].style.display = 'block'
        }, getDelayNumber)

        swip[item].classList.add('animated')
        swip[item].classList.add(animateStart)
        swip[item].classList.add(getDelay)
      });

      setTimeout(() => {
        this.element.map(item => {
          swip[item] = document.querySelector(`.swiper-slide-active .swip-${item}`);

          let animateStart = swip[item].getAttribute('data-start')
          let getDelay = swip[item].getAttribute('data-delay')
  
          swip[item].classList.remove('animated')
          swip[item].classList.remove(animateStart)
          swip[item].classList.remove(getDelay)

          swip[item].classList.add('animated')
          swip[item].classList.add(this.animateEnd)
        });
      }, this.duration - 750);
    }

    const s = new Swiper(this.target, {
      pagination: {
        el: '.swip-pagination'
      },
      paginationClickable: true,
      spaceBetween: 0,
      shortSwipes: false,
      autoplay: {
        delay: this.duration
      },
      loop: true
    })
    .on('slideChangeTransitionStart', () => {
      let swip = {};

      this.element.map(item => {
        swip[item] = document.querySelectorAll(`.swip-${item}`);
        swip[item].forEach(item => {
          let animateStart = item.getAttribute('data-start')
          let getDelay = item.getAttribute('data-delay')
  
          item.classList.remove('animated')
          item.classList.remove(animateStart)
          item.classList.remove(this.animateEnd)
          item.classList.remove(getDelay)
          item.style.display = 'none'
        })
      });
    })
    .on('slideChangeTransitionEnd', () => {
      startTransition();
    });

    startTransition();
  }
}
