const testimonials = [
    {
        content: "OfficeTwo has helped us build a stronger, more affordable team. Their support in hiring and managing our Buenos Aires office has been invaluable to our growth.",
        author: "Erik Trefzger",
        role: "Owner",
        company: "Orca Roofing & Exteriors"
    },
    {
        content: "OfficeTwo has transformed how we operate. Their team in Buenos Aires integrated seamlessly with our existing workflow, bringing fresh perspectives and exceptional talent.",
        author: "Sarah Chen",
        role: "CTO",
        company: "TechFlow Solutions"
    },
    {
        content: "The quality of service from our Argentina team is exceptional. They handle our client communications and property management tasks with the same high standards we expect in our U.S. offices.",
        author: "Jennifer Martinez",
        role: "Managing Director",
        company: "Elite Property Group"
    },
    {
        content: "We were hesitant about moving key administrative functions overseas, but OfficeTwo's team has exceeded expectations. Their attention to detail and professional communication is outstanding.",
        author: "David Cohen",
        role: "Partner",
        company: "Cohen & Associates Law"
    },
    {
        content: "As our company scaled rapidly, OfficeTwo helped us build a development and support team that could keep pace. The talent pool in Buenos Aires is incredible, and the time zone alignment makes collaboration seamless.",
        author: "Robert Torres",
        role: "Founder",
        company: "Torres Insurance Group"
    },
    {
        content: "The operational improvements since bringing on our Buenos Aires team have been remarkable. They've streamlined our processes and found creative solutions to long-standing challenges.",
        author: "Lisa Parker",
        role: "Operations Director",
        company: "Meridian Property Management"
    }
];

let currentTestimonialIndex = 0;

function updateTestimonial() {
    const testimonialContent = document.querySelector('.testimonial-content');
    const testimonialAuthor = document.querySelector('.testimonial-author');
    const testimonialRole = document.querySelector('.testimonial-role');
    const testimonialCompany = document.querySelector('.testimonial-company');
    
    const currentTestimonial = testimonials[currentTestimonialIndex];
    
    testimonialContent.style.opacity = '0';
    testimonialAuthor.style.opacity = '0';
    testimonialRole.style.opacity = '0';
    testimonialCompany.style.opacity = '0';
    
    setTimeout(() => {
        testimonialContent.textContent = currentTestimonial.content;
        testimonialAuthor.textContent = currentTestimonial.author;
        testimonialRole.textContent = currentTestimonial.role;
        testimonialCompany.textContent = currentTestimonial.company;
        
        testimonialContent.style.opacity = '1';
        testimonialAuthor.style.opacity = '1';
        testimonialRole.style.opacity = '1';
        testimonialCompany.style.opacity = '1';
    }, 300);
}

document.addEventListener('DOMContentLoaded', () => {
    const prevButton = document.querySelector('.prev-testimonial');
    const nextButton = document.querySelector('.next-testimonial');
    
    prevButton.addEventListener('click', () => {
        currentTestimonialIndex = (currentTestimonialIndex - 1 + testimonials.length) % testimonials.length;
        updateTestimonial();
    });
    
    nextButton.addEventListener('click', () => {
        currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
        updateTestimonial();
    });
    
    // Auto-advance testimonials every 5 seconds
    setInterval(() => {
        currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
        updateTestimonial();
    }, 5000);
}); 