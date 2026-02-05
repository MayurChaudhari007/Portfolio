# Projects API

## Endpoints

### 1. Get All Projects
**GET** `{{base_url}}/api/projects`
- **Access**: Public
- **Description**: Returns all projects, sorted by `createdAt` descending.

**Response (200 OK):**
```json
{
    "success": true,
    "count": 2,
    "data": [
        {
            "_id": "...",
            "title": "E-Commerce App",
            "techStack": ["React", "Express"],
            "image": "/uploads/proj1.jpg",
            "featured": true
        }
    ]
}
```

### 2. Create Project
**POST** `{{base_url}}/api/projects`
- **Access**: Admin

**Body (JSON):**
```json
{
    "title": "Portfolio CMS",
    "description": "A dynamic portfolio builder",
    "techStack": ["Node.js", "React", "MongoDB"],
    "githubLink": "https://github.com/user/repo",
    "liveLink": "https://demo.com",
    "image": "https://imgur.com/example.png",
    "featured": true
}
```

### 3. Update Project
**PUT** `{{base_url}}/api/projects/:id`
- **Access**: Admin

### 4. Delete Project
**DELETE** `{{base_url}}/api/projects/:id`
- **Access**: Admin
