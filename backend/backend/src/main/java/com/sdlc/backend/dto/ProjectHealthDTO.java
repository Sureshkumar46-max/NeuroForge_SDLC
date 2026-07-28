package com.sdlc.backend.dto;

public class ProjectHealthDTO {

    private String name;
    private int health;

    public ProjectHealthDTO() {
    }

    public ProjectHealthDTO(String name, int health) {
        this.name = name;
        this.health = health;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getHealth() {
        return health;
    }

    public void setHealth(int health) {
        this.health = health;
    }
}