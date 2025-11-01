export interface Testimonial {
  name: string;
  role: string;
  text: string;
  image?: string; // optional avatar photo
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Akhil Johns',
    role: 'MERN Stack Developer',
    text: "I had the pleasure of collaborating with Gokul on several projects, and he consistently impressed me with his technical skills and dedication. Gokul has a deep understanding of the MERN stack and is always willing to lend a hand when challenges arise. His problem-solving abilities, attention to detail, and team spirit make him an invaluable asset to any team. It's been great working alongside Gokul, and I look forward to future collaborations!",
    image: '/avatars/akhil.jpg',
  },
  {
    name: 'Arjun V M',
    role: 'React Developer',
    text: "Working with Gokul has been an absolute pleasure. As a React Developer, he demonstrated an exceptional understanding of both front-end and back-end development, particularly in the MERN stack. His ability to take complex requirements and deliver clean, scalable code is impressive. Gokul's attention to detail, problem-solving skills, and strong communication made the entire development process seamless. I highly recommend him for any web development projects.",
    image: '/avatars/arjun.jpg',
  },
];

export default TESTIMONIALS;
