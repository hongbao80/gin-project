package routes

import (
	"encoding/json"
	"github.com/gin-gonic/gin"
	"io/ioutil"
	"net/http"
)

const (
	token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkhCVGVhbW9iaSIsImFkbWluIjp0cnVlfQ.PuJ2sHxKHfILwgjSvMbIBsenHzfA2pXTFb-ZKYTU7tk"
)

type Credential struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func authenticate(context *gin.Context) {
	b, _ := ioutil.ReadAll(context.Request.Body)
	var credential Credential
	json.Unmarshal(b, &credential)
	if credential.Email != "boy97haiduong@gmail.com" && credential.Password != "123456" {
		_ = context.AbortWithError(http.StatusOK, nil)
		return
	}
	context.JSON(http.StatusOK, gin.H{
		"token": token,
	})
}
