// Cliente Supabase único para la bolsa de CVs. Las claves salen de variables de entorno
// (.env en local, variables de build en Cloudflare). La publishable key es pública por diseño:
// la seguridad la dan las políticas RLS de supabase/schema.sql.
import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabaseConfigurado = Boolean(url && anonKey);
export const supabase = supabaseConfigurado ? createClient(url, anonKey) : null;
export const BUCKET_CVS = 'cvs';
