import { Grid, TextField } from "@mui/material";
import React from "react";
import "../../css/KidsInfoPage/KidsInfoComp.css";
const KidsInfoComp = () => {
  return (
    <Grid className="KidsInfoComp" width={"800px"}>
      <Grid item className="flex_row" mt={4}>
        <Grid item width={"20%"}>
          <span>
            정면{" "}
            <span className="next_line">
              사진 <span className="star">*</span>
            </span>
          </span>
        </Grid>
        <Grid item width={"80%"} textAlign="center">
          <img src="/img/etcImg/차은우.jpg" alt="" width={"30%"} />
        </Grid>
      </Grid>
      <Grid item className="flex_row" mt={4}>
        <Grid item width={"20%"}>
          <span>
            이 름 <span className="star">*</span>
          </span>
        </Grid>
        <Grid item width={"80%"} textAlign="center">
          <TextField sx={{ width: "100%" }} />
        </Grid>
      </Grid>
      <Grid item className="flex_row" mt={4}>
        <Grid item width={"20%"}>
          <span>
            나 이 <span className="star">*</span>
          </span>
        </Grid>
        <Grid item width={"80%"} textAlign="center">
          <TextField sx={{ width: "100%" }} type="number" />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default KidsInfoComp;
