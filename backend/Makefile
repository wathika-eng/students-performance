run:
	@echo "Starting the server..."
	@go run main.go

build:
	@go build -tags netgo -ldflags '-s -w' -o app main.go
	@echo "Build completed. Executable created: ./app"

clean:
	@rm -f app
	@echo "Cleaned up build artifacts."

watch:
	@echo "Watching for file changes..."
	