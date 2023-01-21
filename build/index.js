"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express")); // Import express
var routes_1 = __importDefault(require("./routes")); // Import routes
var app = (0, express_1.default)(); // Create a new express app instance
var port = 3000; // The port the express app will listen on
app.use('/', routes_1.default); // Mount the router on the app
// The express app will listen on the port
app.listen(port, function () {
    return console.log("Server running on port ".concat(port, " \nClick on the link to visit it ==> (http://localhost:").concat(port, ")"));
});
exports.default = app;
