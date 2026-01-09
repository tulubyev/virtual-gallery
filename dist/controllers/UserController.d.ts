import { Request, Response } from 'express';
declare class UserController {
    getUserProfile(req: Request, res: Response): Promise<void>;
    updateUserProfile(req: Request, res: Response): Promise<void>;
    getUserPreferences(req: Request, res: Response): Promise<void>;
    updateUserPreferences(req: Request, res: Response): Promise<void>;
    getUserFavorites(req: Request, res: Response): Promise<void>;
    addFavorite(req: Request, res: Response): Promise<void>;
    removeFavorite(req: Request, res: Response): Promise<void>;
    getUserHistory(req: Request, res: Response): Promise<void>;
}
declare const _default: UserController;
export default _default;
//# sourceMappingURL=UserController.d.ts.map