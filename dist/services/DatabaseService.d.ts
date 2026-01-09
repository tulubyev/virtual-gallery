import { PoolClient } from 'pg';
import 'dotenv/config';
declare class DatabaseService {
    private pool;
    constructor();
    private testConnection;
    query(text: string, params?: any[]): Promise<import("pg").QueryResult<any>>;
    connect(): Promise<PoolClient>;
    end(): Promise<void>;
}
declare const _default: DatabaseService;
export default _default;
//# sourceMappingURL=DatabaseService.d.ts.map