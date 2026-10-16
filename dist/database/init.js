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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// database/init.ts
const DatabaseService_1 = __importDefault(require("../services/DatabaseService"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
async function initializeDatabase() {
    const schemaPath = path.join(__dirname, '..', '..', 'src', 'database', 'schema.sql');
    const schemaSQL = fs.readFileSync(schemaPath, 'utf8');
    const client = await DatabaseService_1.default.connect();
    try {
        // Begin a transaction
        await client.query('BEGIN');
        // Execute the schema SQL
        await client.query(schemaSQL);
        // Commit the transaction
        await client.query('COMMIT');
        console.log('Database initialized successfully!');
        console.log('All tables created according to the schema.');
    }
    catch (err) {
        // Rollback the transaction in case of error
        await client.query('ROLLBACK');
        console.error('Error initializing database:', err.message);
        throw err;
    }
    finally {
        client.release();
    }
}
// Run the initialization
initializeDatabase()
    .then(() => {
    console.log('Database initialization completed.');
    process.exit(0);
})
    .catch((error) => {
    console.error('Database initialization failed:', error);
    process.exit(1);
});
//# sourceMappingURL=init.js.map