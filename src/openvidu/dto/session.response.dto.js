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
exports.SessionResponseDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var session_request_dto_1 = require("./session.request.dto");
var connection_response_dto_1 = require("./connection.response.dto");
var SessionResponseDto = function () {
    var _a;
    var _sessionId_decorators;
    var _sessionId_initializers = [];
    var _sessionId_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var _properties_decorators;
    var _properties_initializers = [];
    var _properties_extraInitializers = [];
    var _connections_decorators;
    var _connections_initializers = [];
    var _connections_extraInitializers = [];
    var _activeConnections_decorators;
    var _activeConnections_initializers = [];
    var _activeConnections_extraInitializers = [];
    var _recording_decorators;
    var _recording_initializers = [];
    var _recording_extraInitializers = [];
    var _broadcasting_decorators;
    var _broadcasting_initializers = [];
    var _broadcasting_extraInitializers = [];
    return _a = /** @class */ (function () {
            function SessionResponseDto() {
                this.sessionId = __runInitializers(this, _sessionId_initializers, void 0);
                this.createdAt = (__runInitializers(this, _sessionId_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
                this.properties = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _properties_initializers, void 0));
                this.connections = (__runInitializers(this, _properties_extraInitializers), __runInitializers(this, _connections_initializers, void 0));
                this.activeConnections = (__runInitializers(this, _connections_extraInitializers), __runInitializers(this, _activeConnections_initializers, void 0));
                this.recording = (__runInitializers(this, _activeConnections_extraInitializers), __runInitializers(this, _recording_initializers, void 0));
                this.broadcasting = (__runInitializers(this, _recording_extraInitializers), __runInitializers(this, _broadcasting_initializers, void 0));
                __runInitializers(this, _broadcasting_extraInitializers);
            }
            return SessionResponseDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _sessionId_decorators = [(0, swagger_1.ApiProperty)({ description: 'ID of the session' })];
            _createdAt_decorators = [(0, swagger_1.ApiProperty)({ description: 'Timestamp when the session was created' })];
            _properties_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Properties of the session',
                    type: session_request_dto_1.SessionPropertiesDto,
                })];
            _connections_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Connections of the session',
                    type: [connection_response_dto_1.ConnectionResponseDto],
                })];
            _activeConnections_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Active connections of the session',
                    type: [connection_response_dto_1.ConnectionResponseDto],
                })];
            _recording_decorators = [(0, swagger_1.ApiProperty)({ description: 'Indicates if the session is being recorded' })];
            _broadcasting_decorators = [(0, swagger_1.ApiProperty)({ description: 'Indicates if the session is broadcasting' })];
            __esDecorate(null, null, _sessionId_decorators, { kind: "field", name: "sessionId", static: false, private: false, access: { has: function (obj) { return "sessionId" in obj; }, get: function (obj) { return obj.sessionId; }, set: function (obj, value) { obj.sessionId = value; } }, metadata: _metadata }, _sessionId_initializers, _sessionId_extraInitializers);
            __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
            __esDecorate(null, null, _properties_decorators, { kind: "field", name: "properties", static: false, private: false, access: { has: function (obj) { return "properties" in obj; }, get: function (obj) { return obj.properties; }, set: function (obj, value) { obj.properties = value; } }, metadata: _metadata }, _properties_initializers, _properties_extraInitializers);
            __esDecorate(null, null, _connections_decorators, { kind: "field", name: "connections", static: false, private: false, access: { has: function (obj) { return "connections" in obj; }, get: function (obj) { return obj.connections; }, set: function (obj, value) { obj.connections = value; } }, metadata: _metadata }, _connections_initializers, _connections_extraInitializers);
            __esDecorate(null, null, _activeConnections_decorators, { kind: "field", name: "activeConnections", static: false, private: false, access: { has: function (obj) { return "activeConnections" in obj; }, get: function (obj) { return obj.activeConnections; }, set: function (obj, value) { obj.activeConnections = value; } }, metadata: _metadata }, _activeConnections_initializers, _activeConnections_extraInitializers);
            __esDecorate(null, null, _recording_decorators, { kind: "field", name: "recording", static: false, private: false, access: { has: function (obj) { return "recording" in obj; }, get: function (obj) { return obj.recording; }, set: function (obj, value) { obj.recording = value; } }, metadata: _metadata }, _recording_initializers, _recording_extraInitializers);
            __esDecorate(null, null, _broadcasting_decorators, { kind: "field", name: "broadcasting", static: false, private: false, access: { has: function (obj) { return "broadcasting" in obj; }, get: function (obj) { return obj.broadcasting; }, set: function (obj, value) { obj.broadcasting = value; } }, metadata: _metadata }, _broadcasting_initializers, _broadcasting_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.SessionResponseDto = SessionResponseDto;
