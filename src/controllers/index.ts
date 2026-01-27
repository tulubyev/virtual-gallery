// src/controllers/index.ts
import { IArtworkService } from '../types/artwork';
import { IGalleryService } from '../types/gallery';
import { IUserService } from '../types/user';
import { ILogger } from '../types/interfaces';
import { ArtworkController } from './ArtworkController';
import { GalleryController } from './GalleryController';
import { UserController } from './UserController';
import { AuthController } from './AuthController';

export interface IControllerFactory {
  createArtworkController(): ArtworkController;
  createGalleryController(): GalleryController;
  createUserController(): UserController;
  createAuthController(): AuthController;
}

export class ControllerFactory implements IControllerFactory {
  constructor(
    private artworkService: IArtworkService,
    private galleryService: IGalleryService,
    private userService: IUserService,
    private logger: ILogger
  ) {}

  createArtworkController(): ArtworkController {
    return new ArtworkController(this.artworkService, this.logger);
  }

  createGalleryController(): GalleryController {
    return new GalleryController(this.galleryService, this.logger);
  }

  createUserController(): UserController {
    return new UserController(this.userService, this.logger);
  }

  createAuthController(): AuthController {
    return new AuthController(this.userService, this.logger);
  }
}