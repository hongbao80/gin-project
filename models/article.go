package models

import (
	"context"
	"errors"
	"fmt"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"log"
	"time"
)

type Post struct {
	ID      primitive.ObjectID    `json:"id,omitempty" bson:"_id,omitempty"`
	Title   string `json:"title,omitempty"`
	Content string `json:"content,omitempty"`
}

var client *mongo.Client = getClient()

func GetAllArticles() []Post {
	collection := client.Database("story-mongo-store").Collection("posts")
	filter := bson.D{}

	cursor, err := collection.Find(context.TODO(), filter)
	if err != nil {
		log.Fatal(err)
	}
	var articleResult []Post
 	_ = cursor.All(context.TODO(), &articleResult)
	return articleResult
}

func GetPostByID(id string) (*Post, error) {
	var result Post
	collection := client.Database("story-mongo-store").Collection("posts")
	objectId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return nil, errors.New("id is invalid")
	}
	filter := bson.D{{"_id", objectId}}
	err = collection.FindOne(context.TODO(), filter).Decode(&result)
	if err != nil {
		return nil, errors.New("post not found")
	}
	return &result, nil
}

func CreatePost(p *Post) *Post {
	collection := client.Database("story-mongo-store").Collection("posts")
	doc, _ := toDoc(p)
	podcastResult, err := collection.InsertOne(context.TODO(), doc)
	if err != nil {
		fmt.Println("Insert document error")
		return nil
	}
	fmt.Println(podcastResult.InsertedID)
	p.ID = podcastResult.InsertedID.(primitive.ObjectID)
	return p
}

func UpdatePost(p *Post) {
	collection := client.Database("story-mongo-store").Collection("posts")
	doc, _ := toDoc(p)
	result, err := collection.UpdateOne(
		context.TODO(),
		bson.M{"_id": p.ID},
		bson.D{
			{"$set", doc},
		},
	)
	if err != nil {
		log.Fatal(err)
	}
	if result.MatchedCount != 0 {
		fmt.Println("matched and replaced an existing document")
		return
	}
	if result.UpsertedCount != 0 {
		fmt.Printf("inserted a new document with ID %v\n", result.UpsertedID)
	}
}

func DeletePost(p *Post) {
	collection := client.Database("story-mongo-store").Collection("posts")
	res, err := collection.DeleteOne(context.TODO(), bson.M{"_id": p.ID})
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("deleted %v documents\n", res.DeletedCount)
}

func toDoc(v interface{}) (doc *bson.D, err error) {
	data, err := bson.Marshal(v)
	if err != nil {
		return
	}

	err = bson.Unmarshal(data, &doc)
	return
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
