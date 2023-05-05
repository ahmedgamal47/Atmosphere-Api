export class BaseResponse<T> {
  result?: T;

  constructor(result) {
    this.result = result;
  }
}
