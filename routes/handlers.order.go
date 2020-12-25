package routes

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func getOrders(context *gin.Context) {
	token2 := context.Request.Header.Get("Authorization")
	if token2 != ("Bearer " +token) {
		context.AbortWithError(http.StatusUnauthorized, nil)
		return
	}
	context.JSON(http.StatusOK, gin.H {
		"body" : []int {1, 2, 3},
	})
 }
