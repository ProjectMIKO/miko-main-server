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
exports.ConnectionResponseDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var connection_request_dto_1 = require("./connection.request.dto");
var publisher_response_dto_1 = require("./publisher.response.dto");
var ConnectionResponseDto = function () {
    var _a;
    var _connectionId_decorators;
    var _connectionId_initializers = [];
    var _connectionId_extraInitializers = [];
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var _activeAt_decorators;
    var _activeAt_initializers = [];
    var _activeAt_extraInitializers = [];
    var _location_decorators;
    var _location_initializers = [];
    var _location_extraInitializers = [];
    var _ip_decorators;
    var _ip_initializers = [];
    var _ip_extraInitializers = [];
    var _platform_decorators;
    var _platform_initializers = [];
    var _platform_extraInitializers = [];
    var _clientData_decorators;
    var _clientData_initializers = [];
    var _clientData_extraInitializers = [];
    var _connectionProperties_decorators;
    var _connectionProperties_initializers = [];
    var _connectionProperties_extraInitializers = [];
    var _token_decorators;
    var _token_initializers = [];
    var _token_extraInitializers = [];
    var _publishers_decorators;
    var _publishers_initializers = [];
    var _publishers_extraInitializers = [];
    var _subscribers_decorators;
    var _subscribers_initializers = [];
    var _subscribers_extraInitializers = [];
    return _a = /** @class */ (function () {
            function ConnectionResponseDto() {
                this.connectionId = __runInitializers(this, _connectionId_initializers, void 0);
                this.status = (__runInitializers(this, _connectionId_extraInitializers), __runInitializers(this, _status_initializers, void 0));
                this.createdAt = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
                this.activeAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _activeAt_initializers, void 0));
                this.location = (__runInitializers(this, _activeAt_extraInitializers), __runInitializers(this, _location_initializers, void 0));
                this.ip = (__runInitializers(this, _location_extraInitializers), __runInitializers(this, _ip_initializers, void 0));
                this.platform = (__runInitializers(this, _ip_extraInitializers), __runInitializers(this, _platform_initializers, void 0));
                this.clientData = (__runInitializers(this, _platform_extraInitializers), __runInitializers(this, _clientData_initializers, void 0));
                this.connectionProperties = (__runInitializers(this, _clientData_extraInitializers), __runInitializers(this, _connectionProperties_initializers, void 0));
                this.token = (__runInitializers(this, _connectionProperties_extraInitializers), __runInitializers(this, _token_initializers, void 0));
                this.publishers = (__runInitializers(this, _token_extraInitializers), __runInitializers(this, _publishers_initializers, void 0));
                this.subscribers = (__runInitializers(this, _publishers_extraInitializers), __runInitializers(this, _subscribers_initializers, void 0));
                __runInitializers(this, _subscribers_extraInitializers);
            }
            return ConnectionResponseDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _connectionId_decorators = [(0, swagger_1.ApiProperty)({ description: 'ID of the connection' })];
            _status_decorators = [(0, swagger_1.ApiProperty)({ description: 'Status of the connection' })];
            _createdAt_decorators = [(0, swagger_1.ApiProperty)({ description: 'Timestamp when the connection was created' })];
            _activeAt_decorators = [(0, swagger_1.ApiProperty)({ description: 'Timestamp when the connection became active' })];
            _location_decorators = [(0, swagger_1.ApiProperty)({ description: 'Location of the connection' })];
            _ip_decorators = [(0, swagger_1.ApiProperty)({ description: 'IP address of the connection' })];
            _platform_decorators = [(0, swagger_1.ApiProperty)({ description: 'Platform of the connection' })];
            _clientData_decorators = [(0, swagger_1.ApiProperty)({ description: 'Client data associated with the connection' })];
            _connectionProperties_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Properties of the connection',
                    type: connection_request_dto_1.ConnectionPropertiesDto,
                })];
            _token_decorators = [(0, swagger_1.ApiProperty)({ description: 'Token for the connection' })];
            _publishers_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'List of publishers in the connection',
                    type: [publisher_response_dto_1.PublisherResponseDto],
                })];
            _subscribers_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'List of subscribers in the connection',
                    isArray: true,
                })];
            __esDecorate(null, null, _connectionId_decorators, { kind: "field", name: "connectionId", static: false, private: false, access: { has: function (obj) { return "connectionId" in obj; }, get: function (obj) { return obj.connectionId; }, set: function (obj, value) { obj.connectionId = value; } }, metadata: _metadata }, _connectionId_initializers, _connectionId_extraInitializers);
            __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
            __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
            __esDecorate(null, null, _activeAt_decorators, { kind: "field", name: "activeAt", static: false, private: false, access: { has: function (obj) { return "activeAt" in obj; }, get: function (obj) { return obj.activeAt; }, set: function (obj, value) { obj.activeAt = value; } }, metadata: _metadata }, _activeAt_initializers, _activeAt_extraInitializers);
            __esDecorate(null, null, _location_decorators, { kind: "field", name: "location", static: false, private: false, access: { has: function (obj) { return "location" in obj; }, get: function (obj) { return obj.location; }, set: function (obj, value) { obj.location = value; } }, metadata: _metadata }, _location_initializers, _location_extraInitializers);
            __esDecorate(null, null, _ip_decorators, { kind: "field", name: "ip", static: false, private: false, access: { has: function (obj) { return "ip" in obj; }, get: function (obj) { return obj.ip; }, set: function (obj, value) { obj.ip = value; } }, metadata: _metadata }, _ip_initializers, _ip_extraInitializers);
            __esDecorate(null, null, _platform_decorators, { kind: "field", name: "platform", static: false, private: false, access: { has: function (obj) { return "platform" in obj; }, get: function (obj) { return obj.platform; }, set: function (obj, value) { obj.platform = value; } }, metadata: _metadata }, _platform_initializers, _platform_extraInitializers);
            __esDecorate(null, null, _clientData_decorators, { kind: "field", name: "clientData", static: false, private: false, access: { has: function (obj) { return "clientData" in obj; }, get: function (obj) { return obj.clientData; }, set: function (obj, value) { obj.clientData = value; } }, metadata: _metadata }, _clientData_initializers, _clientData_extraInitializers);
            __esDecorate(null, null, _connectionProperties_decorators, { kind: "field", name: "connectionProperties", static: false, private: false, access: { has: function (obj) { return "connectionProperties" in obj; }, get: function (obj) { return obj.connectionProperties; }, set: function (obj, value) { obj.connectionProperties = value; } }, metadata: _metadata }, _connectionProperties_initializers, _connectionProperties_extraInitializers);
            __esDecorate(null, null, _token_decorators, { kind: "field", name: "token", static: false, private: false, access: { has: function (obj) { return "token" in obj; }, get: function (obj) { return obj.token; }, set: function (obj, value) { obj.token = value; } }, metadata: _metadata }, _token_initializers, _token_extraInitializers);
            __esDecorate(null, null, _publishers_decorators, { kind: "field", name: "publishers", static: false, private: false, access: { has: function (obj) { return "publishers" in obj; }, get: function (obj) { return obj.publishers; }, set: function (obj, value) { obj.publishers = value; } }, metadata: _metadata }, _publishers_initializers, _publishers_extraInitializers);
            __esDecorate(null, null, _subscribers_decorators, { kind: "field", name: "subscribers", static: false, private: false, access: { has: function (obj) { return "subscribers" in obj; }, get: function (obj) { return obj.subscribers; }, set: function (obj, value) { obj.subscribers = value; } }, metadata: _metadata }, _subscribers_initializers, _subscribers_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.ConnectionResponseDto = ConnectionResponseDto;
