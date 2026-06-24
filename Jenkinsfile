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
        stage('Build Backends') {
            steps {
                echo "📦 Building Scanner Backend (Mode 1)..."
                dir('Backend/Scanner-backend') {
                    sh 'npm ci'
                }
                echo "📦 Building Static Scanner (Mode 2)..."
                dir('Backend/Static-scanner') {
                    sh 'npm ci'
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    echo "🚀 Deploying FYP Application..."
                    sh 'cp -r Frontend/dist/* /var/www/html/'
                    withEnv(['BUILD_ID=dontKillMe']) {
                        dir('Backend/Scanner-backend') {
                            sh 'sudo -u sp22-030 bash -c "cd /var/lib/jenkins/workspace/devops-CI-CD/Backend/Scanner-backend && pm2 restart fyp-backend || pm2 start server.js --name fyp-backend"'
                        }
                        dir('Backend/Static-scanner') {
                            sh 'sudo -u sp22-030 bash -c "cd /var/lib/jenkins/workspace/devops-CI-CD/Backend/Static-scanner && pm2 restart static-scanner || pm2 start server.js --name static-scanner"'
                        }
                        sh 'sudo -u sp22-030 pm2 save'
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