import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// 🛠️ Initialize Supabase
const supabase = createClient("https://iffadcitwirnptuabcbr.supabase.co", process.env.SUPABASE_SERVICE_KEY);

export async function GET(req) {
    try {
      // Public Image URL
      const imageUrl =
        "https://iffadcitwirnptuabcbr.supabase.co/storage/v1/object/public/findyourdateuserimages//mohit.jpg";
  
      // ✅ Extract Object Path from URL
      let filePath = imageUrl.replace(
        "https://iffadcitwirnptuabcbr.supabase.co/storage/v1/object/public/findyourdateuserimages/",
        ""
      );
  
      // ✅ Remove any leading or trailing slashes
      filePath = filePath.replace(/^\/+|\/+$/g, "");
  
      console.log("Extracted File Path:", filePath); // Debugging
  
      if (!filePath) throw new Error("Invalid file path extracted.");
  
      // ✅ Delete Image from Supabase Storage
      const { data, error } = await supabase.storage
        .from("findyourdateuserimages") // Correct bucket name
        .remove([filePath]);
  
      console.log("Delete Response:", data, error); // Debugging
  
      if (error) throw error;
  
      return NextResponse.json(
        { message: "Image deleted successfully!", deletedFile: data },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }
  }