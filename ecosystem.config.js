module.exports = {
    apps: [{
      name: 'panaderia-backend',
      script: 'dist/main.js',
      watch: false,
      env: {
        NODE_ENV: 'development',
        PORT: 3004,
        DATABASE_URL: 'mysql://admin:Shadowdemon456.@dbaws.cdeqoeycywor.us-east-2.rds.amazonaws.com:3312/panaderia',
      }
    }]
  };
