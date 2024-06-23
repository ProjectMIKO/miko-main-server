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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppGateway = exports.AppService = void 0;
var common_1 = require("@nestjs/common");
var websockets_1 = require("@nestjs/websockets");
var admin_ui_1 = require("@socket.io/admin-ui");
var webSocketExceptions_filter_1 = require("@global/filter/webSocketExceptions.filter");
var invalid_middleware_exception_1 = require("@nestjs/core/errors/exceptions/invalid-middleware.exception");
var invalidResponse_exception_1 = require("@global/exception/invalidResponse.exception");
var findNotFound_exception_1 = require("@global/exception/findNotFound.exception");
var AppService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AppService = _classThis = /** @class */ (function () {
        function AppService_1() {
        }
        AppService_1.prototype.getHello = function () {
            return 'Hello MIKO!';
        };
        return AppService_1;
    }());
    __setFunctionName(_classThis, "AppService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AppService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AppService = _classThis;
}();
exports.AppService = AppService;
var AppGateway = function () {
    var _classDecorators = [(0, websockets_1.WebSocketGateway)({
            cors: {
                origin: [
                    'https://admin.socket.io',
                    'https://miko-frontend-i3vt.vercel.app',
                    'http://localhost:3000',
                ],
                methods: ['GET', 'POST'],
                credentials: true,
            },
        }), (0, common_1.UseFilters)(new webSocketExceptions_filter_1.WebSocketExceptionsFilter())];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _server_decorators;
    var _server_initializers = [];
    var _server_extraInitializers = [];
    var _handleDisconnecting_decorators;
    var _handleEnterRoom_decorators;
    var _handleMessage_decorators;
    var _handleRecord_decorators;
    var _handleSummarize_decorators;
    var _handleNode_decorators;
    var _handleEdge_decorators;
    var AppGateway = _classThis = /** @class */ (function () {
        function AppGateway_1(meetingService, middlewareService, conversationService, nodeService, edgeService) {
            this.meetingService = (__runInitializers(this, _instanceExtraInitializers), meetingService);
            this.middlewareService = middlewareService;
            this.conversationService = conversationService;
            this.nodeService = nodeService;
            this.edgeService = edgeService;
            this.roomConversations = {};
            this.server = __runInitializers(this, _server_initializers, void 0);
            __runInitializers(this, _server_extraInitializers);
            this.meetingService = meetingService;
            this.middlewareService = middlewareService;
            this.conversationService = conversationService;
            this.nodeService = nodeService;
            this.edgeService = edgeService;
        }
        AppGateway_1.prototype.afterInit = function () {
            (0, admin_ui_1.instrument)(this.server, {
                // Todo: 인증
                auth: false,
            });
        };
        AppGateway_1.prototype.handleConnection = function (socket, username) {
            socket['nickname'] = username;
        };
        AppGateway_1.prototype.handleDisconnecting = function (client, reason) {
            var _this = this;
            client.rooms.forEach(function (room) {
                return client
                    .to(room)
                    .emit('exit', client['nickname'], _this.countMember(room) - 1);
            });
        };
        AppGateway_1.prototype.handleDisconnect = function (client) {
            // Todo: 유저 접속 종료시 로직 추가
        };
        AppGateway_1.prototype.handleEnterRoom = function (client, room) {
            var isNewRoom = !this.rooms().includes(room);
            client.join(room);
            client.emit('entered_room');
            if (isNewRoom) {
                // 최초 룸 개설 시 수행할 로직
                var meetingCreateDto = {
                    title: "Room: ".concat(room),
                    owner: client.id,
                };
                this.meetingService.createNewMeeting(meetingCreateDto).catch(function (error) {
                    throw new invalidResponse_exception_1.InvalidResponseException('CreateNewMeeting');
                });
                // Room 추가
                this.roomConversations[room] = {};
            }
            client.to(room).emit('welcome', client['nickname'], this.countMember(room));
        };
        AppGateway_1.prototype.handleMessage = function (client, _a) {
            var room = _a[0], msg = _a[1], done = _a[2];
            client.to(room).emit('message', "".concat(client['nickname'], ": ").concat(msg));
            done();
        };
        AppGateway_1.prototype.handleRecord = function (client_1, _a) {
            return __awaiter(this, arguments, void 0, function (client, _b) {
                var currentTime, buffer, newFile, convertResponseDto, conversationCreateDto;
                var _this = this;
                var room = _b[0], file = _b[1];
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            if (!file)
                                throw new findNotFound_exception_1.FileNotFoundException();
                            currentTime = new Date();
                            buffer = Buffer.from(new Uint8Array(file));
                            newFile = {
                                buffer: buffer,
                                originalname: 'temp.wav',
                                mimetype: 'audio/wav',
                                filename: 'temp.wav',
                                size: buffer.length,
                            };
                            return [4 /*yield*/, this.middlewareService.convertStt(newFile)];
                        case 1:
                            convertResponseDto = _c.sent();
                            if (convertResponseDto.script === '')
                                throw new invalid_middleware_exception_1.InvalidMiddlewareException('ConvertStt');
                            client.emit('script', "".concat(client.id, ": ").concat(convertResponseDto.script));
                            client
                                .to(room)
                                .emit('script', "".concat(client.id, ": ").concat(convertResponseDto.script));
                            conversationCreateDto = {
                                user: client.id,
                                content: convertResponseDto.script,
                                timestamp: currentTime,
                            };
                            console.log('user: ' + client.id);
                            console.log('content: ' + convertResponseDto.script);
                            console.log('timestamp: ' + currentTime);
                            this.conversationService
                                .createNewConversation(conversationCreateDto)
                                .then(function (contentId) {
                                _this.roomConversations[room][contentId] = [conversationCreateDto];
                                // 전체 Room Conversation 출력
                                console.log("Room: ".concat(room));
                                for (var contentId_1 in _this.roomConversations[room]) {
                                    console.log("  Content ID: ".concat(contentId_1));
                                    for (var _i = 0, _a = _this.roomConversations[room][contentId_1]; _i < _a.length; _i++) {
                                        var message = _a[_i];
                                        console.log("    User: ".concat(message.user, ", Content: ").concat(message.content, ", Timestamp: ").concat(message.timestamp));
                                    }
                                }
                            })
                                .catch(function (error) {
                                throw new invalidResponse_exception_1.InvalidResponseException('CreateNewConversation');
                            });
                            return [2 /*return*/];
                    }
                });
            });
        };
        AppGateway_1.prototype.handleSummarize = function (client, room) {
            var _this = this;
            var summarizeRequestDto = {
                conversations: this.roomConversations[room],
            };
            console.log("Room: ".concat(room));
            for (var contentId in this.roomConversations[room]) {
                console.log("Content ID: ".concat(contentId));
                for (var _i = 0, _a = this.roomConversations[room][contentId]; _i < _a.length; _i++) {
                    var message = _a[_i];
                    console.log("User: ".concat(message.user, ", Content: ").concat(message.content, ", Timestamp: ").concat(message.timestamp));
                }
            }
            this.middlewareService
                .summarizeScript(summarizeRequestDto)
                .catch(function (error) {
                throw new invalid_middleware_exception_1.InvalidMiddlewareException('SummarizeScript');
            })
                .then(function (summarizeResponseDto) {
                client.emit('summarize', "".concat(client.id, ": ").concat(summarizeResponseDto));
                client
                    .to(room)
                    .emit('summarize', "".concat(client.id, ": ").concat(summarizeResponseDto));
                _this.handleNode(client, [
                    room,
                    summarizeRequestDto,
                    summarizeResponseDto,
                ]);
            });
        };
        AppGateway_1.prototype.handleNode = function (client, _a) {
            var room = _a[0], summarizeRequestDto = _a[1], summarizeResponseDto = _a[2];
            var nodeCreateDto = {
                keyword: summarizeResponseDto.keyword,
                summary: summarizeResponseDto.subtitle,
                conversationIds: [this.roomConversations[room].toString()],
            };
            this.nodeService.createNewNode(nodeCreateDto).then(function (r) { });
            client.emit('Node', nodeCreateDto);
            client.to(room).emit('Node', nodeCreateDto);
        };
        AppGateway_1.prototype.handleEdge = function (client, _a) {
            var room = _a[0], edge = _a[1], done = _a[2];
            client.to(room).emit('Edge', edge);
            done();
        };
        AppGateway_1.prototype.rooms = function () {
            if (!this.server || !this.server.sockets || !this.server.sockets.adapter)
                return [];
            var _a = this.server.sockets.adapter, sids = _a.sids, rooms = _a.rooms;
            var publicRooms = [];
            rooms.forEach(function (_, key) {
                if (!sids.has(key)) {
                    publicRooms.push(key);
                }
            });
            return publicRooms;
        };
        AppGateway_1.prototype.countMember = function (room) {
            var _a, _b;
            return (_b = (_a = this.server.sockets.adapter.rooms.get(room)) === null || _a === void 0 ? void 0 : _a.size) !== null && _b !== void 0 ? _b : 0;
        };
        return AppGateway_1;
    }());
    __setFunctionName(_classThis, "AppGateway");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _server_decorators = [(0, websockets_1.WebSocketServer)()];
        _handleDisconnecting_decorators = [(0, websockets_1.SubscribeMessage)('disconnecting')];
        _handleEnterRoom_decorators = [(0, websockets_1.SubscribeMessage)('enter_room')];
        _handleMessage_decorators = [(0, websockets_1.SubscribeMessage)('message')];
        _handleRecord_decorators = [(0, websockets_1.SubscribeMessage)('stt')];
        _handleSummarize_decorators = [(0, websockets_1.SubscribeMessage)('summarize')];
        _handleNode_decorators = [(0, websockets_1.SubscribeMessage)('Node')];
        _handleEdge_decorators = [(0, websockets_1.SubscribeMessage)('Edge')];
        __esDecorate(_classThis, null, _handleDisconnecting_decorators, { kind: "method", name: "handleDisconnecting", static: false, private: false, access: { has: function (obj) { return "handleDisconnecting" in obj; }, get: function (obj) { return obj.handleDisconnecting; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleEnterRoom_decorators, { kind: "method", name: "handleEnterRoom", static: false, private: false, access: { has: function (obj) { return "handleEnterRoom" in obj; }, get: function (obj) { return obj.handleEnterRoom; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleMessage_decorators, { kind: "method", name: "handleMessage", static: false, private: false, access: { has: function (obj) { return "handleMessage" in obj; }, get: function (obj) { return obj.handleMessage; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleRecord_decorators, { kind: "method", name: "handleRecord", static: false, private: false, access: { has: function (obj) { return "handleRecord" in obj; }, get: function (obj) { return obj.handleRecord; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleSummarize_decorators, { kind: "method", name: "handleSummarize", static: false, private: false, access: { has: function (obj) { return "handleSummarize" in obj; }, get: function (obj) { return obj.handleSummarize; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleNode_decorators, { kind: "method", name: "handleNode", static: false, private: false, access: { has: function (obj) { return "handleNode" in obj; }, get: function (obj) { return obj.handleNode; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleEdge_decorators, { kind: "method", name: "handleEdge", static: false, private: false, access: { has: function (obj) { return "handleEdge" in obj; }, get: function (obj) { return obj.handleEdge; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _server_decorators, { kind: "field", name: "server", static: false, private: false, access: { has: function (obj) { return "server" in obj; }, get: function (obj) { return obj.server; }, set: function (obj, value) { obj.server = value; } }, metadata: _metadata }, _server_initializers, _server_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AppGateway = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AppGateway = _classThis;
}();
exports.AppGateway = AppGateway;
