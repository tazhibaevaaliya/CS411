
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import Divider from '@mui/material/Divider';

// import spotifyLogo from '../../static/images/spotify_logo.png';
const commonStyles = {
  bgcolor: 'background.paper',
  m: 1,
  borderColor: 'text.primary',
  margin: '0 400px',
  padding: '10px',
  display: 'flex',
  justifyContent: 'left',
  border: 1,
  zIndex: 1,
  backgroundColor: '#bde5af',
  flexDirection: 'column',
};

function renderRow(ListChildComponentProps) {
  const { index, style } = ListChildComponentProps;

  return (
    <ListItem style={style} key={index} component="div" disablePadding>
      <ListItemButton>
        <ListItemText primary={`Item ${index + 1}`} />
      </ListItemButton>
    </ListItem>
  );
}

function App() {
  return (
    <div className="App">
      <div>
        <h1 style={{ textAlign: "center" }}>
          Form to choose the Local Artist
        </h1>
      </div>

      <Box sx={{ ...commonStyles }}>
        <div style={{ display: "flex", marginLeft: "20px" }}>
          <h4 style={{ marginRight: "20px" }}>
            Your Favourite Artist Name
          </h4>
          <TextField id="outlined-basic" label="Artist name" variant="outlined" />
        </div>
        <Divider style={{ margin: "20px" }} />
        <div style={{display:"flex"}}>
          <div style={{ border: 'solid', borderWidth: "0.3px", margin: "0 20px", width: 'max-content'}}>
            <FixedSizeList
              height={400}
              width={360}
              itemSize={46}
              itemCount={200}
              overscanCount={5}
            >
              {renderRow}
            </FixedSizeList>
          </div>
          <div style={{margin:"10px 150px"}}>
            {/* <img src={spotifyLogo} alt="fireSpot" /> */}
          </div>
        </div>
      </Box>

    </div>
  );
}

export default App;