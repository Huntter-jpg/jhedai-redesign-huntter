# API Integration Guide

## Backend API URL

**Production:** `https://jhedai-api.edison-985.workers.dev`

## Integrating Backend with Frontend

### Step 1: Create API Client

Create `src/lib/apiClient.ts`:

```typescript
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "https://jhedai-api.edison-985.workers.dev";

export interface ContactFormData {
  nombre: string;
  email: string;
  empresa?: string;
  telefono?: string;
  servicio?: string;
  mensaje: string;
}

export interface ApiResponse<T> {
  success?: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/**
 * Submit contact form
 */
export async function submitContactForm(
  data: ContactFormData,
): Promise<ApiResponse<any>> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to submit form");
    }

    return await response.json();
  } catch (error) {
    console.error("Contact form error:", error);
    throw error;
  }
}

/**
 * Get services
 */
export async function getServices(): Promise<ApiResponse<any[]>> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/services`);

    if (!response.ok) {
      throw new Error("Failed to fetch services");
    }

    return await response.json();
  } catch (error) {
    console.error("Get services error:", error);
    throw error;
  }
}

/**
 * Get blog posts
 */
export async function getBlogPosts(
  page = 1,
  limit = 10,
): Promise<ApiResponse<any[]>> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/blog?page=${page}&limit=${limit}`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch blog posts");
    }

    return await response.json();
  } catch (error) {
    console.error("Get blog posts error:", error);
    throw error;
  }
}

/**
 * Check API health
 */
export async function checkHealth(): Promise<ApiResponse<any>> {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);

    if (!response.ok) {
      throw new Error("API health check failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Health check error:", error);
    throw error;
  }
}
```

### Step 2: Update ContactoPage Component

Update `src/pages/ContactoPage.tsx` to use the API client:

```typescript
import { submitContactForm } from "../lib/apiClient";

// In handleSubmit function:
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  const data = {
    nombre: formData.get("nombre") as string,
    email: formData.get("email") as string,
    empresa: formData.get("empresa") as string,
    telefono: formData.get("telefono") as string,
    servicio: formData.get("servicio") as string,
    mensaje: formData.get("mensaje") as string,
  };

  try {
    const response = await submitContactForm(data);

    if (response.success) {
      setSubmitted(true);
    } else {
      alert(response.error || "Error al enviar el mensaje");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Error al enviar el mensaje. Por favor intenta nuevamente.");
  }
};
```

### Step 3: Environment Variables

Create `.env` file in the frontend root:

```bash
# API Configuration
VITE_API_URL=https://jhedai-api.edison-985.workers.dev

# Development
# VITE_API_URL=http://localhost:8787
```

### Step 4: Update Vercel Environment Variables

In Vercel dashboard:

1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add:
   - **Name:** `VITE_API_URL`
   - **Value:** `https://jhedai-api.edison-985.workers.dev`
   - **Environment:** Production, Preview, Development

### Step 5: Test Integration Locally

```bash
# In frontend directory
npm run dev

# Visit http://localhost:5173/contacto
# Submit the contact form
# Check browser console for API calls
```

### Step 6: Deploy Updated Frontend

```bash
git add .
git commit -m "feat: integrate backend API"
git push origin master

# Vercel will auto-deploy
```

## API Endpoints Reference

### 1. Health Check

```bash
GET https://jhedai-api.edison-985.workers.dev/health
```

**Response:**

```json
{
  "status": "ok",
  "timestamp": "2025-02-24T00:00:00.000Z",
  "service": "jhedai-api",
  "version": "1.0.0"
}
```

### 2. Get Services

```bash
GET https://jhedai-api.edison-985.workers.dev/api/services
```

**Response:**

```json
{
  "data": [
    {
      "id": 1,
      "slug": "analisis-datos",
      "title": "Análisis de Datos",
      "description": "...",
      "category": "data"
    }
  ],
  "count": 2
}
```

### 3. Contact Form

```bash
POST https://jhedai-api.edison-985.workers.dev/api/contact
Content-Type: application/json

{
  "nombre": "Juan Pérez",
  "email": "juan@example.com",
  "empresa": "Empresa S.A.",
  "telefono": "+56912345678",
  "servicio": "Machine Learning",
  "mensaje": "Necesito información..."
}
```

**Success Response:**

```json
{
  "success": true,
  "message": "Mensaje recibido correctamente",
  "data": {
    "nombre": "Juan Pérez",
    "email": "juan@example.com"
  }
}
```

**Error Response:**

```json
{
  "error": "Missing required fields",
  "required": ["nombre", "email", "mensaje"]
}
```

### 4. Blog Posts

```bash
GET https://jhedai-api.edison-985.workers.dev/api/blog?page=1&limit=10
```

**Response:**

```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "pages": 5
  }
}
```

## CORS Configuration

The backend is configured to accept requests from:

- `https://jhedai-redesign.vercel.app`
- `http://localhost:5173` (development)

If you need to add more origins, update `wrangler.toml` in the backend:

```toml
[vars]
ALLOWED_ORIGINS = "https://jhedai-redesign.vercel.app,http://localhost:5173,https://your-custom-domain.com"
```

Then redeploy:

```bash
cd ../jhedai-backend
npm run deploy
```

## Error Handling

All API endpoints return errors in this format:

```json
{
  "error": "Error type",
  "message": "Detailed error message"
}
```

Common HTTP status codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `404` - Not Found
- `500` - Internal Server Error

## Testing with Postman/Insomnia

Import this collection:

```json
{
  "name": "JhedAI API",
  "requests": [
    {
      "name": "Health Check",
      "method": "GET",
      "url": "https://jhedai-api.edison-985.workers.dev/health"
    },
    {
      "name": "Get Services",
      "method": "GET",
      "url": "https://jhedai-api.edison-985.workers.dev/api/services"
    },
    {
      "name": "Submit Contact",
      "method": "POST",
      "url": "https://jhedai-api.edison-985.workers.dev/api/contact",
      "headers": {
        "Content-Type": "application/json"
      },
      "body": {
        "nombre": "Test User",
        "email": "test@example.com",
        "mensaje": "Test message"
      }
    }
  ]
}
```

## Monitoring & Debugging

### View Real-time Logs

```bash
cd ../jhedai-backend
npm run tail
```

### Check Deployment Status

```bash
npx wrangler deployments list
```

### View Worker Analytics

Visit Cloudflare Dashboard:
https://dash.cloudflare.com/ → Workers & Pages → jhedai-api

## Next Steps

1. **Database Integration**: Add D1 database to store contacts and blog posts
2. **Email Notifications**: Integrate SendGrid/Resend for contact form emails
3. **Authentication**: Add JWT authentication for admin endpoints
4. **Rate Limiting**: Implement rate limiting to prevent abuse
5. **Caching**: Add KV storage for caching frequently accessed data

---

**Last Updated:** 2025-02-24
