package routes

import (
	"encoding/json"
	"github.com/gin-gonic/gin"
	"io/ioutil"
	"models"
	"net/http"
)

func showIndexPage(c *gin.Context) {
	articles := models.GetAllArticles()

	// Call the HTML method of the Context to render a template
	render(c,
		gin.H{
			"title":   "Home Page",
			"payload": articles,
		},
		"index.html",
	)

}


func getArticle(context *gin.Context) {
	if id := context.Param("post_id"); id != "0" {
		if article, err := models.GetPostByID(id); err == nil {

			render(context,
				gin.H{
					"title":   article.Title,
					"payload": article,
				},
				"article.html",
			)
		} else {
			context.AbortWithError(http.StatusNotFound, err)
		}
	} else {
		context.AbortWithStatus(http.StatusBadRequest)
	}

}

func getAllPosts(context *gin.Context) {
	render(context,
		gin.H{
		"payload": models.GetAllArticles(),
		},
		"")
}

func createPosts(context *gin.Context) {
	var p models.Post
	jsonData, _ := ioutil.ReadAll(context.Request.Body)
	json.Unmarshal(jsonData, &p)
	models.CreatePost(&p)

	render(context,
		gin.H{
			"payload": p,
		},
		"")

}

func updatePost(context *gin.Context) {
	if id := context.Param("post_id"); id != "0" {
		if post, err := models.GetPostByID(id); err == nil {
			var p models.Post
			jsonData, _ := ioutil.ReadAll(context.Request.Body)
			json.Unmarshal(jsonData, &p)
			post.ID = p.ID
			post.Title = p.Title
			post.Content = p.Content
			models.UpdatePost(post)
		} else {
			_ = context.AbortWithError(http.StatusNotFound, err)
		}
	} else {
		context.AbortWithStatus(http.StatusBadRequest)
	}
}

func deletePost(context *gin.Context) {
	if id := context.Param("post_id"); id != "0" {
		if post, err := models.GetPostByID(id); err == nil {
			models.DeletePost(post)
			return
		} else {
			_ = context.AbortWithError(http.StatusNotFound, err)
		}
	} else {
		context.AbortWithStatus(http.StatusBadRequest)
	}
}



// Render one of HTML, JSON or CSV based on the 'Accept' header of the request
// If the header doesn't specify this, HTML is rendered, provided that
// the template name is present
func render(c *gin.Context, data gin.H, templateName string) {

	switch c.Request.Header.Get("Accept") {
	case "application/json":
		// Respond with JSON
		c.JSON(http.StatusOK, data["payload"])
		c.Header("Access-Control-Allow-Origin", "*")
	case "application/xml":
		// Respond with XML
		c.XML(http.StatusOK, data["payload"])
	default:
		// Respond with HTML
		c.HTML(http.StatusOK, templateName, data)
	}

}
