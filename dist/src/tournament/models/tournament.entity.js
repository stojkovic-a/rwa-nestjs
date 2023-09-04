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
exports.Tournament = exports.GameType = void 0;
const game_entity_1 = require("../../game/models/game.entity");
const user_entity_1 = require("../../user/models/user.entity");
const typeorm_1 = require("typeorm");
var GameType;
(function (GameType) {
    GameType["CLASSICAL"] = "classical";
    GameType["RAPID"] = "rapid";
    GameType["BLITZ"] = "blitz";
})(GameType || (exports.GameType = GameType = {}));
let Tournament = exports.Tournament = class Tournament {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Tournament.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Tournament.prototype, "tournamentName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Tournament.prototype, "startingDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true
    }),
    __metadata("design:type", Date)
], Tournament.prototype, "endingDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: GameType,
        default: GameType.CLASSICAL
    }),
    __metadata("design:type", String)
], Tournament.prototype, "gamesType", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Tournament.prototype, "minElo", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => game_entity_1.Game, (game) => game.tournament, {
        lazy: true
    }),
    __metadata("design:type", Array)
], Tournament.prototype, "games", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => user_entity_1.User, (user) => user.tournamentParticipations, {
        lazy: true
    }),
    __metadata("design:type", Array)
], Tournament.prototype, "players", void 0);
exports.Tournament = Tournament = __decorate([
    (0, typeorm_1.Entity)()
], Tournament);
//# sourceMappingURL=tournament.entity.js.map