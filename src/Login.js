import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useState, useEffect, useRef } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { Card } from "primereact/card";
import { Row, Col } from "react-bootstrap";
import loginIcon from "./assets/images/online-shop.png";
import signUp from "./assets/images/sign-up.png";
import { Toast } from "primereact/toast";
import { Link, useNavigate } from "react-router-dom";
import { toBeEnabled } from "@testing-library/jest-dom/dist/matchers";
import { Accordion, AccordionTab } from "primereact/accordion";
import { Password } from "primereact/password";

function Login() {
  const toast = useRef(null);

  const user = {
    userId: "",
    userName: "",
    userEmail: "",
    userContact: "",
    userPassword: "",
  };

  let adminUsername = "admin";
  let adminPassword = "admin123";

  const [newUser, setNewUser] = useState(user);
  const [userList, setUserlist] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [userFirstName, setUserFirstName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userContact, setUserContact] = useState("");
  const [redirect, setRedirect] = useState(false);

  let newId = new Date().getTime().toString();

  // add new user ----------------------------------------------------------------------------

  function submitUser() {
    if (password == confirmPassword) {
      let addNewUser = { ...newUser };

      addNewUser.userId = newId;
      addNewUser.userName = userFirstName;
      addNewUser.userEmail = userEmail;
      addNewUser.userPassword = password;

      userList.push(addNewUser);

      setUserFirstName("");
      setUserEmail("");
      setPassword("");
      setConfirmPassword("");

      toast.current.show({
        severity: "success",
        summary: "New User",
        detail: "User registered successfully.",
        life: 3000,
      });
    } else {
      toast.current.show({
        severity: "error",
        summary: "Incorrect Password",
        detail: "Password did not match. Please check.",
        life: 3000,
      });
    }
  }

  // user login -------------------------------------------------------------------------------------

  const navigate = useNavigate();
  const [loggedStatus, setLoggedStatus] = useState(false);
  const [adminStatus, setAdminStatus] = useState(false);
  const [currentUser, setCurrentUser] = useState();

  function loginUser() {
    const loggingUser = userList.find((ul) => ul.userName === username);

    // if (
    //   loggingUser.userName == username &&
    //   loggingUser.userPassword == password
    // ) {
    //   let query = userList.filter((ul) => ul.userName == username);
    //   setCurrentUser(query[0]);
    //   setUserFirstName(query[0].userName);
    //   setUserEmail(query[0].userEmail);
    //   setPassword(query[0].userPassword);

    //   console.log(query[0]);
    //   setLoggedStatus(true);
    // } else {
    //   toast.current.show({
    //     severity: "error",
    //     summary: "Error Message",
    //     detail: "Incorrect username/password",
    //     life: 3000,
    //   });
    // }

    if (adminUsername == username && adminPassword == password) {
      setAdminStatus(true);
      setLoggedStatus(true);
      toast.current.show({
        severity: "success",
        summary: "Success Message",
        detail: "Logged as ADMIN",
        life: 3000,
      });
    }
    if (
      loggingUser.userName == username &&
      loggingUser.userPassword == password
    ) {
      let query = userList.filter((ul) => ul.userName == username);
      setCurrentUser(query[0]);
      setUserFirstName(query[0].userName);
      setUserEmail(query[0].userEmail);
      setPassword(query[0].userPassword);

      console.log(query[0]);
      setLoggedStatus(true);
    } else {
      toast.current.show({
        severity: "error",
        summary: "Error Message",
        detail: "Incorrect username/password",
        life: 3000,
      });
    }
  }

  // Register button --------------------------------------------------------------------------
  const [registerButton, setRegisterButton] = useState(false);

  function clickRegister() {
    setRegisterButton(false);
    setPassword("")
  }

  function clickLogin() {
    setRegisterButton(true);
    setUsername("")
  }

  // Logout  ------------------------------------------------------------------------------------

  function logout() {
    setLoggedStatus(false);
    setAdminStatus(false);
    setAdminEdit(false);
  }

  // edit user ------------------------------------------------------------------------------------

  const [editStatus, setEditStatus] = useState(true);

  function editUser() {
    setEditStatus(false);
  }

  // save user ------------------------------------------------------------------------------------

  function saveUser() {
    setEditStatus(true);

    currentUser.userName = userFirstName;
    currentUser.userEmail = userEmail;
    currentUser.userPassword = password;

    console.log(currentUser);

    toast.current.show({
      severity: "success",
      summary: "Success Message",
      detail: "Profile Details Saved",
      life: 3000,
    });
  }

  //Admin previlages

  // Delete User by Admin --------------------------------------------------------------------------
  const deleteUser = (index) => {
    const updatedUsers = userList.filter((el) => el.userId !== index);
    setUserlist(updatedUsers);

    toast.current.show({
      severity: "error",
      summary: "Delete Message",
      detail: "User deleted successfully",
      life: 3000,
    });
  };

  // Edit User by Admin ------------------------------------------------------------------------------
  const [adminEdit, setAdminEdit] = useState(false);

  const [admUsername, setAdmUsername] = useState();
  const [admEmail, setAdmEmail] = useState();
  const [admPassword, setAdmPassword] = useState();

  const editByAdmin = (index) => {
    setAdminEdit(true);

    userList.filter((ul) => {
      if (ul.userId == index) {
        setAdmUsername(ul.userName);
        setAdmEmail(ul.userEmail);
        setAdmPassword(ul.userPassword);
      } else {
      }
    });
  };

  // Save User by Admin ------------------------------------------------------------------------------

  const saveByAdmin = (index) => {
    setAdminEdit(false);

    userList.filter((ul) => {
      if (ul.userId == index) {
        ul.userName = admUsername;
        ul.userEmail = admEmail;
        ul.userPassword = admPassword;
        console.log(ul);
      } else {
      }
    });

    toast.current.show({
      severity: "success",
      summary: "Success Message",
      detail: "Profile Details Saved",
      life: 3000,
    });
  };
  return (
    <>
      {}
      {loggedStatus ? (
        adminStatus ? (
          <Row>
            <Col sm={2}>
              <Button
                icon="pi pi-arrow-left"
                className="p-button-rounded p-button-text"
                label="Logout"
                onClick={logout}
              />
            </Col>
            <Col style={{ padding: "40px" }}>
              <Toast ref={toast} style={{ top: "90px" }} />
              <h5>All Users</h5>
              <Accordion style={{ margin: "15px" }}>
                {userList.map((user) => {
                  return (
                    <AccordionTab
                      header={user.userName}
                      style={{ margin: "15px" }}
                    >
                      <p>
                        {adminEdit ? (
                          <>
                            <h6>User Name</h6>
                            <InputText
                              placeholder="Name"
                              value={admUsername}
                              onChange={(e) => {
                                setAdmUsername(e.target.value);
                              }}
                            />
                            <br />
                            <br />
                            <h6>User Email</h6>
                            <InputText
                              placeholder="Useremail"
                              value={admEmail}
                              onChange={(e) => {
                                setAdmEmail(e.target.value);
                              }}
                            />
                            <br />
                            <br />
                            <h6>User Password</h6>
                            <InputText
                              placeholder="Password"
                              value={admPassword}
                              onChange={(e) => {
                                setAdmPassword(e.target.value);
                              }}
                            />
                          </>
                        ) : (
                          <>
                            <h6>User Name</h6>
                            <div style={{ marginBottom: "10px" }}>
                              {user.userName}
                            </div>

                            <h6>User Email</h6>
                            <div style={{ marginBottom: "10px" }}>
                              {user.userEmail}
                            </div>

                            <h6>User Password</h6>
                            <div style={{ marginBottom: "10px" }}>
                              {user.userPassword}
                            </div>
                          </>
                        )}
                      </p>
                      <Button
                        style={{ marginLeft: "800px" }}
                        icon="pi pi-pencil"
                        className="p-button-rounded p-button-info"
                        onClick={() => editByAdmin(user.userId)}
                      />
                      <Button
                        style={{ marginLeft: "50px" }}
                        icon="pi pi-save"
                        className="p-button-rounded p-button-success"
                        onClick={() => saveByAdmin(user.userId)}
                      />
                      <Button
                        style={{ marginLeft: "50px" }}
                        icon="pi pi-trash"
                        className="p-button-rounded p-button-danger"
                        onClick={() => deleteUser(user.userId)}
                      />
                    </AccordionTab>
                  );
                })}
              </Accordion>
            </Col>
          </Row>
        ) : (
          <Row>
            <Toast ref={toast} style={{ top: "90px" }} />
            <Col sm={2}>
              <Button
                icon="pi pi-arrow-left"
                className="p-button-rounded p-button-text"
                label="Logout"
                onClick={logout}
              />
            </Col>
            <Col sm={8} style={{ padding: "40px" }}>
              {
                <>
                  <h2>Welcome to the profile {currentUser.userName}</h2>
                  <br />
                  <h6>User Name</h6>
                  <InputText
                    disabled={editStatus}
                    placeholder="Name"
                    value={userFirstName}
                    onChange={(e) => {
                      setUserFirstName(e.target.value);
                    }}
                  />
                  <br />
                  <br />
                  <h6>User Email</h6>
                  <InputText
                    disabled={editStatus}
                    placeholder="Useremail"
                    value={userEmail}
                    onChange={(e) => {
                      setUserEmail(e.target.value);
                    }}
                  />
                  <br />
                  <br />
                  <h6>User Password</h6>
                  <InputText
                    disabled={editStatus}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                  <br />
                  <Button style={{ marginTop: "40px" }} onClick={editUser}>
                    Edit Profile
                  </Button>
                  <Button
                    className="p-button-success"
                    style={{ marginTop: "40px", marginLeft: "20px" }}
                    onClick={saveUser}
                  >
                    Save Profile
                  </Button>
                </>
              }
            </Col>
          </Row>
        )
      ) : (
        <Row style={{ overflowX: "scroll" }}>
          <Col
            sm={6}
            style={{ backgroundColor: "#457b9d", height: "100vh" }}
          ></Col>
          <Col sm={{ offset: 1, span: 4 }} style={{ height: "100vh" }}>
            <Toast ref={toast} style={{ top: "90px" }} />
            {registerButton == true ? (
              <>
                <div style={{ textAlign: "center", marginTop: "80px" }}>
                  <img
                    src={loginIcon}
                    style={{
                      height: "45px",
                      width: "45px",
                      margin: "40px 0px 40px 0px",
                    }}
                  />
                  <h3>Hello Again!</h3>
                  <p style={{ margin: "20px 0px 40px 0px" }}>
                    To view your account details, please login to your NEGO
                    account
                  </p>
                </div>

                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-user"></i>
                  </span>
                  <InputText
                    placeholder="Username"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                  />
                </div>
                <br />

                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-lock"></i>
                  </span>
                  <Password
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    toggleMask
                  />
                </div>
                <br />
                <Button
                  onClick={loginUser}
                  style={{ width: "100%", textAlign: "center" }}
                >
                  Login
                </Button>
                <div style={{ marginTop: "20px" }}>
                  Don't have an account yet ?{" "}
                  <Button
                    style={{ marginLeft: "150px" }}
                    className="p-button-info p-button-text p-button-sm"
                    onClick={clickRegister}
                  >
                    Register
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div style={{ textAlign: "center", marginTop: "50px" }}>
                  <img
                    src={signUp}
                    style={{
                      height: "45px",
                      width: "45px",
                      margin: "40px 0px 40px 0px",
                    }}
                  />

                  <h3>Sign up on NEGO</h3>
                  <p style={{ margin: "20px 0px 40px 0px" }}>
                    User Registration
                  </p>
                </div>

                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-user"></i>
                  </span>
                  <InputText
                    placeholder="Name"
                    value={userFirstName}
                    onChange={(e) => {
                      setUserFirstName(e.target.value);
                    }}
                  />
                </div>
                <br />

                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-at"></i>
                  </span>
                  <InputText
                    placeholder="Email address"
                    value={userEmail}
                    onChange={(e) => {
                      setUserEmail(e.target.value);
                    }}
                  />
                </div>
                <br />

                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-lock"></i>
                  </span>
                  <Password
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    toggleMask
                  />
                </div>
                <br />

                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-lock"></i>
                  </span>
                  <Password
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                    }}
                    toggleMask
                  />
                </div>
                <br />
                <Button
                  onClick={submitUser}
                  style={{ width: "100%", textAlign: "center" }}
                >
                  Register
                </Button>
                <div style={{ marginTop: "20px" }}>
                  Already have an account ?
                  <Button
                    style={{ marginLeft: "150px" }}
                    className="p-button-info p-button-text p-button-sm"
                    onClick={clickLogin}
                  >
                    Login
                  </Button>
                </div>
              </>
            )}
          </Col>
        </Row>
      )}
    </>
  );
}

export default Login;
