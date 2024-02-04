"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const uuid_1 = require("uuid");
const cors_1 = __importDefault(require("cors"));
class Router {
    constructor(server) {
        const router = express.Router();
        const users = new Map();
        users[(0, uuid_1.v4)()] = {
            name: "user_1",
            phone: "918171616551",
            age: 25,
            caste: "Caste1",
            sex: "Male",
            lastLogin: new Date(),
            isCasteNoBar: false,
            marriedStatus: "Single"
        };
        users[(0, uuid_1.v4)()] = {
            name: "user_4",
            phone: "81716151411",
            age: 18,
            caste: "Caste2",
            sex: "Female",
            lastLogin: new Date(),
            isCasteNoBar: false,
            marriedStatus: "Single"
        };
        router.get("/", (req, res) => {
            res.json({
                message: `Nothing to see here, [url]/users instead.`
            });
        });
        //get all users
        router.get("/users", (0, cors_1.default)(), (req, res) => {
            res.json({
                users
            });
        });
        //create new user
        router.post("/users", (0, cors_1.default)(), (req, res) => {
            try {
                let user = {};
                Object.assign(user, req.body);
                const newUUID = (0, uuid_1.v4)();
                users[newUUID] = user;
                res.json({
                    uuid: newUUID
                });
            }
            catch (e) {
                res
                    .status(400)
                    .send(JSON.stringify({ error: "problem with posted data" }));
            }
        });
        //get user by id
        router.get("/users/:id", (0, cors_1.default)(), (req, res) => {
            if (!!users[req.params.id]) {
                res.json({
                    user: users[req.params.id]
                });
            }
            else {
                res.status(404).send(JSON.stringify({ error: "no such user" }));
            }
        });
        //update user
        router.put("/users/:id", (0, cors_1.default)(), (req, res) => {
            try {
                if (!!users[req.params.id]) {
                    let user = {};
                    Object.assign(user, req.body);
                    users[req.params.id] = user;
                    res.json({
                        user: users[req.params.id]
                    });
                }
                else {
                    res.status(404).send(JSON.stringify({ error: "no such user" }));
                }
            }
            catch (e) {
                res
                    .status(400)
                    .send(JSON.stringify({ error: "problem with posted data" }));
            }
        });
        //delete user
        router.delete("/users/:id", (0, cors_1.default)(), (req, res) => {
            if (!!users[req.params.id]) {
                delete users[req.params.id];
                res.json({
                    uuid: req.params.id
                });
            }
            else {
                res.status(404).send(JSON.stringify({ error: "no such user" }));
            }
        });
        router.options("*", (0, cors_1.default)());
        server.use("/", router);
    }
}
exports.default = Router;
