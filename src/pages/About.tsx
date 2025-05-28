import React, { useRef, useEffect, useState } from 'react';

import AppLayout from '@/components/layout/AppLayout';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from '@/components/ui/card';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from '@/components/ui/avatar';

import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import {
  Mail,
  ExternalLink,
  Github,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  MessageSquare,
  Globe,
  BookOpen,
  Users,
  Clock,
  Calendar,
  Award,
  ArrowRight,
  PhoneCall,
  Wrench,
  Lightbulb,
  X
} from 'lucide-react';

// Team members data
const teamMembers = [
  {
    name: "Yousef Tamer",
    role: "Founder & CEO",
    bio: "fullstack dev and bug hunter | non tech lead@ CyberCrew | cybersecurity co lead and backend lead@IEEE HTI | frontend dev@Brilliant Trend ksa",
    avatar: "https://api.dicebear.com/7.x/personas/svg?seed=mos3ad",
    social: {
      linkedin: "#",
      twitter: "#"
    }
  },
];

// Testimonials data
const testimonials = [
  {
    quote: "Team Shoky Helper transformed my study habits and helped me stay organized throughout my senior year. The exam tracker feature was a lifesaver!",
    author: "Emma Thompson",
    role: "Computer Science Student",
    university: "Stanford University",
    avatar: "https://api.dicebear.com/7.x/personas/svg?seed=EmmaThompson"
  },
  {
    quote: "As a student with ADHD, I often struggled with organization. This platform provided the structure I needed to succeed academically.",
    author: "James Wilson",
    role: "Psychology Major",
    university: "University of Michigan",
    avatar: "https://api.dicebear.com/7.x/personas/svg?seed=JamesWilson"
  },
  {
    quote: "The community features helped me connect with peers in my major, which led to study groups that improved my grades significantly.",
    author: "Sophia Chen",
    role: "Biology Student",
    university: "UC Berkeley",
    avatar: "https://api.dicebear.com/7.x/personas/svg?seed=SophiaChen"
  }
];

// FAQ data
const faqs = [
  {
    question: "What makes Team Shoky Helper different from other student tools?",
    answer: "Team Shoky Helper offers a comprehensive suite of tools specifically designed for college students, with a focus on personalization, community-building, and academic success. Our platform integrates features that other tools offer separately, providing a seamless experience for managing all aspects of student life."
  },
  {
    question: "Is Team Shoky Helper free to use?",
    answer: "Yes, our core features are free for all students. We offer a premium subscription that includes advanced features like AI study assistance, unlimited storage for notes, and priority support, but the essential tools for academic success are available to everyone at no cost."
  },
  {
    question: "How does the exam tracker work?",
    answer: "The exam tracker allows you to input your upcoming exams with details like date, time, location, and covered topics. It then creates a study schedule based on your available time and learning preferences, with reminders and progress tracking to help you prepare effectively."
  },
  {
    question: "Can I use Team Shoky Helper on multiple devices?",
    answer: "Absolutely! Team Shoky Helper is a progressive web app (PWA) that works across all devices and platforms. Your data syncs automatically, so you can access your schedule, notes, and other information from your laptop, tablet, or smartphone."
  },
  {
    question: "How do communities work on the platform?",
    answer: "Communities connect students with shared interests, courses, or universities. You can join existing communities or create your own. Within communities, you can participate in discussions, share resources, organize study groups, and collaborate on projects."
  }
];


