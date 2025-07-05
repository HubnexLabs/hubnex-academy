
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: string;
  email: string;
  full_name: string;
  role: 'admin' | 'sales_person';
  monthly_target?: number;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string, role: 'admin' | 'sales_person') => Promise<boolean>;
  logout: () => Promise<void>;
  isAdmin: boolean;
  isSalesPerson: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already logged in
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      if (sessionData.session) {
        await fetchUserData(sessionData.session.user.id);
      }
    } catch (error) {
      console.error('Error checking user:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserData = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;

      setUser({
        id: data.id,
        email: data.email,
        full_name: data.full_name,
        role: data.role,
        monthly_target: data.monthly_target,
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
      setUser(null);
    }
  };

  const login = async (email: string, password: string, role: 'admin' | 'sales_person'): Promise<boolean> => {
    try {
      // First, check if user exists with the specified role
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .eq('role', role)
        .eq('is_active', true)
        .single();

      if (userError || !userData) {
        toast({
          title: "Login Failed",
          description: `No active ${role.replace('_', ' ')} found with this email.`,
          variant: "destructive",
        });
        return false;
      }

      // For demo purposes, use simple password check
      // In production, you would use proper password hashing
      let isValidPassword = false;
      
      try {
        // Try bcrypt first for hashed passwords
        const bcrypt = await import('bcryptjs');
        isValidPassword = await bcrypt.compare(password, userData.password_hash);
      } catch (bcryptError) {
        // If bcrypt fails, check for plain text (demo credentials)
        console.log('Bcrypt comparison failed, trying plain text for demo');
        isValidPassword = password === userData.password_hash || password === 'admin123';
      }

      if (!isValidPassword) {
        toast({
          title: "Login Failed",
          description: "Invalid password.",
          variant: "destructive",
        });
        return false;
      }

      // Create a session by signing in with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: `${userData.id}@crm.local`, // Use ID as unique identifier
        password: userData.id, // Use ID as password for Supabase auth
      });

      if (authError) {
        // If user doesn't exist in auth, create them
        const { error: signUpError } = await supabase.auth.signUp({
          email: `${userData.id}@crm.local`,
          password: userData.id,
        });

        if (signUpError) {
          console.error('Error creating auth user:', signUpError);
          return false;
        }

        // Try signing in again
        const { error: retryError } = await supabase.auth.signInWithPassword({
          email: `${userData.id}@crm.local`,
          password: userData.id,
        });

        if (retryError) {
          console.error('Error signing in after creation:', retryError);
          return false;
        }
      }

      setUser({
        id: userData.id,
        email: userData.email,
        full_name: userData.full_name,
        role: userData.role,
        monthly_target: userData.monthly_target,
      });

      toast({
        title: "Login Successful",
        description: `Welcome back, ${userData.full_name}!`,
      });

      return true;
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login Failed",
        description: "An error occurred during login. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAdmin: user?.role === 'admin',
    isSalesPerson: user?.role === 'sales_person',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
