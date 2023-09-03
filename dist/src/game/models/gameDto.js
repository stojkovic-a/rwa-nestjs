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
exports.gameUpdateDto = exports.gameCreationDto = void 0;
const class_validator_1 = require("class-validator");
class gameCreationDto {
}
exports.gameCreationDto = gameCreationDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], gameCreationDto.prototype, "whitePlayerId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], gameCreationDto.prototype, "blackPlayerId", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Date)
], gameCreationDto.prototype, "gameDate", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], gameCreationDto.prototype, "winnerId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], gameCreationDto.prototype, "startingTime", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], gameCreationDto.prototype, "increment", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Array)
], gameCreationDto.prototype, "gamePGN", void 0);
class gameUpdateDto {
}
exports.gameUpdateDto = gameUpdateDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.ValidateIf)((object, value) => value != null),
    __metadata("design:type", Number)
], gameUpdateDto.prototype, "whitePlayerId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.ValidateIf)((object, value) => value != null),
    __metadata("design:type", Number)
], gameUpdateDto.prototype, "blackPlayerId", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.ValidateIf)((object, value) => value != null),
    __metadata("design:type", Date)
], gameUpdateDto.prototype, "gameDate", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((object, value) => value != null),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], gameUpdateDto.prototype, "winnerId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.ValidateIf)((object, value) => value != null),
    __metadata("design:type", Number)
], gameUpdateDto.prototype, "startingTime", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.ValidateIf)((object, value) => value != null),
    __metadata("design:type", Number)
], gameUpdateDto.prototype, "increment", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateIf)((object, value) => value != null),
    __metadata("design:type", Array)
], gameUpdateDto.prototype, "gamePGN", void 0);
//# sourceMappingURL=gameDto.js.map