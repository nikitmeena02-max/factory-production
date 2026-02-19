import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://qigcozewxkcclcxtxkmm.supabase.co"
const supabaseKey = "sb_publishable_XF2xdJQwVE6X_R56iRfTAg_h8IiBP-H"

export const supabase = createClient(supabaseUrl, supabaseKey)
