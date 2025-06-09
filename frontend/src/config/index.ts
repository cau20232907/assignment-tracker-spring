// Environment configuration
interface Config {
  apiUrl: string;
}

// Get API URL from environment variable or use default based on environment
const getApiUrl = (): string => {
  // Check for explicit environment variable first
  if (typeof process !== 'undefined' && process.env?.VITE_SPRING_URL) {
    return process.env.VITE_SPRING_URL;
  }
  
  // For Jest testing environment, always use localhost
  if (typeof jest !== 'undefined') {
    return 'http://localhost:8080';
  }
  
  // For browser runtime, check hostname
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return 'http://localhost:8080';
    }
  }
  
  // Default to production API for Spring Boot
  return 'https://assignment-tracker-spring-l23a.onrender.com';   // Change this to your production API URL
};

export const config: Config = {
  apiUrl: getApiUrl()
};
