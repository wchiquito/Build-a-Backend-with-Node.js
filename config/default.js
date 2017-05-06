"use strict";

const config = {
	PORT: process.env.PORT || 3000,
	NODE_ENV: process.env.NODE_ENV || 'development',
  MONGODB: {
    defaultCollection: 'events',
    defaultUri: 'mongodb://localhost:27017/events-inc'
  }
};

module.exports = config;