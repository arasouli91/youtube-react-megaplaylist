import { Route, BrowserRouter as Router } from "react-router-dom";
import { Grid } from "@material-ui/core";

import { Nav, VideoList, VideoDetail } from './components';

// notice that default export does not need curly braces
import youtube from "./api/youtube";

const App = () =>
{
    return (
        <Router>
            <Grid justify="center" container spacing={16}>
                <Grid item xs={12}>
                    <Grid container spacing={16}>
                        <Grid item xs={12}>
                            <Nav />
                        </Grid>
                        <Grid item xs={8}>
                            <VideoDetail />
                        </Grid>
                        <Grid item xs={4}>
                            <VideoList />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Router>
    );
}

export default App;
