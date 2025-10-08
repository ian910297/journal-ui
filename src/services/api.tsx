const API_BASE_URL = import.meta.env.VITE_BLOG_API_BASE_URL;

export type Post = {
  uuid: string;
  title: string;
  content: string;
  created_at: string;
};

export type Asset = {
  asset_uuid: string;
  original_url: string;
  content_type: string;
  file_size: number;
  url: string;
};

export const api = {
  async getPosts(page: number = 1, limit: number = 10): Promise<Post[]> {
    const response = await fetch(`${API_BASE_URL}/api/posts?page=${page}&limit=${limit}`);
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    return response.json();
  },

  async getPost(uuid: string): Promise<Post> {
    const response = await fetch(`${API_BASE_URL}/api/posts/${uuid}`);
    if (!response.ok) {
      throw new Error('Failed to fetch post');
    }
    return response.json();
  },

  async getPostAssets(uuid: string): Promise<Asset[]> {
    const response = await fetch(`${API_BASE_URL}/api/posts/${uuid}/assets`);
    if (!response.ok) {
      throw new Error('Failed to fetch post assets');
    }
    return response.json();
  },

  getAssetUrl(uuid: string): string {
    return `${API_BASE_URL}/api/assets/${uuid}`;
  }
};