-- Create app_role enum for roles
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- Create user_roles table for proper admin authentication
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create site_settings table for SEO and general settings
CREATE TABLE public.site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL UNIQUE,
  value TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create teachers table
CREATE TABLE public.teachers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  bio TEXT,
  image_url TEXT,
  color_class TEXT DEFAULT 'from-candy to-candy-dark',
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create classes table
CREATE TABLE public.classes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  age_range TEXT NOT NULL,
  description TEXT,
  features TEXT[],
  icon_name TEXT DEFAULT 'Baby',
  color_class TEXT DEFAULT 'from-candy to-candy-dark',
  bg_color_class TEXT DEFAULT 'bg-candy/10',
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create activities table
CREATE TABLE public.activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  emoji TEXT DEFAULT '🎨',
  icon_name TEXT DEFAULT 'Palette',
  color_class TEXT DEFAULT 'bg-candy',
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create testimonials table
CREATE TABLE public.testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  content TEXT NOT NULL,
  rating INTEGER DEFAULT 5,
  avatar_initials TEXT,
  color_class TEXT DEFAULT 'bg-candy',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create gallery table
CREATE TABLE public.gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url TEXT NOT NULL,
  alt_text TEXT,
  category TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create contact_messages table for contact form submissions
CREATE TABLE public.contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Public read policies (for website display)
CREATE POLICY "Anyone can view site settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Anyone can view active teachers" ON public.teachers FOR SELECT USING (is_active = true);
CREATE POLICY "Anyone can view active classes" ON public.classes FOR SELECT USING (is_active = true);
CREATE POLICY "Anyone can view active activities" ON public.activities FOR SELECT USING (is_active = true);
CREATE POLICY "Anyone can view active testimonials" ON public.testimonials FOR SELECT USING (is_active = true);
CREATE POLICY "Anyone can view active gallery" ON public.gallery FOR SELECT USING (is_active = true);

-- Public insert for contact messages
CREATE POLICY "Anyone can submit contact message" ON public.contact_messages FOR INSERT WITH CHECK (true);

-- Admin policies using has_role function
CREATE POLICY "Admins can manage site settings" ON public.site_settings FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage teachers" ON public.teachers FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage classes" ON public.classes FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage activities" ON public.activities FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage testimonials" ON public.testimonials FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage gallery" ON public.gallery FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can view contact messages" ON public.contact_messages FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update contact messages" ON public.contact_messages FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Admin policies for user_roles
CREATE POLICY "Admins can view roles" ON public.user_roles FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Add triggers for updated_at
CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_teachers_updated_at BEFORE UPDATE ON public.teachers FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_classes_updated_at BEFORE UPDATE ON public.classes FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_activities_updated_at BEFORE UPDATE ON public.activities FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON public.testimonials FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_gallery_updated_at BEFORE UPDATE ON public.gallery FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default SEO settings
INSERT INTO public.site_settings (key, value) VALUES
  ('site_title', 'Rainbow Kids Academy - Joyful Learning for Little Ones'),
  ('site_description', 'Rainbow Kids Academy is a premier preschool in Ahmedabad offering play-based learning, creative activities, and nurturing education for children aged 3-7.'),
  ('og_image', 'https://lovable.dev/opengraph-image-p98pqg.png'),
  ('school_name', 'Rainbow Kids Academy'),
  ('school_tagline', 'Where Every Child Shines Bright'),
  ('school_phone', '+91 7016592727'),
  ('school_email', 'pruthvirajsinh.biz@gmail.com'),
  ('school_address', 'Near City Garden, Vastrapur, Ahmedabad, Gujarat 380015'),
  ('school_hours', 'Mon-Sat: 8:00 AM - 5:00 PM'),
  ('mission_statement', 'To provide a joyful, inclusive, and stimulating environment where children develop confidence, creativity, and a lifelong love for learning through play-based education and meaningful experiences.');

-- Insert default teachers
INSERT INTO public.teachers (name, role, bio, image_url, color_class, display_order) VALUES
  ('Mrs. Priya Sharma', 'Art Teacher', 'Passionate about nurturing creativity in young minds through colorful art projects and rangoli.', '/placeholder.svg', 'from-candy to-candy-dark', 1),
  ('Mr. Vikram Patel', 'Sports Coach', 'Dedicated to helping children develop physical skills through yoga, cricket and fun games.', '/placeholder.svg', 'from-mint to-mint-dark', 2),
  ('Mrs. Anita Desai', 'Storytelling Teacher', 'Bringing magical Indian folk tales to life and inspiring a love for reading.', '/placeholder.svg', 'from-lavender to-lavender-dark', 3);

