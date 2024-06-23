"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DownloadResponseDto = void 0;
var class_validator_1 = require("class-validator");
var swagger_1 = require("@nestjs/swagger");
var DownloadResponseDto = function () {
    var _a;
    var _result_decorators;
    var _result_initializers = [];
    var _result_extraInitializers = [];
    var _key_decorators;
    var _key_initializers = [];
    var _key_extraInitializers = [];
    return _a = /** @class */ (function () {
            function DownloadResponseDto() {
                this.result = __runInitializers(this, _result_initializers, void 0);
                this.key = (__runInitializers(this, _result_extraInitializers), __runInitializers(this, _key_initializers, void 0));
                __runInitializers(this, _key_extraInitializers);
            }
            return DownloadResponseDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _result_decorators = [(0, class_validator_1.IsBoolean)(), (0, swagger_1.ApiProperty)({
                    description: 'Result of Download Request',
                    example: 'true',
                })];
            _key_decorators = [(0, class_validator_1.IsString)(), (0, swagger_1.ApiProperty)({
                    description: 'Downloaded File Key',
                    example: 'bd6851d1-9124-4bc7-b0e3-65dbb6e337df-Winner_Winner_Funky_Chicken_Dinner.mp3',
                })];
            __esDecorate(null, null, _result_decorators, { kind: "field", name: "result", static: false, private: false, access: { has: function (obj) { return "result" in obj; }, get: function (obj) { return obj.result; }, set: function (obj, value) { obj.result = value; } }, metadata: _metadata }, _result_initializers, _result_extraInitializers);
            __esDecorate(null, null, _key_decorators, { kind: "field", name: "key", static: false, private: false, access: { has: function (obj) { return "key" in obj; }, get: function (obj) { return obj.key; }, set: function (obj, value) { obj.key = value; } }, metadata: _metadata }, _key_initializers, _key_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.DownloadResponseDto = DownloadResponseDto;
