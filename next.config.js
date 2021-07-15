module.exports = {
  reactStrictMode: true,
  env: {
    DB_LOCAL_URI: 'mongodb://127.0.0.1:27017/bookit',

    CLOUDINARY_CLOUD_NAME: 'dendy',
    CLOUDINARY_API_KEY: '173448858953795',
    CLOUDINARY_API_SECRET: 'dQBBfGZb04hzTMN8qqpxkwe8WJs',

    STRIPE_API_KEY: 'pk_test_51JD1ykJvn3olMTCbRWzfYaIoRuIrLyWgZ1uvTki5STEQEixy4k0mHVqG7xTRNmrot9nDXE1qe3RTCezS7G86oGXO00BlI6U5rP',
    STRIPE_SECRET_KEY: 'sk_test_51JD1ykJvn3olMTCbPzsyUYnbix9DPA7zgHT67IdWVOfVswfYeBQQndHRpvIS5iDqcxWuy8chlcNHL1dGBAobVXZ600oQMb3yt0',
    STRIPE_WEBHOOK_SECRET: 'whsec_wGj8PpKazsXO04xgo9pjbp6aE6UqbqSk',

    SMTP_HOST: 'smtp.mailtrap.io',
    SMTP_PORT: '2525',
    SMTP_USER: '1b69ae228f6672',
    SMTP_PASSWORD: 'a4c888a6141264',
    SMTP_FROM_NAME: 'Book IT',
    SMTP_FROM_EMAIL: 'example@bookit.com'
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
}
