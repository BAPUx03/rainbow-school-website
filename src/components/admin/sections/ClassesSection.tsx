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

interface ClassItem {
  id: string;
  name: string;
  age_range: string;
  description: string | null;
  features: string[] | null;
  icon_name: string | null;
  color_class: string | null;
  bg_color_class: string | null;
  display_order: number | null;
  is_active: boolean | null;
}

const iconOptions = ["Baby", "BookOpen", "School", "GraduationCap"];
const colorOptions = [
  { label: "Pink", value: "from-candy to-candy-dark", bg: "bg-candy/10" },
  { label: "Blue", value: "from-sky to-sky-dark", bg: "bg-sky/10" },
  { label: "Green", value: "from-mint to-mint-dark", bg: "bg-mint/10" },
  { label: "Purple", value: "from-lavender to-lavender-dark", bg: "bg-lavender/10" },
];

const ClassesSection = () => {
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingClass, setEditingClass] = useState<ClassItem | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    age_range: "",
    description: "",
    features: "",
    icon_name: "Baby",
    color_class: "from-candy to-candy-dark",
    bg_color_class: "bg-candy/10",
    display_order: 0,
    is_active: true,
  });

  const fetchClasses = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("classes")
      .select("*")
      .order("display_order");

    if (error) {
      toast.error("Failed to fetch classes");
    } else {
      setClasses(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const openDialog = (classItem?: ClassItem) => {
    if (classItem) {
      setEditingClass(classItem);
      setFormData({
        name: classItem.name,
        age_range: classItem.age_range,
        description: classItem.description || "",
        features: (classItem.features || []).join(", "),
        icon_name: classItem.icon_name || "Baby",
        color_class: classItem.color_class || "from-candy to-candy-dark",
        bg_color_class: classItem.bg_color_class || "bg-candy/10",
        display_order: classItem.display_order || 0,
        is_active: classItem.is_active ?? true,
      });
    } else {
      setEditingClass(null);
      setFormData({
        name: "",
        age_range: "",
        description: "",
        features: "",
        icon_name: "Baby",
        color_class: "from-candy to-candy-dark",
        bg_color_class: "bg-candy/10",
        display_order: classes.length + 1,
        is_active: true,
      });
    }
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    if (!formData.name || !formData.age_range) {
      toast.error("Name and age range are required");
      return;
    }

    const featuresArray = formData.features
      .split(",")
      .map((f) => f.trim())
      .filter((f) => f);

    const dataToSave = {
      ...formData,
      features: featuresArray,
    };

    if (editingClass) {
      const { error } = await supabase
        .from("classes")
        .update(dataToSave)
        .eq("id", editingClass.id);

      if (error) {
        toast.error("Failed to update class");
      } else {
        toast.success("Class updated!");
        fetchClasses();
      }
    } else {
      const { error } = await supabase.from("classes").insert([dataToSave]);

      if (error) {
        toast.error("Failed to add class");
      } else {
        toast.success("Class added!");
        fetchClasses();
      }
    }
    setIsDialogOpen(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this class?")) return;

    const { error } = await supabase.from("classes").delete().eq("id", id);

    if (error) {
      toast.error("Failed to delete class");
    } else {
      toast.success("Class deleted");
      fetchClasses();
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
            Classes 📚
          </h2>
          <Button onClick={() => openDialog()} className="btn-playful bg-mint text-primary-foreground">
            <Plus className="w-4 h-4 mr-2" /> Add Class
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {classes.map((classItem) => (
              <motion.div
                key={classItem.id}
                className={`p-4 rounded-xl ${classItem.bg_color_class} ${
                  !classItem.is_active ? "opacity-60" : ""
                }`}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-fredoka font-bold text-lg text-foreground">
                        {classItem.name}
                      </h3>
                      <span className="px-2 py-0.5 rounded-full bg-background text-xs font-nunito">
                        {classItem.age_range}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {classItem.description}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {classItem.features?.map((feature, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-full bg-background text-xs font-nunito"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => openDialog(classItem)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-destructive"
                      onClick={() => handleDelete(classItem.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
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
              {editingClass ? "Edit Class" : "Add Class"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Name *</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Play Group"
              />
            </div>
            <div>
              <Label>Age Range *</Label>
              <Input
                value={formData.age_range}
                onChange={(e) => setFormData({ ...formData, age_range: e.target.value })}
                placeholder="Age 3-4"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief description of the class..."
                rows={2}
              />
            </div>
            <div>
              <Label>Features (comma separated)</Label>
              <Input
                value={formData.features}
                onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                placeholder="Sensory Play, Basic Shapes, Rhymes"
              />
            </div>
            <div>
              <Label>Color Theme</Label>
              <div className="flex gap-2 mt-2">
                {colorOptions.map((color) => (
                  <button
                    key={color.value}
                    onClick={() =>
                      setFormData({
                        ...formData,
                        color_class: color.value,
                        bg_color_class: color.bg,
                      })
                    }
                    className={`w-8 h-8 rounded-full bg-gradient-to-br ${color.value} ${
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
              <Button onClick={handleSave} className="bg-mint text-primary-foreground">
                <Save className="w-4 h-4 mr-2" /> Save
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ClassesSection;
