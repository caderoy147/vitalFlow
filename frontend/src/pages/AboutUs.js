import { useSignup } from "../hooks/useSignup";
import { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import styles from "./home.module.css";

const AboutUs = (props) => {
    return (
      <div className={styles['container']}>
        <div className={styles['home']}>
          <div className={styles['footer']}>
            <div className={styles['row1']}>
              <div className={styles['cta']}>
                <span className={styles['text']}>
                  <span>Ready to get started?</span>
                </span>
                <div className={styles['button']}>
                  <img
                    src="./images/rectangle9214-zqjw-200h.png"
                    alt="Rectangle9214"
                    className={styles['rectangle']}
                  />
                  <span className={styles['text02']}>
                    <span>Donate</span>
                  </span>
                </div>
              </div>
              <img
                src="./images/divider9214-tlfe-200h.png"
                alt="Divider9214"
                className={styles['divider']}
              />
            </div>
            <div className={styles['row2']}>
              <div className={styles['newsletter']}>
                <span className={styles['text04']}>
                  <span>
                    <span>Subscribe to our</span>
                    <br></br>
                    <span>newsletter</span>
                  </span>
                </span>
                <div className={styles['form']}>
                  <img
                    src="./images/rectangle9215-uj9p-200h.png"
                    alt="Rectangle9215"
                    className={styles['rectangle1']}
                  />
                  <span className={styles['text09']}>
                    <span>Email address</span>
                  </span>
                  <div className={styles['submit']}>
                    <div className={styles['ickeyboardarrowright48px']}>
                      <img
                        src="/path9215-9qsd.svg"
                        alt="Path9215"
                        className={styles['path']}
                      />
                      <img src alt="Path9215" className={styles['path1']} />
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles['services']}>
                <span className={styles['text11']}>
                  <span>Services</span>
                </span>
                <span className={styles['text13']}>
                  <span>Email Marketing</span>
                </span>
                <span className={styles['text15']}>
                  <span>Campaigns</span>
                </span>
                <span className={styles['text17']}>
                  <span>Branding</span>
                </span>
                <span className={styles['text19']}>
                  <span>Offline</span>
                </span>
              </div>
              <div className={styles['about']}>
                <span className={styles['text21']}>
                  <span>About</span>
                </span>
                <span className={styles['text23']}>
                  <span>Our Story</span>
                </span>
                <span className={styles['text25']}>
                  <span>Benefits</span>
                </span>
                <span className={styles['text27']}>
                  <span>Team</span>
                </span>
                <span className={styles['text29']}>
                  <span>Careers</span>
                </span>
              </div>
              <div className={styles['help']}>
                <span className={styles['text31']}>
                  <span>Help</span>
                </span>
                <span className={styles['text33']}>
                  <span>FAQs</span>
                </span>
                <span className={styles['text35']}>
                  <span>Contact Us</span>
                </span>
              </div>
            </div>
            <div className={styles['row3']}>
              <span className={styles['text37']}>
                <span>Terms &amp; Conditions</span>
              </span>
              <span className={styles['text39']}>
                <span>Privacy Policy</span>
              </span>
              <div className={styles['social']}>
                <div className={styles['frame001facebook']}>
                  <img
                    src="/path9215-wjbsjb.svg"
                    alt="Path9215"
                    className={styles['path2']}
                  />
                </div>
                <div className={styles['frame003twitter']}>
                  <img
                    src="/path9215-syl9.svg"
                    alt="Path9215"
                    className={styles['path3']}
                  />
                </div>
                <div className={styles['frame004instagram']}>
                  <img
                    src="/shape9215-tj3.svg"
                    alt="Shape9215"
                    className={styles['shape']}
                  />
                  <img
                    src="/shape9215-trd.svg"
                    alt="Shape9215"
                    className={styles['shape1']}
                  />
                  <img
                    src="./images/oval9215-a1xh-200h.png"
                    alt="Oval9215"
                    className={styles['oval']}
                  />
                </div>
              </div>
            </div>
            <img
              src="/vector9215-vvpe.svg"
              alt="Vector9215"
              className={styles['vector']}
            />
          </div>
          <div className={styles['how-to-get-blood']}>
            <div className={styles['title']}>
              <span className={styles['text41']}>
                <span>How to get Blood?</span>
              </span>
            </div>
            <div className={styles['group142']}>
              <img
                src='./images/pngwing19367-p0j4o-500h.png'
                alt="pngwing19367"
                className={styles['pngwing1']}
              />
              <div className={styles['frame1']}>
                <div className={styles['group131']}>
                  <img
                    src="./images/ellipse69369-iv6r-200h.png"
                    alt="Ellipse69369"
                    className={styles['ellipse6']}
                  />
                  <img
                    src="./images/ellipse79371-7dzj-200h.png"
                    alt="Ellipse79371"
                    className={styles['ellipse7']}
                  />
                </div>
                <div className={styles['group132']}>
                  <img
                    src="./images/ellipse59368-xy4-400h.png"
                    alt="Ellipse59368"
                    className={styles['ellipse5']}
                  />
                  <div className={styles['registration-processbox']}>
                    <span className={styles['text43']}>
                      <span>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry.
                      </span>
                    </span>
                  </div>
                  <div className={styles['bipencilsquare']}>
                    <div className={styles['group']}>
                      <img
                        src="/vector8621-j5w.svg"
                        alt="Vector8621"
                        className={styles['vector1']}
                      />
                      <img
                        src="/vector8622-67ib.svg"
                        alt="Vector8622"
                        className={styles['vector2']}
                      />
                    </div>
                  </div>
                </div>
                <span className={styles['text45']}>1</span>
              </div>
              <div className={styles['frame2']}>
                <div className={styles['group1311']}>
                  <img
                    src="./images/ellipse69391-i4lb-200h.png"
                    alt="Ellipse69391"
                    className={styles['ellipse61']}
                  />
                  <img
                    src="./images/ellipse79392-4vw5-200h.png"
                    alt="Ellipse79392"
                    className={styles['ellipse71']}
                  />
                </div>
                <div className={styles['group1321']}>
                  <img src="./images/ellipse59394-4n1l-400w.png" alt="Ellipse59394" />
                  <div className={styles['registration-processbox1']}>
                    <span className={styles['text46']}>
                      <span>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry.
                      </span>
                    </span>
                  </div>
                  <div className={styles['bipencilsquare1']}>
                    <div className={styles['bipencilsquare2']}>
                      <div className={styles['group1']}>
                        <img
                          src="/vector9371-ntaa.svg"
                          alt="Vector9371"
                          className={styles['vector3']}
                        />
                        <img
                          src="/vector9372-tfn.svg"
                          alt="Vector9372"
                          className={styles['vector4']}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <span className={styles['text48']}>2</span>
              </div>
              <div className={styles['frame3']}>
                <div className={styles['group1312']}>
                  <img
                    src="./images/ellipse69378-6ns-200h.png"
                    alt="Ellipse69378"
                    className={styles['ellipse62']}
                  />
                  <img
                    src="./images/ellipse79379-v2c-200h.png"
                    alt="Ellipse79379"
                    className={styles['ellipse72']}
                  />
                </div>
                <div className={styles['group1322']}>
                  <img
                    src="./images/ellipse59381-ig5t-400w.png"
                    alt="Ellipse59381"
                    className={styles['ellipse52']}
                  />
                  <div className={styles['registration-processbox2']}>
                    <span className={styles['text49']}>
                      <span>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry.
                      </span>
                    </span>
                  </div>
                  <div className={styles['bipencilsquare3']}>
                    <div className={styles['group2']}>
                      <img
                        src="/vector9386-owgi.svg"
                        alt="Vector9386"
                        className={styles['vector5']}
                      />
                      <img
                        src="/vector9387-bf1.svg"
                        alt="Vector9387"
                        className={styles['vector6']}
                      />
                    </div>
                  </div>
                </div>
                <span className={styles['text51']}>3</span>
              </div>
            </div>
          </div>
          <div className={styles['our-collaberators']}>
            <div className={styles['group146']}>
              <div className={styles['donorsfrom-tkm']}>
                <span className={styles['text52']}>
                  <span>Our Collaborators</span>
                </span>
              </div>
              <div className={styles['group144']}>
                <img
                  src="./images/rectangle208333-be9i-400h.png"
                  alt="Rectangle208333"
                  className={styles['rectangle20']}
                />
                <span className={styles['text54']}>
                  <span>NSS</span>
                </span>
              </div>
              <div className={styles['group143']}>
                <span className={styles['text56']}>
                  <span>
                    NCC
                    <span
                      dangerouslySetInnerHTML={{
                        __html: ' ',
                      }}
                    />
                  </span>
                </span>
              </div>
              <div className={styles['group145']}>
                <span className={styles['text58']}>
                  <span>YMCA</span>
                </span>
              </div>
            </div>
            <div className={styles['group149']}>
              <img
                src="./images/ellipse499372-53v-200h.png"
                alt="Ellipse499372"
                className={styles['ellipse49']}
              />
              <img
                src="./images/ellipse509372-iaq-200h.png"
                alt="Ellipse509372"
                className={styles['ellipse50']}
              />
              <img
                src="./images/ellipse519372-gu1e-200h.png"
                alt="Ellipse519372"
                className={styles['ellipse51']}
                className={styles['ellipse51']}
              />
            </div>
          </div>
          <div className={styles['our-mission']}>
            <div className={styles['our-mission1']}>
              <span className={styles['text60']}>
                <span>Our Mission</span>
              </span>
              <span className={styles['text62']}>
                <span>
                  Lorem Ipsum is simply dummy text of the printing and typesetting
                  industry. Lorem Ipsum has been the industry&apos;s standard
                  dummy text ever since the 1500s, when an unknown printer took a
                  galley of type and scrambled it to make a type specimen book. It
                  has survived not only five centuries, but also the leap into
                  electronic typesetting, remaining essentially unchanged.
                  <span
                    dangerouslySetInnerHTML={{
                      __html: ' ',
                    }}
                  />
                </span>
              </span>
            </div>
          </div>
          <div className={styles['hero-section']}>
            <div className={styles['hero-text-quotes']}>
              <span className={styles['text64']}>
                <span>
                  <span>Save Life Donate</span>
                  <br></br>
                  <span>
                    Blood
                    <span
                      dangerouslySetInnerHTML={{
                        __html: ' ',
                      }}
                    />
                  </span>
                </span>
              </span>
              <span className={styles['text69']}>
                <span>
                  Lorem Ipsum is simply dummy text of the printing and typesetting
                  industry. Lorem Ipsum has been the industry&apos;s standard
                  dummy text ever since the 1500s, when an unknown printer took a
                  galley of type and scrambled it to make a type specimen book. It
                  has survived not only five centuries, but also the leap into
                  electronic typesetting, remaining essentially unchanged.
                </span>
              </span>
            </div>
            <div className={styles['hero-gradient-design']}>
              <img
                src="/ellipse109310-6xky.svg"
                alt="Ellipse109310"
                className={styles['ellipse10']}
              />
              <img
                src="./assets/icons/ellipse89310-c7k.svg"
                alt="Ellipse89310"
                className={styles['ellipse8']}
              />
            </div>
          </div>
          <div className={styles['navbar']}>
            <div className={styles['about-us']}>
              <span className={styles['text71']}>
                <span>About Us</span>
              </span>
            </div>
            <div className={styles['home1']}>
              <span className={styles['text73']}>
                <span>Home</span>
              </span>
            </div>
            <div className={styles['find-blood']}>
              <span className={styles['text75']}>
                <span>Find Blood</span>
              </span>
            </div>
            <div className={styles['login-button']}>
              <span className={styles['text77']}>
                <span>Log In</span>
              </span>
            </div>
            <div className={styles['register-now']}>
              <span className={styles['text79']}>
                <span>Register Now</span>
              </span>
              <img
                src="/chevrondown2710-nl0n.svg"
                alt="chevrondown2710"
                className={styles['chevrondown']}
              />
            </div>
            <div className={styles['logo']}>
              <img
                src="./images/ellipse2279-hgil-200h.png"
                alt="Ellipse2279"
                className={styles['ellipse2']}
              />
              <img
                src="/vector278-8xd8.svg"
                alt="Vector278"
                className={styles['vector7']}
              />
            </div>
            <div className={styles['tab-bar-selected']}></div>
          </div>
        </div>
      </div>
    )
  }

export default AboutUs
