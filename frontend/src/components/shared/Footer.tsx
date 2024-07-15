import { FC, ReactElement } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";

export const Footer: FC = (): ReactElement => {
  return (
    <Box
      sx={{
        width: "100%",

        backgroundColor: "",
        mb: "50px",
      }}
    >
      <Container>
        <Grid container direction="column" alignItems="center">
          <Grid item xs={12}>
            <Typography color="white" variant="h5">
              MERN-AI
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography color="white" variant="subtitle1">
              {`${new Date().getFullYear()} | React | Dor Frantzozo | ChatGPT`}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
