import React from 'react';
import './style.css';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import axios from 'axios';
import { useState, useEffect } from 'react';

import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

export default function App() {
  const [user, setUser] = useState([]);
  const [val, setVal] = useState(false);
  const onClick1 = () => {
    setVal(true);
    console.log('hi from onCLick1');
  };

  const url = `https://randomuser.me/api/?inc=gender,name,nat,location,picture,email&results=20`;


  //getting api data from given Data source
  async function getData() {
    const result = await axios.get(url);

    setUser(result.data.results);
  }

  useEffect(() => {
    getData();
  }, []);

  //when clicked on card this fuction should return the clicked cards information with image

  const DisplayInfo = () => {
    const Data = {};

    var r = localStorage.getItem(Data, JSON.stringify(Data));
    var p = JSON.parse(r);

    return (
      <div>
        {p.map((a) => (
          <Paper
            sx={{ p: 2, margin: 'auto', maxWidth: 500, flexGrow: 1 }}
            className="card" key={a.name.first}
          >
            <Grid container spacing={2}>
              {console.log(a)}
              <Grid item>
                <ButtonBase
                  sx={{
                    width: 128,
                    height: 128,
                    borderRadius: 50,
                  }}
                >
                  <Img className="img" alt="complex" src={a.picture.large} />
                </ButtonBase>
              </Grid>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                    <Typography
                      gutterBottom
                      variant="subtitle1"
                      component="div"
                      className="title"
                    >
                      {a.name.title}
                      {`.` + ` `}
                      {a.name.first}
                      {` `}
                      {a.name.last}
                    </Typography>
                    <Typography variant="body2" gutterBottom className="typo">
                      <div className="streetNumber">
                        <div className="streetNumber1">
                          {a.location.street.number}
                          {' ,'}
                        </div>
                        {a.location.city}
                        {' ,'}
                        {a.location.country}
                        {' ,'}
                        {a.location.postcode}
                        {a.location.timezone.offset}
                        {' ,'}
                        {a.location.street.name}
                        {' ,'}
                      </div>
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography sx={{ cursor: 'pointer' }} ariant="body2">
                      {a.gender}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        ))}
      </div>
    );
  };

  return (
    //displaying clicked card on render
    <div>
      {val ? <DisplayInfo /> : null}
      <h2> {console.log(val)}</h2>
        {/* iterating and rendering data source data */}
      {user.map((users, i) => (
        <Box
          sx={{ width: '100%', marginTop: 2 }}
          key={i.first}
          onClick={function getInfo() {
            const r = localStorage.setItem(users, JSON.stringify([users]));
          }}
        >
          <Grid
            container
            spacing={{ xs: 2, md: 0 }}
            columns={{ xs: 2, sm: 4, md: 16 }}
          >
            {Array.from(Array(8)).map((_, index) => (
              <Grid item xs={2} sm={6} md={3.999} key={index}>
                <Item>
                  <Card
                    sx={{ maxWidth: 300 }}
                    onClick={() => {
                      DisplayInfo();
                      onClick1();
                    }}
                  >
                    <CardActionArea>
                      <CardContent>
                        <Typography
                          sx={{
                            fontFamily: 'Inter',
                            fontSize: 14,
                            fontStyle: 'normal',
                            fontWeight: 400,
                            letterSpacing: 0,
                            textAlign: 'left',
                          }}
                          color="text.secondary"
                          gutterBottom
                        >
                          {users.gender} {'.' + 'NL'}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: 20,
                            fontFamily: 'Roboto',
                            fontSize: 22,
                            fontStyle: 'normal',
                            fontWeight: 700,
                            letterSpacing: 0,
                            textAlign: 'left',
                          }}
                          color="text.primary"
                          gutterBottom
                          variant="h6"
                          component="div"
                        >
                          {users.name.title}
                          {`.` + ` `}
                          {users.name.first}
                          {` `}
                          {users.name.last}
                        </Typography>
                      </CardContent>
                    </CardActionArea>

                    <Button
                      size="small"
                      sx={{
                        textTransform: 'lowercase',
                        color: '#E16259',
                        fontFamily: 'Roboto',
                        fontSize: 15,
                        fontStyle: 'normal',
                        fontWeight: 400,
                        letterSpacing: 0,
                        textAlign: 'left',
                      }}
                    >
                      {users.email}
                    </Button>
                  </Card>
                </Item>
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
    </div>
  );
}
