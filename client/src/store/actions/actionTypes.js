const queryStarted = () => {
  console.log("query started");
  return {
    type: "QUERY_STARTED"
  };
};

const addQueryResult = res => {
  console.log("query success", res);
  return {
    type: "ADD_QUERY_RESULTS",
    payload: {
      ...res
    }
  };
};

const queryError = err => {
  return {
    type: "QUERY_ERROR",
    payload: {
      err
    }
  };
};
