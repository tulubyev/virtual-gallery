"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pickColumns = pickColumns;
// services/columns.ts
// Имена колонок в динамических UPDATE подставляются в SQL, поэтому берём только разрешённые.
function pickColumns(data, allowed) {
    return Object.entries(data).filter(([key, value]) => allowed.includes(key) && value !== undefined);
}
//# sourceMappingURL=columns.js.map