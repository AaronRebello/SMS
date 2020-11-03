import React, { useState } from "react";
import { Button } from "@material-ui/core";

function Example() {
  const [show, onShow] = useState(false);

  const onClickOfShow =()=>{
      onShow(!show)
  }
  return (
    <div>
      <Button onClick={onClickOfShow} color={"primary"}>
        <h1>Show me</h1>
      </Button>
      {show ? <h2>this is the content to be shown</h2> : null}
    </div>
  );
}
export default Example;
