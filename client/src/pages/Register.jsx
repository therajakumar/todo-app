import { useState } from "react";
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
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  async function register() {
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_PUBIC_BACKEND_URL}/user`,
        {
          name: name,
          email: email,
          password: password,
        }
      );
      Cookies.set("authtoken", response.data.token, { expires: 7 });
      toast.success("Successfully Registered");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }
  let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const disabled =
    !name.length > 3 || !email.match(emailRegex) || !password.length > 8;

  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <Card className="md:w-96 bg-transparent">
        <CardHeader>
          <CardTitle>Create Account</CardTitle>
          <CardDescription>
            Already have an account?{" "}
            <Link to={"/"} className="underline">
              Login
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col items-start gap-1 space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Your name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex flex-col items-start gap-1 space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="johndoe@example.com"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <p className="text-sm text-muted-foreground">
                  Email must be valid
                </p>
              </div>
              <div className="flex flex-col items-start gap-1 space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  placeholder="Enter your password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <p className="text-sm text-muted-foreground">
                  Password must be more than 8 characters
                </p>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link to={"/"}>
            <Button variant="outline">Cancel</Button>
          </Link>
          <Button onClick={register} disabled={loading || disabled}>
            Submit
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
