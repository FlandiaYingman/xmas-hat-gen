package main

import (
	image "image"
	"image/draw"
	_ "image/jpeg"
	"os"

	"github.com/disintegration/imaging"
)

func ProcImage(imgOriginal image.Image, x int, y int, width int, height int) (image.Image, error) {
	file, err := os.Open("xmas_hat.png")
	if err != nil {
		return nil, err
	}
	imgXmasHat, _, err := image.Decode(file)
	if err != nil {
		return nil, err
	}

	imgXmasHat = imaging.Resize(imgXmasHat, width, height, imaging.Lanczos)

	canvas := image.NewNRGBA(imgOriginal.Bounds())
	draw.Draw(canvas, imgOriginal.Bounds(), imgOriginal, image.Pt(0, 0), draw.Over)
	draw.Draw(canvas, imgXmasHat.Bounds(), imgXmasHat, image.Pt(x, y), draw.Over)

	return canvas, nil
}
