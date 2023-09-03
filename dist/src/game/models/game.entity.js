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
exports.Game = void 0;
const position_to_game_entity_1 = require("../../position-to-game/models/position-to-game.entity");
const tournament_entity_1 = require("../../tournament/models/tournament.entity");
const user_entity_1 = require("../../user/models/user.entity");
const typeorm_1 = require("typeorm");
let Game = exports.Game = class Game {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Game.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.whiteGames),
    __metadata("design:type", user_entity_1.User)
], Game.prototype, "whitePlayer", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.blackGames),
    __metadata("design:type", user_entity_1.User)
], Game.prototype, "blackPlayer", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Game.prototype, "gameDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true
    }),
    __metadata("design:type", Number)
], Game.prototype, "winnerId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Game.prototype, "startingTime", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Game.prototype, "increment", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => tournament_entity_1.Tournament, (tournament) => tournament.games, {
        lazy: true
    }),
    __metadata("design:type", tournament_entity_1.Tournament)
], Game.prototype, "tournament", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => position_to_game_entity_1.PositionToGame, (ptg) => ptg.game, {}),
    __metadata("design:type", Array)
], Game.prototype, "positionToGame", void 0);
exports.Game = Game = __decorate([
    (0, typeorm_1.Entity)()
], Game);
//# sourceMappingURL=game.entity.js.map