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
Object.defineProperty(exports, "__esModule", { value: true });
exports.posToGameUpdateDto = exports.posToGameCreateionDto = void 0;
const class_validator_1 = require("class-validator");
const position_to_game_entity_1 = require("./position-to-game.entity");
class posToGameCreateionDto {
}
exports.posToGameCreateionDto = posToGameCreateionDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], posToGameCreateionDto.prototype, "moveNumber", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(position_to_game_entity_1.LastColor),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], posToGameCreateionDto.prototype, "lastColorMove", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], posToGameCreateionDto.prototype, "whiteTimeLeft", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], posToGameCreateionDto.prototype, "blackTimeLeft", void 0);
class posToGameUpdateDto {
}
exports.posToGameUpdateDto = posToGameUpdateDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.ValidateIf)((object, value) => value != null),
    __metadata("design:type", Number)
], posToGameUpdateDto.prototype, "moveNumber", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(position_to_game_entity_1.LastColor),
    (0, class_validator_1.ValidateIf)((object, value) => value != null),
    __metadata("design:type", String)
], posToGameUpdateDto.prototype, "lastColorMove", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.ValidateIf)((object, value) => value != null),
    __metadata("design:type", Number)
], posToGameUpdateDto.prototype, "whiteTimeLeft", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.ValidateIf)((object, value) => value != null),
    __metadata("design:type", Number)
], posToGameUpdateDto.prototype, "blackTimeLeft", void 0);
//# sourceMappingURL=position-to-game.dto.js.map