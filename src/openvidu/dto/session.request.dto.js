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
exports.SessionPropertiesDto = void 0;
var class_validator_1 = require("class-validator");
var class_transformer_1 = require("class-transformer");
var swagger_1 = require("@nestjs/swagger");
var MediaMode;
(function (MediaMode) {
    MediaMode["RELAYED"] = "RELAYED";
    MediaMode["ROUTED"] = "ROUTED";
})(MediaMode || (MediaMode = {}));
var RecordingMode;
(function (RecordingMode) {
    RecordingMode["ALWAYS"] = "ALWAYS";
    RecordingMode["MANUAL"] = "MANUAL";
})(RecordingMode || (RecordingMode = {}));
var OutputMode;
(function (OutputMode) {
    OutputMode["COMPOSED"] = "COMPOSED";
    OutputMode["COMPOSED_QUICK_START"] = "COMPOSED_QUICK_START";
    OutputMode["INDIVIDUAL"] = "INDIVIDUAL";
})(OutputMode || (OutputMode = {}));
var RecordingLayout;
(function (RecordingLayout) {
    RecordingLayout["BEST_FIT"] = "BEST_FIT";
    RecordingLayout["PICTURE_IN_PICTURE"] = "PICTURE_IN_PICTURE";
    RecordingLayout["VERTICAL_PRESENTATION"] = "VERTICAL_PRESENTATION";
    RecordingLayout["HORIZONTAL_PRESENTATION"] = "VERTICAL_PRESENTATION";
    RecordingLayout["CUSTOM"] = "CUSTOM";
})(RecordingLayout || (RecordingLayout = {}));
var VideoCodec;
(function (VideoCodec) {
    VideoCodec["MEDIA_SERVER_PREFERRED"] = "MEDIA_SERVER_PREFERRED";
    VideoCodec["NONE"] = "NONE";
    VideoCodec["VP8"] = "VP8";
    VideoCodec["VP9"] = "VP9";
    VideoCodec["H264"] = "H264";
})(VideoCodec || (VideoCodec = {}));
var MediaNodeDto = function () {
    var _a;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    return _a = /** @class */ (function () {
            function MediaNodeDto() {
                this.id = __runInitializers(this, _id_initializers, void 0);
                __runInitializers(this, _id_extraInitializers);
            }
            return MediaNodeDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _id_decorators = [(0, swagger_1.ApiProperty)({ description: 'ID of the media node' }), (0, class_validator_1.IsString)()];
            __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
var RecordingPropertiesDto = function () {
    var _a;
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _hasAudio_decorators;
    var _hasAudio_initializers = [];
    var _hasAudio_extraInitializers = [];
    var _hasVideo_decorators;
    var _hasVideo_initializers = [];
    var _hasVideo_extraInitializers = [];
    var _outputMode_decorators;
    var _outputMode_initializers = [];
    var _outputMode_extraInitializers = [];
    var _recordingLayout_decorators;
    var _recordingLayout_initializers = [];
    var _recordingLayout_extraInitializers = [];
    var _resolution_decorators;
    var _resolution_initializers = [];
    var _resolution_extraInitializers = [];
    var _frameRate_decorators;
    var _frameRate_initializers = [];
    var _frameRate_extraInitializers = [];
    var _shmSize_decorators;
    var _shmSize_initializers = [];
    var _shmSize_extraInitializers = [];
    var _mediaNode_decorators;
    var _mediaNode_initializers = [];
    var _mediaNode_extraInitializers = [];
    return _a = /** @class */ (function () {
            function RecordingPropertiesDto() {
                this.name = __runInitializers(this, _name_initializers, void 0);
                this.hasAudio = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _hasAudio_initializers, void 0));
                this.hasVideo = (__runInitializers(this, _hasAudio_extraInitializers), __runInitializers(this, _hasVideo_initializers, void 0));
                this.outputMode = (__runInitializers(this, _hasVideo_extraInitializers), __runInitializers(this, _outputMode_initializers, void 0));
                this.recordingLayout = (__runInitializers(this, _outputMode_extraInitializers), __runInitializers(this, _recordingLayout_initializers, void 0));
                this.resolution = (__runInitializers(this, _recordingLayout_extraInitializers), __runInitializers(this, _resolution_initializers, void 0));
                this.frameRate = (__runInitializers(this, _resolution_extraInitializers), __runInitializers(this, _frameRate_initializers, void 0));
                this.shmSize = (__runInitializers(this, _frameRate_extraInitializers), __runInitializers(this, _shmSize_initializers, void 0));
                this.mediaNode = (__runInitializers(this, _shmSize_extraInitializers), __runInitializers(this, _mediaNode_initializers, void 0));
                __runInitializers(this, _mediaNode_extraInitializers);
            }
            return RecordingPropertiesDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _name_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Name of the recording' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _hasAudio_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Indicates if the recording has audio' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            _hasVideo_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Indicates if the recording has video' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            _outputMode_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Output mode of the recording',
                    enum: OutputMode,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(OutputMode)];
            _recordingLayout_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Layout of the recording',
                    enum: RecordingLayout,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(RecordingLayout)];
            _resolution_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Resolution of the recording' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _frameRate_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Frame rate of the recording' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)()];
            _shmSize_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Shared memory size of the recording' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)()];
            _mediaNode_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Media node for the recording',
                    type: MediaNodeDto,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.ValidateNested)(), (0, class_transformer_1.Type)(function () { return MediaNodeDto; })];
            __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
            __esDecorate(null, null, _hasAudio_decorators, { kind: "field", name: "hasAudio", static: false, private: false, access: { has: function (obj) { return "hasAudio" in obj; }, get: function (obj) { return obj.hasAudio; }, set: function (obj, value) { obj.hasAudio = value; } }, metadata: _metadata }, _hasAudio_initializers, _hasAudio_extraInitializers);
            __esDecorate(null, null, _hasVideo_decorators, { kind: "field", name: "hasVideo", static: false, private: false, access: { has: function (obj) { return "hasVideo" in obj; }, get: function (obj) { return obj.hasVideo; }, set: function (obj, value) { obj.hasVideo = value; } }, metadata: _metadata }, _hasVideo_initializers, _hasVideo_extraInitializers);
            __esDecorate(null, null, _outputMode_decorators, { kind: "field", name: "outputMode", static: false, private: false, access: { has: function (obj) { return "outputMode" in obj; }, get: function (obj) { return obj.outputMode; }, set: function (obj, value) { obj.outputMode = value; } }, metadata: _metadata }, _outputMode_initializers, _outputMode_extraInitializers);
            __esDecorate(null, null, _recordingLayout_decorators, { kind: "field", name: "recordingLayout", static: false, private: false, access: { has: function (obj) { return "recordingLayout" in obj; }, get: function (obj) { return obj.recordingLayout; }, set: function (obj, value) { obj.recordingLayout = value; } }, metadata: _metadata }, _recordingLayout_initializers, _recordingLayout_extraInitializers);
            __esDecorate(null, null, _resolution_decorators, { kind: "field", name: "resolution", static: false, private: false, access: { has: function (obj) { return "resolution" in obj; }, get: function (obj) { return obj.resolution; }, set: function (obj, value) { obj.resolution = value; } }, metadata: _metadata }, _resolution_initializers, _resolution_extraInitializers);
            __esDecorate(null, null, _frameRate_decorators, { kind: "field", name: "frameRate", static: false, private: false, access: { has: function (obj) { return "frameRate" in obj; }, get: function (obj) { return obj.frameRate; }, set: function (obj, value) { obj.frameRate = value; } }, metadata: _metadata }, _frameRate_initializers, _frameRate_extraInitializers);
            __esDecorate(null, null, _shmSize_decorators, { kind: "field", name: "shmSize", static: false, private: false, access: { has: function (obj) { return "shmSize" in obj; }, get: function (obj) { return obj.shmSize; }, set: function (obj, value) { obj.shmSize = value; } }, metadata: _metadata }, _shmSize_initializers, _shmSize_extraInitializers);
            __esDecorate(null, null, _mediaNode_decorators, { kind: "field", name: "mediaNode", static: false, private: false, access: { has: function (obj) { return "mediaNode" in obj; }, get: function (obj) { return obj.mediaNode; }, set: function (obj, value) { obj.mediaNode = value; } }, metadata: _metadata }, _mediaNode_initializers, _mediaNode_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
var SessionPropertiesDto = function () {
    var _a;
    var _mediaMode_decorators;
    var _mediaMode_initializers = [];
    var _mediaMode_extraInitializers = [];
    var _recordingMode_decorators;
    var _recordingMode_initializers = [];
    var _recordingMode_extraInitializers = [];
    var _customSessionId_decorators;
    var _customSessionId_initializers = [];
    var _customSessionId_extraInitializers = [];
    var _forcedVideoCodec_decorators;
    var _forcedVideoCodec_initializers = [];
    var _forcedVideoCodec_extraInitializers = [];
    var _allowTranscoding_decorators;
    var _allowTranscoding_initializers = [];
    var _allowTranscoding_extraInitializers = [];
    var _defaultRecordingProperties_decorators;
    var _defaultRecordingProperties_initializers = [];
    var _defaultRecordingProperties_extraInitializers = [];
    var _mediaNode_decorators;
    var _mediaNode_initializers = [];
    var _mediaNode_extraInitializers = [];
    return _a = /** @class */ (function () {
            function SessionPropertiesDto() {
                this.mediaMode = __runInitializers(this, _mediaMode_initializers, void 0);
                this.recordingMode = (__runInitializers(this, _mediaMode_extraInitializers), __runInitializers(this, _recordingMode_initializers, void 0));
                this.customSessionId = (__runInitializers(this, _recordingMode_extraInitializers), __runInitializers(this, _customSessionId_initializers, void 0));
                this.forcedVideoCodec = (__runInitializers(this, _customSessionId_extraInitializers), __runInitializers(this, _forcedVideoCodec_initializers, void 0));
                this.allowTranscoding = (__runInitializers(this, _forcedVideoCodec_extraInitializers), __runInitializers(this, _allowTranscoding_initializers, void 0));
                this.defaultRecordingProperties = (__runInitializers(this, _allowTranscoding_extraInitializers), __runInitializers(this, _defaultRecordingProperties_initializers, void 0));
                this.mediaNode = (__runInitializers(this, _defaultRecordingProperties_extraInitializers), __runInitializers(this, _mediaNode_initializers, void 0));
                __runInitializers(this, _mediaNode_extraInitializers);
            }
            return SessionPropertiesDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _mediaMode_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Media mode of the session',
                    enum: MediaMode,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(MediaMode)];
            _recordingMode_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Recording mode of the session',
                    enum: RecordingMode,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(RecordingMode)];
            _customSessionId_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Custom session ID' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _forcedVideoCodec_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Forced video codec for the session',
                    enum: VideoCodec,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(VideoCodec)];
            _allowTranscoding_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Indicates if transcoding is allowed' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            _defaultRecordingProperties_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Default recording properties',
                    type: RecordingPropertiesDto,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.ValidateNested)(), (0, class_transformer_1.Type)(function () { return RecordingPropertiesDto; })];
            _mediaNode_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Media node for the session',
                    type: MediaNodeDto,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.ValidateNested)(), (0, class_transformer_1.Type)(function () { return MediaNodeDto; })];
            __esDecorate(null, null, _mediaMode_decorators, { kind: "field", name: "mediaMode", static: false, private: false, access: { has: function (obj) { return "mediaMode" in obj; }, get: function (obj) { return obj.mediaMode; }, set: function (obj, value) { obj.mediaMode = value; } }, metadata: _metadata }, _mediaMode_initializers, _mediaMode_extraInitializers);
            __esDecorate(null, null, _recordingMode_decorators, { kind: "field", name: "recordingMode", static: false, private: false, access: { has: function (obj) { return "recordingMode" in obj; }, get: function (obj) { return obj.recordingMode; }, set: function (obj, value) { obj.recordingMode = value; } }, metadata: _metadata }, _recordingMode_initializers, _recordingMode_extraInitializers);
            __esDecorate(null, null, _customSessionId_decorators, { kind: "field", name: "customSessionId", static: false, private: false, access: { has: function (obj) { return "customSessionId" in obj; }, get: function (obj) { return obj.customSessionId; }, set: function (obj, value) { obj.customSessionId = value; } }, metadata: _metadata }, _customSessionId_initializers, _customSessionId_extraInitializers);
            __esDecorate(null, null, _forcedVideoCodec_decorators, { kind: "field", name: "forcedVideoCodec", static: false, private: false, access: { has: function (obj) { return "forcedVideoCodec" in obj; }, get: function (obj) { return obj.forcedVideoCodec; }, set: function (obj, value) { obj.forcedVideoCodec = value; } }, metadata: _metadata }, _forcedVideoCodec_initializers, _forcedVideoCodec_extraInitializers);
            __esDecorate(null, null, _allowTranscoding_decorators, { kind: "field", name: "allowTranscoding", static: false, private: false, access: { has: function (obj) { return "allowTranscoding" in obj; }, get: function (obj) { return obj.allowTranscoding; }, set: function (obj, value) { obj.allowTranscoding = value; } }, metadata: _metadata }, _allowTranscoding_initializers, _allowTranscoding_extraInitializers);
            __esDecorate(null, null, _defaultRecordingProperties_decorators, { kind: "field", name: "defaultRecordingProperties", static: false, private: false, access: { has: function (obj) { return "defaultRecordingProperties" in obj; }, get: function (obj) { return obj.defaultRecordingProperties; }, set: function (obj, value) { obj.defaultRecordingProperties = value; } }, metadata: _metadata }, _defaultRecordingProperties_initializers, _defaultRecordingProperties_extraInitializers);
            __esDecorate(null, null, _mediaNode_decorators, { kind: "field", name: "mediaNode", static: false, private: false, access: { has: function (obj) { return "mediaNode" in obj; }, get: function (obj) { return obj.mediaNode; }, set: function (obj, value) { obj.mediaNode = value; } }, metadata: _metadata }, _mediaNode_initializers, _mediaNode_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.SessionPropertiesDto = SessionPropertiesDto;
