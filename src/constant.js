let baseUrl;

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  baseUrl = "http://localhost:3000/todos";
} else {
  baseUrl = "https://caterwauling-hallowed-warbler.glitch.me/todos";
}

export default baseUrl;
