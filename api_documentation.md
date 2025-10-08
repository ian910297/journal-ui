# Journal API Documentation

## Base URL
```
http://localhost:8080
```

## Overview
這是一個只讀的部落格 API，提供文章列表、文章內容和資源檔案的查詢功能。所有的新增、更新、刪除操作都透過 CLI 工具完成。

---

## Authentication
目前無需認證。所有端點都是公開的。

---

## Endpoints

### 1. Health Check
檢查 API 服務狀態。

**Request**
```http
GET /
```

**Response**
```
Status: 200 OK
Content-Type: text/plain

OK
```

---

### 2. Get Posts List
取得文章列表，支援分頁。

**Request**
```http
GET /api/posts?page=1&limit=10
```

**Query Parameters**
| Parameter | Type   | Default | Description |
|-----------|--------|---------|-------------|
| page      | number | 1       | 頁碼（從 1 開始） |
| limit     | number | 10      | 每頁文章數量 |

**Response**
```json
Status: 200 OK
Content-Type: application/json

[
  {
    "uuid": "550e8400-e29b-41d4-a716-446655440000",
    "title": "我的第一篇文章",
    "content": "# 標題\n\n這是內容...\n\n![圖片](http://localhost:8080/api/assets/...)",
    "created_at": "2025-01-15T10:30:00Z"
  },
  {
    "uuid": "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
    "title": "第二篇文章",
    "content": "文章內容...",
    "created_at": "2025-01-14T15:20:00Z"
  }
]
```

**Response Fields**
| Field      | Type   | Description |
|------------|--------|-------------|
| uuid       | string | 文章唯一識別碼（UUID v4） |
| title      | string | 文章標題 |
| content    | string | Markdown 格式的文章內容 |
| created_at | string | 建立時間（ISO 8601 格式） |

**Notes**
- 文章按照 `created_at` 降序排列（最新的在前）
- `content` 中的圖片 URL 已經轉換為 API 端點格式
- 如果頁碼超出範圍，會返回空陣列

**Example**
```bash
# 取得第一頁，每頁 10 筆
curl http://localhost:8080/api/posts?page=1&limit=10

# 取得第二頁，每頁 5 筆
curl http://localhost:8080/api/posts?page=2&limit=5
```

---

### 3. Get Single Post
根據 UUID 取得單一文章詳細內容。

**Request**
```http
GET /api/posts/{uuid}
```

**Path Parameters**
| Parameter | Type   | Description |
|-----------|--------|-------------|
| uuid      | string | 文章的 UUID |

**Response - Success**
```json
Status: 200 OK
Content-Type: application/json

{
  "uuid": "550e8400-e29b-41d4-a716-446655440000",
  "title": "我的第一篇文章",
  "content": "# 文章標題\n\n這是文章內容...\n\n![圖片](http://localhost:8080/api/assets/asset-uuid)",
  "created_at": "2025-01-15T10:30:00Z"
}
```

**Response - Not Found**
```
Status: 404 Not Found
Content-Type: text/plain

Post not found
```

**Example**
```bash
curl http://localhost:8080/api/posts/550e8400-e29b-41d4-a716-446655440000
```

---

### 4. Get Asset
取得文章中的資源檔案（圖片、PDF 等）。

**Request**
```http
GET /api/assets/{uuid}
```

**Path Parameters**
| Parameter | Type   | Description |
|-----------|--------|-------------|
| uuid      | string | 資源的 UUID |

**Response - Success**
```
Status: 200 OK
Content-Type: image/jpeg (或其他對應的 MIME type)
Content-Length: [file size]

[Binary file data]
```

**Supported Content Types**
- `image/jpeg` (.jpg)
- `image/png` (.png)
- `image/gif` (.gif)
- `image/svg+xml` (.svg)
- `application/pdf` (.pdf)

**Response - Not Found**
```
Status: 404 Not Found
Content-Type: text/plain

Asset not found
```

**Example**
```bash
# 直接下載圖片
curl http://localhost:8080/api/assets/abc123-def456 --output image.jpg

# 在瀏覽器中使用
<img src="http://localhost:8080/api/assets/abc123-def456" alt="圖片" />
```

---

### 5. Get Post Assets
取得某篇文章的所有資源列表。

**Request**
```http
GET /api/posts/{uuid}/assets
```

