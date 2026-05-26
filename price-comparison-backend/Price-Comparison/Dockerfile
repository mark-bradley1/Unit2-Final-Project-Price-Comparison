# Build stage
FROM eclipse-temurin:21-jdk AS build

WORKDIR /app

# Copy everything
COPY . .

# Give Maven wrapper permission
RUN chmod +x mvnw

# Build app
RUN ./mvnw clean package -DskipTests


# Run stage
FROM eclipse-temurin:21-jre

WORKDIR /app

# Copy built jar from build stage
COPY --from=build /app/target/*.jar app.jar

# Render uses PORT env variable
EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]