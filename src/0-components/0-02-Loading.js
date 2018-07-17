import React from "react";
import { RequestStatus } from "./index";

export default function Loading(props) {
  if (props.isLoading) {
    if (props.timedOut) {
      return <div>Loader timed out!</div>;
    } else if (props.pastDelay) {
      return <RequestStatus />;
    }
    return null;
  } else if (props.error) {
    return <div>Error! Component failed to load</div>;
  }
  return <div>haha123</div>;
}
