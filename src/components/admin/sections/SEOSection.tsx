import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Save, Globe, Building, Phone, Mail, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const SEOSection = () => {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("key, value");

      if (error) {
        toast.error("Failed to fetch settings");
      } else {
        const settingsObj: Record<string, string> = {};
        data?.forEach((item) => {
          settingsObj[item.key] = item.value || "";
        });
        setSettings(settingsObj);
      }
      setLoading(false);
    };

    fetchSettings();
  }, []);

  const handleChange = (key: string, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    
    const updates = Object.entries(settings).map(([key, value]) => ({
      key,
      value,
    }));

    for (const update of updates) {
      const { error } = await supabase
        .from("site_settings")
        .update({ value: update.value })
        .eq("key", update.key);

      if (error) {
        toast.error(`Failed to update ${update.key}`);
        setSaving(false);
        return;
      }
    }

    toast.success("Settings saved successfully! 🎉");
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <div className="animate-spin text-4xl">⏳</div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* SEO Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-playful"
      >
        <div className="flex items-center gap-2 mb-6">
          <Globe className="w-6 h-6 text-sky" />
          <h2 className="font-fredoka font-bold text-xl text-foreground">
            SEO Settings
          </h2>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="site_title">Site Title (for browser tab & search results)</Label>
            <Input
              id="site_title"
              value={settings.site_title || ""}
              onChange={(e) => handleChange("site_title", e.target.value)}
              placeholder="Rainbow Kids Academy - Joyful Learning"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="site_description">Meta Description (for search results)</Label>
            <Textarea
              id="site_description"
              value={settings.site_description || ""}
              onChange={(e) => handleChange("site_description", e.target.value)}
              placeholder="Describe your school in 160 characters..."
              className="mt-1"
              rows={3}
            />
            <p className="text-xs text-muted-foreground mt-1">
              {(settings.site_description || "").length}/160 characters recommended
            </p>
          </div>

          <div>
            <Label htmlFor="og_image">Social Share Image URL</Label>
            <Input
              id="og_image"
              value={settings.og_image || ""}
              onChange={(e) => handleChange("og_image", e.target.value)}
              placeholder="https://example.com/image.png"
              className="mt-1"
            />
          </div>
        </div>
      </motion.div>

      {/* School Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card-playful"
      >
        <div className="flex items-center gap-2 mb-6">
          <Building className="w-6 h-6 text-candy" />
          <h2 className="font-fredoka font-bold text-xl text-foreground">
            School Information
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="school_name">School Name</Label>
            <Input
              id="school_name"
              value={settings.school_name || ""}
              onChange={(e) => handleChange("school_name", e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="school_tagline">Tagline</Label>
            <Input
              id="school_tagline"
              value={settings.school_tagline || ""}
              onChange={(e) => handleChange("school_tagline", e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="school_phone" className="flex items-center gap-2">
              <Phone className="w-4 h-4" /> Phone
            </Label>
            <Input
              id="school_phone"
              value={settings.school_phone || ""}
              onChange={(e) => handleChange("school_phone", e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="school_email" className="flex items-center gap-2">
              <Mail className="w-4 h-4" /> Email
            </Label>
            <Input
              id="school_email"
              value={settings.school_email || ""}
              onChange={(e) => handleChange("school_email", e.target.value)}
              className="mt-1"
            />
          </div>

          <div className="md:col-span-2">
            <Label htmlFor="school_address" className="flex items-center gap-2">
              <MapPin className="w-4 h-4" /> Address
            </Label>
            <Input
              id="school_address"
              value={settings.school_address || ""}
              onChange={(e) => handleChange("school_address", e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="school_hours" className="flex items-center gap-2">
              <Clock className="w-4 h-4" /> Operating Hours
            </Label>
            <Input
              id="school_hours"
              value={settings.school_hours || ""}
              onChange={(e) => handleChange("school_hours", e.target.value)}
              className="mt-1"
            />
          </div>
        </div>
      </motion.div>

      {/* Mission Statement */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card-playful"
      >
        <h2 className="font-fredoka font-bold text-xl text-foreground mb-4">
          Mission Statement 🎯
        </h2>
        <Textarea
          value={settings.mission_statement || ""}
          onChange={(e) => handleChange("mission_statement", e.target.value)}
          rows={4}
          placeholder="Enter your school's mission statement..."
        />
      </motion.div>

      {/* Save Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex justify-end"
      >
        <Button
          onClick={handleSave}
          disabled={saving}
          className="btn-playful bg-gradient-rainbow text-primary-foreground"
        >
          <Save className="w-4 h-4 mr-2" />
          {saving ? "Saving..." : "Save All Settings"}
        </Button>
      </motion.div>
    </div>
  );
};

export default SEOSection;
