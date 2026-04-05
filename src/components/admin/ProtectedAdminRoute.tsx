import type { ReactNode } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAdminAuth } from "@/hooks/useAdminAuth";

const StatusCard = ({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        {action ? <CardContent>{action}</CardContent> : null}
      </Card>
    </div>
  );
};

const ProtectedAdminRoute = () => {
  const location = useLocation();
  const { status, signOut, user, errorMessage } = useAdminAuth();

  if (status === "loading") {
    return (
      <StatusCard
        title="Checking admin access"
        description="We're confirming your session and permissions before opening the admin area."
      />
    );
  }

  if (status === "not_configured") {
    return (
      <StatusCard
        title="Admin is not configured"
        description="This environment does not have Supabase admin authentication configured yet. Public pages still work normally."
      />
    );
  }

  if (status === "signed_out") {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  if (status === "unauthorized") {
    return (
      <StatusCard
        title="Not authorized"
        description={`${
          user?.email ?? "This account"
        } is signed in, but it is not allowed to access the admin area.`}
        action={
          <Button onClick={() => void signOut()} variant="outline">
            Sign out
          </Button>
        }
      />
    );
  }

  if (status === "error") {
    return (
      <StatusCard
        title="Admin access check failed"
        description={errorMessage ?? "We couldn't verify admin access because the authorization lookup failed."}
        action={
          <Button onClick={() => void signOut()} variant="outline">
            Sign out
          </Button>
        }
      />
    );
  }

  return <Outlet />;
};

export default ProtectedAdminRoute;
