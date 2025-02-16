/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'pics.craiyon.com',
            
          },
          {
            protocol: 'https',
            hostname: 'encrypted-tbn0.gstatic.com',
            
          },
          {
            protocol: 'https',
            hostname: 'avatars.githubusercontent.com',
            
          },
          {
            protocol: 'https',
            hostname: 'iffadcitwirnptuabcbr.supabase.co',
            
          },
          
        ],
      }
};

export default nextConfig;
