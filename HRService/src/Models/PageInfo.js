"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PageInfo = void 0;
var common_1 = require("@nestjs/common");
var class_transformer_1 = require("class-transformer");
var class_validator_1 = require("class-validator");
var cast_helper_1 = require("src/Utilities/cast.helper");
var PageInfo = /** @class */ (function () {
    function PageInfo() {
        this.page_number = 1;
        this.page_size = 5;
        this.total_records = 0;
    }
    __decorate([
        (0, class_transformer_1.Transform)(function (_a) {
            var value = _a.value;
            return (0, cast_helper_1.toNumber)(value, { "default": 1, min: 1 });
        }),
        (0, class_validator_1.IsNumber)(),
        (0, class_validator_1.IsOptional)()
    ], PageInfo.prototype, "page_number");
    __decorate([
        (0, class_transformer_1.Transform)(function (_a) {
            var value = _a.value;
            return (0, cast_helper_1.toNumber)(value, { "default": 1, min: 1 });
        }),
        (0, class_validator_1.IsNumber)(),
        (0, class_validator_1.IsOptional)()
    ], PageInfo.prototype, "page_size");
    __decorate([
        (0, class_transformer_1.Transform)(function (_a) {
            var value = _a.value;
            return (0, cast_helper_1.toNumber)(value, { "default": 1, min: 1 });
        }),
        (0, class_validator_1.IsNumber)(),
        (0, class_validator_1.IsOptional)()
    ], PageInfo.prototype, "total_records");
    PageInfo = __decorate([
        (0, common_1.Injectable)()
    ], PageInfo);
    return PageInfo;
}());
exports.PageInfo = PageInfo;
