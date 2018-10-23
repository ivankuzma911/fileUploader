module.exports = {
  apps: [{
    name: 'API',
    script: 'app.js',
    instances: 'max',
    autorestart: true,
    watch: true,
    max_memory_restart: '1G',
  }],
};
