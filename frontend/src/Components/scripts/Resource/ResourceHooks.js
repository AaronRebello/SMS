import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DATA_STATE } from "../../Redux/dataState";
import { onFetchingResource, EditResource } from "../../Redux/Resources/ResourceAction";
import { Typography, Card, CardContent,CardActionArea,Button } from "@material-ui/core";

export default function ResourceHooks() {
  const resource = useSelector((state) => state.resource);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("im running");
    dispatch(onFetchingResource());
  }, []);

  const onDelete =(id) =>{
console.log(id)
  }

  const onUpdate =(resource)  =>{
      //  console.log(resource)
    // onShow(true)
    // onResource(resource)
    resource.title = 'title'
    dispatch(EditResource(resource))
  }
  return (
    <React.Fragment>
      {resource.dataState === DATA_STATE.FETCH_SUCCESS ? (
        <React.Fragment>
          {resource.resource.map((resource) => (
            <div className="col-md-12">
              <Card>
                <CardContent>  
                  <Typography variant="h5">{resource.title}</Typography>
                  <Typography variant="h5">{resource.board}</Typography>
                  <Typography variant="h5">{resource.subject}</Typography>
                  <Typography variant="h5">{resource.class}</Typography>
                  <Typography variant="h5">{resource.description}</Typography>
                </CardContent>
                <CardActionArea>
                <Button onClick={() => onDelete(resource._id)}>Delete</Button>
                <Button onClick={() => onUpdate(resource)} >Update</Button>

            </CardActionArea>
              </Card>
            </div>
          ))}
        </React.Fragment>
      ) : (
        <Typography> Resource loading ..</Typography>
      )}
    </React.Fragment>
    // <React.Fragment>
    // {console.log(resource)}
    // </React.Fragment>
  );
}
