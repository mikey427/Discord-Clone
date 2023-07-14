import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://bmpfcxabycixprnmzmnn.supabase.co";
const supabaseKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJtcGZjeGFieWNpeHBybm16bW5uIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODg4ODkwMTAsImV4cCI6MjAwNDQ2NTAxMH0.6MBCeVeylx0Gq7hU5R4dXlBiBGVT2r1FqRzCxAJ-EeM";
export const supabase = createClient(supabaseUrl, supabaseKey);
