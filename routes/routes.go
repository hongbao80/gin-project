package routes

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"time"
)

var router *gin.Engine

func InitializeRoutes() {
	router := gin.Default()
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:4200"},
		AllowMethods:     []string{"GET","POST","PUT", "PATCH", "DELETE"},
		AllowHeaders:     []string{"Content-Type", "Accept"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		AllowOriginFunc: func(origin string) bool {
			return origin == "https://github.com"
		},
		MaxAge: 12 * time.Hour,
	}))
	router.LoadHTMLGlob("templates/*")
	// Define the route for the index page and display the index.html template
	// To start with, we'll use an inline route handler. Later on, we'll create
	// standalone functions that will be used as route handlers.
	router.GET("/", showIndexPage)
	router.GET("/posts", getAllPosts)
	router.GET("/posts/:post_id", getArticle)

	router.POST("/posts", createPosts)

	router.PUT("/posts/:post_id", updatePost)

	router.DELETE("/posts/:post_id", deletePost)
	router.Run()
}





