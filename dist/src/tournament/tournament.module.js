"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TournamentModule = void 0;
const common_1 = require("@nestjs/common");
const tournament_controller_1 = require("./tournament.controller");
const tournament_service_1 = require("./tournament.service");
const tournament_entity_1 = require("./models/tournament.entity");
const typeorm_1 = require("@nestjs/typeorm");
const models_1 = require("../user/models");
const models_2 = require("../game/models");
let TournamentModule = exports.TournamentModule = class TournamentModule {
};
exports.TournamentModule = TournamentModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([tournament_entity_1.Tournament]),
            typeorm_1.TypeOrmModule.forFeature([models_1.User]),
            typeorm_1.TypeOrmModule.forFeature([models_2.Game])
        ],
        controllers: [tournament_controller_1.TournamentController],
        providers: [tournament_service_1.TournamentService]
    })
], TournamentModule);
//# sourceMappingURL=tournament.module.js.map