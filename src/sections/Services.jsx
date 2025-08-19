'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import './Services.css';

const Services = () => {
  const [hoveredService, setHoveredService] = useState(null);

  const services = [
    {
      id: 1,
      title: 'Web Development',
      description:
        "Let's build a website that truly connects you with your customers, a digital space that feels just right.",
      details:
        "I'll ensure your site looks great on any device, from phones to desktops, for a smooth visitor experience. I'll use clean, fast code and add features you need, like online stores or contact forms. Plus, I'll keep it updated and secure, so you can focus on your business.",
    },
    {
      id: 2,
      title: 'SEO/ GEO/ AEO ',
      description:
        'Want more people to find you online? I can help your website appear when customers search for what you offer.',
      details:
        "I'll find the exact words your customers use. I'll make your website easy for search engines to understand, so you rank higher. I'll build connections with other websites. And I'll track your website's progress, making adjustments to improve your visibility.",
    },
    {
      id: 3,
      title: 'Digital/ Smart Marketing',
      description:
        "Let's grow your business online with smart digital marketing, reaching your customers effectively.",
      details:
        'I focus on creating user-friendly interfaces that are engaging and easy to navigate. Through user research and design, I craft intuitive experiences that increase user satisfaction and conversions, making your online presence truly effective.',
    },
    {
      id: 4,
      title: 'Brand Identity Design',
      description:
        "I'll build a visual world for your brand, from eye-catching logos to social media magic, so your audience instantly 'gets' you.",
      details:
        "Imagine a logo that sticks in people's minds – that's what I create. I design business cards that spark conversations and social media visuals that make people stop scrolling and say, 'Wow!' I'll turn your brand's personality into visuals that connect.",
    },
    {
      id: 5,
      title: 'Linux Migration',
      description:
        'Looking for a secure and flexible system? I can help you move to Linux smoothly.',
      details:
        'My Linux Migration Service will help you transition from your current operating system to Linux, providing a secure, open-source, and customizable environment that meets your business needs.',
    },
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: i * 0.1,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <div className="services">
      <div className="container">
        <motion.h2
          className="section-title"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          My Services
        </motion.h2>

        <div className="services-grid">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className={`service-card hover-target ${
                hoveredService === service.id ? 'hovered' : ''
              }`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUp}
              custom={index}
              onMouseEnter={() => setHoveredService(service.id)}
              onMouseLeave={() => setHoveredService(null)}
            >
              <div className="service-content">
                <h3>{service.title}</h3>
                <p>{service.description}</p>

                <motion.div
                  className="service-details"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{
                    opacity: hoveredService === service.id ? 1 : 0,
                    height: hoveredService === service.id ? 'auto' : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <p>{service.details}</p>
                </motion.div>
              </div>

              <div className="service-number">0{service.id}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
