// quick script to verify Supabase connection using service role key
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(url, key);

async function run() {
  try {
    console.log('testing connection to', url);
    const { data, error } = await supabase.auth.admin.listUsers();
    if (error) {
      console.error('error listing users', error);
      process.exit(1);
    }
    console.log('users count:', data.length);
    console.log('first user', data[0]);
  } catch (err) {
    console.error('unexpected error', err);
    process.exit(1);
  }
}

run();