**Path Parameters**
| Parameter | Type   | Description |
|-----------|--------|-------------|
| uuid      | string | 文章的 UUID |

**Response - Success**
```json
Status: 200 OK
Content-Type: application/json

[
  {
    "asset_uuid": "abc123-def456-ghi789",
    "original_url": "https://example.com/image.jpg",
    "content_type": "image/jpeg",
    "file_size": 245760,
    "url": "/api/assets/abc123-def456-ghi789"
  },
  {
    "asset_uuid": "xyz789-uvw456-rst123",
    "original_url": "https://example.com/document.pdf",
    "content_type": "application/pdf",
    "file_size": 1048576,
    "url": "/api/assets/xyz789-uvw456-rst123"
  }
]
```

**Response Fields**
| Field        | Type   | Description |
|--------------|--------|-------------|
| asset_uuid   | string | 資源的 UUID |
| original_url | string | 原始遠端 URL |
| content_type | string | MIME type |
| file_size    | number | 檔案大小（bytes） |
| url          | string | API 存取路徑 |

**Response - Not Found**
```
Status: 404 Not Found
Content-Type: text/plain

Post not found
```

**Example**
```bash
curl http://localhost:8080/api/posts/550e8400-e29b-41d4-a716-446655440000/assets
```

---

## Data Models

### Post Object
```typescript
interface Post {
  uuid: string;           // UUID v4 format
  title: string;          // 文章標題
  content: string;        // Markdown 格式內容
  created_at: string;     // ISO 8601 timestamp
}
```

### Asset Object
```typescript
interface Asset {
  asset_uuid: string;     // UUID v4 format
  original_url: string;   // 原始 URL
  content_type: string;   // MIME type
  file_size: number;      // 檔案大小（bytes）
  url: string;           // API 路徑
}
```

---

## Error Responses

### 404 Not Found
當請求的資源不存在時返回。
```
Status: 404 Not Found
Content-Type: text/plain

Post not found
```
或
```
Asset not found
```

### 500 Internal Server Error
當伺服器發生錯誤時返回。
```
Status: 500 Internal Server Error
```

---

## Content Format

### Markdown Content
文章內容使用 Markdown 格式，並且圖片 URL 已經被轉換：

**原始 Markdown (在 CLI 輸入時):**
```markdown
# 文章標題

這是一張圖片：
![描述](https://example.com/remote-image.jpg)
```

**API 返回的 Markdown:**
```markdown
# 文章標題

這是一張圖片：
![描述](http://localhost:8080/api/assets/550e8400-e29b-41d4-a716-446655440000)
```

---

## Frontend Integration Examples

### React Example
```jsx
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

function PostList() {
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    fetch('http://localhost:8080/api/posts?page=1&limit=10')
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);
  
  return (
    <div>
      {posts.map(post => (
        <article key={post.uuid}>
          <h2>{post.title}</h2>
          <ReactMarkdown>{post.content}</ReactMarkdown>
          <time>{new Date(post.created_at).toLocaleString()}</time>
        </article>
      ))}
    </div>
  );
}

function SinglePost({ uuid }) {
  const [post, setPost] = useState(null);
  
  useEffect(() => {
    fetch(`http://localhost:8080/api/posts/${uuid}`)
      .then(res => res.json())
      .then(data => setPost(data));
  }, [uuid]);
  
  if (!post) return <div>Loading...</div>;
  
  return (
    <article>
      <h1>{post.title}</h1>
      <ReactMarkdown>{post.content}</ReactMarkdown>
    </article>
  );
}
```

### Vue Example
```vue
<template>
  <div>
    <article v-for="post in posts" :key="post.uuid">
      <h2>{{ post.title }}</h2>
      <div v-html="renderMarkdown(post.content)"></div>
      <time>{{ formatDate(post.created_at) }}</time>
    </article>
  </div>
</template>

<script>
import { marked } from 'marked';

export default {
  data() {
    return {
      posts: []
    };
  },
  mounted() {
    fetch('http://localhost:8080/api/posts?page=1&limit=10')
      .then(res => res.json())
      .then(data => this.posts = data);
  },
  methods: {
    renderMarkdown(content) {
      return marked(content);
    },
    formatDate(date) {
      return new Date(date).toLocaleString();
    }
  }
};
</script>
```

### Vanilla JavaScript Example
```javascript
// 取得文章列表
async function getPosts(page = 1, limit = 10) {
  const response = await fetch(`http://localhost:8080/api/posts?page=${page}&limit=${limit}`);
  return response.json();
}

