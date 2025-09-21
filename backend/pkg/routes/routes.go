package routes

import (
	"backend/pkg/config"
	"backend/pkg/handlers"
	"backend/pkg/repo"
	"backend/pkg/services"

	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

func RegisterRoutes(r fiber.Router, cfg config.Config, db *gorm.DB) {
	repo := repo.NewRepo(db)
	services := services.NewServices(repo)
	handlers := handlers.NewHandlers(repo, services)

	api := r.Group("/api/v1")
	api.Get("/health", handlers.Health)
}
