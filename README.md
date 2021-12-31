# Christmas Hat Generator - Backend

## TODO

Support Christmas Hat rotation.

## Goal

When the user have determined how the Christmas hat looks like with the frontend, it sends information to this backend.

- The original image to generate the Christmas Hat on.
- The position of the Christmas hat.
- The size of the Christmas hat.

Then, the backend replies a processed image, showing the Christmas hat on top of the original image with the location
and size specified by the user.

## API

### Generate a Christmas Hat on Your Own Image

#### Usage

``POST /``

#### Payload

As `multipart/form-data`, all fields are required.

| Name     | Description                                                           | Format         | Default  |
|----------|-----------------------------------------------------------------------|----------------|----------|
| `image`  | The original image (your own image) to generate the Christmas Hat on. | Multipart File | Required |
| `x`      | The x-axis coordinate of the Christmas Hat (from upper-left corner).  | Integer        | Required |
| `y`      | The y-axis coordinate of the Christmas Hat (from upper-left corner).  | Integer        | Required |
| `width`  | The width of the Christmas Hat in pixels.                             | Integer        | Required |
| `height` | The height of the Christmas Hat in pixels.                            | Integer        | Required |

#### Response

An `image/png`, showing the Christmas hat on top of the original image with the location and size specified by the user.