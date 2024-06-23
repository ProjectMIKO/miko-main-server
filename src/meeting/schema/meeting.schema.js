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
exports.MeetingSchema = exports.Meeting = void 0;
var mongoose_1 = require("@nestjs/mongoose");
var mongoose_2 = require("mongoose");
var conversation_schema_1 = require("@schema/conversation.schema");
var node_schema_1 = require("@schema/node.schema");
var edge_schema_1 = require("@schema/edge.schema");
var Meeting = function () {
    var _classDecorators = [(0, mongoose_1.Schema)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _title_decorators;
    var _title_initializers = [];
    var _title_extraInitializers = [];
    var _owner_decorators;
    var _owner_initializers = [];
    var _owner_extraInitializers = [];
    var _startTime_decorators;
    var _startTime_initializers = [];
    var _startTime_extraInitializers = [];
    var _endTime_decorators;
    var _endTime_initializers = [];
    var _endTime_extraInitializers = [];
    var _conversations_decorators;
    var _conversations_initializers = [];
    var _conversations_extraInitializers = [];
    var _nodes_decorators;
    var _nodes_initializers = [];
    var _nodes_extraInitializers = [];
    var _edges_decorators;
    var _edges_initializers = [];
    var _edges_extraInitializers = [];
    var Meeting = _classThis = /** @class */ (function () {
        function Meeting_1() {
            this.title = __runInitializers(this, _title_initializers, void 0);
            this.owner = (__runInitializers(this, _title_extraInitializers), __runInitializers(this, _owner_initializers, void 0));
            this.startTime = (__runInitializers(this, _owner_extraInitializers), __runInitializers(this, _startTime_initializers, void 0));
            this.endTime = (__runInitializers(this, _startTime_extraInitializers), __runInitializers(this, _endTime_initializers, void 0));
            this.conversations = (__runInitializers(this, _endTime_extraInitializers), __runInitializers(this, _conversations_initializers, void 0));
            this.nodes = (__runInitializers(this, _conversations_extraInitializers), __runInitializers(this, _nodes_initializers, void 0));
            this.edges = (__runInitializers(this, _nodes_extraInitializers), __runInitializers(this, _edges_initializers, void 0));
            __runInitializers(this, _edges_extraInitializers);
        }
        return Meeting_1;
    }());
    __setFunctionName(_classThis, "Meeting");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _title_decorators = [(0, mongoose_1.Prop)({ required: true })];
        _owner_decorators = [(0, mongoose_1.Prop)({ required: true, type: mongoose_2.Types.ObjectId, ref: 'User' })];
        _startTime_decorators = [(0, mongoose_1.Prop)({ required: true })];
        _endTime_decorators = [(0, mongoose_1.Prop)()];
        _conversations_decorators = [(0, mongoose_1.Prop)({ type: [conversation_schema_1.ConversationSchema], default: [] })];
        _nodes_decorators = [(0, mongoose_1.Prop)({ type: [node_schema_1.NodeSchema], default: [] })];
        _edges_decorators = [(0, mongoose_1.Prop)({ type: [edge_schema_1.EdgeSchema], default: [] })];
        __esDecorate(null, null, _title_decorators, { kind: "field", name: "title", static: false, private: false, access: { has: function (obj) { return "title" in obj; }, get: function (obj) { return obj.title; }, set: function (obj, value) { obj.title = value; } }, metadata: _metadata }, _title_initializers, _title_extraInitializers);
        __esDecorate(null, null, _owner_decorators, { kind: "field", name: "owner", static: false, private: false, access: { has: function (obj) { return "owner" in obj; }, get: function (obj) { return obj.owner; }, set: function (obj, value) { obj.owner = value; } }, metadata: _metadata }, _owner_initializers, _owner_extraInitializers);
        __esDecorate(null, null, _startTime_decorators, { kind: "field", name: "startTime", static: false, private: false, access: { has: function (obj) { return "startTime" in obj; }, get: function (obj) { return obj.startTime; }, set: function (obj, value) { obj.startTime = value; } }, metadata: _metadata }, _startTime_initializers, _startTime_extraInitializers);
        __esDecorate(null, null, _endTime_decorators, { kind: "field", name: "endTime", static: false, private: false, access: { has: function (obj) { return "endTime" in obj; }, get: function (obj) { return obj.endTime; }, set: function (obj, value) { obj.endTime = value; } }, metadata: _metadata }, _endTime_initializers, _endTime_extraInitializers);
        __esDecorate(null, null, _conversations_decorators, { kind: "field", name: "conversations", static: false, private: false, access: { has: function (obj) { return "conversations" in obj; }, get: function (obj) { return obj.conversations; }, set: function (obj, value) { obj.conversations = value; } }, metadata: _metadata }, _conversations_initializers, _conversations_extraInitializers);
        __esDecorate(null, null, _nodes_decorators, { kind: "field", name: "nodes", static: false, private: false, access: { has: function (obj) { return "nodes" in obj; }, get: function (obj) { return obj.nodes; }, set: function (obj, value) { obj.nodes = value; } }, metadata: _metadata }, _nodes_initializers, _nodes_extraInitializers);
        __esDecorate(null, null, _edges_decorators, { kind: "field", name: "edges", static: false, private: false, access: { has: function (obj) { return "edges" in obj; }, get: function (obj) { return obj.edges; }, set: function (obj, value) { obj.edges = value; } }, metadata: _metadata }, _edges_initializers, _edges_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Meeting = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Meeting = _classThis;
}();
exports.Meeting = Meeting;
exports.MeetingSchema = mongoose_1.SchemaFactory.createForClass(Meeting);
