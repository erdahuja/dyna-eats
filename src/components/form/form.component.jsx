import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CreateIcon from "@material-ui/icons/Create";
import IconButton from "@material-ui/core/IconButton";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";

import { firestore } from "../../firebase/firebase.utils";
import { SpinnerContainer, SpinnerOverlay } from "./with-spinner.styles";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  error: {
    color: "red"
  }
}));

export default function FormDialog() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [qtyRequired, setQtyRequired] = useState(0);
  const [vendorOne, setVendorOne] = useState(0);
  const [vendorTwo, setVendorTwo] = useState(0);
  const [bakery, setBakery] = useState(false);
  const [indian, setIndian] = useState(false);
  const [italian, setItalian] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(null);
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const validate = () => {
    if (!name) {
      throw new Error("Name is missing");
    }
    if (!type) {
      throw new Error("Type is missing");
    }
    if (!bakery && !indian && !italian) {
      throw new Error("Category is missing");
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      setLoading(true);
      validate();
      const docRef = await firestore.collection("supplies").doc(type);
      const snapShot = await docRef.get();
      const data = snapShot.data();
      const id = Object.keys(snapShot.data()).length + 1;
      data[id] = {
        name,
        qtyRequired,
        vendorOne,
        vendorTwo,
        bakery,
        indian,
        italian
      };
      await docRef.set(data);
      setOpen(false);
      setName("");
      setType("");
      setName("");
      setQtyRequired(0);
      setVendorOne(0);
      setVendorTwo(0);
      setIndian(false);
      setItalian(false);
      setBakery(false);
    } catch (error) {
      console.error("add supply error");
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <IconButton aria-label="create" onClick={handleClickOpen}>
        <CreateIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Supply</DialogTitle>
        {isLoading ? (
          <SpinnerOverlay>
            <SpinnerContainer />
          </SpinnerOverlay>
        ) : (
          <form className={classes.form} onSubmit={handleSubmit}>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                onChange={e => setName(e.target.value)}
                value={name}
                id="name"
                label="Name"
                type="string"
                fullWidth
              />

              <TextField
                margin="dense"
                onChange={e => setQtyRequired(e.target.value)}
                value={qtyRequired}
                id="qtyRequired"
                label="Required"
                type="number"
                fullWidth
              />
              <TextField
                margin="dense"
                onChange={e => setVendorOne(e.target.value)}
                value={vendorOne}
                id="vendorOne"
                label="Vendor one"
                type="number"
                fullWidth
              />
              <TextField
                margin="dense"
                onChange={e => setVendorTwo(e.target.value)}
                value={vendorTwo}
                id="vendorTwo"
                label="Vendor two"
                type="number"
                fullWidth
              />
              <FormControl className={classes.formControl}>
                <InputLabel id="simple-select-label">Type</InputLabel>
                <Select
                  labelId="simple-select-label"
                  id="simple-select"
                  required
                  value={type}
                  onChange={e => setType(e.target.value)}
                >
                  <MenuItem value="Vegetables">Vegetables</MenuItem>
                  <MenuItem value="Flour">Flour</MenuItem>
                  <MenuItem value="Fats">Fats</MenuItem>
                  <MenuItem value="Add-Ons">Add-Ons</MenuItem>
                </Select>
              </FormControl>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={bakery}
                    margin="dense"
                    onChange={e => setBakery(e.target.checked)}
                    id="bakery"
                    inputProps={{ "aria-label": "bakery" }}
                  />
                }
                label="Bakery"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={italian}
                    margin="dense"
                    onChange={e => setItalian(e.target.checked)}
                    id="italian"
                    inputProps={{ "aria-label": "italian" }}
                  />
                }
                label="Italian"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={indian}
                    margin="dense"
                    onChange={e => setIndian(e.target.checked)}
                    id="indian"
                    inputProps={{ "aria-label": "indian" }}
                  />
                }
                label="Indian"
              />
              <FormHelperText className={classes.error}>
                {error ? error.message : null}
              </FormHelperText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="secondary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Save
              </Button>
            </DialogActions>
          </form>
        )}
      </Dialog>
    </div>
  );
}
