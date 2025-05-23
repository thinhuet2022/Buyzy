# Use Maven with OpenJDK 21
FROM maven:3.9.9 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the pom.xml and the source code to the working directory
COPY pom.xml .
COPY src ./src

# Package the application (skip tests if necessary)
RUN mvn clean package -DskipTests

# Second stage: create a lightweight image for running the application
FROM eclipse-temurin:21-jdk-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the JAR file from the build stage to the runtime stage
COPY --from=build /app/target/*.jar /app/app.jar

ENV JAVA_OPTS="-Xmx512m -Xms256m"
# Expose the port the application runs on
EXPOSE 8083
ENTRYPOINT ["sh", "-c", "java ${JAVA_OPTS} -jar app.jar"]

# Use Maven with OpenJDK 21
#FROM maven:3.9.9 AS build
#
## Set the working directory inside the container
#WORKDIR /app
#
## Copy the pom.xml and the source code to the working directory
#COPY . .
#
## Run the Spring Boot application with DevTools enabled
#CMD ["mvn", "spring-boot:run", "-Dspring-boot.run.profiles=dev", \
#     "-Dspring.devtools.restart.enabled=true", \
#     "-Dspring.devtools.livereload.enabled=true", \
#     "-Dspring.devtools.remote.secret=mysecret"]