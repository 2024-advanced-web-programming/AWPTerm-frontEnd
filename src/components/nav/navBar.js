import React from 'react';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles'; // 수정된 부분

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

const NavBar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            My App
          </Typography>
          <Button color="inherit">로그인</Button>
          <Button color="inherit">회원가입</Button>
        </Toolbar>
      </AppBar>
      <AppBar position="static" color="default">
        <Toolbar>
          <Button color="inherit">동아리 조회</Button>
          <Button color="inherit">동아리 행사</Button>
          <Button color="inherit">동영상</Button>
          <Button color="inherit">사진</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
