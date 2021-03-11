import React, { Component } from "react";
import "./newsletter.css";
// images
import userIcon from "./userIcon.png";
import penIcon from "./pen.png";
export class newsletter extends Component {
  constructor() {
    super();
    this.state = {
      loggedinUser: [],
      username: "",
      userEmail: "",
      userSub: 0,
    };
  }
  componentDidMount() {
    // fetching user info
    fetch("/express/loggedinuser")
      .then((res) => res.json())
      .then((loggedinUser) =>
        this.setState({ loggedinUser }, () => {
          console.log("data fetched: , logged userData");
          this.setState({ username: loggedinUser.username });
          this.setState({ userEmail: loggedinUser.email });
          this.setState({ userSub: loggedinUser.subscribed });
        })
      );

    //   typing header text
    consoleText(
      ["Hello World.", "Welcome to the Blog.", "Stay Safe.", "Wear a mask."],
      "text",
      ["#b1152fcc", "#ffffffd3", "#b1152fcc", "#ffffffd3"]
    );

    function consoleText(words, id, colors) {
      if (colors === undefined) colors = ["#fff"];
      var visible = true;
      var con = document.getElementById("console");
      var letterCount = 1;
      var x = 1;
      var waiting = false;
      var target = document.getElementById(id);
      target.setAttribute("style", "color:" + colors[0]);
      window.setInterval(function () {
        if (letterCount === 0 && waiting === false) {
          waiting = true;
          target.innerHTML = words[0].substring(0, letterCount);
          window.setTimeout(function () {
            var usedColor = colors.shift();
            colors.push(usedColor);
            var usedWord = words.shift();
            words.push(usedWord);
            x = 1;
            target.setAttribute("style", "color:" + colors[0]);
            letterCount += x;
            waiting = false;
          }, 1000);
        } else if (letterCount === words[0].length + 1 && waiting === false) {
          waiting = true;
          window.setTimeout(function () {
            x = -1;
            letterCount += x;
            waiting = false;
          }, 1000);
        } else if (waiting === false) {
          target.innerHTML = words[0].substring(0, letterCount);
          letterCount += x;
        }
      }, 120);
      window.setInterval(function () {
        if (visible === true) {
          con.className = "console-underscore hidden";
          visible = false;
        } else {
          con.className = "console-underscore";

          visible = true;
        }
      }, 400);
    }
  }
  unsub = () => {
    if (this.state.userSub === 1) {
      fetch(
        `/express/unsubscribe?username='${this.state.username}'&email='${this.state.userEmail}'`
      );
      this.setState({ userSub: 0 });
    }
  };
  sub = () => {
    if (this.state.userSub === 0) {
      fetch(
        `/express/subscribe?username='${this.state.username}'&email='${this.state.userEmail}'`
      );
      this.setState({ userSub: 1 });
    }
  };
  renderSubBtn = () => {
    if (this.state.userSub == 1) {
      return (
        <div class="buttons_container buttons btn-pos">
          <button class="btn apply" onClick={this.unsub}>
            <span className="">Unsubscribe</span>
          </button>
        </div>
      );
    } else {
      return (
        <div class="buttons_container buttons btn-pos">
          <button class="btn apply" onClick={this.sub}>
            <span className="">Subscribe</span>
          </button>
        </div>
      );
    }
  };
  render() {
    return (
      <div className="newsletter_container">
        {/* the dynamic text typing thingy */}
        <div class="console-container">
          <span id="text"></span>
          <div class="console-underscore" id="console">
            &#95;
          </div>
        </div>
        <img className="penIcon" src={penIcon} alt="" />
        <div className="userBox">
          <div className="userName">
            <h4>{this.state.username}</h4>
          </div>
          <img src={userIcon} alt="userimg" />
          {this.renderSubBtn()}
        </div>
        <div className="newstuff">
          <div className="newsbox">
            <div className="newsheader">
              <h3>New Strain Of The Virus</h3>
              <h4>25-March</h4>
            </div>
            <div className="newswritings">
              <p className="stuff">
                A more contagious coronavirus variant first identified in the
                United Kingdom continues to crop up across the U.S. and around
                the globe, threatening to further strain overburdened health
                care systems just as vaccines are rolling out worldwide. At
                least eight U.S. states and 33 countries have identified the new
                variant, known as B.1.1.7. Several nations have also identified
                an additional variant, first identified in South Africa, that
                also appears to infect people more easily.
                <br />
                "Because the variants spread more rapidly, they could lead to
                more cases and put even more strain on our heavily burdened
                health care systems," said Dr. Henry Walke, incident manager for
                the Centers for Disease Control and Prevention's COVID-19
                response. "We need to be even more vigilant in our prevention
                measures to slow the spread of COVID-19." Here's what we know
                about B.1.1.7. <br />
                <h3>How much more contagious is the new strain?</h3>
                <br />
                The strain first identified in the U.K. spreads more easily and
                quickly than other strains, according to the CDC. The strain was
                first spotted in September in southeastern England and accounted
                for a quarter of cases in London by November. By the week of
                Dec. 9, it was responsible for 60% of cases in the city.
                Scientists in the U.K. estimate that the new variant is 40-70%
                more infectious based on analysis of affected populations in
                Britain.
                <br />
                <h3>What makes the new strain more contagious?</h3>
                <br />
                SARS-CoV-2, the virus that causes the disease COVID-19, acquires
                about one new mutation in its genome every two weeks, according
                to the CDC. The U.K. variant has several mutations that affect
                the "spike protein" on the virus surface that attaches to human
                cells. "It’s able to bind to the receptors on cells better, and
                therefore is transmitted better," Dr. Anthony Fauci, the
                nation's leading infectious disease expert, said at the end of
                December.
              </p>
            </div>
          </div>
          <div className="newsbox">
            <div className="newsheader">
              <h3>
                Offline classes and exams increasing the cases in many states
              </h3>
              <h4>30-Dec</h4>
            </div>
            <div className="newswritings">
              <p className="stuff">
                <h3>
                  Karnataka: 50 teachers test Covid-positive; many schools shut
                </h3>
                <br />
                &emsp;&emsp;Just five days after schools and colleges reopened
                in Karnataka, a number of teachers have tested positive for
                Covid-19 creating a sense of fear among parents and students. In
                Belagavi district alone, 18 teachers have tested positive for
                Covid-19. The government had mandated that all teaching and
                non-teaching staff must undergo a Covid-19 test before
                educational institutions reopen. The results of thousands of
                such tests done have started coming in with several teachers
                themselves testing Covid-19 positive. The DC of Belagavi, MG
                Hiremath speaking to the media on Tuesday admitted that four
                teachers from Chikkodi and 18 from Belagavi have tested positive
                for the virus. “We restarted educational institutions under the
                Vidyagama scheme of the government by taking all precautions.
                For instance, in Kadoli, four teachers in a school have tested
                positive. We have sealed the school and it will be reopened a
                week later after it is full sanitised,” he added. In a similar
                case in Koppal, two teachers have tested positive and now 23
                students are all set to undergo tests for Covid-19. While the
                education department is saying that they do not have a
                consolidate number of teaching and non-teaching staff who have
                tested positive for the virus, medical education minister Dr K
                Sudhakar said, “There are nearly 10 lakh students in the 10th
                standard alone. It is but natural that a few may have tested
                positive amongst the staff in spite of precautions. We are
                testing them, isolating them and getting them treated. Since it
                involves the future of lakhs of students, I appeal that we
                should not spread panic as normalcy is being slowly restored.”
                <br />
                <br />
                &emsp;&emsp;However, several parents have expressed apprehension
                over the re-opening of schools and colleges. “Nobody would deny
                that education is important but not at the cost of our
                children’s lives. I don’t know why the government is adamant on
                running schools. With the vaccine around the corner, why can’t
                we just postpone reopening by another few weeks or months?”
                Vijay Prasad the parent of a college student told HT.
                <br />
                <br />
                &emsp;&emsp;However, the minister Dr Sudhakar asserted that
                there was no need for any panic and the numbers of those who had
                tested positive were small. “I am getting the exact data of how
                many have been infected, meanwhile I appeal to the media that
                let us not unnecessarily spread panic among the students and
                parents.”
                <br />
              </p>
            </div>
          </div>
          <div className="newsbox">
            <div className="newsheader">
              <h3>Precautions To Be Taken</h3>
              <h4>16-May</h4>
            </div>
            <div className="newswritings">
              <p className="stuff">
                <h3>How to Protect Yourself & Others</h3>
                <br />
                <h4>Wear a mask over your nose and mouth</h4>
                <ul>
                  <li>
                    - Masks help prevent you from getting or spreading the
                    virus.
                  </li>
                  <li>
                    - You could spread COVID-19 to others even if you do not
                    feel sick.
                  </li>
                  <li>
                    - Everyone should wear a mask in public settings and when
                    around people who don’t live in your household, especially
                    when other social distancing measures are difficult to
                    maintain. Masks should not be placed on young children under
                    age 2, anyone who has trouble breathing, or is unconscious,
                    incapacitated or otherwise unable to remove the mask without
                    assistance.
                  </li>
                  <li>
                    - Do NOT use a mask meant for a healthcare worker.
                    Currently, surgical masks and N95 respirators are critical
                    supplies that should be reserved for healthcare workers and
                    other first responders.
                  </li>
                  <li>
                    - Continue to keep about 6 feet between yourself and others.
                    The mask is not a substitute for social distancing.
                  </li>
                </ul>
                <br />
              </p>
            </div>
          </div>
          <div className="newsbox">
            <div className="newsheader">
              <h3>How the PM is handling Covid Cases badly</h3>
              <h4>09-Nov</h4>
            </div>
            <div className="newswritings">
              <p className="stuff">
                <br />
                <br />
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Provident officia magnam quia, consequatur explicabo laborum
                fuga aperiam beatae in hic, dicta cupiditate atque numquam! Quod
                dolorum in neque alias fugiat est sed. Soluta excepturi enim
                necessitatibus ipsa. Modi iure dolore quos possimus amet!
                Corrupti porro odio modi distinctio a sapiente, laboriosam,
                totam, qui voluptate sit magnam nemo beatae? Accusamus, deserunt
                quisquam dolores eaque repudiandae sapiente, at omnis dolore
                eius fuga maxime a perferendis quaerat rerum reprehenderit nihil
                unde neque! A sit quidem dolorem perferendis accusantium
                corporis autem iusto temporibus? Perspiciatis voluptas quam
                magni dicta id. Suscipit ipsam dolorum quo exercitationem
                voluptates corporis in eveniet quaerat, reprehenderit, fuga
                reiciendis nisi illum libero alias sapiente esse iusto voluptas?
                Consequuntur nemo quasi, velit nobis a consectetur possimus? Qui
                recusandae inventore tempora veritatis repellendus. Ipsum optio
                illo hic sequi harum quis sapiente, corrupti, consectetur
                nostrum numquam dolorum sit nisi iste consequatur repudiandae
                inventore libero ipsam? Ab earum voluptas natus nihil, dolorem
                numquam dolore blanditiis nemo, libero eveniet quidem vitae
                mollitia magni odit, reprehenderit error dolor soluta
                praesentium voluptates dicta! Mollitia dolore nobis officiis
                animi quae tempore doloremque, in voluptates repellat deserunt
                maxime saepe explicabo eaque voluptate adipisci deleniti quis,
                reprehenderit rem error quam. In maxime harum repellendus
                aperiam cupiditate, eius veritatis maiores aliquam perferendis
                eveniet ratione quaerat quas esse suscipit similique laboriosam,
                repellat pariatur consectetur nostrum provident quidem, voluptas
                deserunt? Dolores molestias nulla beatae rem odit quo
                exercitationem. Id culpa vel sunt placeat, magni vero odio dicta
                repellendus harum iste sequi deleniti at quos?
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default newsletter;
