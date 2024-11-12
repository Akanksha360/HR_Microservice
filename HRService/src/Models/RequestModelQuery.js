"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var Filter_1 = require("./Filter");
var PageInfo_1 = require("./PageInfo");
var common_1 = require("@nestjs/common");
//import { toBoolean, toLowerCase, toNumber, trim, toDate } from '../u//helper/cast.helper';
var RequestModelQuery = /** @class */ (function () {
    function RequestModelQuery() {
        this.pageInfo = new PageInfo_1.PageInfo();
        this.filter = new Filter_1["default"]();
    }
    RequestModelQuery = __decorate([
        (0, common_1.Injectable)()
    ], RequestModelQuery);
    return RequestModelQuery;
}());
exports["default"] = RequestModelQuery;
