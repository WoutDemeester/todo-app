pipeline {
  agent any

  environment {
    IMAGE_NAME = "todo-api"
    CONTAINER_NAME = "todo-api-container"
  }

  stages {
    stage('Checkout') {
      steps {
        echo 'Cloning repository...'
        git branch: 'main', url: 'https://github.com/WoutDemeester/todo-app.git'
      }
    }

    stage('Build docker image') {
      steps {
        echo 'Building Docker Image...'
        sh "docker build -t ${IMAGE_NAME} ."
      }
    }

    stage('Run container') {
      steps {
        echo "Starting Docker Container..."
        sh 'docker ps -q --filter "name=${CONTAINER_NAME}" | grep -q . && docker stop ${CONTAINER_NAME} && docker rm ${CONTAINER_NAME} || true'
        sh "docker run -d --name ${CONTAINER_NAME} -p 3000:3000 ${IMAGE_NAME}"
      }
    }

    stage('Verify app') {
      steps {
        echo 'Checking if app is running...'
        sh 'sleep 5'
        sh 'curl -f http://localhost:3000 || (echo "App dit not start!" && exit 1)'
      }
    }
  }

  post {
    success {
      echo '✅ Build and deploy succeeded!'
    }
    failure {
      echo '❌ Build failed!'
    }
  }
}
