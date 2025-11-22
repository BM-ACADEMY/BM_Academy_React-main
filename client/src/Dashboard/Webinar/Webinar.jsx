import React from "react";
import { useNavigate } from "react-router-dom";

const Webinar = () => {
  const navigate = useNavigate();

  const webinars = [
    {
      title: "Data Analyst Webinar",
      desc: "Learn data analysis, dashboards, SQL, Python basics.",
      path: "/webinar/data-analyst",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      title: "Digital Marketing Webinar",
      desc: "SEO, ads, branding & social media marketing.",
      path: "/webinar/digital-marketing",
      image: "https://media.istockphoto.com/id/1936789233/photo/human-use-phone-with-digital-online-marketing-commerce-sale-website-advertising-promotion-of.jpg?s=2048x2048&w=is&k=20&c=u-S3IXSLpQWGoLBG4YSapgueszBaQzTGU8tY9kCnpsY="
    },
    {
      title: "Full Stack Development Webinar",
      desc: "HTML, CSS, JS, React, Python & backend basics.",
      path: "/webinar/fullstack-development",
      image: "https://media.istockphoto.com/id/2210688897/photo/ux-ui-design-web-and-application-user-design-concepts-web-design-application-design-user.jpg?s=2048x2048&w=is&k=20&c=63in-oRI7wRN1Im8HjJiwkCN3mPqj2MA4DGnZfq1BaU="
    }
  ];

  return (
    <div style={{ marginTop: "120px", padding: "30px" }}>
      <h2 style={{
        textAlign: "center",
        marginBottom: "40px",
        fontSize: "32px",
        fontWeight: "600"
      }}>
        Explore Our Webinars
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "30px",
          maxWidth: "1200px",
          margin: "0 auto"
        }}
      >
        {webinars.map((item, i) => (
          <div
            key={i}
            onClick={() => navigate(item.path)}
            style={{
              border: "1px solid #e0e0e0",
              borderRadius: "15px",
              overflow: "hidden",
              cursor: "pointer",
              transition: "0.3s",
              background: "#fff",
              boxShadow: "0px 3px 10px rgba(0,0,0,0.08)"
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "scale(1.03)";
              e.currentTarget.style.boxShadow = "0px 5px 20px rgba(0,0,0,0.15)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0px 3px 10px rgba(0,0,0,0.08)";
            }}
          >
            <img
              src={item.image}
              alt={item.title}
              style={{
                width: "100%",
                height: "180px",
                objectFit: "cover"
              }}
            />

            <div style={{ padding: "20px" }}>
              <h3 style={{
                fontSize: "22px",
                marginBottom: "10px",
                fontWeight: "600"
              }}>
                {item.title}
              </h3>

              <p style={{
                color: "#555",
                lineHeight: "1.5"
              }}>
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Webinar;
