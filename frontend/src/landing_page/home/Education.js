import React from "react";

function Education() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-6">
          <img src="media/images/education.svg" alt="Education"></img>
        </div>
        <div className="col-6 mt-5">
          <h2>Free and open market education</h2>
          <p className="mt-2">
            Varsity, the largest online stock market education book in the world
            covering everything from the basics to advanced trading.
          </p>
          <a href="" style={{ textDecoration: "none" }}>
            Varsity <i class="fas fa-arrow-right"></i>
          </a>
          <p className="mt-2">
            TradingQ&A, the most active trading and investment community in
            India for all your market related queries.
          </p>
          <a href="" style={{ textDecoration: "none" }}>
            Trading Q&A <i class="fas fa-arrow-right"></i>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Education;
