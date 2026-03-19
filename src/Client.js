import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://otjyjexoelbiwiqfbsgz.supabase.co";
const supabaseKey = "sb_publishable_h2CugGEC-qw7gZVF1EvAYA_Kr4QKyfs";

export const supabase = createClient(supabaseUrl, supabaseKey);