package handlers

import (
	"backend/pkg/repo"

	"github.com/gofiber/fiber/v2"
)

func (h *Handlers) RegisterUser(c *fiber.Ctx) error {
	if err := c.BodyParser(&repo.User{}); err != nil {
		return c.Status(400).JSON("err")
	}
	h.services.UserSignup(c.Body())
	return nil
}
