import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import img from "../../../public/code.webp";

export default function MediaCard() {
  return (
    <Card
      sx={{
        maxWidth: 345,
        width: 300,
        backgroundColor: "white",
        ml: "140px",
        mt: "100px",
        opacity: "0.9",
      }}
    >
      <CardMedia sx={{ height: 140 }} image={img} title="green iguana" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Get Help right in your Code
          <hr />
        </Typography>
      </CardContent>
      <CardActions>
        <Button sx={{ color: "black" }}>Try Now</Button>
      </CardActions>
    </Card>
  );
}
