import { Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import styled from "styled-components";
import { addItemBatch } from "../apiCaller";
import { withStyles } from "@mui/styles";
import { styled as Styled } from "@mui/material/styles";

const styles = {
  root: {
    background: "while",
  },
  input: {
    color: "#6E7272",
  },
};
const FormWrapper = styled.div`
  position: absolute;
  top: 10vh;
  right: 10vw;
  height: 18vw;
  width: 20vw;
  background-color: #7ca5cf;
  border-radius: 1vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  positon: relative;
  top: 0;
  left: 0;
  margin-top: -2vw;
  margin-bottom: 1vw;
  margin-left: -10vw;
  width: 40%;
  height: 10%;
  background-color: white;
  border: 3px solid #7ca5cf;
  border-radius: 2vw;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 80%;
  color: #7ca5cf;
  font-weight: bold;
  z-index: 1;
`;
const ButtonsWrapper = styled.div`
  position: inline;
  bottom: 10%;
  height: 20%;
  width: 80%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const CssTextField = Styled(TextField, {
  shouldForwardProp: (props) => props !== "focusColor",
})((p) => ({
  color: "white",
  borderRadius: "1vw",

  "& .MuiFilledInput-root": {
    background: "transparent",
  },
  "& .MuiInputBase": {
    color: "#6E7272",
    WebkitTextFillColor: "#6E7272",
    background: "#F9F9F9",
    borderRadius: "1vw",
  },
  "& .MuiInputBase-input": {
    color: "#6E7272",
    WebkitTextFillColor: "#6E7272",
    background: "#F9F9F9",
    borderRadius: "1vw",
  },
  // input label when focused
  "& label.Mui-focused": {
    color: p.focusColor,
  },
  // focused color for input with variant='standard'
  "& .MuiInput-underline:after": {
    borderBottomColor: "transparent",
  },
  // focused color for input with variant='filled'
  "& .MuiFilledInput-underline:before": {
    borderBottomColor: "transparent",
  },
  "& .MuiFilledInput-underline": {
    borderBottomColor: "transparent",
  },
  "& .MuiFilledInput-underline:after": {
    borderBottomColor: "transparent",
  },
  "& .MuiFilledInput-underline:hover": {
    borderBottomColor: "transparent",
  },
  "& .MuiFilledInput-underline:focus": {
    borderBottomColor: "transparent",
  },
  // focused color for input with variant='outlined'
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: p.focusColor,
    },
  },
}));

export default function NewItemBatchForm(props) {
  const [itemName, setItemName] = useState("");
  const [warehouseID, setwarehouseID] = useState("");
  const [quantity, setQuantity] = useState("");
  const { classes } = props;

  const handleNameChange = (event) => {
    setItemName(event.target.value);
  };

  const handleQuantityChange = (event) => {
    setQuantity(parseInt(event.target.value));
  };
  const handlewarehouseIDChange = (event) => {
    setwarehouseID(parseInt(event.target.value));
  };

  return (
    <FormWrapper className="FormWrapper">
      <Title>Register New Batch</Title>
      <CssTextField
        style={{
          width: "80%",
          marginTop: "5%",
        }}
        type="text"
        label="name"
        variant="filled"
        onChange={handleNameChange}
        value={itemName}
        focusColor="#F9F9F9"
      />
      <br />
      <CssTextField
        style={{ width: "80%" }}
        type="text"
        label="quantity"
        variant="filled"
        onChange={handleQuantityChange}
        value={quantity}
        focusColor="#F9F9F9"
      />
      <br />
      <CssTextField
        style={{ width: "80%" }}
        type="text"
        label="warehouseID"
        variant="filled"
        onChange={handlewarehouseIDChange}
        value={warehouseID}
        focusColor="#F9F9F9"
      />
      <br />

      <ButtonsWrapper>
        <Button
          variant="contained"
          style={{
            "background-color": "#FEC25A",
            color: "#6E7272",
            boxShadow: "none",
            borderRadius: "0.5vw",
          }}
          onClick={() => addItemBatch(warehouseID, quantity, itemName)}
        >
          Register item batch
        </Button>

        <Button
          variant="contained"
          style={{
            border: "1px solid #A90033",
            color: "#A90033",
            background: "transparent",
            boxShadow: "none",
            borderRadius: "0.5vw",
          }}
          onClick={() => props.setNewBatchForm(false)}
        >
          Cancel{" "}
        </Button>
      </ButtonsWrapper>
    </FormWrapper>
  );
}
