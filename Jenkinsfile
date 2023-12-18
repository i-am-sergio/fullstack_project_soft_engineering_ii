pipeline {
    agent any

    environment {
        SONAR_SCANNER_BIN = "/opt/sonar-scanner/bin"
        PATH = "${SONAR_SCANNER_BIN}:${env.PATH}"
        PROJECT_DIR = "/home/neodev/Develop/fullstack_project_soft_engineering_ii"
        BACKEND_DIR = "${PROJECT_DIR}/backend"
        JMETER_RESULTS_DIR = "${PROJECT_DIR}/backend/src/test/resources/jmeter"
        SELENIUM_RESULTS_DIR = "${PROJECT_DIR}/backend/src/test/resources/selenium"
    }

    stages {
        stage("Automatic Build") {
            steps {
                script {
                    dir(BACKEND_DIR) {
                        sh "mvn --version"
                        //sh "mvn clean install" //con tests // funciona
                        //sh "mvn clean install -DskipTests" // sin tests // funciona
                    }
                }
            }
        }
        stage("SonarQube Static Analysis") {
            steps {
                script {
                    dir(PROJECT_DIR) {
                        sh "sonar-scanner --version"
                        //sh "sonar-scanner" // Funciona
                    }
                }
            }
        }
        stage("Unit Testing") {
            steps {
                echo "junit + mockito tests..."
                script {
                    dir(BACKEND_DIR) {
                        sh "mvn --version"
                        // sh "mvn test" // funciona
                    }
                }
            }
        }
        stage("Functional Testing"){
            steps {
                echo "Selenium..."
                script {
                    dir(SELENIUM_RESULTS_DIR) {
                        sh "python --version"
                        // sh "python ./login_test.py --verbose" // funciona
                    }
                }
            }
        }
        stage("Performance Testing"){
            steps {
                script {
                    dir(JMETER_RESULTS_DIR) {
                        sh "jmeter --version"  
                        // sh "jmeter -n -t ./PerformanceTests.jmx -l results.csv -e -o report"
                    }
                }
            }
        }
        stage("Security Testing"){
            steps {
                script {
                    dir(PROJECT_DIR) {
                        sh "zap.sh -version"
                        // sh "zap.sh -port 7000 -quickurl http://localhost:3000 -quickout ${PROJECT_DIR}/reports/security_testing_report.html -quickprogress" // con interfaz
                        // sh "zap.sh -daemon -port 7000 -quickurl http://localhost:3000 -quickout ${PROJECT_DIR}/reports/security_testing_report.html -quickprogress" // sin interfaz
                        sh "dependency-check.sh --version"  
                        // sh "dependency-check.sh --scan ./client --format HTML --out ./client/reporte_dependency_check.html"
                        // sh "dependency-check.sh --scan ./backend --format HTML --out ./backend/reporte_dependency_check.html"
                    }
                }
            }
        }
        stage("Docker Image"){
            steps {
                script {
                    dir(PROJECT_DIR) {
                        sh "docker --version"
                        //sh "docker compose build" // construye los contenedores // funciona
                        //sh "docker compose up -d" // ejecuta los contenedores
                        //sleep(time: 2, unit: 'MINUTES') // espera 1 minuto
                        //sh "docker compose down" // detiene los contenedores
                        //sh "docker compose down --volumes --rmi all" // elimina contenedores
                    }
                }
            }
        }
    }
}