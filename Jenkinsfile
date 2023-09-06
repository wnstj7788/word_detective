pipeline {
    agent any
    
    stages {
        stage('Prepare') {
            steps {
                script {
                    // GitHub 자격 증명을 사용하여 Git 저장소에서 가져옵니다.
                    checkout([$class: 'GitSCM', 
                        branches: [[name: 'main']],
                        userRemoteConfigs: [[url: 'https://github.com/wnstj7788/YummyPlantsLab.git', credentialsId: 'wnstj7788']]])
                }
            }
            
            post {
                success { 
                    sh 'echo "Successfully Cloned Repository"'
                }
                failure {
                    sh 'echo "Failed to Clone Repository"'
                }
            }    
        }
        
        stage('Application') { 
            steps {
                // application.yml 파일을 복사합니다.
                sh 'cp /var/jenkins_home/workspace/application.yml /var/jenkins_home/workspace/yummy/BE/src/main/resources/'
            }
            
        }

        stage('Build') {
            steps {
                // Gradle 빌드 명령을 실행합니다.!
                dir('/var/jenkins_home/workspace/yummy/BE/') {
                    sh './gradlew clean build'
                }

                // 빌드된 파일을 컨테이너 밖의 디렉토리로 복사합니다.
                sh 'cp -r /var/jenkins_home/workspace/yummy/BE/build /home/ubuntu/docker/BE/'
            }
        }
        
        stage('ssh-dokcer') {
            steps {
                sh 'docker-compose -f /home/ubuntu/docker/docker-compose.yml up -d'
                // dir('/') {
                //     sh 'ssh -i yummyplantyLab.pem ubuntu@54.180.153.77'
                // }
                // dir('/home/ubuntu/docker/'){
                //     sh 'docker-compose up --build -d'
                // }
            }
            
            post {
                success {
                    echo 'Docker Compose succeeded'
                }
                failure {
                    echo 'Docker Compose failed'
                }
            }
        }
    }

    post {
        success {
            // 빌드 및 배포 성공 시 실행할 작업을 추가합니다.
            echo 'Build and deployment successful!'
        }
        failure {
            // 빌드 또는 배포 실패 시 실행할 작업을 추가합니다.
            echo 'Build failed!'
        }
    }
}
