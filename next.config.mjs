/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        domains:['www.sarouty.ma','focus.courrierinternational.com']
    },
    env:{
        BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL
    },
    typescript:{
        ignoreBuildErrors: true,
    },
    
};

export default nextConfig;
