package routes

import (
	"github.com/gin-gonic/gin"
)

var router *gin.Engine

func InitializeRoutes() {
	router := gin.Default()

	router.LoadHTMLGlob("templates/*")
	// Define the route for the index page and display the index.html template
	// To start with, we'll use an inline route handler. Later on, we'll create
	// standalone functions that will be used as route handlers.
	router.GET("/", showIndexPage)
	router.GET("/article/view/:article_id", getArticle)
	router.Run()
}

