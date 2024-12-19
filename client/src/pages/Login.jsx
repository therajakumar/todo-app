import { useContext, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { AuthContext } from "@/Provider/AuthProvider";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  async function login() {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_PUBIC_BACKEND_URL}/user/login`,
        {
          email: email,
          password: password,
        }
      );
      setUser(response.data);
      Cookies.set("authtoken", response.data.token, { expires: 7 });
      toast.success("Login successfully");
      navigate("/todolist");
    } catch (error) {
      console.error(
        "An error occurred during login:",
        error.response ? error.response.data : error.message
      );
    }
  }

  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <Card className="md:w-96 m-auto bg-transparent">
        <CardHeader>
          <CardTitle>Create Account</CardTitle>
          <CardDescription>
            Already have an account?{" "}
            <Link to={"/register"} className="underline">
              Register
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col items-start gap-1 space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="johndoe@example.com"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col items-start gap-1 space-y-1.5">
                <Input
                  id="password"
                  placeholder="Enter your password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link to={"/"}>
            <Button variant="outline">Cancel</Button>
          </Link>
          <Button onClick={login}>Submit</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
