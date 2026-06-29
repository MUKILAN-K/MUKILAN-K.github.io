/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow raw GLSL shader imports
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glsl|vert|frag)$/,
      exclude: /node_modules/,
      use: ["raw-loader", "glslify-loader"],
    });
    return config;
  },

  // Transpile packages that ship ESM only
  transpilePackages: [
    "three",
    "@react-three/fiber",
    "@react-three/drei",
    "lenis",
  ],

  // Image domains
  images: {
    domains: [],
  },

  // Experimental features
  experimental: {
    optimizePackageImports: ["framer-motion", "gsap"],
  },
};

module.exports = nextConfig;
