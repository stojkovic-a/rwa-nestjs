"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOrmConfig = void 0;
const game_entity_1 = require("./src/game/models/game.entity");
const position_to_game_entity_1 = require("./src/position-to-game/models/position-to-game.entity");
const position_entity_1 = require("./src/position/models/position.entity");
const tournament_entity_1 = require("./src/tournament/models/tournament.entity");
const user_entity_1 = require("./src/user/models/user.entity");
exports.typeOrmConfig = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'mysecretpassword',
    database: 'chess',
    entities: [user_entity_1.User, game_entity_1.Game, tournament_entity_1.Tournament, position_entity_1.Position, position_to_game_entity_1.PositionToGame],
    synchronize: true,
};
//# sourceMappingURL=typeorm.config.js.map