import { Gender } from "../enums/gender.enum";
import { Role } from "../enums/role.enum";

export interface Member {
  id : number,
  nickname : string,
  email : string,
  birthdate : Date,
  gender : Gender,
  elo : number,
  role : Role
 }
