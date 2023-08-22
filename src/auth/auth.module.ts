import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserModule } from "src/user/user.module";
import { Type } from "class-transformer";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/user/models/user.entity";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports:[TypeOrmModule.forFeature([User]),
JwtModule.register({
    
})],
    controllers:[AuthController],
    providers:[AuthService],
})
export class AuthModule{}