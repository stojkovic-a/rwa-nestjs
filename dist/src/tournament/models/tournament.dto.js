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
exports.TournamentUpdateDto = exports.tournamentCreationDto = void 0;
const class_validator_1 = require("class-validator");
const tournament_entity_1 = require("./tournament.entity");
class tournamentCreationDto {
}
exports.tournamentCreationDto = tournamentCreationDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], tournamentCreationDto.prototype, "tournamentName", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Date)
], tournamentCreationDto.prototype, "startingDate", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.ValidateIf)((object, value) => value != null),
    __metadata("design:type", Date)
], tournamentCreationDto.prototype, "endingDate", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(tournament_entity_1.GameType),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], tournamentCreationDto.prototype, "gamesType", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], tournamentCreationDto.prototype, "minElo", void 0);
class TournamentUpdateDto {
}
exports.TournamentUpdateDto = TournamentUpdateDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.ValidateIf)((object, value) => value != null),
    __metadata("design:type", String)
], TournamentUpdateDto.prototype, "tournamentName", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.ValidateIf)((object, value) => value != null),
    __metadata("design:type", Date)
], TournamentUpdateDto.prototype, "startingDate", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.ValidateIf)((object, value) => value != null),
    __metadata("design:type", Date)
], TournamentUpdateDto.prototype, "endingDate", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(tournament_entity_1.GameType),
    (0, class_validator_1.ValidateIf)((object, value) => value != null),
    __metadata("design:type", String)
], TournamentUpdateDto.prototype, "gamesType", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.ValidateIf)((object, value) => value != null),
    __metadata("design:type", Number)
], TournamentUpdateDto.prototype, "minElo", void 0);
//# sourceMappingURL=tournament.dto.js.map