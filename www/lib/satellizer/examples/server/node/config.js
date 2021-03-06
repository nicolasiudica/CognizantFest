module.exports = {
  // App Settings
  MONGO_URI: process.env.MONGO_URI || 'localhost',
  TOKEN_SECRET: process.env.TOKEN_SECRET || 'YOUR_UNIQUE_JWT_TOKEN_SECRET',

  // OAuth 2.0
  FACEBOOK_SECRET: process.env.FACEBOOK_SECRET || '84e952da26fc9e7a12bbc32523efa8a0',
  FOURSQUARE_SECRET: process.env.FOURSQUARE_SECRET || 'YOUR_FOURSQUARE_CLIENT_SECRET',
  GOOGLE_SECRET: process.env.GOOGLE_SECRET || '2ap2fc8E001Xg42zzjcIQHUE',
  GITHUB_SECRET: process.env.GITHUB_SECRET || 'YOUR_GITHUB_CLIENT_SECRET',
  INSTAGRAM_SECRET: process.env.INSTAGRAM_SECRET || 'YOUR_INSTAGRAM_CLIENT_SECRET',
  LINKEDIN_SECRET: process.env.LINKEDIN_SECRET || 'YOUR_LINKEDIN_CLIENT_SECRET',
  TWITCH_SECRET: process.env.TWITCH_SECRET || 'YOUR_TWITCH_CLIENT_SECRET',
  WINDOWS_LIVE_SECRET: process.env.WINDOWS_LIVE_SECRET || 'YOUR_MICROSOFT_CLIENT_SECRET',
  YAHOO_SECRET: process.env.YAHOO_SECRET || 'YOUR_YAHOO_CLIENT_SECRET',
  BITBUCKET_SECRET: process.env.BITBUCKET_SECRET || 'YOUR_BITBUCKET_CLIENT_SECRET',
  SPOTIFY_SECRET: process.env.SPOTIFY_SECRET || '95097ebdbb594b0ba041cb5fe753d010',

  // OAuth 1.0
  TWITTER_KEY: process.env.TWITTER_KEY || 'YOUR_TWITTER_CONSUMER_KEY',
  TWITTER_SECRET: process.env.TWITTER_SECRET || 'YOUR_TWITTER_CONSUMER_SECRET'
};
