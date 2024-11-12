"use strict";
exports.__esModule = true;
var ResponseModel = /** @class */ (function () {
    function ResponseModel(status, message, method, desc, obj) {
        this.status = status;
        this.message = message;
        this.method = method;
        this.desc = desc;
        this.obj = obj;
    }
    return ResponseModel;
}());
exports["default"] = ResponseModel;
