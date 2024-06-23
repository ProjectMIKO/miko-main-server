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
exports.PublisherResponseDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var PublisherResponseDto = function () {
    var _a;
    var _streamId_decorators;
    var _streamId_initializers = [];
    var _streamId_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var _hasAudio_decorators;
    var _hasAudio_initializers = [];
    var _hasAudio_extraInitializers = [];
    var _hasVideo_decorators;
    var _hasVideo_initializers = [];
    var _hasVideo_extraInitializers = [];
    var _audioActive_decorators;
    var _audioActive_initializers = [];
    var _audioActive_extraInitializers = [];
    var _videoActive_decorators;
    var _videoActive_initializers = [];
    var _videoActive_extraInitializers = [];
    var _frameRate_decorators;
    var _frameRate_initializers = [];
    var _frameRate_extraInitializers = [];
    var _typeOfVideo_decorators;
    var _typeOfVideo_initializers = [];
    var _typeOfVideo_extraInitializers = [];
    var _videoDimensions_decorators;
    var _videoDimensions_initializers = [];
    var _videoDimensions_extraInitializers = [];
    return _a = /** @class */ (function () {
            function PublisherResponseDto() {
                this.streamId = __runInitializers(this, _streamId_initializers, void 0);
                this.createdAt = (__runInitializers(this, _streamId_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
                this.hasAudio = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _hasAudio_initializers, void 0));
                this.hasVideo = (__runInitializers(this, _hasAudio_extraInitializers), __runInitializers(this, _hasVideo_initializers, void 0));
                this.audioActive = (__runInitializers(this, _hasVideo_extraInitializers), __runInitializers(this, _audioActive_initializers, void 0));
                this.videoActive = (__runInitializers(this, _audioActive_extraInitializers), __runInitializers(this, _videoActive_initializers, void 0));
                this.frameRate = (__runInitializers(this, _videoActive_extraInitializers), __runInitializers(this, _frameRate_initializers, void 0));
                this.typeOfVideo = (__runInitializers(this, _frameRate_extraInitializers), __runInitializers(this, _typeOfVideo_initializers, void 0));
                this.videoDimensions = (__runInitializers(this, _typeOfVideo_extraInitializers), __runInitializers(this, _videoDimensions_initializers, void 0));
                __runInitializers(this, _videoDimensions_extraInitializers);
            }
            return PublisherResponseDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _streamId_decorators = [(0, swagger_1.ApiProperty)({ description: 'ID of the stream' }), (0, class_validator_1.IsString)()];
            _createdAt_decorators = [(0, swagger_1.ApiProperty)({ description: 'Timestamp when the stream was created' }), (0, class_validator_1.IsNumber)()];
            _hasAudio_decorators = [(0, swagger_1.ApiProperty)({ description: 'Indicates if the stream has audio' }), (0, class_validator_1.IsBoolean)()];
            _hasVideo_decorators = [(0, swagger_1.ApiProperty)({ description: 'Indicates if the stream has video' }), (0, class_validator_1.IsBoolean)()];
            _audioActive_decorators = [(0, swagger_1.ApiProperty)({ description: 'Indicates if the audio is active' }), (0, class_validator_1.IsBoolean)()];
            _videoActive_decorators = [(0, swagger_1.ApiProperty)({ description: 'Indicates if the video is active' }), (0, class_validator_1.IsBoolean)()];
            _frameRate_decorators = [(0, swagger_1.ApiProperty)({ description: 'Frame rate of the video' }), (0, class_validator_1.IsNumber)()];
            _typeOfVideo_decorators = [(0, swagger_1.ApiProperty)({ description: 'Type of video' }), (0, class_validator_1.IsString)()];
            _videoDimensions_decorators = [(0, swagger_1.ApiProperty)({ description: 'Dimensions of the video' }), (0, class_validator_1.IsString)()];
            __esDecorate(null, null, _streamId_decorators, { kind: "field", name: "streamId", static: false, private: false, access: { has: function (obj) { return "streamId" in obj; }, get: function (obj) { return obj.streamId; }, set: function (obj, value) { obj.streamId = value; } }, metadata: _metadata }, _streamId_initializers, _streamId_extraInitializers);
            __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
            __esDecorate(null, null, _hasAudio_decorators, { kind: "field", name: "hasAudio", static: false, private: false, access: { has: function (obj) { return "hasAudio" in obj; }, get: function (obj) { return obj.hasAudio; }, set: function (obj, value) { obj.hasAudio = value; } }, metadata: _metadata }, _hasAudio_initializers, _hasAudio_extraInitializers);
            __esDecorate(null, null, _hasVideo_decorators, { kind: "field", name: "hasVideo", static: false, private: false, access: { has: function (obj) { return "hasVideo" in obj; }, get: function (obj) { return obj.hasVideo; }, set: function (obj, value) { obj.hasVideo = value; } }, metadata: _metadata }, _hasVideo_initializers, _hasVideo_extraInitializers);
            __esDecorate(null, null, _audioActive_decorators, { kind: "field", name: "audioActive", static: false, private: false, access: { has: function (obj) { return "audioActive" in obj; }, get: function (obj) { return obj.audioActive; }, set: function (obj, value) { obj.audioActive = value; } }, metadata: _metadata }, _audioActive_initializers, _audioActive_extraInitializers);
            __esDecorate(null, null, _videoActive_decorators, { kind: "field", name: "videoActive", static: false, private: false, access: { has: function (obj) { return "videoActive" in obj; }, get: function (obj) { return obj.videoActive; }, set: function (obj, value) { obj.videoActive = value; } }, metadata: _metadata }, _videoActive_initializers, _videoActive_extraInitializers);
            __esDecorate(null, null, _frameRate_decorators, { kind: "field", name: "frameRate", static: false, private: false, access: { has: function (obj) { return "frameRate" in obj; }, get: function (obj) { return obj.frameRate; }, set: function (obj, value) { obj.frameRate = value; } }, metadata: _metadata }, _frameRate_initializers, _frameRate_extraInitializers);
            __esDecorate(null, null, _typeOfVideo_decorators, { kind: "field", name: "typeOfVideo", static: false, private: false, access: { has: function (obj) { return "typeOfVideo" in obj; }, get: function (obj) { return obj.typeOfVideo; }, set: function (obj, value) { obj.typeOfVideo = value; } }, metadata: _metadata }, _typeOfVideo_initializers, _typeOfVideo_extraInitializers);
            __esDecorate(null, null, _videoDimensions_decorators, { kind: "field", name: "videoDimensions", static: false, private: false, access: { has: function (obj) { return "videoDimensions" in obj; }, get: function (obj) { return obj.videoDimensions; }, set: function (obj, value) { obj.videoDimensions = value; } }, metadata: _metadata }, _videoDimensions_initializers, _videoDimensions_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.PublisherResponseDto = PublisherResponseDto;
