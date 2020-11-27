import React from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux'
import { login } from '../../store/actions/user'


import './index.css'

function Login(props) {
  const [errorMsg, setError] = useState("");
  const history = useHistory();
  const userHardCode = {
    email: "user@email.com",
    password: "123456",
    name: "Jhon A B C"
  }


  function handleClick(email, password) {
    if (email === userHardCode.email && password === userHardCode.password) {
      props.onHandleClick({...userHardCode});
      // props.onHandleClick({name: userHardCode.name, email:userHardCode.email});

      history.push("/home");
    }
    else if (email === "") {
      setError("No email")
      return null;
    }
    else if (password === "") {
      setError("No password")
      return null
    }
    else {
      setError("Email or password are wrong")
      return null
    }




  }


  return (

    <div className="Login">
      <h2 className="title">Welcome!</h2>
      {errorMsg && <p className="errorText">{errorMsg}</p>}
      <form className="signinForm">
        <input type="email" name="email" placeholder="Email" autoComplete="off" />
        <input type="password" name="password" placeholder="Password" autoComplete="off" />
      </form>
      <button className="sendButton" value="send"
        onClick={() => handleClick(document.getElementsByName("email")[0].value, document.getElementsByName("password")[0].value)}
      >
        Sign in
      </button>
    </div>



  );
}


// const mapStateToProps = ({user}) => {
//   return {
//       email: user.email,
//       name: user.name
//   }
// }

const mapDispatchToProps = dispatch => {
  return {
    onHandleClick: user => dispatch(login(user))
  }
}

// export default Login;
export default connect(null, mapDispatchToProps)(Login);
