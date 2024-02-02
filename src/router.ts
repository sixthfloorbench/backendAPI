import * as express from "express";
import User from "./models/User";
import { v4 as uuid } from "uuid";
import cors from "cors";

class Router {
  constructor(server: express.Express) {
    const router = express.Router();

    const users = new Map<string, User>();
    const userId1 = uuid();
    users.set(userId1, {
      name: "John Doe",
      phone: "9876543210",
      age: "28",
      caste: "Some Caste",
      sex: "Male",
      lastLogin: new Date(),
      isCasteNoBar: false,
      marriedStatus: "Single"
    });

    const userId2 = uuid();
    users.set(userId2, {
      name: "Jane Doe",
      phone: "9876543211",
      age: "25",
      caste: "Another Caste",
      sex: "Female",
      lastLogin: new Date(),
      isCasteNoBar: true,
      marriedStatus: "Married"
    });

    router.get("/", (req: express.Request, res: express.Response) => {
      res.json({
        message: `Nothing to see here, [url]/users instead.`
      });
    });

    // Get all users
    router.get(
      "/users",
      cors(),
      (req: express.Request, res: express.Response) => {
        res.json({
          users: Array.from(users.values())
        });
      }
    );

    // Create new user
    router.post(
      "/users",
      cors(),
      (req: express.Request, res: express.Response) => {
        try {
          let user: User = {} as User;
          Object.assign(user, req.body);
          const newUserId = uuid();
          users.set(newUserId, user);
          res.json({
            userId: newUserId
          });
        } catch (e) {
          res
            .status(400)
            .send(JSON.stringify({ error: "problem with posted data" }));
        }
      }
    );

    // Get user by id
    router.get(
      "/users/:id",
      cors(),
      (req: express.Request, res: express.Response) => {
        const user = users.get(req.params.id);
        if (user) {
          res.json({
            user
          });
        } else {
          res.status(404).send(JSON.stringify({ error: "no such user" }));
        }
      }
    );

    // Update user
    router.put(
      "/users/:id",
      cors(),
      (req: express.Request, res: express.Response) => {
        try {
          const user = users.get(req.params.id);
          if (user) {
            Object.assign(user, req.body);
            res.json({
              user
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

    // Delete user
    router.delete(
      "/users/:id",
      cors(),
      (req: express.Request, res: express.Response) => {
        const user = users.get(req.params.id);
        if (user) {
          users.delete(req.params.id);
          res.json({
            userId: req.params.id
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
