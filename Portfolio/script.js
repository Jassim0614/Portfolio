// Mobile Navigation Toggle
const hamburger = document.getElementById("hamburger")
const navMenu = document.getElementById("nav-menu")

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  navMenu.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
  }),
)

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Active navigation link highlighting
function highlightActiveNavLink() {
  let current = ""
  const sections = document.querySelectorAll("section")
  const navLinks = document.querySelectorAll(".nav-link")

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight
    const scrollPosition = window.scrollY + 200

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active")
    }
  })
}

// Listen for scroll events
window.addEventListener("scroll", highlightActiveNavLink)

// CV Download
document.addEventListener("DOMContentLoaded", () => {
  const downloadBtn = document.getElementById("downloadCV")

  if (downloadBtn) {
    downloadBtn.addEventListener("click", (e) => {
      e.preventDefault()

      // Create download link
      const link = document.createElement("a")
      link.href = "cv/Jassim_Junaid_Resume.pdf"
      link.download = "Jassim_Junaid_Resume.pdf"
      link.style.display = "none"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      // Show feedback
      const originalText = downloadBtn.textContent
      downloadBtn.textContent = "Downloading..."
      downloadBtn.style.background = "var(--secondary-color)"

      setTimeout(() => {
        downloadBtn.textContent = "Downloaded!"
        downloadBtn.style.background = "#10b981"
      }, 1000)

      setTimeout(() => {
        downloadBtn.textContent = originalText
        downloadBtn.style.background = "var(--primary-color)"
      }, 3000)
    })
  }
})

// Typing Animation
function initTypingAnimation() {
  const typingElement = document.querySelector(".typing-animation")
  if (!typingElement) return

  const phrases = ["Web Developer", "Programmer"]
  let currentPhraseIndex = 0
  let currentCharIndex = 0
  let isDeleting = false
  const typingSpeed = 100
  const deletingSpeed = 50
  const pauseTime = 2000

  function typeText() {
    const currentPhrase = phrases[currentPhraseIndex]

    if (isDeleting) {
      typingElement.textContent = currentPhrase.substring(0, currentCharIndex - 1)
      currentCharIndex--

      if (currentCharIndex === 0) {
        isDeleting = false
        currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length
        setTimeout(typeText, 500)
        return
      }

      setTimeout(typeText, deletingSpeed)
    } else {
      typingElement.textContent = currentPhrase.substring(0, currentCharIndex + 1)
      currentCharIndex++

      if (currentCharIndex === currentPhrase.length) {
        isDeleting = true
        setTimeout(typeText, pauseTime)
        return
      }

      setTimeout(typeText, typingSpeed)
    }
  }

  // Start the typing
  setTimeout(typeText, 1000)
}

// Photo Upload for images
function setupPhotoUpload(imageId, inputId) {
  const image = document.getElementById(imageId)
  if (!image) return

  const input = document.createElement("input")
  input.type = "file"
  input.accept = "image/*"
  input.style.display = "none"
  input.id = inputId
  document.body.appendChild(input)

  // Click handler to image
  image.addEventListener("click", () => {
    input.click()
  })

  // Visual feedback
  image.style.cursor = "pointer"
  image.title = "Click to upload your photo"

  // Handle file selection
  input.addEventListener("change", (e) => {
    const file = e.target.files[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Please select a valid image file.")
        return
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("Please select an image smaller than 5MB.")
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        image.src = e.target.result
        // Add a subtle animation to indicate the change
        image.style.transform = "scale(0.95)"
        setTimeout(() => {
          image.style.transform = "scale(1)"
        }, 200)
      }
      reader.readAsDataURL(file)
    }
  })
}

// Scroll Animations
const observerOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -100px 0px",
}

// Multiple observers for different animation
const slideObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible")
    }
  })
}, observerOptions)

// Staggered animation observer for grid items
const staggerObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const items = entry.target.querySelectorAll(".stagger-item")
      items.forEach((item, index) => {
        setTimeout(() => {
          item.classList.add("visible")
        }, index * 150)
      })
    }
  })
}, observerOptions)

