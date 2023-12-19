module.exports = {
    "up": "CREATE TABLE city (city_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, city_name VARCHAR(256) NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, UNIQUE KEY (city_name));",
    "down": "DROP TABLE city"
}