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
    post {
  always {
    echo 'Notification stage has been executed.'
  }
  success {
    slackSend(
        channel: '#gerald_ip1',
        tokenCredentialId: 'slack-gallery-bot',
        message: "Build: ${currentBuild.fullDisplayName} has been successful!\n View the web service at : https://gallery-1-kl9v.onrender.com"
        )
  }
  failure {
    slackSend(
        channel: '#gerald_ip1',
        tokenCredentialId: 'slack-gallery-bot',
        message: "Build has failed!\n${env.BUILD_URL}"
        )
  }
}

}