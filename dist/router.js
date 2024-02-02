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
        const userId1 = (0, uuid_1.v4)();
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
        const userId2 = (0, uuid_1.v4)();
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
        router.get("/", (req, res) => {
            res.json({
                message: `Nothing to see here, [url]/users instead.`
            });
        });
        // Get all users
        router.get("/users", (0, cors_1.default)(), (req, res) => {
            res.json({
                users: Array.from(users.values())
            });
        });
        // Create new user
        router.post("/users", (0, cors_1.default)(), (req, res) => {
            try {
                let user = {};
                Object.assign(user, req.body);
                const newUserId = (0, uuid_1.v4)();
                users.set(newUserId, user);
                res.json({
                    userId: newUserId
                });
            }
            catch (e) {
                res
                    .status(400)
                    .send(JSON.stringify({ error: "problem with posted data" }));
            }
        });
        // Get user by id
        router.get("/users/:id", (0, cors_1.default)(), (req, res) => {
            const user = users.get(req.params.id);
            if (user) {
                res.json({
                    user
                });
            }
            else {
                res.status(404).send(JSON.stringify({ error: "no such user" }));
            }
        });
        // Update user
        router.put("/users/:id", (0, cors_1.default)(), (req, res) => {
            try {
                const user = users.get(req.params.id);
                if (user) {
                    Object.assign(user, req.body);
                    res.json({
                        user
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
        // Delete user
        router.delete("/users/:id", (0, cors_1.default)(), (req, res) => {
            const user = users.get(req.params.id);
            if (user) {
                users.delete(req.params.id);
                res.json({
                    userId: req.params.id
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
