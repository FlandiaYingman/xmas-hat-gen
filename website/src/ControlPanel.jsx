import PropTypes from 'prop-types';
import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import DownloadIcon from '@mui/icons-material/Download';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

export default function ControlPanel({ onImgUrlChange }) {
  const [inputUrl, setInputUrl] = useState('');

  const urlConfirmButton = (
    <IconButton
      onClick={() => onImgUrlChange(inputUrl)}
    >
      <DownloadIcon />
    </IconButton>
  );
  const imageUrlField = (
    <TextField
      label="URL"
      fullWidth
      onChange={(v) => {
        setInputUrl(v.target.value);
      }}
      InputProps={{
        endAdornment: urlConfirmButton,
      }}
    />
  );
  const imageUploadButton = (
    <Button component="label" variant="contained">
      Upload
      <input
        type="file"
        accept="image/*"
        hidden
        onChange={(event) => {
          onImgUrlChange(URL.createObjectURL(event.target.files[0]));
        }}
      />
    </Button>
  );

  return (
    <Container>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Typography>Upload an Image...</Typography>
        </Grid>
        <Grid item>
          {imageUploadButton}
        </Grid>
        <Grid item>
          <Typography>Or, input the URL of Image ...</Typography>
        </Grid>
        <Grid item>
          {imageUrlField}
        </Grid>
      </Grid>
    </Container>
  );
}

ControlPanel.propTypes = {
  onImgUrlChange: PropTypes.func.isRequired,
};
