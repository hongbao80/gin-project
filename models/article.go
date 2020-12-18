package models

import (
	"context"
	"errors"
	"fmt"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"log"
	"time"
)

type article struct {
	ID      int    `json:"id"`
	Title   string `json:"title"`
	Content string `json:"content"`
}

var client *mongo.Client = getClient()

// For this demo, we're storing the article list in memory
// In a real application, this list will most likely be fetched
// from a database or from static files
var articleList = []article{
	article{ID: 1, Title: "Article 1", Content: "Article 1 body"},
	article{ID: 2, Title: "Article 2", Content: "Article 2 body"},
}

func GetAllArticles() []article {
	collection := client.Database("story-mongo-store").Collection("articles")
	filter := bson.D{}

	cursor, err := collection.Find(context.TODO(), filter)
	if err != nil {
		log.Fatal(err)
	}
	var articleResult []article
	_ = cursor.All(context.TODO(), &articleResult)
	return articleResult
}

func GetArticleByID(id int) (*article, error) {
	var result article
	collection := client.Database("story-mongo-store").Collection("articles")
	filter := bson.D{{"id", id}}
	err := collection.FindOne(context.TODO(), filter).Decode(&result)
	if err != nil {
		return nil, errors.New("article not found")
	}
	return &result, nil
}

func getClient() *mongo.Client {
	client, err := mongo.NewClient(options.Client().ApplyURI("mongodb://user.hbteamobi:123456-secret@localhost:27017/?authSource=story-mongo-store&readPreference=primary&appname=MongoDB%20Compass&ssl=false"))
	if err != nil {
		fmt.Println("Error init client", err)
		return nil
	}
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	err = client.Connect(ctx)
	if err != nil {
		log.Fatal(err)
	}
	return client
}
