import ComponentBoxes from './models/component_boxes.js';

const ready = () => {
  console.log('DOM fully loaded and parsed');

  let paramsForBoxes = [];

  paramsForBoxes.class = 'test';
  paramsForBoxes.type = 'regular';
  paramsForBoxes.title = 'This is test title.'
  paramsForBoxes.description = 'This is a test description which is not very long but should do the trick.'
  paramsForBoxes.image = '../assets/images/300x300-image.jpg';
  paramsForBoxes.location = '#locForBoxes';
  paramsForBoxes.endpoint = 'https://localhost:44300/api/values';

  let boxes = new ComponentBoxes(paramsForBoxes);
  boxes.renderComponent();

  /**
   * Inline external svg sprite to all pages
   *
   * plugin: svg4everybody
   * https://github.com/jonathantneal/svg4everybody
   */
  // eslint-disable-next-line no-undef
  svg4everybody();

  /**
   * All notifications configuration
   *
   * plugin: toastr
   * https://github.com/CodeSeven/toastr
   */
  // eslint-disable-next-line no-undef
  toastr.options = {
    closeButton: true,
    debug: false,
    newestOnTop: false,
    progressBar: true,
    positionClass: 'toast-top-full-width',
    preventDuplicates: false,
    onclick: null,
    showDuration: '300',
    hideDuration: '1000',
    timeOut: '10000',
    extendedTimeOut: '1000',
    showEasing: 'swing',
    hideEasing: 'linear',
    showMethod: 'fadeIn',
    hideMethod: 'fadeOut',
  };
};

window.addEventListener('DOMContentLoaded', ready);
