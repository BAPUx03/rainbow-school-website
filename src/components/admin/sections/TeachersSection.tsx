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

interface Teacher {
  id: string;
  name: string;
  role: string;
  bio: string | null;
  image_url: string | null;
  color_class: string | null;
  display_order: number | null;
  is_active: boolean | null;
}

const colorOptions = [
  { label: "Pink", value: "from-candy to-candy-dark" },
  { label: "Green", value: "from-mint to-mint-dark" },
  { label: "Purple", value: "from-lavender to-lavender-dark" },
  { label: "Blue", value: "from-sky to-sky-dark" },
  { label: "Yellow", value: "from-sunshine to-sunshine-dark" },
];

const TeachersSection = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    bio: "",
    image_url: "",
    color_class: "from-candy to-candy-dark",
    display_order: 0,
    is_active: true,
  });

  const fetchTeachers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("teachers")
      .select("*")
      .order("display_order");

    if (error) {
      toast.error("Failed to fetch teachers");
    } else {
      setTeachers(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const openDialog = (teacher?: Teacher) => {
    if (teacher) {
      setEditingTeacher(teacher);
      setFormData({
        name: teacher.name,
        role: teacher.role,
        bio: teacher.bio || "",
        image_url: teacher.image_url || "",
        color_class: teacher.color_class || "from-candy to-candy-dark",
        display_order: teacher.display_order || 0,
        is_active: teacher.is_active ?? true,
      });
    } else {
      setEditingTeacher(null);
      setFormData({
        name: "",
        role: "",
        bio: "",
        image_url: "",
        color_class: "from-candy to-candy-dark",
        display_order: teachers.length + 1,
        is_active: true,
      });
    }
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    if (!formData.name || !formData.role) {
      toast.error("Name and role are required");
      return;
    }

    if (editingTeacher) {
      const { error } = await supabase
        .from("teachers")
        .update(formData)
        .eq("id", editingTeacher.id);

      if (error) {
        toast.error("Failed to update teacher");
      } else {
        toast.success("Teacher updated!");
        fetchTeachers();
      }
    } else {
      const { error } = await supabase.from("teachers").insert([formData]);

      if (error) {
        toast.error("Failed to add teacher");
      } else {
        toast.success("Teacher added!");
        fetchTeachers();
      }
    }
    setIsDialogOpen(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this teacher?")) return;

    const { error } = await supabase.from("teachers").delete().eq("id", id);

    if (error) {
      toast.error("Failed to delete teacher");
    } else {
      toast.success("Teacher deleted");
      fetchTeachers();
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
            Teachers 👩‍🏫
          </h2>
          <Button onClick={() => openDialog()} className="btn-playful bg-sky text-primary-foreground">
            <Plus className="w-4 h-4 mr-2" /> Add Teacher
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {teachers.map((teacher) => (
              <motion.div
                key={teacher.id}
                className={`p-4 rounded-xl border-2 ${
                  teacher.is_active ? "border-border" : "border-muted opacity-60"
                } bg-card`}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-14 h-14 rounded-full bg-gradient-to-br ${teacher.color_class} flex items-center justify-center text-primary-foreground font-fredoka font-bold text-lg flex-shrink-0`}
                  >
                    {teacher.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-fredoka font-bold text-foreground">
                      {teacher.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{teacher.role}</p>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      {teacher.bio}
                    </p>
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-3">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => openDialog(teacher)}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-destructive"
                    onClick={() => handleDelete(teacher.id)}
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
              {editingTeacher ? "Edit Teacher" : "Add Teacher"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Name *</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Mrs. Priya Sharma"
              />
            </div>
            <div>
              <Label>Role *</Label>
              <Input
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                placeholder="Art Teacher"
              />
            </div>
            <div>
              <Label>Bio</Label>
              <Textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                placeholder="Brief description..."
                rows={3}
              />
            </div>
            <div>
              <Label>Image URL</Label>
              <Input
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                placeholder="https://example.com/photo.jpg"
              />
            </div>
            <div>
              <Label>Color Theme</Label>
              <div className="flex gap-2 mt-2">
                {colorOptions.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setFormData({ ...formData, color_class: color.value })}
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
              <Button onClick={handleSave} className="bg-sky text-primary-foreground">
                <Save className="w-4 h-4 mr-2" /> Save
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TeachersSection;
