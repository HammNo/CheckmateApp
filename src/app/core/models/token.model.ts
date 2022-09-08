import { Role } from "../enums/role.enum"
import { Member } from "./member.model";

export interface TokenModel{
  token : string;
  role: Role;
  user: Member;
}
