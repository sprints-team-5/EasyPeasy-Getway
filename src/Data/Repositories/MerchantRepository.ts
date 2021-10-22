import { Merchant } from "../Models/Merchant.Model";
import { BaseRepo } from "./BaseRepository";

export class UsersRepository extends BaseRepo<Merchant> {
  readonly collectionName: string = "merchants";
}
