import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link } from "react-router-dom";

export function RegisterForm({
  className,
  name,
  prenom,
  email,
  password,
  confirmPassword,
  errors,
  SetName,
  SetPrenom,
  SetEmail,
  SetConfirmPassword,
  SetPassword,
  onSubmit,
  ...props
}) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Inscription</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="name">Nom</Label>
                  <Input id="name" type="name" placeholder="m@example.com" value={name} onChange={(e) => SetName(e.target.value)} />
                  {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                    )}
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="prenom">Prenom</Label>
                  <Input id="prenom" type="prenom" placeholder="m@example.com" value={prenom} onChange={(e) => SetPrenom(e.target.value)} />
                  {errors.prenom && (
                      <p className="text-red-500 text-sm mt-1">{errors.prenom}</p>
                    )}
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="m@example.com" value={email} onChange={(e) => SetEmail(e.target.value)} />
                  {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="password">Mot de passe</Label>
                  <Input id="password" type="password" value={password} onChange={(e) => SetPassword(e.target.value)} />
                  {errors.password && (
                      <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                    )}
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="confirmpassword">Confirmer le mot de passe</Label>
                  <Input id="confirmpassword" type="password" value={confirmPassword} onChange={(e) => SetConfirmPassword(e.target.value)} />
                  {errors.confirmpassword && (
                    <p className="text-red-500 text-sm mt-1">{errors.confirmpassword}</p>
                  )}
                </div>
                <Button onClick={onSubmit} className="w-full bg-blue-600 text-white hover:bg-blue-700 hover:text-white">
                  Connexion
                </Button>
              </div>
              <div
                className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  Ou Continuer avec
                </span>
              </div>
              <div className="flex flex-col gap-4">
                <Button variant="outline" className="w-full">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                      fill="currentColor" />
                  </svg>
                  Apple
                </Button>
                <Button variant="outline" className="w-full">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor" />
                  </svg>
                  Google
                </Button>
              </div>
              <div className="text-center text-sm">
                Vous avez un compte{" "}
                <Link to="/connexion" className="underline underline-offset-4">
                  Connectez-vous
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
