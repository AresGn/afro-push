/**
 * Utility function for making API calls with better error handling
 */

type FetchOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: Record<string, unknown> | string;
  headers?: Record<string, string>;
};

type FetchResult<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

export async function fetchData<T>(url: string, options: FetchOptions = {}): Promise<FetchResult<T>> {
  const { 
    method = 'GET', 
    body, 
    headers = {} 
  } = options;

  try {
    const requestHeaders: HeadersInit = {
      ...headers,
    };

    if (body && typeof body === 'object') {
      requestHeaders['Content-Type'] = 'application/json';
    }

    const response = await fetch(url, {
      method,
      headers: requestHeaders,
      body: body ? JSON.stringify(body) : undefined,
    });

    // For response formats that are not JSON
    const contentType = response.headers.get('content-type');
    if (contentType && !contentType.includes('application/json')) {
      if (response.ok) {
        const text = await response.text();
        return { success: true, data: text as unknown as T };
      } else {
        throw new Error(`Request failed with status ${response.status}`);
      }
    }

    // For JSON responses
    let data: Record<string, unknown>;
    try {
      const text = await response.text();
      data = text ? JSON.parse(text) : {};
    } catch (error) {
      console.error('Error parsing JSON response:', error);
      throw new Error('Failed to parse server response');
    }

    if (!response.ok) {
      const errorMessage = (data?.error as string) || (data?.message as string) || 'Une erreur est survenue';
      throw new Error(errorMessage);
    }

    return { success: true, data: data as T };
  } catch (error: unknown) {
    console.error('API request failed:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Une erreur inattendue s\'est produite' 
    };
  }
} 