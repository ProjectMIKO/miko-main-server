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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebSocketExceptionsFilter = void 0;
var common_1 = require("@nestjs/common");
var invalid_middleware_exception_1 = require("@nestjs/core/errors/exceptions/invalid-middleware.exception");
var invalidResponse_exception_1 = require("../exception/invalidResponse.exception");
var findNotFound_exception_1 = require("../exception/findNotFound.exception");
var WebSocketExceptionsFilter = function () {
    var _classDecorators = [(0, common_1.Catch)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var WebSocketExceptionsFilter = _classThis = /** @class */ (function () {
        function WebSocketExceptionsFilter_1() {
        }
        WebSocketExceptionsFilter_1.prototype.catch = function (exception, host) {
            var ctx = host.switchToWs();
            var client = ctx.getClient();
            var message = 'Internal server error';
            switch (exception.constructor) {
                case findNotFound_exception_1.FileNotFoundException:
                    message = "ERROR#001: ".concat(exception.message);
                    break;
                case invalid_middleware_exception_1.InvalidMiddlewareException: // Middleware Error
                    message = "ERROR#002: ".concat(exception.name, " failed");
                    break;
                case invalidResponse_exception_1.InvalidResponseException: // Invalid DB Response
                    message = "ERROR#003: ".concat(exception.message, " failed");
                    break;
            }
            console.error("".concat(exception.constructor, ": ").concat(message));
            client.emit('error', "".concat(exception.constructor, ": ").concat(message));
        };
        return WebSocketExceptionsFilter_1;
    }());
    __setFunctionName(_classThis, "WebSocketExceptionsFilter");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        WebSocketExceptionsFilter = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return WebSocketExceptionsFilter = _classThis;
}();
exports.WebSocketExceptionsFilter = WebSocketExceptionsFilter;
