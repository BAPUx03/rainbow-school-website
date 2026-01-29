import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Activity {
  id: string;
  name: string;
  description: string | null;
  emoji: string | null;
  icon_name: string | null;
  color_class: string | null;
  display_order: number | null;
  is_active: boolean | null;
}

const colorOptions = [
  { label: "Pink", value: "bg-candy" },
  { label: "Blue", value: "bg-sky" },
  { label: "Purple", value: "bg-lavender" },
  { label: "Green", value: "bg-mint" },
  { label: "Yellow", value: "bg-sunshine" },
  { label: "Orange", value: "bg-orange" },
];

const emojiOptions = ["🎨", "🎵", "📖", "⚽", "🤖", "🍳", "🎭", "🌱", "🔬", "🎪"];

const ActivitiesSection = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    emoji: "🎨",
    icon_name: "Palette",
    color_class: "bg-candy",
    display_order: 0,
    is_active: true,
  });

  const fetchActivities = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("activities")
      .select("*")
      .order("display_order");

    if (error) {
      toast.error("Failed to fetch activities");
    } else {
      setActivities(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const openDialog = (activity?: Activity) => {
    if (activity) {
      setEditingActivity(activity);
      setFormData({
        name: activity.name,
        description: activity.description || "",
        emoji: activity.emoji || "🎨",
        icon_name: activity.icon_name || "Palette",
        color_class: activity.color_class || "bg-candy",
        display_order: activity.display_order || 0,
        is_active: activity.is_active ?? true,
      });
    } else {
      setEditingActivity(null);
      setFormData({
        name: "",
        description: "",
        emoji: "🎨",
        icon_name: "Palette",
        color_class: "bg-candy",
        display_order: activities.length + 1,
        is_active: true,
      });
    }
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    if (!formData.name) {
      toast.error("Name is required");
      return;
    }

    if (editingActivity) {
      const { error } = await supabase
        .from("activities")
        .update(formData)
        .eq("id", editingActivity.id);

      if (error) {
        toast.error("Failed to update activity");
      } else {
        toast.success("Activity updated!");
        fetchActivities();
      }
    } else {
      const { error } = await supabase.from("activities").insert([formData]);

      if (error) {
        toast.error("Failed to add activity");
      } else {
        toast.success("Activity added!");
        fetchActivities();
      }
    }
    setIsDialogOpen(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this activity?")) return;

    const { error } = await supabase.from("activities").delete().eq("id", id);

    if (error) {
      toast.error("Failed to delete activity");
    } else {
      toast.success("Activity deleted");
      fetchActivities();
    }
  };

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-playful"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-fredoka font-bold text-xl text-foreground">
            Activities 🎨
          </h2>
          <Button onClick={() => openDialog()} className="btn-playful bg-candy text-primary-foreground">
            <Plus className="w-4 h-4 mr-2" /> Add Activity
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activities.map((activity) => (
              <motion.div
                key={activity.id}
                className={`p-4 rounded-xl border-2 border-border bg-card ${
                  !activity.is_active ? "opacity-60" : ""
                }`}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-12 h-12 rounded-xl ${activity.color_class} flex items-center justify-center text-2xl flex-shrink-0`}
                  >
                    {activity.emoji}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-fredoka font-bold text-foreground">
                      {activity.name}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {activity.description}
                    </p>
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-3">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => openDialog(activity)}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-destructive"
                    onClick={() => handleDelete(activity.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-fredoka">
              {editingActivity ? "Edit Activity" : "Add Activity"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Name *</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Art & Craft"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief description..."
                rows={2}
              />
            </div>
            <div>
              <Label>Emoji</Label>
              <div className="flex gap-2 mt-2 flex-wrap">
                {emojiOptions.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => setFormData({ ...formData, emoji })}
                    className={`w-10 h-10 rounded-lg text-xl flex items-center justify-center ${
                      formData.emoji === emoji ? "bg-muted ring-2 ring-foreground" : "hover:bg-muted"
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <Label>Color</Label>
              <div className="flex gap-2 mt-2">
                {colorOptions.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setFormData({ ...formData, color_class: color.value })}
                    className={`w-8 h-8 rounded-full ${color.value} ${
                      formData.color_class === color.value ? "ring-2 ring-offset-2 ring-foreground" : ""
                    }`}
                    title={color.label}
                  />
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <Label>Active</Label>
              <Switch
                checked={formData.is_active}
                onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                <X className="w-4 h-4 mr-2" /> Cancel
              </Button>
              <Button onClick={handleSave} className="bg-candy text-primary-foreground">
                <Save className="w-4 h-4 mr-2" /> Save
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ActivitiesSection;
