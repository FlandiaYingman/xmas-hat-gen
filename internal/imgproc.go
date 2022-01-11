package internal

import (
	"github.com/disintegration/imaging"
	"image"
	"image/color"
	"image/draw"
	"math"
)

func RInt(f float64) int {
	return int(math.Round(f))
}

func CompositeImg(background image.Image, foreground image.Image, x int, y int, w int, h int, r float64) image.Image {
	canvas := image.NewNRGBA(background.Bounds())

	foreground = resize(foreground, w, h)
	foreground, x, y = rotate(foreground, x, y, r)

	draw.Draw(canvas, background.Bounds(), background, image.Point{}, draw.Over)
	draw.Draw(canvas, foreground.Bounds().Add(image.Pt(x, y)), foreground, image.Point{}, draw.Over)

	return canvas
}

func resize(foreground image.Image, w int, h int) image.Image {
	if w < 0 {
		foreground = imaging.FlipH(foreground)
		w = -w
	}
	if h < 0 {
		foreground = imaging.FlipV(foreground)
		h = -h
	}
	foreground = imaging.Resize(foreground, w, h, imaging.Lanczos)
	return foreground
}

func rotate(foreground image.Image, x int, y int, r float64) (image.Image, int, int) {
	cx := float64(x) + float64(foreground.Bounds().Dx())/2
	cy := float64(y) + float64(foreground.Bounds().Dy())/2
	foreground = imaging.Rotate(foreground, r, color.Alpha{})
	x = RInt(cx - float64(foreground.Bounds().Dx())/2)
	y = RInt(cy - float64(foreground.Bounds().Dy())/2)
	return foreground, x, y
}
