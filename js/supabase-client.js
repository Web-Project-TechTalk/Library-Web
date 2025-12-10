// 1. Đổi sang dùng esm.sh để tải thư viện ổn định hơn (Sửa lỗi crash AuthClient)
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// 2. Điền lại đúng thông tin từ Dashboard
const supabaseUrl = 'https://jezsstpkmfttnckgnnxo.supabase.co';

const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImplenNzdHBrbWZ0dG5ja2dubnhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE0MDQ5NTYsImV4cCI6MjA3Njk4MDk1Nn0.vbDpPg4iZj5O68uDPU2ABWsKd15qD9n0P9MTfN-_ziI'; 

// Xuất client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);