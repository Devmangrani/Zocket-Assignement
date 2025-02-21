package controllers

import (
	"net/http"
	"shivambackend/database"
	"shivambackend/models"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
)

func GetTasks(c *gin.Context) {
	var tasks []models.Task
	collection := database.DB.Collection("tasks")
	cursor, err := collection.Find(c, bson.M{})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer cursor.Close(c)

	if err = cursor.All(c, &tasks); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, tasks)
}

func CreateTask(c *gin.Context) {
	var task models.Task
	if err := c.ShouldBindJSON(&task); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	collection := database.DB.Collection("tasks")
	_, err := collection.InsertOne(c, task)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, task)
}

func UpdateTask(c *gin.Context) {
	id := c.Param("id")
	var task models.Task

	collection := database.DB.Collection("tasks")
	filter := bson.M{"_id": id}
	err := collection.FindOne(c, filter).Decode(&task)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Task not found"})
		return
	}

	c.ShouldBindJSON(&task)
	update := bson.M{
		"$set": task,
	}
	_, err = collection.UpdateOne(c, filter, update)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, task)
}

func DeleteTask(c *gin.Context) {
	id := c.Param("id")
	collection := database.DB.Collection("tasks")
	filter := bson.M{"_id": id}
	_, err := collection.DeleteOne(c, filter)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Task deleted"})
}
