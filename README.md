# url-minify

`url-minify` is a simple URL shortener application built with Next.js and utilizing Vercel Storage KV for storing the shortened URLs. This application allows users to shorten long URLs and provides a shorter, more convenient version for sharing.

## Features

- Shorten long URLs to a custom-generated, shorter version.
- Access the original URL by using the generated short version.
- Store and manage the shortened URLs in Vercel Storage KV.

## Deployment

The application is deployed using Vercel, and you can access it at [https://your-app-url.vercel.app](https://your-app-url.vercel.app).

## Local Development

To run the application locally, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/your-username/url-minify.git
cd url-minify
```

2. Install the dependencies:

```bash
npm install
# or
yarn install
```

3. Set up Vercel environment variables:

   - Create a `.env.local` file in the root of the project.
   - Obtain your Vercel Storage KV API token and store it as `VERCEL_API_TOKEN` in the `.env.local` file.

4. Run the development server:

```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your web browser to access the application.

## Configuration

In the `config.js` file, you can customize some aspects of the application:

- `shortBaseUrl`: The base URL for the shortened URLs (e.g., `https://your-app-url.vercel.app/short/`).

## Deploying to Vercel

To deploy the application to Vercel, simply push your changes to the `main` branch, and Vercel will automatically build and deploy the application using the configuration in `vercel.json`.

## Dependencies

This project relies on the following main dependencies:

- Next.js: A React framework for building server-side rendered (SSR) and statically generated (SSG) applications.
- Vercel Storage KV: Vercel's serverless database for storing and managing the shortened URLs.

## License

This project is licensed under the [MIT License](LICENSE.md). Feel free to modify and use it according to your needs.

---

Thank you for your interest in `url-minify`! If you have any questions or feedback, feel free to create an issue or reach out to us. Happy shortening! 🚀
