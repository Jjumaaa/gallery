pipeline{
    agent any
    
            tools {
          nodejs 'Node 18.19.1'
        }
            triggers {
          githubPush()
        }
    stages {
  stage('Checkout') {
    steps {
      git branch: 'master', url: 'https://github.com/Jjumaaa/gallery.git'
    }
  }

  stage('Install dependencies') {
    steps {
      sh 'npm install'
    }
  }

  stage('Build') {
    steps {
      sh 'npm install'
    }
  }

  stage('Test') {
    steps {
      sh 'npm test'
    }
  }

  stage('Deploy') {
    steps {
        withCredentials([string(credentialsId: 'render_webhook', variable: 'Deploy')]) {sh 'curl -X POST $Deploy'}
            }
        }
    }
}