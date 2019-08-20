import XHRCaller from './component_xhr_builder';

export default class ComponentBoxes {
  constructor(params) {
    this.class = params.class;
    this.boxesType = params.boxesType;
    this.endpoint = params.endpoint;
    this.location = params.location;
    this.title = '';
    this.shortDescription = '';
    this.image = '';
    this.XHR = {};
    this.paramsForXHR = [];
    this.params = [];
  }

  renderComponent() {
    this.paramsForXHR.requestType = 'GET';
    this.paramsForXHR.endpoint = this.endpoint;
    this.XHR = new XHRCaller(this.paramsForXHR);
    this.XHR.sendRequest().then(() => {
      this.params = this.XHR.responseObject;

      this.params.forEach((element) => {
        this.title = element.title;
        this.shortDescription = element.shortDescription;
        this.image = element.image;

        console.log(this.title);
      });
    });
  }
}
