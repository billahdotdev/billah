import emailjs from "@emailjs/browser"

// Initialize EmailJS with your User ID
// Replace 'YOUR_USER_ID' with your actual EmailJS user ID
emailjs.init("YOUR_USER_ID")

export const sendEmail = async (templateParams) => {
  try {
    // Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with your actual EmailJS service and template IDs
    const response = await emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", templateParams)
    return { success: true, response }
  } catch (error) {
    console.error("Failed to send email:", error)
    return { success: false, error }
  }
}

