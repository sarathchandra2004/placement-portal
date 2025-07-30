import Login from "../components/Auth/login";
import Register from "../components/Auth/Register";


const AuthPage = () => {
  return (
    <div>
      <h1>Auth</h1>
      <Login />
      <hr />
      <Register />
    </div>
  );
};

export default AuthPage;
