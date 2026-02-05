# About Section API

## Endpoints

### 1. Get About Data
**GET** `{{base_url}}/api/about`
- **Access**: Public
- **Description**: Returns the portfolio owner's bio and contact info.

**Response (200 OK):**
```json
{
    "success": true,
    "data": {
        "_id": "...",
        "headline": "Full Stack Developer",
        "bio": "Use **markdown** here.",
        "contactEmail": "me@example.com",
        "socialLinks": [
            { "platform": "GitHub", "url": "https://github.com/..." }
        ]
    }
}
```

### 2. Update/Create About Data
**PUT** `{{base_url}}/api/about`
- **Access**: Admin (Requires Bearer Token)
- **Description**: Upserts the single About document.

**Body (JSON):**
```json
{
    "headline": "Senior Software Architect",
    "bio": "Updated bio...",
    "contactEmail": "admin@example.com",
    "socialLinks": [
        { "platform": "LinkedIn", "url": "https://linkedin.com/..." }
    ]
}
```
