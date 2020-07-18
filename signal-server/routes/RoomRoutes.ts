import Hashing from "../Hashing";
import { Request } from "express";
import { inject } from "inversify";
import RoomModel from "../models/RoomModel";
import Bindings from "../constants/Bindings";
import RouteError from "../errors/RouteError";
import Router, { Prefix, Post } from "./../Router";
import DatabaseConnection from "../database/DatabaseConnection";

@Prefix("/api/rooms")
export default class RoomRoutes extends Router {
  private hashing: Hashing;
  private roomModel: RoomModel;
  private db: DatabaseConnection;
  constructor(
    @inject(Bindings.App) app,
    @inject(Bindings.Database) db,
    @inject(Bindings.Hashing) hashing,
    @inject(Bindings.Models.Room) roomModel,
  ) {
    super(app);
    this.db = db;
    this.hashing = hashing;
    this.roomModel = roomModel;
  }

  @Post("/join")
  public async get(request: Request) {
    let password = request.body.password;
    if (!password) {
      throw new RouteError(401, "Room requires a password");
    }

    let room = await this.roomModel.where("id", "=", 76397147779502080).find();
    if (password && this.hashing.verify(password, room.password)) {
      return room;
    }
  }

  @Post("/")
  public async post(request: Request) {
    let password = request.body.password;
    if (!password) {
      throw new RouteError(401, "Room requires a password");
    }

    return this.roomModel.create({
      name: request.body.name || new Date().toISOString(),
      password: this.hashing.create(password),
    });
  }
}