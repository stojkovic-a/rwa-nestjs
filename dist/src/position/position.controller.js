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
exports.PositionController = void 0;
const common_1 = require("@nestjs/common");
const decorator_1 = require("../auth/decorator");
const enum_1 = require("../auth/enum");
const position_service_1 = require("./position.service");
let PositionController = exports.PositionController = class PositionController {
    constructor(positionService) {
        this.positionService = positionService;
    }
    getPosition(id) {
        return this.positionService.getPosition(id);
    }
    addPosition(pos) {
        return this.positionService.addPosition(pos);
    }
    deletePosition(id) {
        return this.positionService.deletePosition(id);
    }
    updatePosition(id, pos) {
        return this.positionService.updatePosition(id, pos);
    }
};
__decorate([
    (0, common_1.Get)(":id"),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PositionController.prototype, "getPosition", null);
__decorate([
    (0, common_1.Post)(),
    (0, decorator_1.Roles)(enum_1.Role.Admin),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PositionController.prototype, "addPosition", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, decorator_1.Roles)(enum_1.Role.Admin),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PositionController.prototype, "deletePosition", null);
__decorate([
    (0, common_1.Put)(':id/:pos'),
    (0, decorator_1.Roles)(enum_1.Role.Admin),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('pos')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", void 0)
], PositionController.prototype, "updatePosition", null);
exports.PositionController = PositionController = __decorate([
    (0, common_1.Controller)('position'),
    __metadata("design:paramtypes", [position_service_1.PositionService])
], PositionController);
//# sourceMappingURL=position.controller.js.map