exports.ApiResult = class apiResult {
    constructor(status, data, message) {
        this.status = status;
        this.data = data;
        this.message = message;
    }
};