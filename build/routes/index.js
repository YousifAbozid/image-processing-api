"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var processImage_1 = __importDefault(require("../processImage"));
var routes = express_1.default.Router();
// Root endpoint`
routes.get('/', function (req, res) { return res.send('Server Is Running!'); });
// Images endpoint
routes.get('/images', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var images, imageNames, _a, filename, width, height, filenameToString, widthToNumber, heightToNumber, image, image, resizedImage, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                images = fs_1.default.readdirSync(path_1.default.join(__dirname, '../../assets/full'));
                imageNames = images.map(function (image) { return image.split('.')[0]; });
                _a = req.query, filename = _a.filename, width = _a.width, height = _a.height;
                filenameToString = String(filename);
                widthToNumber = Number(width);
                heightToNumber = Number(height);
                if (!((filename && !width) || !height)) return [3 /*break*/, 1];
                image = path_1.default.join(__dirname, '../../assets/full', "".concat(filenameToString, ".jpg"));
                // If the image exists, send it
                if (fs_1.default.existsSync(image)) {
                    res.sendFile(image);
                }
                else {
                    // If the image doesn't exist, return all avilable images links
                    res.send("<div>There is no image with that name (".concat(filenameToString ? filenameToString : '', ") <br> <br> Available images to search: <br>\n        ").concat(imageNames.map(function (image) {
                        return "<br>\n          <a href=\"http://localhost:3000/images?filename=".concat(image, "\">http://localhost:3000/images?filename=").concat(image, "</a>");
                    }), "\n        <br> <br> Or search with width and height: <br>\n        ").concat(imageNames.map(function (image) {
                        return "<br>\n            <a href=\"http://localhost:3000/images?filename=".concat(image, "&width=100&height=100\">http://localhost:3000/images?filename=").concat(image, "&width=100&height=100</a></a>");
                    }), "\n        </div>"));
                }
                return [3 /*break*/, 7];
            case 1:
                if (!(filename && width && height)) return [3 /*break*/, 7];
                image = path_1.default.join(__dirname, '../../assets/thumb', "".concat(filenameToString, "-").concat(widthToNumber, "-").concat(heightToNumber, ".jpg"));
                _b.label = 2;
            case 2:
                _b.trys.push([2, 6, , 7]);
                if (!fs_1.default.existsSync(image)) return [3 /*break*/, 3];
                res.sendFile(image);
                return [3 /*break*/, 5];
            case 3: return [4 /*yield*/, (0, processImage_1.default)(filenameToString, widthToNumber, heightToNumber)];
            case 4:
                resizedImage = _b.sent();
                res.sendFile(resizedImage);
                _b.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                error_1 = _b.sent();
                // If the image doesn't exist, return all avilable images links
                res.send("<div>There is no image with that name (".concat(filenameToString ? filenameToString : '', ") <br> <br> Available images to search: <br>\n        ").concat(imageNames.map(function (image) {
                    return "<br>\n          <a href=\"http://localhost:3000/images?filename=".concat(image, "\">http://localhost:3000/images?filename=").concat(image, "</a>");
                }), "\n        <br> <br> Or search with width and height: <br>\n        ").concat(imageNames.map(function (image) {
                    return "<br>\n            <a href=\"http://localhost:3000/images?filename=".concat(image, "&width=100&height=100\">http://localhost:3000/images?filename=").concat(image, "&width=100&height=100</a></a>");
                }), "\n        </div>"));
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); });
exports.default = routes;
