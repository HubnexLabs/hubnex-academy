
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
    // For now, just set loading to false since we're using simple auth
    setLoading(false);
  }, []);

  const login = async (email: string, password: string, role: 'admin' | 'sales_person'): Promise<boolean> => {
    try {
      console.log('Attempting login with:', { email, role });

      // First, check if user exists with the specified role
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .eq('role', role)
        .eq('is_active', true)
        .single();

      console.log('User query result:', { userData, userError });

      if (userError || !userData) {
        toast({
          title: "Login Failed",
          description: `No active ${role.replace('_', ' ')} found with this email.`,
          variant: "destructive",
        });
        return false;
      }

      // Simple password check for demo credentials
      let isValidPassword = false;
      
      // Check for demo credentials first
      if (password === 'admin123') {
        isValidPassword = true;
      } else {
        // If not demo credentials, check against stored password
        isValidPassword = password === userData.password_hash;
      }

      console.log('Password validation result:', isValidPassword);

      if (!isValidPassword) {
        toast({
          title: "Login Failed",
          description: "Invalid password.",
          variant: "destructive",
        });
        return false;
      }

      // Set user state directly without Supabase auth
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
