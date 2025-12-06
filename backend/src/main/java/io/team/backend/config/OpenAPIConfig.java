package io.team.backend.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.servers.Server;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(
        info = @Info(
                title = OpenAPIConfig.API_TITLE,
                version = OpenAPIConfig.API_VERSION
        ),
        servers = {
                @Server(
                        url = OpenAPIConfig.API_URL
                )
        }
)
public class OpenAPIConfig {
    public static final String API_TITLE = "ZUS Notification Tool API";
    public static final String API_VERSION = "1.0.0";
    public static final String API_URL = "https://hacknation-task-backend-latest.onrender.com/api/v1.0";
}
