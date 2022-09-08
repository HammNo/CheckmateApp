import { Category } from "../enums/category.enum"
import { Status } from "../enums/status.enum"

export interface Tournament {
  id : number,
  name : string,
  location? : string,
  minPlayers : number,
  maxPlayers : number,
  minElo : number,
  maxElo : number,
  category : Category[],
  status : Status,
  round : number,
  womenOnly : boolean,
  registrationEndDate : Date,
  creationDate : Date,
  updateDate : Date
 }

 export interface NewTournament{
  id : number,
  name : string,
  location? : string,
  minPlayers : number,
  maxPlayers : number,
  minElo : number,
  maxElo : number,
  category : number[],
  womenOnly : boolean,
  timeToRegister : number
 }
