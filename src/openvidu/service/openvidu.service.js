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
exports.OpenviduService = void 0;
var common_1 = require("@nestjs/common");
var openvidu_node_client_1 = require("openvidu-node-client");
var session_response_dto_1 = require("@dto/session.response.dto");
var connection_response_dto_1 = require("@dto/connection.response.dto");
var class_transformer_1 = require("class-transformer");
var OpenviduService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var OpenviduService = _classThis = /** @class */ (function () {
        function OpenviduService_1(configService) {
            this.configService = configService;
        }
        OpenviduService_1.prototype.onModuleInit = function () {
            var OPENVIDU_URL = this.configService.get('OPENVIDU_URL', 'http://localhost:4443');
            var OPENVIDU_SECRET = this.configService.get('OPENVIDU_SECRET', 'MY_SECRET');
            this.openvidu = new openvidu_node_client_1.OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
        };
        OpenviduService_1.prototype.createSession = function (properties) {
            return __awaiter(this, void 0, void 0, function () {
                var session;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.openvidu.createSession(properties)];
                        case 1:
                            session = _a.sent();
                            return [2 /*return*/, this.toSessionResponseDto(session)];
                    }
                });
            });
        };
        OpenviduService_1.prototype.toSessionResponseDto = function (session) {
            var _this = this;
            var sessionId = session.sessionId, createdAt = session.createdAt, connections = session.connections, activeConnections = session.activeConnections, recording = session.recording, broadcasting = session.broadcasting;
            var connectionDtos = connections.map(function (conn) {
                return _this.toConnectionResponseDto(conn);
            });
            var activeConnectionDtos = activeConnections.map(function (conn) {
                return _this.toConnectionResponseDto(conn);
            });
            return (0, class_transformer_1.plainToClass)(session_response_dto_1.SessionResponseDto, {
                sessionId: sessionId,
                createdAt: createdAt,
                connections: connectionDtos,
                activeConnections: activeConnectionDtos,
                recording: recording,
                broadcasting: broadcasting,
            });
        };
        OpenviduService_1.prototype.createConnection = function (sessionId, properties) {
            return __awaiter(this, void 0, void 0, function () {
                var session, connection;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            session = this.openvidu.activeSessions.find(function (s) { return s.sessionId === sessionId; });
                            if (!session) {
                                throw new Error('Session not found');
                            }
                            return [4 /*yield*/, session.createConnection(properties)];
                        case 1:
                            connection = _a.sent();
                            return [2 /*return*/, this.toConnectionResponseDto(connection)];
                    }
                });
            });
        };
        OpenviduService_1.prototype.toConnectionResponseDto = function (connection) {
            var connectionId = connection.connectionId, status = connection.status, createdAt = connection.createdAt, activeAt = connection.activeAt, location = connection.location, ip = connection.ip, platform = connection.platform, clientData = connection.clientData, connectionProperties = connection.connectionProperties, token = connection.token, 
            // publishers,
            subscribers = connection.subscribers;
            return (0, class_transformer_1.plainToClass)(connection_response_dto_1.ConnectionResponseDto, {
                connectionId: connectionId,
                status: status,
                createdAt: createdAt,
                activeAt: activeAt,
                location: location,
                ip: ip,
                platform: platform,
                clientData: clientData,
                connectionProperties: connectionProperties,
                token: token,
                // publishers,
                subscribers: subscribers,
            });
        };
        OpenviduService_1.prototype.fetchAllSessions = function () {
            return __awaiter(this, void 0, void 0, function () {
                var sessions, sessionResponseDtoArr;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: 
                        // Fetch all session info from OpenVidu Server
                        return [4 /*yield*/, this.openvidu.fetch()];
                        case 1:
                            // Fetch all session info from OpenVidu Server
                            _a.sent();
                            sessions = this.openvidu.activeSessions;
                            sessionResponseDtoArr = sessions.map(function (session) {
                                return _this.toSessionResponseDto(session);
                            });
                            return [2 /*return*/, sessionResponseDtoArr];
                    }
                });
            });
        };
        OpenviduService_1.prototype.fetchSession = function (sessionId) {
            return __awaiter(this, void 0, void 0, function () {
                var session;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: 
                        // Fetch the session info from OpenVidu Server
                        return [4 /*yield*/, this.openvidu.fetch()];
                        case 1:
                            // Fetch the session info from OpenVidu Server
                            _a.sent();
                            session = this.openvidu.activeSessions.find(function (s) { return s.sessionId === sessionId; });
                            if (!session) {
                                throw new common_1.NotFoundException('Session not found');
                            }
                            return [2 /*return*/, this.toSessionResponseDto(session)];
                    }
                });
            });
        };
        OpenviduService_1.prototype.closeSession = function (sessionId, token) {
            return __awaiter(this, void 0, void 0, function () {
                var session, authorized;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: 
                        // Fetch the session info from OpenVidu Server
                        return [4 /*yield*/, this.openvidu.fetch()];
                        case 1:
                            // Fetch the session info from OpenVidu Server
                            _a.sent();
                            session = this.openvidu.activeSessions.find(function (s) { return s.sessionId === sessionId; });
                            if (!session) {
                                throw new common_1.NotFoundException('Session not found');
                            }
                            authorized = this.checkUserAuthorization(token, session);
                            if (!authorized) {
                                throw new common_1.ForbiddenException('User not authorized to close this session');
                            }
                            // Close the session
                            return [4 /*yield*/, session.close()];
                        case 2:
                            // Close the session
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        OpenviduService_1.prototype.checkUserAuthorization = function (token, session) {
            // Check if the token matches any of the active connections' tokens in the session
            return session.activeConnections.some(// activeConnections 대신 connections 사용해도 됨
            function (connection) {
                return connection.token === token && connection.connectionProperties.role === 'MODERATOR';
            });
        };
        OpenviduService_1.prototype.destroyConnection = function (sessionId, connectionId, token) {
            return __awaiter(this, void 0, void 0, function () {
                var session, authorized, connection;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: 
                        // Fetch the session info from OpenVidu Server
                        return [4 /*yield*/, this.openvidu.fetch()];
                        case 1:
                            // Fetch the session info from OpenVidu Server
                            _a.sent();
                            session = this.openvidu.activeSessions.find(function (s) { return s.sessionId === sessionId; });
                            if (!session) {
                                throw new common_1.NotFoundException('Session not found');
                            }
                            authorized = this.checkUserAuthorization(token, session);
                            if (!authorized) {
                                throw new common_1.ForbiddenException('User not authorized to destroy this connection');
                            }
                            connection = session.connections.find(function (conn) { return conn.connectionId === connectionId; });
                            if (!connection) {
                                throw new common_1.NotFoundException('Connection not found');
                            }
                            // Destroy the connection
                            return [4 /*yield*/, session.forceDisconnect(connection)];
                        case 2:
                            // Destroy the connection
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        OpenviduService_1.prototype.unpublishStream = function (sessionId, connectionId, token) {
            return __awaiter(this, void 0, void 0, function () {
                var session, authorized, connection, publisher;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: 
                        // Fetch the session info from OpenVidu Server
                        return [4 /*yield*/, this.openvidu.fetch()];
                        case 1:
                            // Fetch the session info from OpenVidu Server
                            _a.sent();
                            session = this.openvidu.activeSessions.find(function (s) { return s.sessionId === sessionId; });
                            if (!session) {
                                throw new common_1.NotFoundException('Session not found');
                            }
                            authorized = this.checkUserAuthorization(token, session);
                            if (!authorized) {
                                throw new common_1.ForbiddenException('User not authorized to unpublish this stream');
                            }
                            connection = session.connections.find(function (conn) { return conn.connectionId === connectionId; });
                            if (!connection) {
                                throw new common_1.NotFoundException('Connection not found');
                            }
                            publisher = connection.publishers.find(function (pub) { return pub.streamId; });
                            if (!publisher) {
                                throw new common_1.NotFoundException('Publisher not found');
                            }
                            // Unpublish the stream
                            return [4 /*yield*/, session.forceUnpublish(publisher)];
                        case 2:
                            // Unpublish the stream
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        return OpenviduService_1;
    }());
    __setFunctionName(_classThis, "OpenviduService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        OpenviduService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return OpenviduService = _classThis;
}();
exports.OpenviduService = OpenviduService;
