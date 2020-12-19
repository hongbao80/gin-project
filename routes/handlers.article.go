package routes

import (
	"github.com/gin-gonic/gin"
	"models"
	"net/http"
	"strconv"
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
	if id, err := strconv.Atoi(context.Param("article_id")); err == nil {
		if article, err := models.GetArticleByID(id); err == nil {

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

// Render one of HTML, JSON or CSV based on the 'Accept' header of the request
// If the header doesn't specify this, HTML is rendered, provided that
// the template name is present
func render(c *gin.Context, data gin.H, templateName string) {

	switch c.Request.Header.Get("Accept") {
	case "application/json":
		// Respond with JSON
		c.JSON(http.StatusOK, data["payload"])
	case "application/xml":
		// Respond with XML
		c.XML(http.StatusOK, data["payload"])
	default:
		// Respond with HTML
		c.HTML(http.StatusOK, templateName, data)
	}

}
