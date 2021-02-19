import React, { useState, useEffect } from "react";

import applicationAPI from "../../apis/applicationAPI";
import atTheOffice from "../../assets/images/atTheOffice.svg";
import history from "../../history";
import BasicTable from "../history/History";
import "./home.css";

const Home = () => {
  useEffect(() => {
    if (!sessionStorage.getItem("tkn")) {
      history.push("/");
    }
  }, []);

  const [url, setUrl] = useState("https://www.google.com/");

  const onSubmit = async (e) => {
    e.preventDefault();
    let body = { url: url };
    console.log(url);
    // body = JSON.stringify(body);
    console.log(body);
    // const response = await applicationAPI.post("/webcounter/add", body, {
    //   headers: {
    //     Authorization: `Bearer ${sessionStorage.getItem("tkn")}`,
    //   },
    // });
    // console.log(response);
    setDom(afterSubmit());
  };

  const onUrlChange = (e) => {
    // console.log(e);
    console.log(url);
    setUrl(e.target.value);
  };

  const newUrl = () => {
    setDom(beforeSubmit());
  };

  const beforeSubmit = () => {
    return (
      <div className="search-part">
        Check the last time when you checked the webpage word count.
        <form onSubmit={onSubmit}>
          <input
            value={url}
            onChange={onUrlChange}
            className="search-box"
            placeholder="Put your website URL here. Eg. https://www.growth.cx/"
          ></input>
          <button type="submit" className="get-insight">
            Get Insight
          </button>
        </form>
      </div>
    );
  };
  const afterSubmit = () => {
    return (
      <div className="search-part">
        <div>
          <p className="afterSubmit">
            www.growth.cx{" "}
            <i
              onClick={newUrl}
              className="fa fa-times"
              aria-hidden="true"
              style={{ marginLeft: "5px" }}
            ></i>
          </p>
          <div className="count-box">
            <div className="count-text">Total Word Count</div>
            <div className="word-count">100</div>
            <div className="feedback-text">
              "WooHoo! You’re doing a good job!"
            </div>
          </div>
        </div>
      </div>
    );
  };

  const [dom, setDom] = useState(beforeSubmit());

  return (
    <div className="container-fluid">
      <div className="big-text">
        Unable to check your webpage word count?
        <div className="small-text">
          No worries! <span style={{ color: "#0D8BFC" }}>Globex</span> will
          guide you!
        </div>
      </div>
      <div className="big-img">
        <img src={atTheOffice} />
      </div>
      {dom}
      <div className="table">
        <BasicTable />
      </div>
    </div>
  );
};

export default Home;
