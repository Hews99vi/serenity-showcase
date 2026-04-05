import { createContext, useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabase";

export type AdminAuthStatus =
  | "loading"
  | "not_configured"
  | "signed_out"
  | "unauthorized"
  | "error"
  | "authorized";

export interface AdminUserRecord {
  userId: string;
  role: string;
  isActive: boolean;
  createdAt?: string;
}

export interface AdminAuthContextValue {
  status: AdminAuthStatus;
  session: Session | null;
  user: User | null;
  adminUser: AdminUserRecord | null;
  isConfigured: boolean;
  errorMessage: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  refreshAuthorization: () => Promise<void>;
}

interface AdminAuthProviderProps {
  children: ReactNode;
}

interface AdminUserRow {
  user_id: string;
  role: string;
  is_active: boolean;
  created_at?: string;
}

export const AdminAuthContext = createContext<AdminAuthContextValue | null>(null);

const mapAdminUser = (row: AdminUserRow): AdminUserRecord => ({
  userId: row.user_id,
  role: row.role ?? "admin",
  isActive: row.is_active !== false,
  createdAt: row.created_at,
});

export const AdminAuthProvider = ({ children }: AdminAuthProviderProps) => {
  const [status, setStatus] = useState<AdminAuthStatus>(isSupabaseConfigured ? "loading" : "not_configured");
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [adminUser, setAdminUser] = useState<AdminUserRecord | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const resetSignedOut = useCallback(() => {
    setSession(null);
    setUser(null);
    setAdminUser(null);
    setErrorMessage(null);
    setStatus("signed_out");
  }, []);

  const resetNotConfigured = useCallback(() => {
    setSession(null);
    setUser(null);
    setAdminUser(null);
    setErrorMessage(null);
    setStatus("not_configured");
  }, []);

  const setSystemError = useCallback((message: string, nextSession: Session | null) => {
    setSession(nextSession);
    setUser(nextSession?.user ?? null);
    setAdminUser(null);
    setErrorMessage(message);
    setStatus("error");
  }, []);

  const resolveAuthorization = useCallback(
    async (nextSession: Session | null) => {
      if (!isSupabaseConfigured) {
        resetNotConfigured();
        return;
      }

      if (!nextSession) {
        resetSignedOut();
        return;
      }

      const supabase = getSupabaseClient();

      if (!supabase) {
        resetNotConfigured();
        return;
      }

      setStatus("loading");
      setSession(nextSession);
      setUser(nextSession.user);
      setErrorMessage(null);

      try {
        const { data, error } = await supabase
          .from("admin_users")
          .select("user_id, role, is_active, created_at")
          .eq("user_id", nextSession.user.id)
          .maybeSingle<AdminUserRow>();

        if (error) {
          throw error;
        }

        if (!data || !data.is_active) {
          setAdminUser(null);
          setErrorMessage(null);
          setStatus("unauthorized");
          return;
        }

        setAdminUser(mapAdminUser(data));
        setErrorMessage(null);
        setStatus("authorized");
      } catch (error) {
        console.error("Unable to resolve admin authorization.", error);
        const message =
          error instanceof Error
            ? error.message
            : "We couldn't verify admin permissions right now.";
        setSystemError(message, nextSession);
      }
    },
    [resetNotConfigured, resetSignedOut, setSystemError],
  );

  const refreshAuthorization = useCallback(async () => {
    await resolveAuthorization(session);
  }, [resolveAuthorization, session]);

  const signIn = useCallback(
    async (email: string, password: string) => {
      if (!isSupabaseConfigured) {
        throw new Error("Admin is not configured in this environment.");
      }

      const supabase = getSupabaseClient();

      if (!supabase) {
        throw new Error("Admin is not configured in this environment.");
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      await resolveAuthorization(data.session ?? null);
    },
    [resolveAuthorization],
  );

  const signOut = useCallback(async () => {
    const supabase = getSupabaseClient();

    if (!supabase) {
      resetNotConfigured();
      return;
    }

    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Unable to sign out admin user.", error);
    }

    resetSignedOut();
  }, [resetNotConfigured, resetSignedOut]);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      resetNotConfigured();
      return;
    }

    const supabase = getSupabaseClient();

    if (!supabase) {
      resetNotConfigured();
      return;
    }

    let isMounted = true;

    const initialize = async () => {
      setStatus("loading");

      try {
        const { data, error } = await supabase.auth.getSession();

        if (!isMounted) {
          return;
        }

        if (error) {
          throw error;
        }

        await resolveAuthorization(data.session ?? null);
      } catch (error) {
        console.error("Unable to restore admin session.", error);

        if (isMounted) {
          const message =
            error instanceof Error
              ? error.message
              : "We couldn't restore the admin session right now.";
          setSystemError(message, null);
        }
      }
    };

    void initialize();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      void resolveAuthorization(nextSession);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [resetNotConfigured, resolveAuthorization, setSystemError]);

  const value = useMemo<AdminAuthContextValue>(
    () => ({
      status,
      session,
      user,
      adminUser,
      isConfigured: isSupabaseConfigured,
      errorMessage,
      signIn,
      signOut,
      refreshAuthorization,
    }),
    [adminUser, errorMessage, refreshAuthorization, session, signIn, signOut, status, user],
  );

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
};
