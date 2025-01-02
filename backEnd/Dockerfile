# Use uma imagem base com OpenJDK 21
FROM openjdk:21-jdk-slim AS build

# Defina o diretório de trabalho no container
WORKDIR /app

# Copie o arquivo pom.xml para o container
COPY pom.xml /app/

# Copie a pasta src para o container
COPY src /app/src

# Instale o Maven e construa o JAR
RUN apt-get update && apt-get install -y maven
RUN mvn clean package -DskipTests

# Agora vamos usar uma imagem mais leve para rodar a aplicação
FROM openjdk:21-jdk-slim

# Defina o diretório de trabalho no container
WORKDIR /app

# Copie o JAR gerado da imagem de build
COPY --from=build /app/target/api-0.0.1-SNAPSHOT.jar /app/app.jar

# Exponha a porta da aplicação (10000 por padrão)
EXPOSE 10000

# Comando para rodar a aplicação com o perfil 'prod'
CMD ["java", "-jar", "-Dspring.profiles.active=prod", "app.jar"]