-- Insert default classes
INSERT INTO public.classes (name, age_range, description, features, icon_name, color_class, bg_color_class, display_order) VALUES
  ('Play Group', 'Age 3-4', 'Introduction to learning through play, sensory activities, and social interaction.', ARRAY['Sensory Play', 'Basic Shapes & Colors', 'Rhymes & Songs', 'Motor Skills'], 'Baby', 'from-candy to-candy-dark', 'bg-candy/10', 1),
  ('Nursery', 'Age 4-5', 'Building foundational skills in literacy, numeracy, and creative expression.', ARRAY['Alphabet Recognition', 'Number Concepts', 'Art & Craft', 'Story Time'], 'BookOpen', 'from-sky to-sky-dark', 'bg-sky/10', 2),
  ('Junior KG', 'Age 5-6', 'Developing reading, writing, and mathematical thinking skills.', ARRAY['Reading Basics', 'Simple Math', 'Science Exploration', 'Physical Education'], 'School', 'from-mint to-mint-dark', 'bg-mint/10', 3),
  ('Senior KG', 'Age 6-7', 'Preparing for primary school with advanced academic and life skills.', ARRAY['Advanced Reading', 'Problem Solving', 'Environmental Studies', 'Digital Basics'], 'GraduationCap', 'from-lavender to-lavender-dark', 'bg-lavender/10', 4);

-- Insert default activities
INSERT INTO public.activities (name, description, emoji, icon_name, color_class, display_order) VALUES
  ('Art & Craft', 'Express creativity through painting, drawing, and hands-on craft projects.', '🎨', 'Palette', 'bg-candy', 1),
  ('Music & Dance', 'Explore rhythm, movement, and musical instruments in fun sessions.', '🎵', 'Music', 'bg-sky', 2),
  ('Story Time', 'Magical storytelling sessions that spark imagination and language skills.', '📖', 'BookOpen', 'bg-lavender', 3),
  ('Sports', 'Physical activities that develop coordination, teamwork, and fitness.', '⚽', 'Trophy', 'bg-mint', 4),
  ('Basic Robotics', 'Introduction to STEM concepts through fun robotics activities.', '🤖', 'Cpu', 'bg-sunshine', 5),
  ('Cooking Fun', 'Simple cooking activities that teach life skills and healthy eating.', '🍳', 'Utensils', 'bg-orange', 6);

-- Insert default testimonials
INSERT INTO public.testimonials (name, role, content, rating, avatar_initials, color_class) VALUES
  ('Priya Patel', 'Parent of Aarav, Age 5', 'Rainbow Kids Academy has been a blessing for our family. Aarav has grown so much in confidence and loves going to school every day. The teachers are incredibly caring and creative!', 5, 'PP', 'bg-candy'),
  ('Rajesh Sharma', 'Parent of Ananya, Age 4', 'The curriculum is perfect for young children - learning through play! Ananya comes home excited about what she learned each day. The communication with parents is excellent.', 5, 'RS', 'bg-sky'),
  ('Meera Desai', 'Parent of Ishaan, Age 6', 'The best decision we made was enrolling Ishaan here. The facilities are wonderful, and the teachers go above and beyond. He''s made great friends and loves all the activities!', 5, 'MD', 'bg-mint'),
  ('Amit Mehta', 'Parent of Kavya, Age 3', 'As first-time parents, we were nervous about preschool, but Rainbow Kids made the transition so smooth. Kavya adapted quickly and the staff are amazing with the little ones.', 5, 'AM', 'bg-lavender');

-- Insert default gallery items
INSERT INTO public.gallery (image_url, alt_text, category, display_order) VALUES
  ('https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600&h=400&fit=crop', 'Children painting in art class', 'Art', 1),
  ('https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&h=400&fit=crop', 'Kids playing in the playground', 'Play', 2),
  ('https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=600&h=400&fit=crop', 'Story time with teacher', 'Learning', 3),
  ('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop', 'Children doing crafts', 'Craft', 4),
  ('https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=600&h=400&fit=crop', 'Music class performance', 'Music', 5),
  ('https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=600&h=400&fit=crop', 'Outdoor activities', 'Sports', 6);