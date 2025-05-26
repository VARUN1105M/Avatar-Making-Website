import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dbjitwqphriwbwesxkcd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRiaml0d3FwaHJpd2J3ZXN4a2NkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczMjg2MTgsImV4cCI6MjA2MjkwNDYxOH0.WxyWJkhsVJEvcYoeQoFasJ_C4bYtiKWH_soAknl7op0';

export const supabase = createClient(supabaseUrl, supabaseKey);

