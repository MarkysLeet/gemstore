"use client";

import { AIAdvisorSection } from "@/components/contacts/AIAdvisorSection";
import { OfficeMap } from "@/components/contacts/OfficeMap";
import { SocialHub } from "@/components/contacts/SocialHub";
import { MinimalContactForm } from "@/components/contacts/MinimalContactForm";
import { motion } from "framer-motion";

export default function ContactsPage() {
  return (
    <div className="bg-background min-h-screen pt-32">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <AIAdvisorSection />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <OfficeMap />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <SocialHub />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <MinimalContactForm />
      </motion.div>
    </div>
  );
}
