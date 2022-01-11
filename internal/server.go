package internal

import (
	"bufio"
	"bytes"
	"fmt"
	"github.com/gofiber/fiber/v2"
	log "github.com/sirupsen/logrus"
	"image"
	"image/png"
	"io"
	"math"
	"os"
)

type XmasHatGenRequest struct {
	Dx float64 `form:"dx"`
	Dy float64 `form:"dy"`
	Sx float64 `form:"sx"`
	Sy float64 `form:"sy"`
	R  float64 `form:"r"`
}

func LaunchFiber() {
	app := fiber.New()

	app.Get("/", handleGet)
	app.Post("/", handlePost)

	log.Fatal(app.Listen(":8000"))
}

func handleGet(c *fiber.Ctx) error {
	cLog := log.WithFields(log.Fields{
		"ip": c.IP(),
	})
	cLog.Info("GET: /")

	msg := fmt.Sprintf("Error: Use POST instead of GET. ")
	return c.SendString(msg)
}

func handlePost(c *fiber.Ctx) error {
	//TODO: remove when in production environment
	c.Append("Access-Control-Allow-Origin", "*")

	r := new(XmasHatGenRequest)
	err := c.BodyParser(r)
	if err != nil {
		return err
	}

	imgFile, err := c.FormFile("img")
	if err != nil {
		return err
	}
	imgData, err := imgFile.Open()
	if err != nil {
		return err
	}

	log.WithFields(log.Fields{
		"ip":  c.IP(),
		"dx":  r.Dx,
		"dy":  r.Dy,
		"sx":  r.Sx,
		"sy":  r.Sy,
		"r":   r.R,
		"img": imgFile.Filename,
	}).Info("POST: /")

	result, err := handleRequest(imgData, *r)
	if err != nil {
		return err
	}

	data := bytes.Buffer{}
	err = png.Encode(bufio.NewWriter(&data), result)
	if err != nil {
		return err
	}

	c.Type("png")
	err = c.SendStream(bufio.NewReader(&data))
	if err != nil {
		return err
	}

	return nil
}

func handleRequest(backgroundData io.Reader, request XmasHatGenRequest) (image.Image, error) {
	foregroundData, err := os.Open("assets/xhat.png")
	if err != nil {
		return nil, err
	}

	backgroundImg, _, err := image.Decode(backgroundData)
	if err != nil {
		return nil, err
	}
	foregroundImg, _, err := image.Decode(foregroundData)
	if err != nil {
		return nil, err
	}

	backW, backH := float64(backgroundImg.Bounds().Dx()), float64(backgroundImg.Bounds().Dy())
	foreW, foreH := backW*request.Sx, backW*request.Sy

	//TODO: the scaleFactor is using a fixed value. replace with an optional request parameter
	scaleFactor := 756 / backW
	frontendBackW, frontendBackH := backW*scaleFactor, backH*scaleFactor
	frontendForeW, frontendForeH := math.Abs(foreW*scaleFactor), math.Abs(foreH*scaleFactor)

	x := RInt((request.Dx + frontendBackW/2 - frontendForeW/2) / scaleFactor)
	y := RInt((request.Dy + frontendBackH/2 - frontendForeH/2) / scaleFactor)

	resultImg := CompositeImg(backgroundImg, foregroundImg, x, y, RInt(foreW), RInt(foreH), -request.R)

	return resultImg, nil
}
