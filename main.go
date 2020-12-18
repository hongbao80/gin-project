package main

import (
	"github.com/gin-gonic/gin"
	"routes"
)

func main() {
	// Set Gin to production mode
	gin.SetMode(gin.ReleaseMode)

	routes.InitializeRoutes()

	// Start serving the application on port 8080

}
