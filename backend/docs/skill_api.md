# Skills API

## Endpoints

### 1. Get All Skills (Grouped)
**GET** `{{base_url}}/api/skills`
- **Access**: Public
- **Description**: Returns skills grouped by their category.

**Response (200 OK):**
```json
{
    "success": true,
    "count": 2,
    "data": [
        {
            "category": "Frontend",
            "items": [
                { "name": "React", "level": 90, ... },
                { "name": "Tailwind", "level": 95, ... }
            ]
        },
        {
            "category": "Backend",
            "items": [
                { "name": "Node.js", "level": 85, ... }
            ]
        }
    ]
}
```

### 2. Add New Skill
**POST** `{{base_url}}/api/skills`
- **Access**: Admin

**Body (JSON):**
```json
{
    "name": "Docker",
    "category": "Tools",
    "level": 80,
    "icon": "fa-brands fa-docker"
}
```

### 3. Delete Skill
**DELETE** `{{base_url}}/api/skills/:id`
- **Access**: Admin
