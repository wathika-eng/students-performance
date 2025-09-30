package db

import (
	"backend/pkg/repo"
	"fmt"
	"log"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func NewDatabase(dsn string) (*gorm.DB, error) {
	fmt.Println(dsn)
	db, err := gorm.Open(postgres.Open(dsn))
	if err != nil {
		return nil, fmt.Errorf("error while connecting to the db: %v", err)
	}
	sqlDB, _ := db.DB()
	if err := sqlDB.Ping(); err != nil {
		return nil, fmt.Errorf("error while pinging the db: %v", err)
	}
	log.Printf("stats: %v", sqlDB.Stats())
	db.AutoMigrate(repo.User{})
	return db, nil
}