// Initialize animations when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize typing animation
  initTypingAnimation()

  // Setup photo uploads
  setupPhotoUpload("aboutPhoto", "aboutPhotoInput")
  setupPhotoUpload("gamingPhoto", "gamingPhotoInput")
  setupPhotoUpload("basketballPhoto", "basketballPhotoInput")
  setupPhotoUpload("musicPhoto", "musicPhotoInput")
  setupPhotoUpload("photographyPhoto", "photographyPhotoInput")
  setupPhotoUpload("catPhoto", "catPhotoInput")

  // Add animation classes to sections
  const homeSection = document.querySelector("#home")
  if (homeSection) {
    homeSection.querySelector(".home-content > div:first-child")?.classList.add("slide-in-left")
    homeSection.querySelector(".home-image")?.classList.add("slide-in-right")
  }

  // About section animations
  const aboutSection = document.querySelector("#about")
  if (aboutSection) {
    aboutSection.querySelector(".about-text")?.classList.add("slide-in-left")
    aboutSection.querySelector(".about-right")?.classList.add("slide-in-right")
  }

  // Skills section - staggered animation
  const skillsSection = document.querySelector("#skills")
  if (skillsSection) {
    skillsSection.querySelectorAll(".skill-category").forEach((category) => {
      category.classList.add("stagger-item")
    })
    staggerObserver.observe(skillsSection)
  }

  // Experience section - timeline animations
  document.querySelectorAll(".timeline-item").forEach((item) => {
    slideObserver.observe(item)
  })

  // Projects section - staggered cards
  const projectsSection = document.querySelector("#projects")
  if (projectsSection) {
    projectsSection.querySelectorAll(".project-card").forEach((card) => {
      card.classList.add("stagger-item")
    })
    staggerObserver.observe(projectsSection)
  }

  // Education section animations
  document.querySelectorAll(".education-item").forEach((item) => {
    slideObserver.observe(item)
  })

  // Section titles
  document.querySelectorAll(".section-title").forEach((title) => {
    slideObserver.observe(title)
  })

  // About stats individual animation
  document.querySelectorAll(".stat-item").forEach((item, index) => {
    setTimeout(() => {
      slideObserver.observe(item)
    }, index * 100)
  })

  // Observe main content areas
  slideObserver.observe(document.querySelector("#home .home-content > div:first-child"))
  slideObserver.observe(document.querySelector("#home .home-image"))
  slideObserver.observe(document.querySelector("#about .about-text"))
  slideObserver.observe(document.querySelector("#about .about-right"))
})

// Enhanced section visibility detection
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.id

        // Specific animations based on section
        switch (sectionId) {
          case "home":
            entry.target.querySelector(".home-content > div:first-child")?.classList.add("visible")
            setTimeout(() => {
              entry.target.querySelector(".home-image")?.classList.add("visible")
            }, 300)
            break

          case "about":
            entry.target.querySelector(".about-text")?.classList.add("visible")
            setTimeout(() => {
              entry.target.querySelector(".about-right")?.classList.add("visible")
            }, 400)
            break

          case "skills":
            const skillCategories = entry.target.querySelectorAll(".skill-category")
            skillCategories.forEach((category, index) => {
              setTimeout(() => {
                category.classList.add("visible")
              }, index * 200)
            })
            break

          case "projects":
            const projectCards = entry.target.querySelectorAll(".project-card")
            projectCards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add("visible")
              }, index * 200)
            })
            break
        }
      }
    })
  },
  {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px",
  },
)

// Observe all main sections
document.querySelectorAll("section").forEach((section) => {
  sectionObserver.observe(section)
})

// Navbar background change on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(10, 10, 10, 0.98)"
  } else {
    navbar.style.background = "rgba(10, 10, 10, 0.95)"
  }
})

// Project cards hover effect
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-10px) scale(1.02)"
  })

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0) scale(1)"
  })
})

// Loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded")
})

// Contact form handling
const handleFormSubmit = (e) => {
  e.preventDefault()
  // Add your form submission logic here
  alert("Thank you for your message! I'll get back to you soon.")
}

// Scroll to top functionality
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
}

