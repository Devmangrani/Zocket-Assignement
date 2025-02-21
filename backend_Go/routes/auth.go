package routes

import (
	"shivambackend/controllers"
	"github.com/gin-gonic/gin"
)

func AuthRoutes(r *gin.Engine) {
	auth := r.Group("/auth")
	{
		auth.POST("/signup", controllers.SignUp)
		auth.POST("/register", controllers.Register)
		auth.POST("/login", controllers.Login)
	}
}