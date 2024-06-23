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
exports.ConnectionPropertiesDto = exports.KurentoOptionsDto = exports.IceServerPropertiesDto = exports.OpenViduRole = exports.ConnectionType = void 0;
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var class_transformer_1 = require("class-transformer");
var ConnectionType;
(function (ConnectionType) {
    ConnectionType["WEBRTC"] = "WEBRTC";
    ConnectionType["IPCAM"] = "IPCAM";
})(ConnectionType || (exports.ConnectionType = ConnectionType = {}));
var OpenViduRole;
(function (OpenViduRole) {
    OpenViduRole["SUBSCRIBER"] = "SUBSCRIBER";
    OpenViduRole["PUBLISHER"] = "PUBLISHER";
    OpenViduRole["MODERATOR"] = "MODERATOR";
})(OpenViduRole || (exports.OpenViduRole = OpenViduRole = {}));
var IceServerPropertiesDto = function () {
    var _a;
    var _url_decorators;
    var _url_initializers = [];
    var _url_extraInitializers = [];
    var _staticAuthSecret_decorators;
    var _staticAuthSecret_initializers = [];
    var _staticAuthSecret_extraInitializers = [];
    var _username_decorators;
    var _username_initializers = [];
    var _username_extraInitializers = [];
    var _credential_decorators;
    var _credential_initializers = [];
    var _credential_extraInitializers = [];
    return _a = /** @class */ (function () {
            function IceServerPropertiesDto() {
                this.url = __runInitializers(this, _url_initializers, void 0);
                this.staticAuthSecret = (__runInitializers(this, _url_extraInitializers), __runInitializers(this, _staticAuthSecret_initializers, void 0));
                this.username = (__runInitializers(this, _staticAuthSecret_extraInitializers), __runInitializers(this, _username_initializers, void 0));
                this.credential = (__runInitializers(this, _username_extraInitializers), __runInitializers(this, _credential_initializers, void 0));
                __runInitializers(this, _credential_extraInitializers);
            }
            return IceServerPropertiesDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _url_decorators = [(0, swagger_1.ApiProperty)({ description: 'URL of the ICE server' }), (0, class_validator_1.IsString)()];
            _staticAuthSecret_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Static authentication secret for the ICE server',
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _username_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Username for the ICE server' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _credential_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Credential for the ICE server' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            __esDecorate(null, null, _url_decorators, { kind: "field", name: "url", static: false, private: false, access: { has: function (obj) { return "url" in obj; }, get: function (obj) { return obj.url; }, set: function (obj, value) { obj.url = value; } }, metadata: _metadata }, _url_initializers, _url_extraInitializers);
            __esDecorate(null, null, _staticAuthSecret_decorators, { kind: "field", name: "staticAuthSecret", static: false, private: false, access: { has: function (obj) { return "staticAuthSecret" in obj; }, get: function (obj) { return obj.staticAuthSecret; }, set: function (obj, value) { obj.staticAuthSecret = value; } }, metadata: _metadata }, _staticAuthSecret_initializers, _staticAuthSecret_extraInitializers);
            __esDecorate(null, null, _username_decorators, { kind: "field", name: "username", static: false, private: false, access: { has: function (obj) { return "username" in obj; }, get: function (obj) { return obj.username; }, set: function (obj, value) { obj.username = value; } }, metadata: _metadata }, _username_initializers, _username_extraInitializers);
            __esDecorate(null, null, _credential_decorators, { kind: "field", name: "credential", static: false, private: false, access: { has: function (obj) { return "credential" in obj; }, get: function (obj) { return obj.credential; }, set: function (obj, value) { obj.credential = value; } }, metadata: _metadata }, _credential_initializers, _credential_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.IceServerPropertiesDto = IceServerPropertiesDto;
var KurentoOptionsDto = function () {
    var _a;
    var _videoMaxRecvBandwidth_decorators;
    var _videoMaxRecvBandwidth_initializers = [];
    var _videoMaxRecvBandwidth_extraInitializers = [];
    var _videoMinRecvBandwidth_decorators;
    var _videoMinRecvBandwidth_initializers = [];
    var _videoMinRecvBandwidth_extraInitializers = [];
    var _videoMaxSendBandwidth_decorators;
    var _videoMaxSendBandwidth_initializers = [];
    var _videoMaxSendBandwidth_extraInitializers = [];
    var _videoMinSendBandwidth_decorators;
    var _videoMinSendBandwidth_initializers = [];
    var _videoMinSendBandwidth_extraInitializers = [];
    var _allowedFilters_decorators;
    var _allowedFilters_initializers = [];
    var _allowedFilters_extraInitializers = [];
    return _a = /** @class */ (function () {
            function KurentoOptionsDto() {
                this.videoMaxRecvBandwidth = __runInitializers(this, _videoMaxRecvBandwidth_initializers, void 0);
                this.videoMinRecvBandwidth = (__runInitializers(this, _videoMaxRecvBandwidth_extraInitializers), __runInitializers(this, _videoMinRecvBandwidth_initializers, void 0));
                this.videoMaxSendBandwidth = (__runInitializers(this, _videoMinRecvBandwidth_extraInitializers), __runInitializers(this, _videoMaxSendBandwidth_initializers, void 0));
                this.videoMinSendBandwidth = (__runInitializers(this, _videoMaxSendBandwidth_extraInitializers), __runInitializers(this, _videoMinSendBandwidth_initializers, void 0));
                this.allowedFilters = (__runInitializers(this, _videoMinSendBandwidth_extraInitializers), __runInitializers(this, _allowedFilters_initializers, void 0));
                __runInitializers(this, _allowedFilters_extraInitializers);
            }
            return KurentoOptionsDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _videoMaxRecvBandwidth_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Maximum receiving bandwidth for video' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)()];
            _videoMinRecvBandwidth_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Minimum receiving bandwidth for video' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)()];
            _videoMaxSendBandwidth_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Maximum sending bandwidth for video' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)()];
            _videoMinSendBandwidth_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Minimum sending bandwidth for video' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)()];
            _allowedFilters_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Allowed filters for video streams',
                    isArray: true,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)({ each: true })];
            __esDecorate(null, null, _videoMaxRecvBandwidth_decorators, { kind: "field", name: "videoMaxRecvBandwidth", static: false, private: false, access: { has: function (obj) { return "videoMaxRecvBandwidth" in obj; }, get: function (obj) { return obj.videoMaxRecvBandwidth; }, set: function (obj, value) { obj.videoMaxRecvBandwidth = value; } }, metadata: _metadata }, _videoMaxRecvBandwidth_initializers, _videoMaxRecvBandwidth_extraInitializers);
            __esDecorate(null, null, _videoMinRecvBandwidth_decorators, { kind: "field", name: "videoMinRecvBandwidth", static: false, private: false, access: { has: function (obj) { return "videoMinRecvBandwidth" in obj; }, get: function (obj) { return obj.videoMinRecvBandwidth; }, set: function (obj, value) { obj.videoMinRecvBandwidth = value; } }, metadata: _metadata }, _videoMinRecvBandwidth_initializers, _videoMinRecvBandwidth_extraInitializers);
            __esDecorate(null, null, _videoMaxSendBandwidth_decorators, { kind: "field", name: "videoMaxSendBandwidth", static: false, private: false, access: { has: function (obj) { return "videoMaxSendBandwidth" in obj; }, get: function (obj) { return obj.videoMaxSendBandwidth; }, set: function (obj, value) { obj.videoMaxSendBandwidth = value; } }, metadata: _metadata }, _videoMaxSendBandwidth_initializers, _videoMaxSendBandwidth_extraInitializers);
            __esDecorate(null, null, _videoMinSendBandwidth_decorators, { kind: "field", name: "videoMinSendBandwidth", static: false, private: false, access: { has: function (obj) { return "videoMinSendBandwidth" in obj; }, get: function (obj) { return obj.videoMinSendBandwidth; }, set: function (obj, value) { obj.videoMinSendBandwidth = value; } }, metadata: _metadata }, _videoMinSendBandwidth_initializers, _videoMinSendBandwidth_extraInitializers);
            __esDecorate(null, null, _allowedFilters_decorators, { kind: "field", name: "allowedFilters", static: false, private: false, access: { has: function (obj) { return "allowedFilters" in obj; }, get: function (obj) { return obj.allowedFilters; }, set: function (obj, value) { obj.allowedFilters = value; } }, metadata: _metadata }, _allowedFilters_initializers, _allowedFilters_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.KurentoOptionsDto = KurentoOptionsDto;
var ConnectionPropertiesDto = function () {
    var _a;
    var _type_decorators;
    var _type_initializers = [];
    var _type_extraInitializers = [];
    var _data_decorators;
    var _data_initializers = [];
    var _data_extraInitializers = [];
    var _record_decorators;
    var _record_initializers = [];
    var _record_extraInitializers = [];
    var _role_decorators;
    var _role_initializers = [];
    var _role_extraInitializers = [];
    var _kurentoOptions_decorators;
    var _kurentoOptions_initializers = [];
    var _kurentoOptions_extraInitializers = [];
    var _rtspUri_decorators;
    var _rtspUri_initializers = [];
    var _rtspUri_extraInitializers = [];
    var _adaptativeBitrate_decorators;
    var _adaptativeBitrate_initializers = [];
    var _adaptativeBitrate_extraInitializers = [];
    var _onlyPlayWithSubscribers_decorators;
    var _onlyPlayWithSubscribers_initializers = [];
    var _onlyPlayWithSubscribers_extraInitializers = [];
    var _networkCache_decorators;
    var _networkCache_initializers = [];
    var _networkCache_extraInitializers = [];
    var _customIceServers_decorators;
    var _customIceServers_initializers = [];
    var _customIceServers_extraInitializers = [];
    return _a = /** @class */ (function () {
            function ConnectionPropertiesDto() {
                this.type = __runInitializers(this, _type_initializers, void 0);
                this.data = (__runInitializers(this, _type_extraInitializers), __runInitializers(this, _data_initializers, void 0));
                this.record = (__runInitializers(this, _data_extraInitializers), __runInitializers(this, _record_initializers, void 0));
                this.role = (__runInitializers(this, _record_extraInitializers), __runInitializers(this, _role_initializers, void 0));
                this.kurentoOptions = (__runInitializers(this, _role_extraInitializers), __runInitializers(this, _kurentoOptions_initializers, void 0));
                this.rtspUri = (__runInitializers(this, _kurentoOptions_extraInitializers), __runInitializers(this, _rtspUri_initializers, void 0));
                this.adaptativeBitrate = (__runInitializers(this, _rtspUri_extraInitializers), __runInitializers(this, _adaptativeBitrate_initializers, void 0));
                this.onlyPlayWithSubscribers = (__runInitializers(this, _adaptativeBitrate_extraInitializers), __runInitializers(this, _onlyPlayWithSubscribers_initializers, void 0));
                this.networkCache = (__runInitializers(this, _onlyPlayWithSubscribers_extraInitializers), __runInitializers(this, _networkCache_initializers, void 0));
                this.customIceServers = (__runInitializers(this, _networkCache_extraInitializers), __runInitializers(this, _customIceServers_initializers, void 0));
                __runInitializers(this, _customIceServers_extraInitializers);
            }
            return ConnectionPropertiesDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _type_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Type of connection',
                    enum: ConnectionType,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(ConnectionType)];
            _data_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Additional data for the connection' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _record_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Whether the connection should be recorded',
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            _role_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Role of the user in the session',
                    enum: OpenViduRole,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(OpenViduRole)];
            _kurentoOptions_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Kurento options for the connection',
                    type: KurentoOptionsDto,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.ValidateNested)(), (0, class_transformer_1.Type)(function () { return KurentoOptionsDto; })];
            _rtspUri_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'RTSP URI for the connection' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _adaptativeBitrate_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Whether to use adaptive bitrate' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            _onlyPlayWithSubscribers_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Only play with subscribers' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            _networkCache_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Network cache size' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)()];
            _customIceServers_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Custom ICE servers',
                    type: [IceServerPropertiesDto],
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.ValidateNested)({ each: true }), (0, class_transformer_1.Type)(function () { return IceServerPropertiesDto; })];
            __esDecorate(null, null, _type_decorators, { kind: "field", name: "type", static: false, private: false, access: { has: function (obj) { return "type" in obj; }, get: function (obj) { return obj.type; }, set: function (obj, value) { obj.type = value; } }, metadata: _metadata }, _type_initializers, _type_extraInitializers);
            __esDecorate(null, null, _data_decorators, { kind: "field", name: "data", static: false, private: false, access: { has: function (obj) { return "data" in obj; }, get: function (obj) { return obj.data; }, set: function (obj, value) { obj.data = value; } }, metadata: _metadata }, _data_initializers, _data_extraInitializers);
            __esDecorate(null, null, _record_decorators, { kind: "field", name: "record", static: false, private: false, access: { has: function (obj) { return "record" in obj; }, get: function (obj) { return obj.record; }, set: function (obj, value) { obj.record = value; } }, metadata: _metadata }, _record_initializers, _record_extraInitializers);
            __esDecorate(null, null, _role_decorators, { kind: "field", name: "role", static: false, private: false, access: { has: function (obj) { return "role" in obj; }, get: function (obj) { return obj.role; }, set: function (obj, value) { obj.role = value; } }, metadata: _metadata }, _role_initializers, _role_extraInitializers);
            __esDecorate(null, null, _kurentoOptions_decorators, { kind: "field", name: "kurentoOptions", static: false, private: false, access: { has: function (obj) { return "kurentoOptions" in obj; }, get: function (obj) { return obj.kurentoOptions; }, set: function (obj, value) { obj.kurentoOptions = value; } }, metadata: _metadata }, _kurentoOptions_initializers, _kurentoOptions_extraInitializers);
            __esDecorate(null, null, _rtspUri_decorators, { kind: "field", name: "rtspUri", static: false, private: false, access: { has: function (obj) { return "rtspUri" in obj; }, get: function (obj) { return obj.rtspUri; }, set: function (obj, value) { obj.rtspUri = value; } }, metadata: _metadata }, _rtspUri_initializers, _rtspUri_extraInitializers);
            __esDecorate(null, null, _adaptativeBitrate_decorators, { kind: "field", name: "adaptativeBitrate", static: false, private: false, access: { has: function (obj) { return "adaptativeBitrate" in obj; }, get: function (obj) { return obj.adaptativeBitrate; }, set: function (obj, value) { obj.adaptativeBitrate = value; } }, metadata: _metadata }, _adaptativeBitrate_initializers, _adaptativeBitrate_extraInitializers);
            __esDecorate(null, null, _onlyPlayWithSubscribers_decorators, { kind: "field", name: "onlyPlayWithSubscribers", static: false, private: false, access: { has: function (obj) { return "onlyPlayWithSubscribers" in obj; }, get: function (obj) { return obj.onlyPlayWithSubscribers; }, set: function (obj, value) { obj.onlyPlayWithSubscribers = value; } }, metadata: _metadata }, _onlyPlayWithSubscribers_initializers, _onlyPlayWithSubscribers_extraInitializers);
            __esDecorate(null, null, _networkCache_decorators, { kind: "field", name: "networkCache", static: false, private: false, access: { has: function (obj) { return "networkCache" in obj; }, get: function (obj) { return obj.networkCache; }, set: function (obj, value) { obj.networkCache = value; } }, metadata: _metadata }, _networkCache_initializers, _networkCache_extraInitializers);
            __esDecorate(null, null, _customIceServers_decorators, { kind: "field", name: "customIceServers", static: false, private: false, access: { has: function (obj) { return "customIceServers" in obj; }, get: function (obj) { return obj.customIceServers; }, set: function (obj, value) { obj.customIceServers = value; } }, metadata: _metadata }, _customIceServers_initializers, _customIceServers_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.ConnectionPropertiesDto = ConnectionPropertiesDto;
