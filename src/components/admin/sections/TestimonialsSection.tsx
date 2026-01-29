import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, Save, X, Star } from "lucide-react";
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

interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number | null;
  avatar_initials: string | null;
  color_class: string | null;
  is_active: boolean | null;
}

const colorOptions = [
  { label: "Pink", value: "bg-candy" },
  { label: "Blue", value: "bg-sky" },
  { label: "Green", value: "bg-mint" },
  { label: "Purple", value: "bg-lavender" },
];

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    content: "",
    rating: 5,
    avatar_initials: "",
    color_class: "bg-candy",
    is_active: true,
  });

  const fetchTestimonials = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to fetch testimonials");
    } else {
      setTestimonials(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const openDialog = (testimonial?: Testimonial) => {
    if (testimonial) {
      setEditingTestimonial(testimonial);
      setFormData({
        name: testimonial.name,
        role: testimonial.role,
        content: testimonial.content,
        rating: testimonial.rating || 5,
        avatar_initials: testimonial.avatar_initials || "",
        color_class: testimonial.color_class || "bg-candy",
        is_active: testimonial.is_active ?? true,
      });
    } else {
      setEditingTestimonial(null);
      setFormData({
        name: "",
        role: "",
        content: "",
        rating: 5,
        avatar_initials: "",
        color_class: "bg-candy",
        is_active: true,
      });
    }
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    if (!formData.name || !formData.role || !formData.content) {
      toast.error("Name, role, and content are required");
      return;
    }

    const dataToSave = {
      ...formData,
      avatar_initials: formData.avatar_initials || getInitials(formData.name),
    };

    if (editingTestimonial) {
      const { error } = await supabase
        .from("testimonials")
        .update(dataToSave)
        .eq("id", editingTestimonial.id);

      if (error) {
        toast.error("Failed to update testimonial");
      } else {
        toast.success("Testimonial updated!");
        fetchTestimonials();
      }
    } else {
      const { error } = await supabase.from("testimonials").insert([dataToSave]);

      if (error) {
        toast.error("Failed to add testimonial");
      } else {
        toast.success("Testimonial added!");
        fetchTestimonials();
      }
    }
    setIsDialogOpen(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;

    const { error } = await supabase.from("testimonials").delete().eq("id", id);

    if (error) {
      toast.error("Failed to delete testimonial");
    } else {
      toast.success("Testimonial deleted");
      fetchTestimonials();
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
            Testimonials 💬
          </h2>
          <Button onClick={() => openDialog()} className="btn-playful bg-lavender text-primary-foreground">
            <Plus className="w-4 h-4 mr-2" /> Add Testimonial
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : (
          <div className="space-y-4">
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                className={`p-4 rounded-xl border-2 border-border bg-card ${
                  !testimonial.is_active ? "opacity-60" : ""
                }`}
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-full ${testimonial.color_class} flex items-center justify-center text-primary-foreground font-fredoka font-bold flex-shrink-0`}
                  >
                    {testimonial.avatar_initials}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-fredoka font-bold text-foreground">
                        {testimonial.name}
                      </h3>
                      <div className="flex gap-0.5">
                        {[...Array(testimonial.rating || 5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 text-sunshine fill-sunshine" />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{testimonial.role}</p>
                    <p className="text-sm text-foreground italic">"{testimonial.content}"</p>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => openDialog(testimonial)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-destructive"
                      onClick={() => handleDelete(testimonial.id)}
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
              {editingTestimonial ? "Edit Testimonial" : "Add Testimonial"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Parent Name *</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Priya Patel"
              />
            </div>
            <div>
              <Label>Role / Relation *</Label>
              <Input
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                placeholder="Parent of Aarav, Age 5"
              />
            </div>
            <div>
              <Label>Testimonial *</Label>
              <Textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="What did the parent say about your school?"
                rows={4}
              />
            </div>
            <div>
              <Label>Rating</Label>
              <div className="flex gap-1 mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setFormData({ ...formData, rating: star })}
                    className="p-1"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= formData.rating
                          ? "text-sunshine fill-sunshine"
                          : "text-muted-foreground"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <Label>Color Theme</Label>
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
              <Label>Active (visible on website)</Label>
              <Switch
                checked={formData.is_active}
                onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                <X className="w-4 h-4 mr-2" /> Cancel
              </Button>
              <Button onClick={handleSave} className="bg-lavender text-primary-foreground">
                <Save className="w-4 h-4 mr-2" /> Save
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TestimonialsSection;
