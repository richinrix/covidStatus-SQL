import React, { Component } from "react";
import "./infocards.css";
//images
import maskImg from "./mask.png";
import stayhomeImg from "./home.png";
import handImg from "./handwash.png";
export class infocards extends Component {
  render() {
    return (
      <div className="body">
        <div class="info">
          <div className="infocard">
            <img src={maskImg} />
            <h3>Wear a mask when in public</h3>
            <p>
              Always wear a mask when outside home or at public places to avoid
              spreading of covid19
            </p>
            {/* <a className="btn" href="https://www.covidhelp.org/home">
              Know more
            </a> */}
            <div className="circle"></div>
          </div>
        </div>
        <div class="info">
          <div className="infocard">
            <img src={handImg} />
            <h3>Keep your hands clean!</h3>
            <p>
              Wash your hands with water and soap if available or use a hand
              sanitizer
            </p>
            {/* <a className="btn" href="https://www.covidhelp.org/home">
              Know more
            </a> */}
            <div className="circle"></div>
          </div>
        </div>
        <div class="info">
          <div className="infocard">
            <img src={stayhomeImg} />
            <h3>Stay indoors unless necessary</h3>
            <p>
              Do not wander outside unnecessarily. Go out only for essential
              needs only!
            </p>

            <div className="circle"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default infocards;
