# Use the Maven image with Eclipse Temurin JDK for building the application
FROM maven:3.9.9-eclipse-temurin AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the Maven configuration file to the container
COPY pom.xml .

# Download dependencies and prepare for offline builds
RUN mvn dependency:go-offline -B

# Copy the source code to the container
COPY src ./src

# Build the application and skip tests to speed up the process
RUN mvn package -DskipTests

# Use a lightweight Eclipse Temurin JDK image for running the application
FROM eclipse-temurin:21-jdk-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the built JAR file from the build stage to the runtime stage
COPY --from=build /app/target/*.jar app.jar

# Set Java options for memory management
ENV JAVA_OPTS="-Xmx512m -Xms256m"

# Expose the application port
EXPOSE 8080

# Define the entry point to run the application with the specified Java options
ENTRYPOINT ["sh", "-c", "java ${JAVA_OPTS} -jar app.jar"]