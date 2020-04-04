import { IsString, IsNotEmpty } from "class-validator";

export class UserDTO {
    
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    password: string;
}

export class UserRO {
    id: string;
    username: string;
    created: Date;
    token?: string;
}