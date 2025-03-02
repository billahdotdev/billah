import "../styles/Legal.css"

const PrivacyPolicy = () => {
  return (
    <div className="legal-container">
      <h1>Privacy Policy</h1>
      <p>Last updated: {new Date().toLocaleDateString()}</p>
      <p>
        This Privacy Policy describes how your personal information is collected, used, and shared when you visit our
        website.
      </p>
      <h2>Personal information we collect</h2>
      <p>
        When you visit the Site, we automatically collect certain information about your device, including information
        about your web browser, IP address, time zone, and some of the cookies that are installed on your device.
      </p>
      <h2>How we use your personal information</h2>
      <p>
        We use the information we collect to help us screen for potential risk and fraud, and more generally to improve
        and optimize our Site.
      </p>
      <h2>Sharing your personal information</h2>
      <p>We do not share your Personal Information with third parties.</p>
      <h2>Changes</h2>
      <p>
        We may update this privacy policy from time to time in order to reflect changes to our practices or for other
        operational, legal or regulatory reasons.
      </p>
      <h2>Contact us</h2>
      <p>
        For more information about our privacy practices, if you have questions, or if you would like to make a
        complaint, please contact us by e-mail at privacy@example.com.
      </p>
    </div>
  )
}

export default PrivacyPolicy

