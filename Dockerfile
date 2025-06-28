# Use OpenJDK 17 as the base image
FROM openjdk:17-jdk-slim

# Set working directory
WORKDIR /app

# Copy project files
COPY . .

# Give permission to run mvnw
RUN chmod +x mvnw

# Build the Spring Boot app
RUN ./mvnw clean package -DskipTests

# Run the app
CMD ["java", "-jar", "target/ordertrackingsystem-0.0.1-SNAPSHOT.jar"]
