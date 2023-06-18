import React, { FormEvent, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { Box, Container } from "@mui/system";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Avatar from "@mui/material/Avatar";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { grey } from "@mui/material/colors";
import Link from "@mui/material/Link";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
type Props = {};
interface FormData {
  //   id: number | undefined;
  first_name: string;
  last_name: string;
  gender: string;
  birthday: Date | null | string;
  image: File | null;
}
interface FilePreview {
  file: File;
  previewUrl: string;
}
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Create({}: Props) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);
  const [filePreview, setFilePreview] = useState<FilePreview | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    // id: undefined,
    first_name: "",
    last_name: "",
    gender: "",
    birthday: null,
    image: null,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleChangeGender = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleDateChange = (date: Date | null) => {
    const newDate = dayjs(date).format("YYYY-MM-DD");
    setFormData((prevData: FormData) => ({
      ...prevData,
      birthday: newDate,
    }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      //   console.log();
      const file = event.target.files[0];
      setFilePreview({
        file,
        previewUrl: URL.createObjectURL(file),
      });
      setFormData((prevData: FormData) => ({
        ...prevData,
        image: file,
      }));
      setSelectedFile(file);
    }
  };
  const handleDeleteFile = () => {
    setFilePreview(null);
    setSelectedFile(null);
  };

  const handleSubmit = async () => {
    try {
      const data = new FormData();
      data.append("first_name", formData.first_name);
      data.append("last_name", formData.last_name);
      data.append("gender", formData.gender);
      data.append("birthday", dayjs(formData.birthday).format("YYYY-MM-DD"));
      if (formData.image) {
        data.append("image", formData.image);
      }
      const response = await axios.post<FormData[]>(
        "http://localhost:3001/users",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 201) {
        handleClick();
        setTimeout(() => {
          location.href = "/";
        }, 500);
      }
    } catch (error) {
      handleClickError();
      //   console.error("Error:", error);
    }
  };
  const handleOpenDialog = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsDialogOpen(true);
  };
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleConfirmSubmit = () => {
    setIsDialogOpen(false);
    handleSubmit();
  };

  const [open, setOpen] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };
  const handleClickError = () => {
    setOpenError(true);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const handleErrorClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ p: 2 }}>
        <Box display="flex">
          <Box sx={{ flexGrow: 1 }}>
            <Typography component="div" sx={{ fontSize: "h6.fontSize", m: 5 }}>
              Create New User
            </Typography>
          </Box>
        </Box>
        <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
          <DialogTitle>Confirmation</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to submit the form?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button
              onClick={handleConfirmSubmit}
              variant="contained"
              color="primary"
            >
              Submit
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Update User successfully!
          </Alert>
        </Snackbar>
        <Snackbar
          open={openError}
          autoHideDuration={6000}
          onClose={handleErrorClose}
        >
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            Update User Fail!
          </Alert>
        </Snackbar>
        <form onSubmit={handleOpenDialog}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Grid container spacing={2} justifyContent="center">
                <Grid item xs={6} sm={6}>
                  <Avatar
                    alt="Remy Sharp"
                    src={filePreview?.previewUrl}
                    sx={{ width: 175, height: 175 }}
                  />

                  <input
                    type="file"
                    accept="image/*"
                    id="avatar-upload-input"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                </Grid>
                <Grid item xs={8} sm={8}>
                  <label htmlFor="avatar-upload-input">
                    <Button
                      variant="contained"
                      component="span"
                      //   onClick={handleUpload}
                      //   disabled={!selectedFile}
                    >
                      Upload Profile Picture
                    </Button>
                  </label>
                </Grid>
                <Grid item xs={6} sm={6}>
                  <Button
                    variant="contained"
                    onClick={handleDeleteFile}
                    color="error"
                  >
                    Delete Picture
                  </Button>
                </Grid>
                {/* <Grid item xs={12} sm={6}>
                  <TextField
                    id="last_name"
                    label="Last Name"
                    variant="outlined"
                    onChange={handleChange}
                  />
                </Grid> */}
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="first_name"
                    name="first_name"
                    label="First Name"
                    variant="outlined"
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="last_name"
                    name="last_name"
                    label="Last Name"
                    variant="outlined"
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Gender
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="gender"
                      value={formData.gender}
                      label="Gender"
                      onChange={handleChangeGender}
                    >
                      <MenuItem value={1}>Male</MenuItem>
                      <MenuItem value={2}>Female</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      //   label="DD/MM/YYYY"
                      value={selectedDate}
                      format="DD/MM/YYYY"
                      onChange={handleDateChange}
                      sx={{ width: "100%" }}
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex">
                <Box sx={{ flexGrow: 2 }}></Box>
                <Box sx={{ p: 2 }}>
                  <Link href="/">
                    <Button variant="contained" sx={{ bgcolor: grey[500] }}>
                      CANCEL
                    </Button>
                  </Link>
                </Box>
                <Box sx={{ p: 2 }}>
                  <Button variant="contained" type="submit" color="success">
                    SAVE
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Container>
    </React.Fragment>
  );
}
