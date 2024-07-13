const API_BASE_URL = "http://your-backend-url/api"; // Replace with your actual backend URL

export async function login(username: string, password: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    return response;
  } catch (error) {
    throw new Error("Network error");
  }
}
