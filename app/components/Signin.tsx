import { signIn } from "@/utils/auth"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/Card";
import { Button } from "./ui/Button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("github", { redirectTo: "/"})
      }}
    >
      <Card className="w-[400px] m-auto">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>Login using anyone of these methods</CardDescription>
        </CardHeader>
        <CardContent>
            <div>
              <Button className="w-full" type="submit">
                <GitHubLogoIcon className="mx-2" /> 
                <span>Signin with GitHub</span> 
              </Button>
            </div>
        </CardContent>
        <CardFooter>
          <p className="font-inter">Contact <a href="mailto:sarthak.chauhan@sjsu.edu">Sarthak</a> for credentials</p>
        </CardFooter>
      </Card>
    </form>
  )
} 