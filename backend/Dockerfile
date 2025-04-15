FROM openjdk:17-jdk-slim
WORKDIR /app
RUN apt-get update && apt-get install -y netcat && rm -rf /var/lib/apt/lists/*
COPY build/libs/*.jar app.jar
COPY wait-for-mysql.sh .
RUN chmod +x wait-for-mysql.sh
EXPOSE 8080
ENTRYPOINT ["./wait-for-mysql.sh"]