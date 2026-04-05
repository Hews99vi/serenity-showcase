import { useEffect, useMemo, useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAdminAuth } from "@/hooks/useAdminAuth";

const AdminLoginPage = () => {
  const location = useLocation();
  const { status, signIn, signOut, errorMessage: authErrorMessage } = useAdminAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const redirectPath = useMemo(() => {
    const state = location.state as { from?: { pathname?: string; search?: string; hash?: string } } | null;
    const pathname = state?.from?.pathname;

    if (!pathname || pathname === "/admin/login") {
      return "/admin/home";
    }

    return `${pathname}${state?.from?.search ?? ""}${state?.from?.hash ?? ""}`;
  }, [location.state]);

  useEffect(() => {
    if (status !== "signed_out") {
      setErrorMessage(null);
    }
  }, [status]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      await signIn(email.trim(), password);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unable to sign in right now.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status === "authorized") {
    return <Navigate to={redirectPath} replace />;
  }

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Checking session</CardTitle>
            <CardDescription>We're confirming whether an admin session is already available.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  if (status === "not_configured") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Admin is not configured</CardTitle>
            <CardDescription>
              This environment does not have Supabase admin authentication configured yet.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button asChild variant="outline">
              <Link to="/">Return to site</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  if (status === "unauthorized") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Not authorized</CardTitle>
            <CardDescription>
              This account is signed in, but it is not allowed to access the Serenity admin area.
            </CardDescription>
          </CardHeader>
          <CardFooter className="gap-3">
            <Button onClick={() => void signOut()} variant="outline">
              Sign out
            </Button>
            <Button asChild variant="ghost">
              <Link to="/">Back to site</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Admin system error</CardTitle>
            <CardDescription>
              {authErrorMessage ?? "We couldn't verify your admin permissions right now. Please try again shortly."}
            </CardDescription>
          </CardHeader>
          <CardFooter className="gap-3">
            <Button onClick={() => void signOut()} variant="outline">
              Sign out
            </Button>
            <Button asChild variant="ghost">
              <Link to="/">Back to site</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Admin sign in</CardTitle>
          <CardDescription>Use your admin email and password to access the content workspace.</CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground" htmlFor="admin-email">
                Email
              </label>
              <Input
                id="admin-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="admin@example.com"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground" htmlFor="admin-password">
                Password
              </label>
              <Input
                id="admin-password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>

            {errorMessage ? (
              <div className="rounded-md border border-destructive/20 bg-destructive/5 px-3 py-2 text-sm text-destructive">
                {errorMessage}
              </div>
            ) : null}
          </CardContent>

          <CardFooter className="flex items-center justify-between gap-3">
            <Button type="submit" disabled={isSubmitting} className="min-w-32">
              {isSubmitting ? "Signing in..." : "Sign in"}
            </Button>
            <Button asChild variant="ghost">
              <Link to="/">Back to site</Link>
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default AdminLoginPage;
