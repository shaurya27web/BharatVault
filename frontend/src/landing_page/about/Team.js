import React from "react";

function Team() {
  return (
    <div className="container">
      <div className="row p-5 mt-5  border-top">
        <h1 className="fs-2 text-center">People</h1>
      </div>

      <div
        className="row p-5 mt-5 text-muted"
        style={{ lineHeight: "1.8", fontSize: "1.2em" }}
      >
        <div className="col-6 p-5 text-center">
          <img
            src=""
            style={{ borderRadius: "80%", width: "40%" }}
          ></img>
          <h4 className="mt-5">Shaurya Tiwari</h4>
          <h6>Founder,CEO</h6>
        </div>
        <div className="col-6 p-5">
          <p>
            Shaurya bootstrapped and founded BharatVault in 2010 to overcome the
            hurdles he faced during his decade long stint as a trader. Today,
            BharatVault has changed the landscape of the Indian broking industry.
          </p>
          <p>
            {" "}
            He is a member of the SEBI Secondary Market Advisory Committee
            (SMAC) and the Market Data Advisory Committee (MDAC). Playing
            basketball is his zen.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Team;
