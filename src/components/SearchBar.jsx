import React from 'react';
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width:"100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));


const courses = [];
const SearchBar = ({MainCourses ,setMainCourses}) => {
  const handleSearch = (e) => {
    if(courses.length === 0){
      courses.push(...MainCourses)
    }
    setMainCourses(courses);
    setMainCourses(courses.filter((course) => course.title.toLowerCase().includes(e.target.value.toLowerCase())));
    console.log("courses" , courses)
  }

  return (
    <Box sx={{display:"flex" , justifyContent:"center" , flexDirection:"column" , position:"relative" , width:{sm:"100%" , lg:"500px"} }}>
    <Search className=''>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search for courses..."
        inputProps={{ "aria-label": "search" }}
        onChange={handleSearch}
        // onFocus={handleFocus}
        // onBlur={handleBlur}
      />
    {/* {OpenSearchMenu && <SearchResults Search={filterAccounts.trim().toLocaleLowerCase()} theme={theme}/>} */}
    </Search>
</Box>
  );
}

export default SearchBar;
