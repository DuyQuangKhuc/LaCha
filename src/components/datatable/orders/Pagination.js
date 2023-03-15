import React from "react";
import Pagination from "@mui/material/Pagination";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

function PaginationButtons({page, setPage ,totalPage}) {
  const handleChange = (event, value) => {
    setPage(value);
  };
  return (
    <Wrapper>
      <Pagination
        count={totalPage}
        page={page}
        showFirstButton
        showLastButton
        onChange={handleChange}
        sx={{
          ".css-yuzg60-MuiButtonBase-root-MuiPaginationItem-root": {
            fontSize: "12px !important",
            fontWeight: "700",
            color: "#65dc73 !important",
          },
          ".css-g2z002-MuiSvgIcon-root-MuiPaginationItem-icon": {
            fontSize: "20px !important",
            fontWeight: "700",
            color: "#65dc73 !important",
          },
          ".Mui-selected": {
            backgroundColor: "#E2E8F0 !important",
            color: "#65dc73 !important",
          },
        }}
      />
    </Wrapper>
  );
}

export default PaginationButtons;
