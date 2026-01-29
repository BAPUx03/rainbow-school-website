import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check, X, Clock, Search, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { format } from "date-fns";

interface Enrollment {
  id: string;
  child_name: string;
  date_of_birth: string;
  class_type: string;
  parent_name: string;
  email: string;
  phone: string;
  status: string;
  created_at: string;
}

const EnrollmentsSection = () => {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchEnrollments = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("enrollments")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to fetch enrollments");
    } else {
      setEnrollments(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from("enrollments")
      .update({ status })
      .eq("id", id);

    if (error) {
      toast.error("Failed to update status");
    } else {
      toast.success(`Enrollment ${status}`);
      fetchEnrollments();
    }
  };

  const filteredEnrollments = enrollments.filter(
    (e) =>
      e.child_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.parent_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-mint text-primary-foreground">Approved</Badge>;
      case "rejected":
        return <Badge className="bg-destructive text-destructive-foreground">Rejected</Badge>;
      default:
        return <Badge className="bg-sunshine text-primary-foreground">Pending</Badge>;
    }
  };

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-playful"
      >
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center mb-6">
          <h2 className="font-fredoka font-bold text-xl text-foreground">
            Enrollment Submissions 📝
          </h2>
          <div className="flex gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search enrollments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" onClick={fetchEnrollments} disabled={loading}>
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Child Name</TableHead>
                <TableHead>DOB</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Parent</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEnrollments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                    {loading ? "Loading..." : "No enrollments found"}
                  </TableCell>
                </TableRow>
              ) : (
                filteredEnrollments.map((enrollment) => (
                  <TableRow key={enrollment.id}>
                    <TableCell className="font-semibold">{enrollment.child_name}</TableCell>
                    <TableCell>{format(new Date(enrollment.date_of_birth), "dd MMM yyyy")}</TableCell>
                    <TableCell>{enrollment.class_type}</TableCell>
                    <TableCell>{enrollment.parent_name}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{enrollment.email}</div>
                        <div className="text-muted-foreground">{enrollment.phone}</div>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(enrollment.status)}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {format(new Date(enrollment.created_at), "dd MMM yyyy")}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {enrollment.status === "pending" && (
                          <>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => updateStatus(enrollment.id, "approved")}
                              className="text-mint hover:text-mint-dark"
                            >
                              <Check className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => updateStatus(enrollment.id, "rejected")}
                              className="text-destructive hover:text-destructive/80"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                        {enrollment.status !== "pending" && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => updateStatus(enrollment.id, "pending")}
                            className="text-sunshine hover:text-sunshine-dark"
                          >
                            <Clock className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </motion.div>
    </div>
  );
};

export default EnrollmentsSection;
