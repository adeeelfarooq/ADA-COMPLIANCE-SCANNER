pipeline {
    agent any

    stages {
        stage('Build Frontend') {
            steps {
                dir('Frontend') {
                    sh '''
                    npm ci
                    npm run build
                    '''
                }
            }
        }

        stage('Build Backend') {
            steps {
                dir('Backend/Scanner-backend') {
                    sh 'npm ci'
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    echo "Deploying FYP Application..."
                    sh 'cp -r Frontend/dist/* /var/www/html/'
                    
                    dir('Backend/Scanner-backend') {
                        sh '''
                        pm2 restart fyp-backend || pm2 start npm --name "fyp-backend" -- start
                        '''
                    }
                }
            }
        }
    }

    post {
        success { echo 'Deployment Successful 🚀' }
        failure { echo 'Deployment Failed ❌' }
    }
}