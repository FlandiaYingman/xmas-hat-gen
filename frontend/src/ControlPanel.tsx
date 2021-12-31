import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {IconButton} from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';


export default class ControlPanel extends React.Component<any, any> {
    imageUrlField: HTMLDivElement;

    render() {
        return (
            <Container>
                <Grid container direction="column" spacing={2}>
                    <Grid item>
                        <Typography>Upload an Image...</Typography>
                    </Grid>
                    <Grid item>
                        <Button component="label" variant="contained">
                            Upload
                            <input type="file" onChange={event => {
                                this.props.onImageUpload(event.target.files[0])
                            }} accept="image/*" hidden/>
                        </Button>
                    </Grid>
                    <Grid item>
                        <Typography>Or, input the URL of Image ...</Typography>
                    </Grid>
                    <Grid item>
                        <TextField label="URL"
                                   fullWidth
                                   onChange={(v) => this.setState({
                                       imageUrl: v.target.value
                                   })}
                                   InputProps={{
                                       endAdornment: <IconButton
                                           onClick={() => this.props.onImageUrlChange(this.state.imageUrl)}
                                       ><DownloadIcon/></IconButton>
                                   }}/>
                    </Grid>
                </Grid>
            </Container>
        );
    }
}
