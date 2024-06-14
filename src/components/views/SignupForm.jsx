import Google from "../../assets/Icons/Google-icon.svg";
import Nigeria from "../../assets/Icons/Nigeria.svg";
import Arrow from "../../assets/Icons/Arrrow-down.svg";
import eyeOpen from "../../assets/Icons/eyeOpen.svg";
import eyeClose from "../../assets/Icons/eyeClose.svg";
import Button from "../views/Button";
import { Error } from "../../constants/ErrorMessage";
import { useState } from "react";
import { useSignupContext } from "../../context/SignupContext";
import { base_URL } from "../../config/api_url";
import axios from "axios";
import { useRevalidator } from "react-router-dom";

const SignupForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  // const [disabled, setDisabled] = useState(true);
  const { signupData, setSignupData } = useSignupContext();
  const [selected, setSelected] = useState(null);
  const [showpassword, setShowPassword] = useState(false);
  const [countryNumber, setCountryNumber] = useState(+234);
  const [state, setState] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });

  const validateEmail = (value) =>
    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(value);
  const validateName = (value) => /^[a-zA-Z\-']{3,}$/.test(value.trim());
  const validatePassword = (value) =>
    /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])[a-zA-Z._\=\:\*\&\^\%\$\@\#\/-\w]{8,}$/.test(
      value
    );

  const handleChange = (event) => {
    const { name, value } = event.target;
    const isValid =
      name === "email"
        ? validateEmail(value)
        : name === "firstName" || name === "lastName"
        ? validateName(value)
        : name === "password"
        ? validatePassword(value)
        : true;

    setErrorMessage((prev) => ({
      ...prev,
      [name]: isValid ? "" : Error[name],
    }));
    setState((prevState) => ({ ...prevState, [name]: value }));
    setSignupData((prevState) => ({ ...prevState, [name]: value }));
  };

  const options = [
    {
      value: +264,
      image: Google,
    },
    {
      value: +234,
      image: Nigeria,
    },
    {
      value: +222,
      image: Google,
    },
  ];
  const handlePasswordVisibility = () => {
    setShowPassword(!showpassword);
  };

  const toggleDropdown = async (e) => {
    e.preventDefault();
    try {
      setIsOpen(!isOpen);
      const response = await axios.get(
        `http://localhost:8000/api/countries/countries`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch countries data");
      }
      const countriesData = await response.json();
      console.log(countriesData);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const handleClick = (option) => {
    setSelected(option);
    setCountryNumber(option.value);
    setIsOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await axios.post(
        `${base_URL}/api/users/signup`,
        signupData
      );
      if (!userData.ok) {
        console.log("error fetching");
      }
      const Result = await userData.json();
      console.log(Result);
    } catch (error) {
      console.log(error);
    }

    // console.log(signupData);
    // state.value;
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="pt-[3rem]">
        <label className="moderat-font">Email</label> <br />
        <input
          type="email"
          name="email"
          value={state.email}
          placeholder="Enter email here"
          onChange={handleChange}
          className={`input-style w-[87%] h-[48px] ${
            errorMessage.email ? "error-border" : ""
          }`}
        />
        <div
          className="flex gap-4"
          style={{ paddingTop: "1.5rem", paddingBottom: "1.5rem" }}
        >
          <div>
            <label className="moderat-font">First Name</label>
            <br />
            <input
              type="text"
              name="firstName"
              value={state.firstName}
              placeholder="Enter First Name here"
              onChange={handleChange}
              className={`input-style h-[48px] w-[95%] ${
                errorMessage.firstName ? "error-border" : ""
              }`}
            />
          </div>
          <div>
            <label className="moderat-font"> Last name</label>
            <br />
            <input
              type="text"
              name="lastName"
              value={state.lastName}
              placeholder="Enter your last name"
              onChange={handleChange}
              className={`input-style w-[90%] h-[48px] ${
                errorMessage.lastName ? "error-border" : ""
              }`}
            />
          </div>
        </div>
        <div>
          <label className="moderat-font">Password</label> <br />
          <input
            type={showpassword ? "text" : "password"}
            name="password"
            value={state.password}
            placeholder="Choose your password"
            onChange={handleChange}
            className={`input-style w-[87%] h-[48px] ${
              errorMessage.password ? "error-border" : ""
            }`}
          />
          <span className="eyeIcon" onClick={handlePasswordVisibility}>
            {showpassword ? (
              <img src={eyeOpen} alt="eye icon" />
            ) : (
              <img src={eyeClose} alt="eye icon" />
            )}
          </span>
        </div>
        <p className="text-red-600" style={{ fontSize: "14px" }}>
          {errorMessage.password}
        </p>
        <div className="pb-[0.7rem] pt-5">
          <label className="moderat-font"> Phone Number</label> <br />
          <div className="flex">
            <div
              style={{
                position: "absolute",
              }}
            >
              <div>
                <div
                  onClick={toggleDropdown}
                  className="flex gap-10 px-3 py-[0.7rem] border-dropdown mt-2 "
                >
                  {selected ? (
                    <>
                      <img src={selected.image} alt={selected.label} />
                    </>
                  ) : (
                    <img src={Nigeria} alt="Nigeria Flag" />
                  )}
                  <div className="pt-2 ">
                    <img src={Arrow} alt="Arrow down icon" />
                  </div>
                </div>
                {isOpen && (
                  <ul style={{ border: "1px solid red" }}>
                    {options.map((option) => (
                      <li
                        style={{ border: "none" }}
                        key={option.value}
                        onClick={() => handleClick(option)}
                      >
                        <img src={option.image} alt={option.label} />
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <input
              className="input-style w-[69%] h-[48px] pl-[4rem] ml-[6.7rem] "
              type="number"
              name=""
              value={countryNumber}
              onChange={(e) => setCountryNumber(e.target.value)}
            />
          </div>
        </div>
      </div>
      <Button text="Sign Up" handleSubmit={handleSubmit} />
    </form>
  );
};
export default SignupForm;