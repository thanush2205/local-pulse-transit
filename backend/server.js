"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const db_1 = __importDefault(require("./src/config/db"));
const authRoutes_1 = __importDefault(require("./src/routes/authRoutes"));
const dataRoutes_1 = __importDefault(require("./src/routes/dataRoutes"));
const realtime_1 = __importDefault(require("./src/utils/realtime"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: '*', // Allow all origins for the frontend
        methods: ['GET', 'POST'],
    },
});
// Connect to database
(0, db_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.use('/api/auth', authRoutes_1.default);
app.use('/api/data', dataRoutes_1.default);
// Real-time communication via Socket.io
(0, realtime_1.default)(io);
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port thanush ${PORT}`);
});
