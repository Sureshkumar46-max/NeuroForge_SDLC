package com.sdlc.backend.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

        @Autowired
        private JwtAuthFilter jwtAuthFilter;

        @Bean
        public PasswordEncoder passwordEncoder() {
                return new BCryptPasswordEncoder();
        }

        @Bean
        public CorsConfigurationSource corsConfigurationSource() {

                CorsConfiguration configuration = new CorsConfiguration();

                configuration.setAllowedOrigins(
                                List.of("http://localhost:5173"));

                configuration.setAllowedMethods(
                                List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));

                configuration.setAllowedHeaders(
                                List.of("*"));

                configuration.setAllowCredentials(true);

                UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();

                source.registerCorsConfiguration("/**", configuration);

                return source;
        }

        @Bean
        public SecurityFilterChain securityFilterChain(HttpSecurity http)
                        throws Exception {

                http
                                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                                .csrf(csrf -> csrf.disable())
                                .sessionManagement(session -> session
                                                .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                                .authorizeHttpRequests(auth -> auth

                                                // Authentication
                                                .requestMatchers("/api/auth/**").permitAll()
                                                .requestMatchers(HttpMethod.DELETE, "/api/orgs/*").authenticated()

                                                // Invite APIs
                                                .requestMatchers("/api/invites/**").permitAll()
                                                // .requestMatchers("/api/orgs/*/invites").permitAll()
                                                .requestMatchers(HttpMethod.POST, "/api/orgs/*/invites").permitAll()
                                                .requestMatchers(HttpMethod.GET, "/api/orgs/*/invites")
                                                .hasAnyRole("SUPER_ADMIN", "ORG_ADMIN")
                                                .requestMatchers("/api/orgs/*/invites/accept").permitAll()

                                                // Organization
                                                .requestMatchers(HttpMethod.POST, "/api/orgs").authenticated()
                                                .requestMatchers(HttpMethod.GET, "/api/orgs/*").authenticated()
                                                .requestMatchers(HttpMethod.PUT, "/api/orgs/*").authenticated()

                                                // Team
                                                .requestMatchers(HttpMethod.POST, "/api/orgs/*/teams").authenticated()
                                                .requestMatchers(HttpMethod.GET, "/api/orgs/*/teams").authenticated()
                                                .requestMatchers(HttpMethod.PUT, "/api/orgs/teams/*").authenticated()
                                                .requestMatchers(HttpMethod.DELETE, "/api/orgs/*/teams/*")
                                                .authenticated()

                                                // Everything else
                                                .anyRequest().authenticated())

                                .addFilterBefore(jwtAuthFilter,
                                                UsernamePasswordAuthenticationFilter.class);

                return http.build();
        }
}