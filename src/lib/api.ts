const API_BASE =
  import.meta.env.VITE_API_URL || "https://admin-jhedai.edison-985.workers.dev";

// localStorage cache with TTL
const localCache = {
  get<T>(key: string): T | null {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return null;
      const { data, expires } = JSON.parse(raw) as { data: T; expires: number };
      if (Date.now() > expires) {
        localStorage.removeItem(key);
        return null;
      }
      return data;
    } catch {
      return null;
    }
  },
  set<T>(key: string, data: T, ttlMs: number): void {
    try {
      localStorage.setItem(
        key,
        JSON.stringify({ data, expires: Date.now() + ttlMs }),
      );
    } catch {
      /* storage full — ignore */
    }
  },
};

const TTL = {
  posts: 60 * 60 * 1000,
  post: 24 * 60 * 60 * 1000,
  categories: 24 * 60 * 60 * 1000,
  related: 6 * 60 * 60 * 1000,
};

// --- Interfaces ---

export interface Author {
  name: string;
  avatar?: string;
  bio?: string;
  twitter?: string;
  linkedin?: string;
  type: string;
  jobTitle?: string;
  url?: string;
  sameAs: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  author: Author;
  publishedAt: string;
  updatedAt: string;
  readTime: string;
  featured: boolean;
  featuredImage?: string;
  featuredImageAlt?: string;
  // SEO
  metaTitle?: string;
  metaDescription?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  canonicalUrl?: string;
  schemaType?: string;
  focusKeyword?: string;
  // AEO/GEO
  faqItems: FAQItem[];
  keyTakeaways: string[];
  wordCount: number;
  primaryAnswer?: string;
  speakableSelectors: string[];
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  totalPages: number;
  total: number;
}

export interface GetPostsParams {
  page?: number;
  limit?: number;
  category?: string;
}

// --- Normalizer ---

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalizePost(raw: any): BlogPost {
  const rawAuthor = raw.author as Record<string, unknown> | undefined;
  return {
    id: raw.id,
    slug: raw.slug,
    title: raw.title,
    excerpt: raw.excerpt || "",
    content: raw.content || "",
    category: raw.category || "",
    tags: Array.isArray(raw.tags) ? raw.tags : [],
    author: {
      name:
        (rawAuthor?.name as string) || (raw.author_name as string) || "JhedAI",
      avatar:
        (rawAuthor?.avatar as string) ||
        (raw.author_avatar as string) ||
        undefined,
      bio:
        (rawAuthor?.bio as string) || (raw.author_bio as string) || undefined,
      twitter:
        (rawAuthor?.twitter as string) ||
        (raw.author_twitter as string) ||
        undefined,
      linkedin:
        (rawAuthor?.linkedin as string) ||
        (raw.author_linkedin as string) ||
        undefined,
      type: (rawAuthor?.type as string) || "Organization",
      jobTitle: (rawAuthor?.jobTitle as string) || undefined,
      url: (rawAuthor?.url as string) || undefined,
      sameAs: Array.isArray(rawAuthor?.sameAs)
        ? (rawAuthor.sameAs as string[])
        : [],
    },
    publishedAt: raw.published_at || raw.publishedAt || "",
    updatedAt: raw.updated_at || raw.updatedAt || "",
    readTime: raw.read_time || raw.readTime || "5 min",
    featured: raw.featured === true || raw.featured === 1,
    featuredImage: raw.featured_image || raw.featuredImage || undefined,
    featuredImageAlt:
      raw.featured_image_alt || raw.featuredImageAlt || undefined,
    metaTitle: raw.meta_title || raw.metaTitle || undefined,
    metaDescription: raw.meta_description || raw.metaDescription || undefined,
    ogTitle: raw.og_title || undefined,
    ogDescription: raw.og_description || undefined,
    ogImage: raw.og_image || undefined,
    twitterTitle: raw.twitter_title || undefined,
    twitterDescription: raw.twitter_description || undefined,
    canonicalUrl: raw.canonical_url || undefined,
    schemaType: raw.schema_type || undefined,
    focusKeyword: raw.focus_keyword || undefined,
    faqItems: Array.isArray(raw.faq_items) ? raw.faq_items : [],
    keyTakeaways: Array.isArray(raw.key_takeaways) ? raw.key_takeaways : [],
    wordCount: (raw.word_count as number) || 0,
    primaryAnswer: (raw.primary_answer as string) || undefined,
    speakableSelectors: Array.isArray(raw.speakable_selectors)
      ? (raw.speakable_selectors as string[])
      : ["h1", ".post-excerpt"],
  };
}

// --- API functions ---

export async function getPosts(
  params: GetPostsParams = {},
): Promise<PaginatedResponse<BlogPost>> {
  const { page = 1, limit = 9, category } = params;

  const cacheKey = `cache:posts:${page}:${limit}:${category || ""}`;
  const hit = localCache.get<PaginatedResponse<BlogPost>>(cacheKey);
  if (hit) return hit;

  try {
    const searchParams = new URLSearchParams();
    searchParams.set("page", String(page));
    searchParams.set("limit", String(limit));
    if (category) searchParams.set("category", category);

    const res = await fetch(`${API_BASE}/api/blog/posts?${searchParams}`);
    if (!res.ok) throw new Error("Error fetching posts");
    const json = await res.json();
    const payload = json.data || json;
    const result: PaginatedResponse<BlogPost> = {
      data: (payload.data || []).map(normalizePost),
      page: payload.page || page,
      totalPages: payload.totalPages || 1,
      total: payload.total || 0,
    };
    localCache.set(cacheKey, result, TTL.posts);
    return result;
  } catch (err) {
    console.error("getPosts error:", err);
    return { data: [], page, totalPages: 0, total: 0 };
  }
}

export async function getPost(slug: string): Promise<BlogPost | null> {
  const cacheKey = `cache:post:${slug}`;
  const hit = localCache.get<BlogPost>(cacheKey);
  if (hit) return hit;

  try {
    const res = await fetch(`${API_BASE}/api/blog/posts/${slug}`);
    if (!res.ok) return null;
    const json = await res.json();
    const raw = json.data || json;
    const result = normalizePost(raw);
    localCache.set(cacheKey, result, TTL.post);
    return result;
  } catch (err) {
    console.error("getPost error:", err);
    return null;
  }
}

export async function getRelatedPosts(
  category: string,
  excludeSlug: string,
): Promise<BlogPost[]> {
  const cacheKey = `cache:related:${category}:${excludeSlug}`;
  const hit = localCache.get<BlogPost[]>(cacheKey);
  if (hit) return hit;

  try {
    const res = await fetch(
      `${API_BASE}/api/blog/posts/${excludeSlug}/related`,
    );
    if (!res.ok) return [];
    const json = await res.json();
    const result = ((json.data as unknown[]) || []).map(normalizePost);
    localCache.set(cacheKey, result, TTL.related);
    return result;
  } catch (err) {
    console.error("getRelatedPosts error:", err);
    return [];
  }
}

export async function getCategories(): Promise<string[]> {
  const cacheKey = "cache:categories";
  const hit = localCache.get<string[]>(cacheKey);
  if (hit) return hit;

  try {
    const res = await fetch(`${API_BASE}/api/blog/categories`);
    if (!res.ok) return [];
    const json = await res.json();
    const result: string[] = json.data || [];
    localCache.set(cacheKey, result, TTL.categories);
    return result;
  } catch (err) {
    console.error("getCategories error:", err);
    return [];
  }
}
