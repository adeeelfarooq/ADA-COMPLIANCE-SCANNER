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

        // Mode 1 aur Mode 2 dono backends ki dependencies yahan install hongi
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
                    
                    // 1️⃣ Frontend deploy karo
                    sh 'cp -r Frontend/dist/* /var/www/html/'
                    
                    // 🔥 Asli Jadu: Yeh line Jenkins ko background processes kill karne se rokti hai
                    withEnv(['BUILD_ID=dontKillMe']) {
                        
                        // 2️⃣ Scanner Backend (Mode 1 - Port 3000) ko start/restart karo
                        dir('Backend/Scanner-backend') {
                            sh '''
                            pm2 restart fyp-backend || pm2 start server.js --name "fyp-backend"
                            '''
                        }
                        
                        // 3️⃣ Static Scanner (Mode 2 - Port 3002) ko start/restart karo
                        dir('Backend/Static-scanner') {
                            sh '''
                            pm2 restart static-scanner || pm2 start server.js --name "static-scanner"
                            '''
                        }
                        
                        // PM2 ki state save karo taake VM reboot ho tab bhi auto-start ho sake
                        sh 'pm2 save'
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