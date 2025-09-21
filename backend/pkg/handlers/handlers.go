package handlers

import (
	"backend/pkg/repo"
	"backend/pkg/services"
	"time"

	"github.com/gofiber/fiber/v2"
)

type Handlers struct {
	repo     *repo.Repo
	services *services.Services
}

func NewHandlers(r *repo.Repo, s *services.Services) *Handlers {
	return &Handlers{
		repo:     r,
		services: s,
	}
}

func (h *Handlers) Health(c *fiber.Ctx) error {
	return c.JSON(fiber.Map{
		"time": time.Now().Local(),
		"data": h.repo.Stats(),
	})
}
