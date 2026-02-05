# Posts (Blog) API

## Endpoints

### 1. Get Published Posts (Public)
**GET** `{{base_url}}/api/posts`
**Query Params**:
- `?category=Web`
- `?tag=React`

**Response (200 OK):**
```json
{
    "success": true,
    "count": 5,
    "data": [
        {
            "title": "Understanding Hooks",
            "slug": "understanding-hooks",
            "category": "Web",
            "isPublished": true
        }
    ]
}
```

### 2. Get Single Post (Public)
**GET** `{{base_url}}/api/posts/:slug`
- Example: `/api/posts/understanding-hooks` for SEO friendly URLs.

### 3. Manage Posts (Admin)
- **GET** `/api/posts/admin/all`: View drafts and published.
- **POST** `/api/posts`: Create post.
- **PUT** `/api/posts/:id`: Update content or toggle `isPublished`.
- **DELETE** `/api/posts/:id`: Remove post.
