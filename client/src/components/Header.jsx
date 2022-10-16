import { Button, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";

function Header() {
  return (
    <header>
      <Stack direction="row" spacing={2}>
        <h1>Keeper</h1>
        <Button variant="text" className="headerMenu">
          Home
        </Button>
      </Stack>
    </header>
  );
}

export default Header;
