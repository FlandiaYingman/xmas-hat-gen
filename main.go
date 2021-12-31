package main

import (
	"bufio"
	"bytes"
	"fmt"
	"image"
	"image/png"
	"log"

	"github.com/gofiber/fiber/v2"
)

type XmasHatGenRequest struct {
	X      int `form:"x"`
	Y      int `form:"y"`
	Width  int `form:"Width"`
	Height int `form:"height"`
}

func main() {
	app := fiber.New()

	app.Get("/", func(c *fiber.Ctx) error {
		msg := fmt.Sprintf("Error: Use POST instead of GET. ")
		return c.SendString(msg)
	})
	app.Post("/", func(c *fiber.Ctx) error {
		request := new(XmasHatGenRequest)

		err := c.BodyParser(request)
		if err != nil {
			return err
		}
		imgFile, err := c.FormFile("image")
		if err != nil {
			return err
		}

		r, err := imgFile.Open()
		if err != nil {
			return err
		}
		requestImg, _, err := image.Decode(r)
		if err != nil {
			return err
		}

		procImage, err := ProcImage(requestImg, request.X, request.Y, request.Width, request.Height)
		if err != nil {
			return err
		}

		buf := bytes.Buffer{}
		err = png.Encode(bufio.NewWriter(&buf), procImage)
		if err != nil {
			return err
		}

		c.Type("png")
		return c.SendStream(bufio.NewReader(&buf))
	})

	log.Fatal(app.Listen(":8000"))
}
