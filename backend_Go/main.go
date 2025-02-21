package main

import (
	"shivambackend/database"
	"shivambackend/routes"

	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	database.ConnectDatabase()

	r := gin.Default()

	// Add CORS middleware
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:3000"}
	config.AllowMethods = []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"}
	config.AllowHeaders = []string{"Origin", "Content-Type", "Accept", "Authorization"}

	r.Use(cors.New(config))

	// Define the / route
	r.GET("/", func(c *gin.Context) {
		c.String(http.StatusOK, "Hello World")
	})

	routes.AuthRoutes(r)
	routes.TaskRoutes(r)

	// Start the server
	r.Run() // Vercel will handle the serverless function
}
