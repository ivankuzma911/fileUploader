module.exports = {
  apps: [{
    name: 'API',
    script: 'app.js',
    instances: 'max',
    autorestart: true,
    watch: true,
    max_restarts: 3,
    max_memory_restart: '1G',
  }],
};
