# Use Maven to build the application
FROM maven:3.8.6-openjdk-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn dependency:go-offline

# Use Spring Boot DevTools for hot reloading
FROM maven:3.8.6-openjdk-17
WORKDIR /app
COPY --from=build /app/target/dependency/BOOT-INF/lib /app/lib
COPY --from=build /app/target/dependency/META-INF /app/META-INF
COPY --from=build /app/target/dependency/BOOT-INF/classes /app

# Install Spring Boot DevTools
RUN mvn spring-boot:run -Dspring-boot.run.profiles=dev

# Expose the port
EXPOSE 8080

# Command to run the application with hot reloading
CMD ["mvn", "spring-boot:run", "-Dspring-boot.run.profiles=dev"] 