// Interactive 3D Element component
const Interactive3DElement = () => {
  const mountRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!mountRef.current) return;

    const currentMount = mountRef.current;

    // Set up scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    scene.fog = new THREE.FogExp2(0x000000, 0.002);

    // Set up camera
    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    camera.position.z = 30;

    // Set up renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    currentMount.appendChild(renderer.domElement);

    // Create controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.5;
    controls.minDistance = 10;
    controls.maxDistance = 100;

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xaaaaaa, 0.8);
    scene.add(ambientLight);

    // Add directional lights
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight2.position.set(-5, -5, -5);
    scene.add(directionalLight2);

    // Particle system
    const particleCount = 500;
    const particlesGeometry = new THREE.BufferGeometry();
    const positions = [];
    const colors = []; // Store initial colors for animation reference
    const tempColor = new THREE.Color(); // Use a temporary color object

    const particleColorsPalette = [ // Renamed for clarity
      '#8B5CF6', '#EC4899', '#10B981', '#F59E0B', '#3B82F6',
    ];

    for (let i = 0; i < particleCount; i++) {
      const radius = 20 + Math.random() * 15;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      positions.push(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi)
      );
      
      const randomHexColor = particleColorsPalette[Math.floor(Math.random() * particleColorsPalette.length)];
      tempColor.set(randomHexColor);
      colors.push(tempColor.r, tempColor.g, tempColor.b); // Store initial RGB values
    }
    
    particlesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    // Set initial colors, these will be copied to the attribute that gets updated
    particlesGeometry.setAttribute('color', new THREE.Float32BufferAttribute([...colors], 3)); 
    
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
    });
    
    const particleSystem = new THREE.Points(particlesGeometry, particleMaterial);
    scene.add(particleSystem);

    // Lines connecting particles
    const linesMaterial = new THREE.LineBasicMaterial({
      color: 0x8B5CF6,
      transparent: true,
      opacity: 0.2,
      blending: THREE.AdditiveBlending,
    });

    const linesGeometry = new THREE.BufferGeometry();
    const linePositions = [];
    const particlePositionsArray = particlesGeometry.attributes.position.array; // Use the array directly

    for (let i = 0; i < particleCount; i += 10) {
      if (i + 1 < particleCount) {
        const p1x = particlePositionsArray[i * 3];
        const p1y = particlePositionsArray[i * 3 + 1];
        const p1z = particlePositionsArray[i * 3 + 2];
        
        for (let j = 1; j < 4; j++) {
            if (i + j < particleCount) {
                const p2x = particlePositionsArray[(i + j) * 3];
                const p2y = particlePositionsArray[(i + j) * 3 + 1];
                const p2z = particlePositionsArray[(i + j) * 3 + 2];
                
                const dist = Math.sqrt(
                  Math.pow(p2x - p1x, 2) + 
                  Math.pow(p2y - p1y, 2) + 
                  Math.pow(p2z - p1z, 2)
                );
                
                if (dist < 15) {
                  linePositions.push(p1x, p1y, p1z, p2x, p2y, p2z);
                }
            }
        }
      }
    }
    
    linesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    const lines = new THREE.LineSegments(linesGeometry, linesMaterial);
    scene.add(lines);

    // --- Create 3D Text "Team Shoky" ---
    let textMesh;
    const fontLoader = new FontLoader(); // This should now work
    fontLoader.load(
      'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', // Ensure this path is correct (from public folder)
      (font) => {
            console.log("Font loaded successfully!"); // <--- ADD THIS
        const textGeometry = new TextGeometry('Team Shoky', {
          font: font,
          size: 4,
          height: 0.5,
          curveSegments: 12,
          bevelEnabled: true,
          bevelThickness: 0.1,
          bevelSize: 0.1,
          bevelOffset: 0,
          bevelSegments: 5
        });

        textGeometry.computeBoundingBox();
        if (textGeometry.boundingBox) {
            const textOffsetX = -0.5 * (textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x);
            textGeometry.translate(textOffsetX, 0, 0);
        }


        const textMaterial = new THREE.MeshPhongMaterial({
          color: 0x8B5CF6,
          emissive: 0x5A3E9E,
          emissiveIntensity: 0.6,
          specular: 0xffffff,
          shininess: 50,
          flatShading: false,
        });
        
        textMesh = new THREE.Mesh(textGeometry, textMaterial);
        scene.add(textMesh);
      },
      undefined,
      (error) => {
          console.error('Font loading error:', error);
      }
    );

    // Animation
    const clock = new THREE.Clock();
    let animationFrameId;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!mountRef.current) return; 

      const elapsedTime = clock.getElapsedTime();
      
      particleSystem.rotation.y = elapsedTime * 0.05;
      lines.rotation.y = elapsedTime * 0.05;
      
      if (textMesh) {
        const pulseScale = 1 + Math.sin(elapsedTime * 2) * 0.05;
        textMesh.scale.set(pulseScale, pulseScale, pulseScale);
        textMesh.rotation.y = Math.sin(elapsedTime * 0.3) * 0.2; // Gentle sway
      }
      
      if (isHovered) {
        scene.rotation.y += (0.002 - scene.rotation.y) * 0.05; // Smooth to target
        particleMaterial.size = 0.6;
        particleMaterial.opacity = 0.9;
      } else {
        scene.rotation.y += (0.0005 - scene.rotation.y) * 0.05; // Smooth to target
        particleMaterial.size = 0.5;
        particleMaterial.opacity = 0.8;
      }
      
      const particleColorsAttribute = particlesGeometry.attributes.color;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        // Use the initially stored `colors` array for the base color
        tempColor.setRGB(colors[i3], colors[i3+1], colors[i3+2]);
        const hueShift = Math.sin(elapsedTime * 0.2 + i * 0.01) * 0.05;
        tempColor.offsetHSL(hueShift, 0, 0);

        particleColorsAttribute.array[i3] = tempColor.r;
        particleColorsAttribute.array[i3 + 1] = tempColor.g;
        particleColorsAttribute.array[i3 + 2] = tempColor.b;
      }
      particleColorsAttribute.needsUpdate = true;
      
      controls.update();
      renderer.render(scene, camera);
    };
    
    animate();

    // Handle resize
    const handleResize = () => {
      if (!currentMount) return;
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Clean up
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (currentMount && renderer.domElement.parentNode === currentMount) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      scene.traverse(object => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
      // Clear the scene explicitly
      while(scene.children.length > 0){ 
          scene.remove(scene.children[0]); 
      }
    };
  }, []); // Removed isHovered from dependency array as its logic is handled inside animate

  return (
    <div 
      ref={mountRef} 
      className="w-full h-[400px] md:h-[500px] relative rounded-xl overflow-hidden border border-primary/30 shadow-lg cursor-grab"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={(e) => (e.currentTarget.style.cursor = 'grabbing')}
      onMouseUp={(e) => (e.currentTarget.style.cursor = 'grab')}
    />
  );
};
const About = () => {
  return (
    <AppLayout>
      <div className="space-y-12 pb-10">
        {/* Hero section with 3D animation */}
        <div className="rounded-xl overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 items-center min-h-[500px]">
            <div className="z-10">
              <Badge className="mb-4" variant="outline">About Us</Badge>
              <h1 className="text-4xl font-bold tracking-tight mb-4">Team Shoky Helper</h1>
              <p className="text-xl mb-6 text-muted-foreground">
                Empowering students with the tools they need to succeed academically and thrive socially.
              </p>
              <p className="mb-6 text-muted-foreground">
                Team Shoky Helper is a modern progressive web app (PWA) designed to streamline the college experience. 
                Our platform combines productivity tools, academic resources, and community features to support students 
                throughout their educational journey.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg">
                  <Users className="mr-2 h-4 w-4" />
                  Join Our Community
                </Button>
                <Button size="lg" variant="outline">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Contact Us
                </Button>
              </div>
            </div>
            <div>
              <Interactive3DElement />
            </div>
          </div>
        </div>
        
        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="mr-2 h-5 w-5 text-primary" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                To create intuitive digital tools that enhance the academic experience, foster community, 
                and empower students to reach their full potential. We believe in making education more 
                accessible, manageable, and connected.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="mr-2 h-5 w-5 text-primary" />
                Our Vision
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We envision a future where every student has access to the digital resources they need to 
                succeed, regardless of their background or circumstances. Our goal is to become the essential 
                platform that transforms how students manage their academic lives.
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Key Features */}
        <div>
          <h2 className="text-2xl font-bold tracking-tight mb-6">Our Platform Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Academic Dashboard",
                description: "Get a comprehensive overview of your courses, assignments, exams, and progress all in one place.",
                icon: <BookOpen className="h-8 w-8 text-primary" />
              },
              {
                title: "Exam Tracker",
                description: "Never miss a test again. Track exam dates, study materials, and create personalized study schedules.",
                icon: <Calendar className="h-8 w-8 text-primary" />
              },
              {
                title: "Course Management",
                description: "Organize your course materials, track attendance, and monitor your progress throughout the semester.",
                icon: <Clock className="h-8 w-8 text-primary" />
              },
              {
                title: "Student Communities",
                description: "Connect with peers in your courses, major, or interest groups to collaborate and build relationships.",
                icon: <Users className="h-8 w-8 text-primary" />
              },
              {
                title: "Student Tools",
                description: "Access to notes, to-do lists, calculators, and other productivity tools designed for students.",
                icon: <BookOpen className="h-8 w-8 text-primary" />
              },
              {
  title: "Student Tools Hub",
  description: "Access essential tools like a To-Do List, Sticky Notes, GPA Calculator, and curated resources to boost your productivity.",
  icon: <Wrench className="h-8 w-8 text-primary" />
}

            ].map((feature, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="mb-2">{feature.icon}</div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Tabs for more information */}
        <Tabs defaultValue="team" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="team">Our Team</TabsTrigger>
            <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
          </TabsList>
          
          {/* Team section */}
          <TabsContent value="team" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="aspect-square bg-muted/50 flex items-center justify-center">
                    <Avatar className="h-32 w-32">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{member.name}</CardTitle>
                    <CardDescription>{member.role}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{member.bio}</p>
                  </CardContent>
                  <CardFooter className="flex justify-start gap-4">
                    {member.social.linkedin && (
                      <a href={member.social.linkedin} className="text-muted-foreground hover:text-primary transition-colors">
                        <Linkedin className="h-4 w-4" />
                      </a>
                    )}
                    {member.social.twitter && (
                      <a href={member.social.twitter} className="text-muted-foreground hover:text-primary transition-colors">
                        <Twitter className="h-4 w-4" />
                      </a>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          {/* Testimonials section */}
          <TabsContent value="testimonials" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="flex flex-col h-full">
                  <CardHeader className="pb-2">
                    <div className="text-4xl text-primary mb-2">"</div>
                    <div className="text-muted-foreground italic">
                      {testimonial.quote}
                    </div>
                  </CardHeader>
                  <CardFooter className="mt-auto pt-4 border-t">
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage src={testimonial.avatar} alt={testimonial.author} />
                        <AvatarFallback>{testimonial.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{testimonial.author}</div>
                        <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                        <div className="text-xs text-muted-foreground">{testimonial.university}</div>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          {/* FAQ section */}
          <TabsContent value="faq" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>
                  Common questions about Team Shoky Helper
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div key={index}>
                      <h3 className="font-medium mb-2">{faq.question}</h3>
                      <p className="text-muted-foreground text-sm">{faq.answer}</p>
                      {index < faqs.length - 1 && <Separator className="mt-4" />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* Contact section */}
        <div className="bg-primary/5 rounded-xl p-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold tracking-tight mb-4">Get in Touch</h2>
            <p className="text-muted-foreground mb-6">
              Have questions about Team Shoky Helper? We'd love to hear from you!
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex justify-center">
                    <Mail className="h-8 w-8 text-primary" />
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="font-medium">Email Us</p>
                  <p className="text-sm text-muted-foreground">support@teamshoky.com</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex justify-center">
                    <PhoneCall className="h-8 w-8 text-primary" />
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="font-medium">Call Us</p>
                  <p className="text-sm text-muted-foreground">+20100952790</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex justify-center">
                    <MessageSquare className="h-8 w-8 text-primary" />
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="font-medium">Live Chat</p>
                  <p className="text-sm text-muted-foreground">Available 9AM-5PM ET</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="flex justify-center space-x-4">
              <Button size="lg">
                Contact Support
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Social media footer */}
        <div className="flex justify-center space-x-6">
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
            <Facebook className="h-6 w-6" />
          </a>
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
            <Twitter className="h-6 w-6" />
          </a>
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
            <Instagram className="h-6 w-6" />
          </a>
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
            <Linkedin className="h-6 w-6" />
          </a>
        </div>
      </div>
    </AppLayout>
  );
};

export default About;