import { AuthGuard } from "@nestjs/passport";
import { Reflector } from "@nestjs/core";
import { ExecutionContext,Injectable } from "@nestjs/common";

@Injectable()
export class AtGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector) {
        super();
    }

    canActivate(ctx: ExecutionContext) {
        const isPublic = this.reflector.getAllAndOverride('isPublic', [
            ctx.getHandler(),
            ctx.getClass()
        ]);

        if (isPublic)
            return true;

        return super.canActivate(ctx)
    }
}