// Scroll to top button
const createScrollToTopButton = () => {
  const button = document.createElement("button")
  button.innerHTML = '<i class="fas fa-arrow-up"></i>'
  button.className = "scroll-to-top"
  button.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--primary-color);
        color: var(--bg-color);
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: 1000;
    `

  button.addEventListener("click", scrollToTop)
  document.body.appendChild(button)

  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      button.style.opacity = "1"
    } else {
      button.style.opacity = "0"
    }
  })
}

// Initialize scroll to top button
createScrollToTopButton()

// Interactive elements
document.querySelectorAll(".stat-item").forEach((stat) => {
  stat.addEventListener("click", () => {
    stat.style.transform = "scale(1.05)"
    setTimeout(() => {
      stat.style.transform = "scale(1)"
    }, 200)
  })
})

// Experience work items interaction
const workData = {
  1: {
    title: "Student Assistance",
    company: "Freelance",
    period: "2020 - 2022",
    description:
      "Provided comprehensive academic support to fellow students across various subjects including mathematics, computer science, and programming fundamentals. Developed personalized learning materials and conducted one-on-one tutoring sessions.",
    achievements: [
      "Helped 50+ students improve their grades by an average of 15%",
      "Created interactive learning materials for programming concepts",
      "Developed time management and communication skills",
      "Built strong relationships with students and faculty",
    ],
    skills: ["Communication", "Problem Solving", "Teaching", "Time Management"],
    skillsTitle: "Skills Developed",
  },
  2: {
    title: "Web Developer Intern",
    company: "Centralized Cloud Computing International Inc.",
    period: "Jun 2024 - Aug 2024",
    description:
      "Worked as a Web Developer Intern in a dynamic tech environment, contributing to multiple web development projects and collaborating with senior developers to deliver high-quality user interfaces.",
    achievements: [
      "Onboarded to a real-time team project, contributing hands-on development and gaining valuable teamwork experience.",
      "Converted Figma designs into web pages.",
      "Customize and modified the user interface by adding new features and refining the design",
      "Developed front-end features using Vue.js and Tailwind CSS for responsive design and task completion.",
      "Built reusable component library for future projects",
    ],
    skills: ["Vue.js", "Tailwind CSS", "JavaScript", "HTML/CSS", "Git", "Figma", "Quality Assurance", "Python"],
    skillsTitle: "Technologies Used",
  },
}

// Initialize work items interaction
document.addEventListener("DOMContentLoaded", () => {
  const workItems = document.querySelectorAll(".work-item")
  const workDetails = document.getElementById("workDetails")

  workItems.forEach((item) => {
    item.addEventListener("click", () => {
      // Remove active class from all items
      workItems.forEach((i) => i.classList.remove("active"))

      // Add active class to clicked item
      item.classList.add("active")

      // Get work data
      const workId = item.getAttribute("data-work")
      const work = workData[workId]

      // Update details content with animation
      workDetails.style.opacity = "0"
      workDetails.style.transform = "translateY(20px)"

      setTimeout(() => {
        workDetails.innerHTML = `
          <div class="details-header">
            <h3>${work.title}</h3>
            <h4>${work.company}</h4>
            <span class="work-period">${work.period}</span>
          </div>
          
          <div class="work-description">
            <p>${work.description}</p>
          </div>
          
          <div class="work-achievements">
            <h5>Key Achievements:</h5>
            <ul>
              ${work.achievements.map((achievement) => `<li>${achievement}</li>`).join("")}
            </ul>
          </div>
          
          <div class="work-skills">
            <h5>${work.skillsTitle}:</h5>
            <div class="skill-tags">
              ${work.skills.map((skill) => `<span>${skill}</span>`).join("")}
            </div>
          </div>
        `

        workDetails.style.opacity = "1"
        workDetails.style.transform = "translateY(0)"
      }, 250)
    })
  })
})

// Hobbies Carousel Functionality
document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.getElementById("hobbiesCarousel")
  const prevBtn = document.getElementById("prevBtn")
  const nextBtn = document.getElementById("nextBtn")
  const indicators = document.querySelectorAll(".indicator")
  const hobbyCards = document.querySelectorAll(".hobby-card")

  if (!carousel || !prevBtn || !nextBtn || indicators.length === 0 || hobbyCards.length === 0) {
    console.log("Hobbies carousel elements not found")
    return
  }

  let currentSlide = 0
  const totalSlides = hobbyCards.length
  let autoSlideInterval

  // Show specific slide
  const showSlide = (index) => {
    // Ensure index is within bounds
    if (index < 0) index = totalSlides - 1
    if (index >= totalSlides) index = 0

    // Remove all classes from all cards
    hobbyCards.forEach((card) => {
      card.classList.remove("active", "prev", "next")
    })

    // Remove active class from all indicators
    indicators.forEach((indicator) => {
      indicator.classList.remove("active")
    })

    // Set the active slide
    hobbyCards[index].classList.add("active")
    indicators[index].classList.add("active")

    // Set previous slides
    for (let i = 0; i < index; i++) {
      hobbyCards[i].classList.add("prev")
    }

    // Set next slides
    for (let i = index + 1; i < totalSlides; i++) {
      hobbyCards[i].classList.add("next")
    }

    currentSlide = index
  }

  // Next slide function
  const nextSlide = () => {
    const next = (currentSlide + 1) % totalSlides
    showSlide(next)
  }

  // Previous slide function
  const prevSlide = () => {
    const prev = (currentSlide - 1 + totalSlides) % totalSlides
    showSlide(prev)
  }

  // Auto slide function
  const startAutoSlide = () => {
    autoSlideInterval = setInterval(nextSlide, 5000) // Change slide every 5 seconds
  }

  // Stop auto slide function
  const stopAutoSlide = () => {
    if (autoSlideInterval) {
      clearInterval(autoSlideInterval)
    }
  }

  // Event listeners for navigation buttons
  nextBtn.addEventListener("click", (e) => {
    e.preventDefault()
    stopAutoSlide()
    nextSlide()
    startAutoSlide()
  })

  prevBtn.addEventListener("click", (e) => {
    e.preventDefault()
    stopAutoSlide()
    prevSlide()
    startAutoSlide()
  })

  // Event listeners for indicators
  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", (e) => {
      e.preventDefault()
      stopAutoSlide()
      showSlide(index)
      startAutoSlide()
    })
  })

  // Pause auto-slide on hover
  carousel.addEventListener("mouseenter", () => {
    stopAutoSlide()
  })

  carousel.addEventListener("mouseleave", () => {
    startAutoSlide()
  })

  // Touch/swipe support for mobile
  let startX = 0
  let endX = 0

  carousel.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX
    stopAutoSlide()
  })

  carousel.addEventListener("touchend", (e) => {
    endX = e.changedTouches[0].clientX
    const diff = startX - endX

    if (Math.abs(diff) > 50) {
      // Minimum swipe distance
      if (diff > 0) {
        nextSlide()
      } else {
        prevSlide()
      }
    }
    startAutoSlide()
  })

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    // Only handle keyboard events when hobbies section is in view
    const hobbiesSection = document.querySelector("#hobbies")
    const rect = hobbiesSection.getBoundingClientRect()
    const isInView = rect.top < window.innerHeight && rect.bottom > 0

    if (isInView) {
      if (e.key === "ArrowLeft") {
        e.preventDefault()
        stopAutoSlide()
        prevSlide()
        startAutoSlide()
      } else if (e.key === "ArrowRight") {
        e.preventDefault()
        stopAutoSlide()
        nextSlide()
        startAutoSlide()
      }
    }
  })

  // Initialize carousel
  showSlide(0)
  startAutoSlide()

  // Intersection Observer for hobbies section animations
  const hobbiesSection = document.querySelector("#hobbies")
  if (hobbiesSection) {
    const hobbiesObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible")
        }
      })
    }, observerOptions)

    const sectionTitle = hobbiesSection.querySelector(".section-title")
    const carouselContainer = hobbiesSection.querySelector(".hobbies-carousel-container")

    if (sectionTitle) hobbiesObserver.observe(sectionTitle)
    if (carouselContainer) hobbiesObserver.observe(carouselContainer)
  }
})

// Console welcome message
console.log(`
🚀 Welcome to Jassim's portfolio!
📧 Contact: jassimjunaid5277@gmail.com
📱 Phone: +639129430362
🌐 Location: Mintal, Davao City
`)
