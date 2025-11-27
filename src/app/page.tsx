"use client";

import { HeroSection } from "@/components/home/HeroSection";
import { ProductGrid } from "@/components/product/ProductGrid";
import { SocialCommerce } from "@/components/home/SocialCommerce";
import { AIRecommendation } from "@/components/home/AIRecommendation";

export default function Home() {
  return (
    <div className="bg-midnight min-h-screen text-white overflow-x-hidden selection:bg-neon-pink selection:text-white">

      {/* 1. Video-First Hero Section with Kinetic Typography */}
      <HeroSection />

      {/* 2. "Phygital" Product Grid */}
      <ProductGrid />

      {/* 3. AI Personalization Teaser */}
      <AIRecommendation />

      {/* 4. Social Commerce (TikTok Style Feed) */}
      <SocialCommerce />

    </div>
  );
}
