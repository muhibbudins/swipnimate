/* eslint-disable */
var animate = new Swipnimate({
  target: '.swip-container',
  duration: 5000,
  slides: [{
    theme: 'trivium',
    background: '#E9FCFF',
    image: 'https://images.pexels.com/photos/800176/pexels-photo-800176.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    title: 'Sequi omnis, repellat dicta beatae cupiditate codi',
    tagline: 'Reiciendis placeat quos animi minima!',
    button: 'Learn More',
    animation: {
      background: ['fadeIn', 0],
      image: ['fadeIn', 1200],
      title: ['slideInUp', 600],
      tagline: ['slideInUp', 1000],
      button: ['slideInUp', 1200]
    }
  }, {
    theme: 'trivium',
    background: '#E9FCFF',
    image: 'https://images.pexels.com/photos/800176/pexels-photo-800176.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    title: 'Sequi omnis, repellat dicta beatae cupiditate codi',
    tagline: 'Reiciendis placeat quos animi minima!',
    button: 'Learn More',
    animation: {
      background: ['fadeIn', 0],
      image: ['fadeIn', 1200],
      title: ['slideInDown', 600],
      tagline: ['slideInDown', 1000],
      button: ['slideInDown', 1200]
    }
  }]
});