package api

import (
	"backend/pkg/config"
	"backend/pkg/db"
	"backend/pkg/routes"
	"context"
	"fmt"
	"log"
	"log/slog"
	"os"
	"os/signal"
	"syscall"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/recover"
)

func NewServer() {
	// global logger
	logg := slog.New(slog.NewJSONHandler(os.Stdout, nil))
	// default for log
	slog.SetDefault(logg)
	// read .env before starting app
	cfg, err := config.LoadConfig()
	if err != nil {
		log.Fatalf("error reading .env: %v", err)
	}

	db, err := db.NewDatabase(cfg.DatabaseURL)
	if err != nil {
		log.Fatalf("db related error: %v", err)
	}

	app := fiber.New(fiber.Config{
		AppName: "Backend API",
	})
	// middlewares
	app.Use(logger.New())
	app.Use(recover.New())
	app.Use(cors.New())

	routes.RegisterRoutes(app, *cfg, db)

	ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
	defer stop()
	go func() {
		if err := app.Listen(fmt.Sprintf(":%v", cfg.Port)); err != nil {
			log.Fatalf("error starting the api: %v", err)
		}
	}()
	<-ctx.Done()
	log.Printf("shutting down server\n")

}
