-- LightningRoot database schema (PostgreSQL)
CREATE TABLE IF NOT EXISTS users (
    id            SERIAL PRIMARY KEY,
    name          VARCHAR(120) NOT NULL,
    email         VARCHAR(180) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role          VARCHAR(20) NOT NULL DEFAULT 'user', -- 'user' | 'admin'
    status        VARCHAR(20) NOT NULL DEFAULT 'active', -- 'active' | 'inactive'
    created_at    TIMESTAMP NOT NULL DEFAULT NOW(),
    last_login_at TIMESTAMP
);

ALTER TABLE users ADD COLUMN IF NOT EXISTS status VARCHAR(20) NOT NULL DEFAULT 'active';
UPDATE users SET status = 'active' WHERE status IS NULL;

CREATE TABLE IF NOT EXISTS uploads (
    id            SERIAL PRIMARY KEY,
    user_id       INTEGER REFERENCES users(id) ON DELETE SET NULL,
    filename      VARCHAR(255) NOT NULL,
    original_name VARCHAR(255) NOT NULL,
    filesize      INTEGER,
    width         INTEGER,
    height        INTEGER,
    mime_type     VARCHAR(100),
    created_at    TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Stores the numeric summary (sharpness, noise, SNR, contrast, dynamic range, etc.)
-- produced client-side for each analyzed image, kept for admin analytics.
CREATE TABLE IF NOT EXISTS analysis_results (
    id            SERIAL PRIMARY KEY,
    upload_id     INTEGER REFERENCES uploads(id) ON DELETE CASCADE,
    gauge_data    JSONB NOT NULL, -- {"sharpness":123.4,"noise":2.1,"snr":34.2,"contrast":0.62,...}
    created_at    TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS activity_log (
    id          SERIAL PRIMARY KEY,
    user_id     INTEGER REFERENCES users(id) ON DELETE SET NULL,
    action      VARCHAR(100) NOT NULL, -- 'register','login','upload','analyze'
    meta        JSONB,
    ip_address  VARCHAR(64),
    created_at  TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_uploads_user ON uploads(user_id);
CREATE INDEX IF NOT EXISTS idx_activity_created ON activity_log(created_at);

