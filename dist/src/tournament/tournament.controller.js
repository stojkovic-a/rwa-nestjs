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
exports.TournamentController = void 0;
const common_1 = require("@nestjs/common");
const tournament_service_1 = require("./tournament.service");
const enum_1 = require("../auth/enum");
const models_1 = require("./models");
const decorator_1 = require("../auth/decorator");
let TournamentController = exports.TournamentController = class TournamentController {
    constructor(tournamentService) {
        this.tournamentService = tournamentService;
    }
    getTournament(id) {
        return this.tournamentService.getTournament(id);
    }
    createTournament(dto) {
        return this.tournamentService.createTournament(dto);
    }
    updateTournament(id, dto) {
        return this.tournamentService.updateTournament(id, dto);
    }
    deleteTournament(id) {
        return this.tournamentService.deleteTournament(id);
    }
    addPlayer(userId, tourId) {
        return this.tournamentService.addPlayer(userId, tourId);
    }
    removePlayer(userId, tourId) {
        return this.tournamentService.removePlayer(userId, tourId);
    }
    addSelf(tournamentId, userId) {
        return this.tournamentService.addPlayer(userId, tournamentId);
    }
    removeSelf(tournamentId, userId) {
        return this.tournamentService.removePlayer(userId, tournamentId);
    }
    addGame(gameId, tourId) {
        return this.tournamentService.addGame(gameId, tourId);
    }
    removeGame(gameId, tourId) {
        return this.tournamentService.removeGame(gameId, tourId);
    }
};
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TournamentController.prototype, "getTournament", null);
__decorate([
    (0, common_1.Post)(),
    (0, decorator_1.Public)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.tournamentCreationDto]),
    __metadata("design:returntype", void 0)
], TournamentController.prototype, "createTournament", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, decorator_1.Roles)(enum_1.Role.Admin),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, models_1.TournamentUpdateDto]),
    __metadata("design:returntype", void 0)
], TournamentController.prototype, "updateTournament", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, decorator_1.Public)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TournamentController.prototype, "deleteTournament", null);
__decorate([
    (0, common_1.Put)("addPlayer/:userId/:tourId"),
    (0, decorator_1.Public)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('userId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('tourId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], TournamentController.prototype, "addPlayer", null);
__decorate([
    (0, common_1.Put)("removePlayer/:userId/:tourId"),
    (0, decorator_1.Public)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('userId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('tourId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], TournamentController.prototype, "removePlayer", null);
__decorate([
    (0, common_1.Put)("addSelf/:id"),
    (0, decorator_1.Roles)(enum_1.Role.Player),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, decorator_1.GetCurrentUserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], TournamentController.prototype, "addSelf", null);
__decorate([
    (0, common_1.Put)("removeSelf/:id"),
    (0, decorator_1.Roles)(enum_1.Role.Player),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, decorator_1.GetCurrentUserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], TournamentController.prototype, "removeSelf", null);
__decorate([
    (0, common_1.Put)("addGame/:gameId/:tourId"),
    (0, decorator_1.Public)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('gameId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('tourId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], TournamentController.prototype, "addGame", null);
__decorate([
    (0, common_1.Put)("removePlayer/:gameId/:tourId"),
    (0, decorator_1.Public)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('gameId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('tourId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], TournamentController.prototype, "removeGame", null);
exports.TournamentController = TournamentController = __decorate([
    (0, common_1.Controller)('tournament'),
    __metadata("design:paramtypes", [tournament_service_1.TournamentService])
], TournamentController);
//# sourceMappingURL=tournament.controller.js.map