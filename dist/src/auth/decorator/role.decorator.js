"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Roles = exports.ROLES_KEY = void 0;
const decorators_1 = require("@nestjs/common/decorators");
exports.ROLES_KEY = 'roles';
const Roles = (...roles) => (0, decorators_1.SetMetadata)(exports.ROLES_KEY, roles);
exports.Roles = Roles;
//# sourceMappingURL=role.decorator.js.map