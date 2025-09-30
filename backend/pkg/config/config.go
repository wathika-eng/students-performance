package config

import (
	"errors"
	"os"

	"github.com/joho/godotenv"
	_ "github.com/joho/godotenv/autoload"

	"github.com/spf13/viper"
)

type Config struct {
	Port        string
	DatabaseURL string
}

func LoadConfig() (*Config, error) {
	// viper.AddConfigPath("/")
	//viper.SetConfigFile(".env")
	if err := godotenv.Load(".env"); err != nil {
		return nil, err
	}
	viper.AutomaticEnv()
	// if err := viper.ReadInConfig(); err != nil {
	// 	return nil, err
	// }
	// Implementation to load configuration from environment variables or a config file
	config := &Config{
		Port:        viper.GetString("PORT"),
		DatabaseURL: os.Getenv("DATABASE_URL"),
	}
	if config.DatabaseURL == "" {
		return nil, errors.New("missing database url in .env")
	}
	return config, nil
}
