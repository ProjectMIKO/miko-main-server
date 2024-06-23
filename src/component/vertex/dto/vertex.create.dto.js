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
exports.NodeCreateDto = void 0;
var class_validator_1 = require("class-validator");
var swagger_1 = require("@nestjs/swagger");
var VertexCreateDto = function () {
    var _a;
    var _keyword_decorators;
    var _keyword_initializers = [];
    var _keyword_extraInitializers = [];
    var _summary_decorators;
    var _summary_initializers = [];
    var _summary_extraInitializers = [];
    var _conversationIds_decorators;
    var _conversationIds_initializers = [];
    var _conversationIds_extraInitializers = [];
    return _a = /** @class */ (function () {
            function NodeCreateDto() {
                this.keyword = __runInitializers(this, _keyword_initializers, void 0);
                this.summary = (__runInitializers(this, _keyword_extraInitializers), __runInitializers(this, _summary_initializers, void 0));
                this.conversationIds = (__runInitializers(this, _summary_extraInitializers), __runInitializers(this, _conversationIds_initializers, void 0));
                __runInitializers(this, _conversationIds_extraInitializers);
            }
            return NodeCreateDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _keyword_decorators = [(0, swagger_1.ApiProperty)({ description: 'Node keyword' }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)()];
            _summary_decorators = [(0, swagger_1.ApiProperty)({ description: 'Node summary' }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)()];
            _conversationIds_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'List of conversation IDs associated with this node',
                }), (0, class_validator_1.IsArray)(), (0, class_validator_1.ArrayNotEmpty)()];
            __esDecorate(null, null, _keyword_decorators, { kind: "field", name: "keyword", static: false, private: false, access: { has: function (obj) { return "keyword" in obj; }, get: function (obj) { return obj.keyword; }, set: function (obj, value) { obj.keyword = value; } }, metadata: _metadata }, _keyword_initializers, _keyword_extraInitializers);
            __esDecorate(null, null, _summary_decorators, { kind: "field", name: "summary", static: false, private: false, access: { has: function (obj) { return "summary" in obj; }, get: function (obj) { return obj.summary; }, set: function (obj, value) { obj.summary = value; } }, metadata: _metadata }, _summary_initializers, _summary_extraInitializers);
            __esDecorate(null, null, _conversationIds_decorators, { kind: "field", name: "conversationIds", static: false, private: false, access: { has: function (obj) { return "conversationIds" in obj; }, get: function (obj) { return obj.conversationIds; }, set: function (obj, value) { obj.conversationIds = value; } }, metadata: _metadata }, _conversationIds_initializers, _conversationIds_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.NodeCreateDto = VertexCreateDto;
