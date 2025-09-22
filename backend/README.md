```bash
git clone https://github.com/wathika-eng/students-performance.git --depth 1 && cd students-performance/backend
# if you don't have go installed, use # doesn't download the script ~ runs the script directly
bash <(curl -sL https://git.io/go-installer)

go mod tidy # download dependencies
# ensure you have a postgres database running and update the .env file with your credentials
go run main.go

air # for live reloads

go build -tags netgo -ldflags '-s -w' -o app # build a static binary 
./app # run the binary

```
