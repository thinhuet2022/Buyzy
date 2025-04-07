FROM maven:3.9.6-eclipse-temurin-21
LABEL authors="thinhnguyen"

WORKDIR /app

COPY target/user-service-0.0.1-SNAPSHOT.jar /app/user-service-0.0.1-SNAPSHOT.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/app/user-service-0.0.1-SNAPSHOT.jar"]

