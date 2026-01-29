import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, Save, X, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

interface GalleryItem {
  id: string;
  image_url: string;
  alt_text: string | null;
  category: string | null;
  display_order: number | null;
  is_active: boolean | null;
}

const GallerySection = () => {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [formData, setFormData] = useState({
    image_url: "",
    alt_text: "",
    category: "",
    display_order: 0,
    is_active: true,
  });

  const fetchGallery = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("gallery")
      .select("*")
      .order("display_order");

    if (error) {
      toast.error("Failed to fetch gallery");
    } else {
      setGallery(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const openDialog = (item?: GalleryItem) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        image_url: item.image_url,
        alt_text: item.alt_text || "",
        category: item.category || "",
        display_order: item.display_order || 0,
        is_active: item.is_active ?? true,
      });
    } else {
      setEditingItem(null);
      setFormData({
        image_url: "",
        alt_text: "",
        category: "",
        display_order: gallery.length + 1,
        is_active: true,
      });
    }
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    if (!formData.image_url) {
      toast.error("Image URL is required");
      return;
    }

    if (editingItem) {
      const { error } = await supabase
        .from("gallery")
        .update(formData)
        .eq("id", editingItem.id);

      if (error) {
        toast.error("Failed to update image");
      } else {
        toast.success("Image updated!");
        fetchGallery();
      }
    } else {
      const { error } = await supabase.from("gallery").insert([formData]);

      if (error) {
        toast.error("Failed to add image");
      } else {
        toast.success("Image added!");
        fetchGallery();
      }
    }
    setIsDialogOpen(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this image?")) return;

    const { error } = await supabase.from("gallery").delete().eq("id", id);

    if (error) {
      toast.error("Failed to delete image");
    } else {
      toast.success("Image deleted");
      fetchGallery();
    }
  };

  const toggleActive = async (id: string, currentStatus: boolean | null) => {
    const { error } = await supabase
      .from("gallery")
      .update({ is_active: !currentStatus })
      .eq("id", id);

    if (error) {
      toast.error("Failed to update status");
    } else {
      fetchGallery();
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
            Gallery 📸
          </h2>
          <Button onClick={() => openDialog()} className="btn-playful bg-orange text-primary-foreground">
            <Plus className="w-4 h-4 mr-2" /> Add Image
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {gallery.map((item) => (
              <motion.div
                key={item.id}
                className={`relative group rounded-xl overflow-hidden aspect-[4/3] ${
                  !item.is_active ? "opacity-60" : ""
                }`}
                whileHover={{ scale: 1.02 }}
              >
                <img
                  src={item.image_url}
                  alt={item.alt_text || "Gallery image"}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                  <p className="text-background text-sm font-nunito truncate">
                    {item.category || "Uncategorized"}
                  </p>
                  <div className="flex gap-1 mt-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-background hover:bg-background/20"
                      onClick={() => toggleActive(item.id, item.is_active)}
                    >
                      {item.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-background hover:bg-background/20"
                      onClick={() => openDialog(item)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-background hover:bg-destructive/50"
                      onClick={() => handleDelete(item.id)}
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
              {editingItem ? "Edit Image" : "Add Image"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Image URL *</Label>
              <Input
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                placeholder="https://example.com/image.jpg"
              />
            </div>
            {formData.image_url && (
              <div className="rounded-lg overflow-hidden aspect-video">
                <img
                  src={formData.image_url}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/placeholder.svg";
                  }}
                />
              </div>
            )}
            <div>
              <Label>Alt Text (for accessibility)</Label>
              <Input
                value={formData.alt_text}
                onChange={(e) => setFormData({ ...formData, alt_text: e.target.value })}
                placeholder="Children painting in art class"
              />
            </div>
            <div>
              <Label>Category</Label>
              <Input
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="Art, Play, Learning, etc."
              />
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
              <Button onClick={handleSave} className="bg-orange text-primary-foreground">
                <Save className="w-4 h-4 mr-2" /> Save
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GallerySection;
