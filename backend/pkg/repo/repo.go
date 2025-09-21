package repo

import (
	"fmt"

	"gorm.io/gorm"
)

type Repo struct {
	db *gorm.DB
}

func NewRepo(db *gorm.DB) *Repo {
	return &Repo{
		db: db,
	}
}

func (r *Repo) Stats() map[string]string {
	db, _ := r.db.DB()
	stats := db.Stats()
	return map[string]string{
		"MaxOpenConnections": fmt.Sprintf("%d", stats.MaxOpenConnections),
		"OpenConnections":    fmt.Sprintf("%d", stats.OpenConnections),
		"InUse":              fmt.Sprintf("%d", stats.InUse),
		"Idle":               fmt.Sprintf("%d", stats.Idle),
		"WaitCount":          fmt.Sprintf("%d", stats.WaitCount),
		"WaitDuration":       stats.WaitDuration.String(),
		"MaxIdleClosed":      fmt.Sprintf("%d", stats.MaxIdleClosed),
		"MaxLifetimeClosed":  fmt.Sprintf("%d", stats.MaxLifetimeClosed),
	}
}
