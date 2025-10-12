import { useEffect, useRef, useState } from "react";
import InteractiveTimeline from "./InteractiveTimeline";
import SectionTransition from "./SectionTransition";
import { GraduationCap, Award, Briefcase, Users, Heart, Target } from "lucide-react";
import LiquidDistortImage from "./LiquidDistortImage";
import approachStrategyImg from "@/assets/approach-strategy.jpg";
import { motion } from "framer-motion";

const leaders = [
  {
    initials: "JW",
    name: "J. Wole",
    title: "Founder & Director",
    headline: "Two Decades of Dedicated Service",
    bio: [
      "With over two decades of experience in health and social care, J. Wole is a highly accomplished care manager with a proven track record in managing teams across diverse care settings.",
      "Beginning at 18 as a residential support worker, J. Wole progressed to team leader and manager before holding senior leadership roles including Regional Manager and Operations Director."
    ],
    qualifications: [
      { icon: GraduationCap, title: "BSc in Health and Social Care", subtitle: "University of South Wales" },
      { icon: Award, title: "Level 5 Diploma", subtitle: "Leadership and Management for Residential Child Care" },
      { icon: Briefcase, title: "Level 3 Diploma", subtitle: "Health Care Professions" }
    ]
  },
  {
    initials: "FJ",
    name: "Femi Johnson",
    title: "Operations Director",
    headline: "About Femi",
    bio: [
      "Femi is a qualified social worker and mental health Nurse with over a decade experience in Children's Social Care. Femi joined Dreampath in August 2025 and has brought a wealth of knowledge and skills from his previous roles with him.",
      "Femi is a valued member of our executive team and in his role is responsible for all aspects of operational delivery."
    ],
    qualifications: [
      { icon: Briefcase, title: "Qualified Social Worker", subtitle: "Over 10 years in Children's Social Care" },
      { icon: Heart, title: "Mental Health Nurse", subtitle: "Specialized in children and young people" },
      { icon: Target, title: "Operations Director", subtitle: "Executive team member since August 2025" }
    ]
  },
  {
    initials: "TU",
    name: "Tiere Usifo",
    title: "Team Manager",
    headline: "About Tiere",
    bio: [
      "Tiere is a highly experienced and accomplished care manager with a proven track record of over 16 yrs in managing teams across diverse healthcare settings for children and young people workforce.",
      "He has demonstrated exceptional leadership skills and has worked closely with teams involved in caring for looked after children and been involved with ofsted inspections. His extensive experience in managing teams has enabled him to develop a deep understanding of the complexities involved in providing high-quality care services to children and families."
    ],
    qualifications: [
      { icon: Users, title: "16+ Years Experience", subtitle: "Managing diverse healthcare teams" },
      { icon: Award, title: "Ofsted Inspections", subtitle: "Extensive involvement and expertise" },
      { icon: Heart, title: "Looked After Children", subtitle: "Specialist in care for vulnerable youth" }
    ]
  },
  {
    initials: "NA",
    name: "Naomie Anne",
    title: "Head of People and Culture",
    headline: "About Naomie",
    bio: [
      "Naomie leads on all people-related strategy across the organisation bringing a strong background in employee relations, workforce development and organisational culture.",
      "She is very passionate about creating a supportive and inclusive environment for employees ensuring teams are well-equipped to provide the highest standard of care to the children and young people in our care. Naomie plays a key role in talent acquisition, policy development and employee wellbeing, aligning HR practices with the organisation's mission to make every day better for the young people we support and our employees."
    ],
    qualifications: [
      { icon: Users, title: "People Strategy", subtitle: "Employee relations & workforce development" },
      { icon: Heart, title: "Inclusive Culture", subtitle: "Creating supportive work environments" },
      { icon: Target, title: "Talent & Wellbeing", subtitle: "Acquisition, policy & employee wellbeing" }
    ]
  }
];

const LeadershipSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="leadership"
      ref={sectionRef}
      className="py-32 relative overflow-hidden"
      style={{ background: "var(--gradient-hero)" }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-float-delayed" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-6 py-2 bg-white/80 backdrop-blur-sm rounded-full mb-6">
            <span className="text-primary font-semibold text-sm">Leadership</span>
          </div>
          
          <h2 className={`text-5xl md:text-6xl font-display font-bold mb-6 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
            Led by <span className="text-gradient">Experience</span>
          </h2>
        </div>

        {/* Leadership Cards */}
        <div className="space-y-8 mb-20">
          {leaders.map((leader, index) => (
            <motion.div
              key={leader.name}
              className={`max-w-5xl mx-auto ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden hover:shadow-[var(--shadow-glow)] transition-all duration-500">
                <div className="grid md:grid-cols-5 gap-0">
                  {/* Image Side */}
                  <div className="md:col-span-2 bg-gradient-to-br from-primary/10 to-secondary/10 p-12 flex items-center justify-center">
                    <div className="text-center">
                      <motion.div 
                        className="w-48 h-48 bg-white rounded-full shadow-xl flex items-center justify-center mx-auto mb-6"
                        whileHover={{ scale: 1.05, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <span className="text-6xl font-display font-bold text-primary">{leader.initials}</span>
                      </motion.div>
                      <h3 className="text-2xl font-display font-bold text-foreground mb-2">{leader.name}</h3>
                      <p className="text-primary font-semibold">{leader.title}</p>
                    </div>
                  </div>

                  {/* Content Side */}
                  <div className="md:col-span-3 p-12">
                    <h3 className="text-3xl font-display font-bold mb-6 text-foreground">
                      {leader.headline}
                    </h3>
                    
                    <div className="space-y-6 text-foreground/80 leading-relaxed mb-8">
                      {leader.bio.map((paragraph, i) => (
                        <p key={i}>{paragraph}</p>
                      ))}
                    </div>

                    {/* Qualifications */}
                    <div className="space-y-4">
                      {leader.qualifications.map((qual, i) => (
                        <motion.div 
                          key={i}
                          className="flex items-start space-x-4 group"
                          whileHover={{ x: 10 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300">
                            <qual.icon className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground mb-1">{qual.title}</h4>
                            <p className="text-sm text-foreground/70">{qual.subtitle}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Interactive Timeline */}
        <SectionTransition variant="reveal">
          <div className="mt-20">
            <div className="text-center mb-12">
              <h3 className="text-4xl font-display font-bold mb-4">
                The Journey to <span className="text-gradient">Dream Path</span>
              </h3>
              <p className="text-xl text-foreground/80">
                Over 20 years of dedication to children's care
              </p>
            </div>
            
            {/* Strategic Approach Image */}
            <div className="mb-12">
              <LiquidDistortImage 
                src={approachStrategyImg}
                alt="Strategic Approach Visualization"
                className="max-w-4xl mx-auto h-80"
              />
            </div>
            
            <InteractiveTimeline />
          </div>
        </SectionTransition>
      </div>
    </section>
  );
};

export default LeadershipSection;
