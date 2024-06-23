"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMongoConfig = void 0;
var getMongoConfig = function (configService) { return ({
    uri: configService.get('MONGODB_URI'),
}); };
exports.getMongoConfig = getMongoConfig;
