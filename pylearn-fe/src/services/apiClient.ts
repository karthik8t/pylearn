// Configure base API client
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const apiClient = {
    async request(endpoint: string, options: RequestInit) {
        const response: Response  = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options?.headers,
            },
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Request failed');
        }

        return response.json();
    },

    post(endpoint: string, body: object) {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(body),
        });
    },
};