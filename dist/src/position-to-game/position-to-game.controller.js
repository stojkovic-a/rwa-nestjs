"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PositionToGameController = void 0;
const common_1 = require("@nestjs/common");
const decorator_1 = require("../auth/decorator");
const enum_1 = require("../auth/enum");
const models_1 = require("./models");
const position_to_game_service_1 = require("./position-to-game.service");
let PositionToGameController = exports.PositionToGameController = class PositionToGameController {
    constructor(posToGameService) {
        this.posToGameService = posToGameService;
    }
    getPosToGame(id) {
        return this.posToGameService.getPosToGame(id);
    }
    createPosToGame(dto) {
        return this.posToGameService.createPosToGame(dto);
    }
    updatePosToGame(id, dto) {
        return this.posToGameService.updatePosToGame(id, dto);
    }
    deletePosToGame(id) {
        return this.posToGameService.deletePosToGame(id);
    }
};
__decorate([
    (0, common_1.Get)(':id'),
    (0, decorator_1.Public)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PositionToGameController.prototype, "getPosToGame", null);
__decorate([
    (0, common_1.Post)(),
    (0, decorator_1.Public)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.posToGameCreateionDto]),
    __metadata("design:returntype", void 0)
], PositionToGameController.prototype, "createPosToGame", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, decorator_1.Public)(),
    (0, decorator_1.Roles)(enum_1.Role.Admin),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, models_1.posToGameUpdateDto]),
    __metadata("design:returntype", void 0)
], PositionToGameController.prototype, "updatePosToGame", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, decorator_1.Public)(),
    (0, decorator_1.Roles)(enum_1.Role.Admin),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PositionToGameController.prototype, "deletePosToGame", null);
exports.PositionToGameController = PositionToGameController = __decorate([
    (0, common_1.Controller)('position-to-game'),
    __metadata("design:paramtypes", [position_to_game_service_1.PositionToGameService])
], PositionToGameController);
//# sourceMappingURL=position-to-game.controller.js.map