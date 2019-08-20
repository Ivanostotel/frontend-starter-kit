export default class XHRCaller {
  constructor(params) {
    this.requestType = params.requestType;
    this.endpoint = params.endpoint;
    this.requestParams = params.requestParams;
    this.xhr = new XMLHttpRequest();
    this.responseObject = [];
  }

  sendRequest() {
    const request = this.xhr;
    const self = this;

    if (this.requestType === undefined || this.requestType === null || this.requestType === '') {
      throw Error('requestType cannot be undefined, null or empty !');
    }

    if (this.endpoint === undefined || this.endpoint === null || this.endpoint === '') {
      throw Error('endpoint cannot be undefined, null or empty !');
    }

    return new Promise((resolve, reject, object) => {
      // Setup our listener to process compeleted requests
      request.onreadystatechange = () => {
        // Only run if the request is complete
        if (request.readyState !== 4) {
          return;
        }

        // Process the response
        if (request.status >= 200 && request.status < 300) {
          self.responseObject = JSON.parse(self.xhr.response);
          console.log(self.responseObject);

          resolve(request);
        } else {
          // If failed
          reject(new Error({
            status: request.status,
            statusText: request.statusText,
          }));
        }
      };

      request.open(self.requestType, self.endpoint, true);
      request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

      if (self.requestParams !== undefined && self.requestParams !== null && self.requestParams !== '') {
        self.requestParams = JSON.stringify(self.requestParams);
        request.send(self.requestParams);
      } else {
        request.send(null);
      }
    });
  }
}
