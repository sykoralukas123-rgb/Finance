import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'
import type { Profile } from '../lib/types'

interface AuthState {
  session: Session | null
  profile: Profile | null
  isPro: boolean
  // True until the initial session and profile are known.
  loading: boolean
  signInWithEmail: (email: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthState | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const userId = session?.user.id ?? null

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      if (!data.session) setLoading(false)
    })
    const { data } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next)
      if (!next) {
        setProfile(null)
        setLoading(false)
      }
    })
    return () => data.subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (!userId) return
    let active = true
    supabase
      .from('profiles')
      .select('user_id, plan, created_at')
      .eq('user_id', userId)
      .maybeSingle()
      .then(({ data }) => {
        if (!active) return
        setProfile((data as Profile | null) ?? null)
        setLoading(false)
      })
    return () => {
      active = false
    }
  }, [userId])

  const value: AuthState = {
    session,
    profile,
    isPro: profile?.plan === 'pro',
    loading,
    signInWithEmail: async (email) => {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: `${window.location.origin}/account`, shouldCreateUser: true },
      })
      if (error) throw error
    },
    signOut: async () => {
      await supabase.auth.signOut()
    },
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}

// Cache key fragment for data whose visibility depends on the viewer (RLS).
// Null while auth is resolving, so useAsync waits instead of fetching twice.
// eslint-disable-next-line react-refresh/only-export-components
export function useViewerKey(): string | null {
  const { session, isPro, loading } = useAuth()
  if (loading) return null
  return `${session?.user.id ?? 'anon'}:${isPro ? 'pro' : 'free'}`
}
