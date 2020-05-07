module.exports = {
  apps : [{
    name: 'pic-resizer',
    script: './services/image_handler/coteResponder.js',
    instances: 1,
    watch: './services/image_handler/coteResponder.js',
    log_file: 'service.log'
  }, {
    name: 'mailer',
    script: './services/mailing/coteResponder.js',
    instances: 1,
    watch: './services/mailing/coteResponder.js',
    log_file: 'service.log'
  }],

  deploy : {
    production : {
      user : 'SSH_USERNAME',
      host : 'SSH_HOSTMACHINE',
      ref  : 'origin/master',
      repo : 'GIT_REPOSITORY',
      path : 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
