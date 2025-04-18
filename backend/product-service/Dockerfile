## Stage 1: Build
#FROM maven:3.9.9-eclipse-temurin-21 AS build
#
#WORKDIR /app
#
#COPY pom.xml .
#RUN mvn dependency:go-offline -B
#
#COPY src ./src
#RUN mvn package -DskipTests
#
## Stage 2: Run
#FROM eclipse-temurin:21-jdk-alpine
#
#WORKDIR /app
#
#COPY --from=build /app/target/*.jar app.jar
#
#ENV JAVA_OPTS="-Xmx512m -Xms256m"
#
#EXPOSE 8080
#ENTRYPOINT ["sh", "-c", "java ${JAVA_OPTS} -jar app.jar"]

# Use Maven with OpenJDK 21
FROM maven:3.9.9 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the pom.xml and the source code to the working directory
COPY . .

# Run the Spring Boot application with DevTools enabled
CMD ["mvn", "spring-boot:run", "-Dspring-boot.run.profiles=dev", \
     "-Dspring.devtools.restart.enabled=true", \
     "-Dspring.devtools.livereload.enabled=true", \
     "-Dspring.devtools.remote.secret=mysecret"]