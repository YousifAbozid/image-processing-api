"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express")); // Import express
var app = (0, express_1.default)(); // Create a new express app instance
var port = 3000; // The port the express app will listen on
// Root endpoint
app.get('/', function (req, res) { return res.send('Server Is Running!'); });
// The express app will listen on the port
app.listen(port, function () {
    return console.log("Server running on port ".concat(port, " \nClick on the link to visit it ==> (http://localhost:").concat(port, ")"));
});
