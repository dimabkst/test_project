require('dotenv').config();


const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET || "secret",
    fb_app_id: process.env.FB_APP_ID,
    fb_app_secret: process.env.FB_APP_SECRET,
    google_app_id: process.env.GOOGLE_APP_ID,
    google_app_secret: process.env.GOOGLE_APP_SECRET
}

module.exports = config;