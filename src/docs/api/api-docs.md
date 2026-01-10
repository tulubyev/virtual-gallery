# Virtual Art Gallery - API Documentation

## Base URL
All API endpoints are relative to `http://localhost:3000/api/`

## Authentication
Some endpoints require authentication. Include an Authorization header with a valid JWT token:
```
Authorization: Bearer <token>
```

## Endpoints

### Artworks

#### GET /artworks
Get all artworks in the gallery

**Parameters:**
- `limit` (optional): Number of artworks to return
- `offset` (optional): Number of artworks to skip

**Response:**
```json
[
  {
    "artwork_id": 1,
    "title": "Starry Night",
    "artist_name": "Vincent van Gogh",
    "year_created": 1889,
    "medium": "Oil on canvas",
    "dimensions": "73.7 cm × 92.1 cm",
    "style": "Post-Impressionism",
    "description": "A swirling night sky over a small town.",
    "image_url": "/assets/artworks/starry-night.jpg",
    "thumbnail_url": "/assets/artworks/starry-night-thumb.jpg",
    "location_in_gallery": {
      "x": 5,
      "y": 3,
      "z": 0,
      "rotation": 0
    },
    "tags": ["night", "sky", "stars", "landscape", "post-impressionism"]
  }
]
```

#### GET /artworks/:id
Get a specific artwork by ID

**Response:**
```json
{
  "artwork_id": 1,
  "title": "Starry Night",
  "artist_name": "Vincent van Gogh",
  "...": "..."
}
```

#### GET /artworks/search/:query
Search artworks by title, artist, or description

**Response:**
```json
[
  {
    "artwork_id": 1,
    "title": "Starry Night",
    "artist_name": "Vincent van Gogh",
    "...": "..."
  }
]
```

#### GET /artworks/filter/:tags
Filter artworks by tags (comma-separated)

**Response:**
```json
[
  {
    "artwork_id": 1,
    "title": "Starry Night",
    "artist_name": "Vincent van Gogh",
    "...": "..."
  }
]
```

#### POST /artworks
Create a new artwork (requires authentication)

**Request Body:**
```json
{
  "title": "New Artwork",
  "artist_name": "Artist Name",
  "year_created": 2023,
  "medium": "Digital",
  "dimensions": "100cm x 100cm",
  "style": "Abstract",
  "description": "A beautiful abstract artwork",
  "image_url": "/assets/artworks/new-artwork.jpg",
  "thumbnail_url": "/assets/artworks/new-artwork-thumb.jpg",
  "location_in_gallery": {
    "x": 0,
    "y": 0,
    "z": 0,
    "rotation": 0
  },
  "tags": ["abstract", "digital", "modern"]
}
```

**Response:**
```json
{
  "artwork_id": 3,
  "title": "New Artwork",
  "artist_name": "Artist Name",
  "...": "..."
}
```

### Galleries

#### GET /galleries
Get all galleries

**Response:**
```json
[
  {
    "gallery_id": 1,
    "name": "Main Hall",
    "description": "The central gallery space featuring masterpieces",
    "three_d_model_path": "/assets/models/main-hall.gltf",
    "layout_algorithm": "thematic_grouping"
  }
]
```

#### GET /galleries/:id
Get a specific gallery by ID

**Response:**
```json
{
  "gallery_id": 1,
  "name": "Main Hall",
  "description": "The central gallery space featuring masterpieces",
  "three_d_model_path": "/assets/models/main-hall.gltf",
  "layout_algorithm": "thematic_grouping",
  "rooms": [
    {
      "room_id": 1,
      "name": "Room A",
      "description": "North wing"
    }
  ]
}
```

#### GET /galleries/:id/recommended
Get AI-recommended artworks for a gallery

**Response:**
```json
[
  {
    "artwork_id": 1,
    "title": "Starry Night",
    "artist_name": "Vincent van Gogh",
    "reason": "Matches gallery theme"
  }
]
```

### Users

#### POST /users/register
Register a new user

**Request Body:**
```json
{
  "username": "newuser",
  "email": "newuser@example.com",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "user_id": 2,
  "username": "newuser",
  "email": "newuser@example.com",
  "token": "jwt_token_here"
}
```

#### POST /users/login
Login a user

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "user_id": 1,
  "username": "art_lover",
  "email": "art@example.com",
  "token": "jwt_token_here"
}
```

#### GET /users/profile
Get user profile (requires authentication)

**Response:**
```json
{
  "user_id": 1,
  "username": "art_lover",
  "email": "art@example.com",
  "preferences": {
    "favorite_styles": ["impressionism", "abstract"]
  }
}
```

### AI Services

#### GET /ai/recommendations
Get AI-generated artwork recommendations for a user

**Parameters:**
- `userId` (optional): ID of the user to get recommendations for

**Response:**
```json
[
  {
    "artwork_id": 3,
    "title": "The Persistence of Memory",
    "artist_name": "Salvador Dali",
    "reason": "Based on your interest in surrealism"
  }
]
```

#### GET /ai/collections/generate
Generate an AI-curated collection

**Parameters:**
- `theme`: Theme for the collection
- `count` (optional): Number of artworks to include

**Response:**
```json
{
  "name": "AI Collection: impressionism",
  "description": "A collection of 5 artworks related to impressionism",
  "artworks": [
    {
      "artwork_id": 1,
      "title": "Sample Artwork 1"
    }
  ]
}
```

#### POST /ai/analyze-image
Analyze an artwork image

**Request Body:**
```json
{
  "image": "base64_encoded_image_data"
}
```

**Response:**
```json
{
  "tags": ["landscape", "nature", "trees", "scenic"],
  "style": "impressionism",
  "dominant_colors": ["#4A752C", "#8B4513", "#5F9EA0"],
  "confidence": 0.85
}
```

#### GET /ai/similar/:artworkId
Get artworks similar to a given artwork

**Response:**
```json
[
  {
    "artwork_id": 5,
    "title": "Similar Artwork 1",
    "artist_name": "Artist 1",
    "similarity_score": 0.92
  }
]
```