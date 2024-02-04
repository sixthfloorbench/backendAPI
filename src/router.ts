import * as express from "express";
import User from "./models/User";
import { v4 as uuid } from "uuid";
import cors from "cors";

class Router {
  constructor(server: express.Express) {
    const router = express.Router();

    const users = new Map<string, User>();
    users[uuid()] = {
      name: "user_1",
      phone: "918171616551",
      age: 25,
      caste: "Caste1",
      sex: "Male",
      lastLogin: new Date(),
      isCasteNoBar: false,
      marriedStatus: "Single"
    };
    users[uuid()] = {
      name: "user_4",
      phone: "81716151411",
      age: 18,
      caste: "Caste2",
      sex: "Female",
      lastLogin: new Date(),
      isCasteNoBar: false,
      marriedStatus: "Single"
    };

    router.get("/", (req: express.Request, res: express.Response) => {
      res.json({
        message: `Nothing to see here, [url]/users instead.`
      });
    });

    //get all users
    router.get(
      "/users",
      cors(),
      (req: express.Request, res: express.Response) => {
        res.json({
          users
        });
      }
    );

    //create new user
    router.post(
      "/users",
      cors(),
      (req: express.Request, res: express.Response) => {
        try {
          let user: User = {} as User;
          Object.assign(user, req.body);
          const newUUID = uuid();
          users[newUUID] = user;
          res.json({
            uuid: newUUID
          });
        } catch (e) {
          res
            .status(400)
            .send(JSON.stringify({ error: "problem with posted data" }));
        }
      }
    );

    //get user by id
    router.get(
      "/users/:id",
      cors(),
      (req: express.Request, res: express.Response) => {
        if (!!users[req.params.id]) {
          res.json({
            user: users[req.params.id]
          });
        } else {
          res.status(404).send(JSON.stringify({ error: "no such user" }));
        }
      }
    );

    //update user
    router.put(
      "/users/:id",
      cors(),
      (req: express.Request, res: express.Response) => {
        try {
          if (!!users[req.params.id]) {
            let user: User = {} as User;
            Object.assign(user, req.body);
            users[req.params.id] = user;
            res.json({
              user: users[req.params.id]
            });
          } else {
            res.status(404).send(JSON.stringify({ error: "no such user" }));
          }
        } catch (e) {
          res
            .status(400)
            .send(JSON.stringify({ error: "problem with posted data" }));
        }
      }
    );

    //delete user
    router.delete(
      "/users/:id",
      cors(),
      (req: express.Request, res: express.Response) => {
        if (!!users[req.params.id]) {
          delete users[req.params.id];
          res.json({
            uuid: req.params.id
          });
        } else {
          res.status(404).send(JSON.stringify({ error: "no such user" }));
        }
      }
    );

    router.options("*", cors());

    server.use("/", router);
  }
}

export default Router;
