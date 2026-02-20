import axios from "axios"

/*
|--------------------------------------------------------------------------
| AXIOS INSTANCE
|--------------------------------------------------------------------------
| - Cookie based auth (HttpOnly cookies)
| - Accept all status codes
| - Global error handling
|
*/

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",

  headers: {
    "Content-Type": "application/json",
  },

  // ✅ REQUIRED for HttpOnly cookie auth
  withCredentials: true,

  // ✅ Do NOT throw for 4xx / 5xx
  validateStatus: () => true,

  timeout: 15000,
})

/*
|--------------------------------------------------------------------------
| REQUEST INTERCEPTOR
|--------------------------------------------------------------------------
| Runs before every request
| (No token needed — cookie auto sent by browser)
|
*/
axiosInstance.interceptors.request.use(
  (config) => {
    try {
      // Example logging (optional)
      console.log(
        `API Request → ${config.method?.toUpperCase()} ${config.url}`
      )

      return config
    } catch (error) {
      console.error("Request Interceptor Error:", error)
      return config
    }
  },
  (error) => Promise.reject(error)
)

/*
|--------------------------------------------------------------------------
| RESPONSE INTERCEPTOR
|--------------------------------------------------------------------------
| Centralized error handling
|
*/
axiosInstance.interceptors.response.use(
  (response) => {
    const status = response.status

    // Handle all API errors globally
    if (status >= 400) {
      console.error("API Error:", {
        status,
        url: response.config.url,
        data: response.data,
      })

      switch (status) {
        case 401:
          console.log("Unauthorized → login required")
          // Example: redirect to login page
          // window.location.href = "/login"
          break

        case 403:
          console.log("Forbidden request")
          break

        case 404:
          console.log("API route not found")
          break

        case 500:
          console.log("Server error")
          break
      }
    }

    return response
  },

  (error) => {
    // Network error / timeout / server unreachable
    console.error("Network Error:", error?.message)
    return Promise.reject(error)
  }
)

export default axiosInstance