// 取得單一文章
async function getPost(uuid) {
  const response = await fetch(`http://localhost:8080/api/posts/${uuid}`);
  return response.json();
}

// 取得文章資源列表
async function getPostAssets(uuid) {
  const response = await fetch(`http://localhost:8080/api/posts/${uuid}/assets`);
  return response.json();
}

// 使用範例
getPosts(1, 10).then(posts => {
  posts.forEach(post => {
    console.log(post.title);
  });
});
```

---

## CORS Configuration

如果 Frontend 和 API 在不同的 port/domain，需要在 API 端設定 CORS。

目前開發環境建議的設定：
```rust
// 在 Cargo.toml 加入
// actix-cors = "0.7"

// 在 main.rs 加入
use actix_cors::Cors;

HttpServer::new(move || {
    App::new()
        .wrap(
            Cors::default()
                .allowed_origin("http://localhost:3000")  // Frontend URL
                .allowed_methods(vec!["GET"])
                .allowed_headers(vec![header::ACCEPT, header::CONTENT_TYPE])
                .max_age(3600)
        )
        // ... 其他設定
})
```

---

## Rate Limiting
目前無速率限制。

---

## Caching Recommendations

### Browser Caching
資源檔案（images, PDFs）建議使用較長的快取時間：
```javascript
// 使用時加上快取控制
<img 
  src="http://localhost:8080/api/assets/abc123" 
  alt="圖片"
  loading="lazy"  // 延遲載入
/>
```

### Application Level Caching
建議在前端快取文章列表和內容：
```javascript
// 使用 SWR (React)
import useSWR from 'swr';

const fetcher = url => fetch(url).then(r => r.json());

function PostList() {
  const { data, error } = useSWR(
    'http://localhost:8080/api/posts?page=1&limit=10',
    fetcher,
    { revalidateOnFocus: false }
  );
  
  // ...
}
```

---

## Notes for Frontend Developers

1. **Markdown 渲染**: 推薦使用 `react-markdown`, `marked`, 或 `markdown-it` 來渲染 Markdown 內容

2. **圖片載入**: 文章中的圖片 URL 已經是完整的 API 端點，可以直接使用

3. **UUID 格式**: 所有 UUID 都是標準的 UUID v4 格式（帶連字號）

4. **時間格式**: 所有時間都是 ISO 8601 格式，需要自行格式化顯示

5. **分頁處理**: API 不返回總頁數，建議實作"載入更多"而非傳統分頁

6. **錯誤處理**: 建議實作 404 和 500 錯誤的友善提示

7. **SEO**: 如果需要 SEO，建議使用 SSR (Next.js, Nuxt.js) 來預渲染內容

---

## Testing

### Using cURL
```bash
# Health check
curl http://localhost:8080/

# Get posts
curl http://localhost:8080/api/posts

# Get single post
curl http://localhost:8080/api/posts/550e8400-e29b-41d4-a716-446655440000

# Get asset
curl http://localhost:8080/api/assets/abc123-def456 --output image.jpg

# Get post assets
curl http://localhost:8080/api/posts/550e8400-e29b-41d4-a716-446655440000/assets
```

### Using Postman
Import this collection:
```json
{
  "info": {
    "name": "Journal API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Get Posts",
      "request": {
        "method": "GET",
        "url": "http://localhost:8080/api/posts?page=1&limit=10"
      }
    },
    {
      "name": "Get Post",
      "request": {
        "method": "GET",
        "url": "http://localhost:8080/api/posts/{{post_uuid}}"
      }
    },
    {
      "name": "Get Asset",
      "request": {
        "method": "GET",
        "url": "http://localhost:8080/api/assets/{{asset_uuid}}"
      }
    }
  ]
}
```

---

## Changelog

### Version 1.0 (Current)
- ✅ GET /api/posts - 文章列表（分頁）
- ✅ GET /api/posts/{uuid} - 單一文章
- ✅ GET /api/assets/{uuid} - 資源檔案
- ✅ GET /api/posts/{uuid}/assets - 文章資源列表

### Future Plans
- 文章搜尋功能
- 標籤/分類支援
- 文章統計資訊

---

## Support

如有問題請聯繫後端開發團隊。

API Base URL: `http://localhost:8080`
