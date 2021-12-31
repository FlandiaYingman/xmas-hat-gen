import ControlPanel from "./ControlPanel";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {Container, Stack} from "@mui/material";
import ImagePanel from "./ImagePanel";
import Typography from "@mui/material/Typography";
import * as React from "react";

class App extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            imageUrl: "",
        }
    }


    onImageUrlChange(url) {
        console.log(`onImageUrlChange(): url = ${url}`)
        this.setState({
            imageUrl: url, show: false,
        })
        setTimeout(() => {
            this.setState({show: true})
        }, 100)
    }

    onImageUpload(file) {
        let imageUrl = URL.createObjectURL(file);

        console.log(`onImageUpload(): file = ${file}, imageUrl = ${imageUrl}`)
        this.setState({
            imageUrl: imageUrl, show: false,
        })
        setTimeout(() => {
            this.setState({
                show: true,
            })
        }, 100)

    }

    render() {
        return (<Container maxWidth="md" sx={{
                marginTop: 8,
            }}>
                <Stack spacing={4}>
                    <Container><Typography variant="h2">XMas Hat Generator</Typography></Container>
                    <ControlPanel onImageUrlChange={url => this.onImageUrlChange(url)}
                                  onImageUpload={file => this.onImageUpload(file)}/>
                    <ImagePanel imageUrl={this.state.imageUrl || ""} show={this.state.show}/>
                </Stack>
            </Container>);
    }
}

export default App;
