import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { Box, Container } from "@mui/system";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Link from "@mui/material/Link";
import TablePagination from "@mui/material/TablePagination";
import Stack from "@mui/material/Stack";
import { yellow } from "@mui/material/colors";
import axios, { AxiosResponse, AxiosError } from "axios";
type Props = {};

// const data = [
//   {
//     id: 1,
//     firstName: "John",
//     lastName: "Doe",
//     gender: "Male",
//     birthDay: "1997-02-01",
//   },
//   {
//     id: 2,
//     firstName: "John",
//     lastName: "Doe",
//     gender: "Male",
//     birthDay: "1997-02-01",
//   },
//   {
//     id: 3,
//     firstName: "John",
//     lastName: "Doe",
//     gender: "Male",
//     birthDay: "1997-02-01",
//   },
//   {
//     id: 4,
//     firstName: "John",
//     lastName: "Doe",
//     gender: "Male",
//     birthDay: "1997-02-01",
//   },
//   {
//     id: 5,
//     firstName: "John",
//     lastName: "Doe",
//     gender: "Male",
//     birthDay: "1997-02-01",
//   },
//   {
//     id: 6,
//     firstName: "John",
//     lastName: "Doe",
//     gender: "Male",
//     birthDay: "1997-02-01",
//   },
//   {
//     id: 7,
//     firstName: "John",
//     lastName: "Doe",
//     gender: "Male",
//     birthDay: "1997-02-01",
//   },
//   {
//     id: 8,
//     firstName: "John",
//     lastName: "Doe",
//     gender: "Male",
//     birthDay: "1997-02-01",
//   },
//   {
//     id: 9,
//     firstName: "John",
//     lastName: "Doe",
//     gender: "Male",
//     birthDay: "1997-02-01",
//   },
//   {
//     id: 10,
//     firstName: "John",
//     lastName: "Doe",
//     gender: "Male",
//     birthDay: "1997-02-01",
//   },
//   {
//     id: 11,
//     firstName: "John",
//     lastName: "Doe",
//     gender: "Male",
//     birthDay: "1997-02-01",
//   },
//   {
//     id: 12,
//     firstName: "John",
//     lastName: "Doe",
//     gender: "Male",
//     birthDay: "1997-02-01",
//   },
// ];
export interface FormData {
  id: number | undefined;
  first_name: string;
  last_name: string;
  gender: string;
  birthday: Date | null;
  image: string;
  gender_name: string;
}
type GenderType = string[]; // Define the array type
export default function List({}: Props) {
  const apiHost = "http://localhost:3001";
  const [users, setUsers] = useState<FormData[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(apiHost + "/users");
      const data = await response.json();
      setUsers(
        data.map((value: FormData, index: number) => ({
          ...value,
          gender_name: value.id == 1 ? "Male" : "Female",
        }))
      );
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };
  const UserDelete = async (id: number | undefined) => {
    // alert(id);
    const response = await axios
      .delete(apiHost + "/users/" + id)
      .then((response: AxiosResponse) => {
        // Handle successful response
        fetchData();
      })
      .catch((error: AxiosError) => {
        // Handle error
        console.error("Request failed:", error.message);
      });
    // console.log(response);
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const rows = users.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ p: 2 }}>
        <Box display="flex">
          <Box sx={{ flexGrow: 1 }}>
            <Typography component="div" sx={{ fontSize: "h6.fontSize", m: 1 }}>
              Users List
            </Typography>
          </Box>
          <Box>
            <Link href="/create">
              <Button variant="contained">Add+</Button>
            </Link>
          </Box>
        </Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Profile Picture</TableCell>
                <TableCell align="center">First Name</TableCell>
                <TableCell align="center">Last Name</TableCell>
                <TableCell align="center">Gender</TableCell>
                <TableCell align="center">Birthday</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Avatar
                      alt="Remy Sharp"
                      src={apiHost + "/uploads/" + row.image}
                    />
                  </TableCell>
                  <TableCell align="center">{row.first_name}</TableCell>
                  <TableCell align="center">{row.last_name}</TableCell>
                  <TableCell align="center">{row.gender_name}</TableCell>
                  <TableCell align="center">
                    {row.birthday ? new Date(row.birthday).toDateString() : "-"}
                  </TableCell>
                  <TableCell align="center">
                    <Stack direction="row" spacing={2}>
                      <Link href={"/update/" + row.id}>
                        <Button
                          variant="contained"
                          sx={{ bgcolor: yellow[700] }}
                        >
                          Edit
                        </Button>
                      </Link>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => UserDelete(row.id)}
                      >
                        Delete
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Container>
    </React.Fragment>
  );
}
