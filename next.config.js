module.exports = {
  reactStrictMode: true,
  env: {
    DB_LOCAL_URI: 'mongodb://127.0.0.1:27017/bookit',
    CLOUDINARY_CLOUD_NAME: 'dendy',
    CLOUDINARY_API_KEY: '173448858953795',
    CLOUDINARY_API_SECRET: 'dQBBfGZb04hzTMN8qqpxkwe8WJs'
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
}
