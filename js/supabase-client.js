// js/supabase-client.js

// Lấy từ file .js bạn cung cấp
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'

// Lấy thông tin này từ Project Settings > API trong Supabase dashboard
const supabaseUrl = 'https://jezsstpkmfttnckgnnxo.supabase.co'; // Ví dụ: 'https://xyz.supabase.co'
const supabaseAnonKey = 'sb_publishable_YalHSNPW2pLu14Ld6XWG-A_Zx61FX3u'; // Key an toàn (công khai)

// Xuất client để các file khác có thể import
export const supabase = createClient(supabaseUrl, supabaseAnonKey);