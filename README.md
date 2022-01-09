# Christmas Hat Generator - Backend

## API

### Generating a Christmas Hat on your Image

#### Path

`POST /`

#### Payload

| Name  | Type  | Description                                                              |
|-------|-------|--------------------------------------------------------------------------|
| `dx`  | float | The x offset of the Xmas Hat. The origin is at the center of your image. |
| `dy`  | float | The y offset of the Xmas Hat. The origin is at the center of your image. |
| `sx`  | float | The x-axis scale factor of the Xmas Hat.                                 |
| `sy`  | float | The y-axis scale factor of the Xmas Hat.                                 |
| `r`   | float | The clockwise rotation offset of the Xmas Hat, in degrees.               |
| `img` | file  | Your image, in `jpeg` or `png`.                                          |

#### Response

A `image/png` image, showing the Xmas Hat on top of your image with the specified transformations.