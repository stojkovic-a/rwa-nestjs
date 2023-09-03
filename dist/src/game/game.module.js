"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameModule = void 0;
const common_1 = require("@nestjs/common");
const game_controller_1 = require("./game.controller");
const game_service_1 = require("./game.service");
const typeorm_1 = require("@nestjs/typeorm");
const game_entity_1 = require("./models/game.entity");
const models_1 = require("../user/models");
const tournament_entity_1 = require("../tournament/models/tournament.entity");
const position_entity_1 = require("../position/models/position.entity");
const position_to_game_entity_1 = require("../position-to-game/models/position-to-game.entity");
let GameModule = exports.GameModule = class GameModule {
};
exports.GameModule = GameModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([game_entity_1.Game]),
            typeorm_1.TypeOrmModule.forFeature([models_1.User]),
            typeorm_1.TypeOrmModule.forFeature([tournament_entity_1.Tournament]),
            typeorm_1.TypeOrmModule.forFeature([position_entity_1.Position]),
            typeorm_1.TypeOrmModule.forFeature([position_to_game_entity_1.PositionToGame])
        ],
        controllers: [game_controller_1.GameController],
        providers: [game_service_1.GameService]
    })
], GameModule);
//# sourceMappingURL=game.module.js.map