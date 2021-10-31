## [How it works]

## 1. deploy-stage.yml starts (file location : /.github/workflows/deploy-stage.yml)

        Trigger : the latest code will pushed in Master branch
        step 1) npm Build and Validate
        step 2) Deploy the code using AWS Code Deploy

## 2. AWS Code Deploy starts (file location : /appspec.yml and /scripts/\*)

        Trigger : deploy-stage.yml [deploy] action calls AWS Code Deploy

        [AWS Code Deploy Steps]
        step 1) Application Stop
                1. delete current running pm2 node
                2. validate pm2 node deleted
                3. stop nginx server


        step 2) Download Bundle[can't modify] : During this deployment lifecycle event, the CodeDeploy agent copies the application revision files to a temporary location: /opt/codedeploy-agent/deployment-root/{deployment-group-id}/{deployment-id}/deployment-archive folder on Amazon Linux, Ubuntu Server, and RHEL Amazon EC2 instances.

        step 3) Before Install
                1. delete current application
                2. validate current application deleted

        step 4) Install[can't modify] : During this deployment lifecycle event, the CodeDeploy agent copies the revision files from the temporary location to the final destination folder. This event is reserved for the CodeDeploy agent and cannot be used to run scripts.

        step 5) After Install
                1. copy .evn file to application root dir
                2. migrate sequelize
                3. copy all client's build files to under /var/www/kcsa-demo dir
        step 6) Application Start
                1. start pm2
                2. restart nginx
        step 7) Validate Service
                1. run pm2 list to check the application running in background
