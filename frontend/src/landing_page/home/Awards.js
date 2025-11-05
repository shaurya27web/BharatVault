import React from "react";

function Awards() {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-6 p-5">
          <img
            src="media/images/largestBroker.svg"
            alt="Largest Broker"
            style={{ marginLeft: "-70px" }}
          />
        </div>
        <div className="col-6 mb-5">
          <h1 className="fs-2">Most trustable Vault in India</h1>
          <p>
            Millions of clients contributing to overall volumes in India daily
            by trading and investing in:
          </p>
          <div className="row mb-5 ">
            <div className="col-6">
              <ul>
                <li>
                  <p>Futures and Options</p>
                </li>
                <li>
                  <p>Commodity derivatives</p>
                </li>
                <li>
                  <p>Currency derivatives</p>
                </li>
              </ul>
            </div>
            <div className="col-6">
              <ul>
                <li>
                  <p>No Spams OR gimmicks</p>
                </li>
                <li>
                  <p>Do Better with Money</p>
                </li>
                <li>
                  <p>Unbeatable Pricing</p>
                </li>
              </ul>
            </div>
          </div>
          <img src="media/images/pressLogos.png" style={{ width: "80%" }}></img>
        </div>
      </div>
    </div>
  );
}

export default Awards;
