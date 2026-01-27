# Changelog

All notable changes to the Virtual Gallery project will be documented in this file.

## [Unreleased] - 2026-01-12

### Added
- ESLint and Prettier configurations for consistent code formatting
- Jest configuration for unit testing
- SonarQube configuration for code quality analysis
- Comprehensive unit tests for ArtworkService
- Integration tests for service interactions
- End-to-end tests for complete user journeys
- Test setup file for Jest environment
- Type definitions for all services and controllers

### Changed
- Migrated all JavaScript files to TypeScript
- Updated package.json with proper dependencies and devDependencies
- Refactored services to use interfaces and dependency injection
- Updated controllers to use the new service interfaces
- Improved error handling in all service methods
- Enhanced logging throughout the application
- Updated server.ts to use dependency injection container

### Fixed
- Fixed JSON parsing errors in package.json
- Corrected import statements to use proper paths
- Resolved dependency conflicts between production and development dependencies
- Fixed type errors in service implementations
- Corrected database query syntax in service methods

### Refactored
- Created IService interface for all services
- Implemented BaseService abstract class
- Created controller factory for proper instantiation
- Introduced dependency injection container
- Separated concerns with proper interfaces
- Improved code organization and modularity

## [1.0.0] - 2025-12-20

### Added
- Initial project structure with backend and frontend components
- Artwork, Gallery, and User services
- Database integration with PostgreSQL
- Authentication and authorization functionality
- Basic API endpoints for CRUD operations
- Frontend components for virtual gallery experience
- AI/ML integration for recommendations and analysis
- IoT device integration for real-time feedback
- VR/AR support for immersive experiences