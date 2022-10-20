import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import NoteIcon from "@mui/icons-material/Note";

const HeaderMenu = () => {
  return (
    <AppBar position="static" sx={{ background: "#f5ba13" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <NoteIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h4"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 10,
              display: { xs: "none", md: "flex" },
              color: "inherit",
              textDecoration: "none",
              fontFamily: "McLaren, cursive",
              fontWeight: 200,
            }}
          >
            Noted.
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default HeaderMenu;
