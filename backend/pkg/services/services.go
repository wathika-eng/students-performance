package services

import "backend/pkg/repo"

type Services struct {
	repo *repo.Repo
}

func NewServices(repo *repo.Repo) *Services {
	return &Services{
		repo: repo,
	}
}
