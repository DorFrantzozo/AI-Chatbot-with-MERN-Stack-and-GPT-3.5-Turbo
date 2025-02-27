import { TextField } from "@mui/material";

type Props = {
  name: string;
  type: string;
  label: string;
};
const CustomizedInput = (props: Props) => {
  return (
    <TextField
      InputLabelProps={{ style: { color: "white" } }}
      name={props.name}
      label={props.label}
      type={props.type}
      inputProps={{
        style: {
          width: "400px",
          borderRadius: "10",
          fontSize: 20,
          color: "white",
        },
      }}
      sx={{ mb: 2 }}
    ></TextField>
  );
};

export default CustomizedInput;
