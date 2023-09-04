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
exports.PositionToGame = exports.LastColor = void 0;
const game_entity_1 = require("../../game/models/game.entity");
const position_entity_1 = require("../../position/models/position.entity");
const typeorm_1 = require("typeorm");
var LastColor;
(function (LastColor) {
    LastColor["WHITE"] = "white";
    LastColor["BLACK"] = "black";
    LastColor["NONE"] = "none";
})(LastColor || (exports.LastColor = LastColor = {}));
let PositionToGame = exports.PositionToGame = class PositionToGame {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], PositionToGame.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], PositionToGame.prototype, "moveNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: LastColor,
        default: LastColor.NONE
    }),
    __metadata("design:type", String)
], PositionToGame.prototype, "lastColorMove", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], PositionToGame.prototype, "whiteTimeLeft", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], PositionToGame.prototype, "blackTimeLeft", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => position_entity_1.Position, (pos) => pos.positionToGame),
    __metadata("design:type", position_entity_1.Position)
], PositionToGame.prototype, "position", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => game_entity_1.Game, (game) => game.positionToGame, {
        lazy: true,
        onDelete: "CASCADE",
        cascade: true
    }),
    __metadata("design:type", game_entity_1.Game)
], PositionToGame.prototype, "game", void 0);
exports.PositionToGame = PositionToGame = __decorate([
    (0, typeorm_1.Entity)()
], PositionToGame);
//# sourceMappingURL=position-to-game.entity.js.map