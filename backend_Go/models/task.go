package models

import "github.com/jinzhu/gorm"

type Task struct {
	gorm.Model
	Title       string `json:"title"`
	Description string `json:"description"`
	Done        bool   `json:"done"`
	UserID      uint   `json:"user_id"`
}