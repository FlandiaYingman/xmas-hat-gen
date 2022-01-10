import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Button, Container, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import ControlPanel from './ControlPanel';
import ImagePanel from './ImagePanel';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.setImgUrl = this.setImgUrl.bind(this);
    this.setImgTransform = this.setImgTransform.bind(this);
    this.retrieveXhat = this.retrieveXhat.bind(this);
    this.state = {
      show: false,
      imgUrl: '',
      transform: {
        dx: 0,
        dy: 0,
        sx: 1,
        sy: 1,
        r: 0,
      },
    };
  }

  setImgUrl(imgUrl) {
    const show = imgUrl !== '';
    // setTimeout(...) is for forcing the <ImagePanel> to refresh
    // if removed, the <ImagePanel> will not show the 'fade in' or 'shifting' animation when
    // changing an image to another image.
    this.setState({
      show: false,
      imgUrl,
    });
    setTimeout(() => {
      this.setState({
        show,
        imgUrl,
      });
    }, 100);
  }

  setImgTransform(transform) {
    this.setState({ transform });
  }

  retrieveXhat() {
    const {
      imgUrl,
      transform,
    } = this.state;
    fetch(imgUrl)
      .then((res) => res.blob())
      .then((img) => {
        const body = new FormData();
        body.append('dx', transform.dx);
        body.append('dy', transform.dy);
        body.append('sx', transform.sx);
        body.append('sy', transform.sy);
        body.append('r', transform.r);
        body.append('img', img);
        return body;
      })
      .then((form) => fetch('/api', {
        method: 'POST',
        body: form,
      }))
      .then((response) => response.blob())
      .then((result) => {
        const url = URL.createObjectURL(result);

        let a = document.querySelector('#downloader');
        if (!a) {
          a = document.createElement('a');
          a.style.display = 'none';
          a.download = 'out.png';
          a.id = 'downloader';
          document.body.appendChild(a);
        }

        a.href = url;
        a.click();
      });
  }

  render() {
    const { show } = this.state;
    const { imgUrl } = this.state;
    return (
      <Container maxWidth="md" sx={{ marginTop: 8 }}>
        <Stack spacing={4}>
          <Typography variant="h2">XMas Hat Generator</Typography>
          <ControlPanel onImgUrlChange={this.setImgUrl} />
          <Button variant="contained" onClick={this.retrieveXhat}>
            Get Christmas Hat!
          </Button>
          {show && (
            <ImagePanel
              imgUrl={imgUrl}
              onImgTransform={this.setImgTransform}
            />
          )}
        </Stack>
      </Container>
    );
  }
}

export default App;
