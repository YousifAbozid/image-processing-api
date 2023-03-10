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
var supertest_1 = __importDefault(require("supertest"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var index_1 = __importDefault(require("../index"));
var processImage_1 = __importDefault(require("../processImage"));
var request = (0, supertest_1.default)(index_1.default);
// Test the paths
describe('Test the root path', function () {
    it('Get the root endpoint', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.get('/')];
                case 1:
                    response = _a.sent();
                    expect(response.text).toContain('Server Is Running!');
                    return [2 /*return*/];
            }
        });
    }); });
    it('Get the images endpoint', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.get('/images')];
                case 1:
                    response = _a.sent();
                    expect(response.text).toContain('Available images to search:');
                    return [2 /*return*/];
            }
        });
    }); });
});
// Test the image processing
describe('Test image processing', function () {
    var filename = 'fjord';
    var width = 1000;
    var height = 1000;
    var outputThumbPath = path_1.default.join(__dirname, '../../assets/thumb', filename) +
        "-".concat(width, "-").concat(height, ".jpg");
    var outputFullImagePath = path_1.default.join(__dirname, '../../assets/full', filename) + '.jpg';
    it('Get the image with a proper filename', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.get("/images?filename=".concat(filename))];
                case 1:
                    _a.sent();
                    expect(fs_1.default.existsSync(outputFullImagePath)).toBeTrue();
                    return [2 /*return*/];
            }
        });
    }); });
    it('Return a proper error message when the image does not exist', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.get('/images?filename=test')];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(400);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Resize an image when proper parameters are set in the url', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.get("/images?filename=".concat(filename, "&width=").concat(width, "&height=").concat(height))];
                case 1:
                    _a.sent();
                    expect(fs_1.default.existsSync(outputThumbPath)).toBeTrue();
                    return [2 /*return*/];
            }
        });
    }); });
    it('The image is generated after it\'s deletion', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // Delete the image if it exists
                    if (fs_1.default.existsSync(outputThumbPath)) {
                        fs_1.default.unlinkSync(outputThumbPath);
                    }
                    // generate a new image
                    return [4 /*yield*/, request.get("/images?filename=".concat(filename, "&width=").concat(width, "&height=").concat(height))];
                case 1:
                    // generate a new image
                    _a.sent();
                    expect(fs_1.default.existsSync(outputThumbPath)).toBeTrue();
                    return [2 /*return*/];
            }
        });
    }); });
    // Test the processImage sharp function correctly
    it('Return the output image correct so sharp function works', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, processImage_1.default)(filename, width, height)];
                case 1:
                    response = _a.sent();
                    expect(response).toBe(outputThumbPath);
                    return [2 /*return*/];
            }
        });
    }); });
    // Test the processImage sharp function uncorrectly
    it('Return error when passing wrong parameters to sharp function', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, processImage_1.default)('test', 0, 0)];
                case 1:
                    response = _a.sent();
                    expect(response).toBe(400);
                    return [2 /*return*/];
            }
        });
    }); });
});
