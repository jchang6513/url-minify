export const isValidURL = (url: string) => {
  // Regular expression pattern for URL validation
  var pattern = new RegExp(
    "^(https?:\\/\\/)" + // Protocol (http:// or https://)
    "(([a-zA-Z0-9\\.-]+\\.[a-zA-Z]{2,})|" + // Domain name (e.g., example.com)
    "(localhost)|" + // Localhost
    "([0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}))" + // IP address (e.g., 192.168.0.1)
    "(:[0-9]{1,5})?" + // Port number
    "(\\/\\S*)?$", // Path and query string
    "i"
  );

  // Return true if the URL matches the pattern, false otherwise
  return pattern.test(url);
}
