pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                url: 'https://github.com/adeelfarooq01/devops-jenkins-ec2.git'
            }
        }

        stage('Build Frontend') {
            steps {
                sh '''
                cd frontend
                npm install
                npm run build
                '''
            }
        }

        stage('Deploy to Server') {
            steps {
                sshagent(['ec2-ssh-key']) {
                    sh '''
                    scp -r frontend/build sp22-030@20.198.20.235:/home/sp22-030/app/
                    scp -r backend sp22-030@20.198.20.235:/home/sp22-030/app/
                    '''
                }
            }
        }

        stage('Restart Backend') {
            steps {
                sshagent(['ec2-ssh-key']) {
                    sh '''
                    ssh sp22-030@20.198.20.235 "
                        cd /home/sp22-030/app/backend &&
                        npm install &&
                        pm2 restart server || pm2 start server.js
                    "
                }
            }
        }
    }

    post {
        success {
            echo 'FYP Deployment Successful 🚀'
        }
        failure {
            echo 'Deployment Failed ❌'
        }
    }
}