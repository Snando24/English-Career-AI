-- Initial schema: authentication and user profiles

CREATE TABLE users (
    id            UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
    email         VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at    TIMESTAMP    NOT NULL DEFAULT NOW(),
    updated_at    TIMESTAMP    NOT NULL DEFAULT NOW()
);

CREATE TABLE user_profiles (
    id                UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id           UUID         NOT NULL UNIQUE REFERENCES users (id) ON DELETE CASCADE,
    professional_area VARCHAR(50),
    current_level     VARCHAR(20),
    learning_goal     VARCHAR(100),
    daily_minutes     INTEGER      DEFAULT 30,
    weak_areas        JSONB        DEFAULT '[]'::jsonb,
    created_at        TIMESTAMP    NOT NULL DEFAULT NOW(),
    updated_at        TIMESTAMP    NOT NULL DEFAULT NOW()
);
