import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Check, RefreshCw, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { format } from "date-fns";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  is_read: boolean | null;
  created_at: string;
}

const MessagesSection = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchMessages = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to fetch messages");
    } else {
      setMessages(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const markAsRead = async (id: string) => {
    const { error } = await supabase
      .from("contact_messages")
      .update({ is_read: true })
      .eq("id", id);

    if (error) {
      toast.error("Failed to update message");
    } else {
      fetchMessages();
    }
  };

  const filteredMessages = messages.filter(
    (m) =>
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const unreadCount = messages.filter((m) => !m.is_read).length;

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-playful"
      >
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center mb-6">
          <div className="flex items-center gap-3">
            <h2 className="font-fredoka font-bold text-xl text-foreground">
              Contact Messages ✉️
            </h2>
            {unreadCount > 0 && (
              <Badge className="bg-destructive text-destructive-foreground">
                {unreadCount} new
              </Badge>
            )}
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search messages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" onClick={fetchMessages} disabled={loading}>
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : filteredMessages.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No messages found
          </div>
        ) : (
          <div className="space-y-4">
            {filteredMessages.map((message) => (
              <motion.div
                key={message.id}
                className={`p-4 rounded-xl border-2 ${
                  message.is_read
                    ? "border-border bg-card"
                    : "border-sky bg-sky/5"
                }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="flex flex-col md:flex-row gap-4 justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-fredoka font-bold text-foreground">
                        {message.name}
                      </h3>
                      {!message.is_read && (
                        <Badge className="bg-sky text-primary-foreground text-xs">
                          New
                        </Badge>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        {message.email}
                      </span>
                      {message.phone && (
                        <span className="flex items-center gap-1">
                          <Phone className="w-4 h-4" />
                          {message.phone}
                        </span>
                      )}
                    </div>
                    <p className="text-foreground font-nunito">{message.message}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Received: {format(new Date(message.created_at), "dd MMM yyyy, hh:mm a")}
                    </p>
                  </div>
                  <div className="flex md:flex-col gap-2">
                    {!message.is_read && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => markAsRead(message.id)}
                        className="text-mint"
                      >
                        <Check className="w-4 h-4 mr-1" /> Mark Read
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => window.open(`mailto:${message.email}`)}
                    >
                      <Mail className="w-4 h-4 mr-1" /> Reply
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default MessagesSection;
