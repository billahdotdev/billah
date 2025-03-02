import "../styles/Legal.css"

const TermsOfService = () => {
  return (
    <div className="legal-container">
      <h1>Terms of Service</h1>
      <p>Last updated: {new Date().toLocaleDateString()}</p>
      <h2>1. Terms</h2>
      <p>
        By accessing this website, you are agreeing to be bound by these Terms of Service, all applicable laws and
        regulations, and agree that you are responsible for compliance with any applicable local laws.
      </p>
      <h2>2. Use License</h2>
      <p>
        Permission is granted to temporarily download one copy of the materials (information or software) on our website
        for personal, non-commercial transitory viewing only.
      </p>
      <h2>3. Disclaimer</h2>
      <p>
        The materials on our website are provided on an 'as is' basis. We make no warranties, expressed or implied, and
        hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions
        of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other
        violation of rights.
      </p>
      <h2>4. Limitations</h2>
      <p>
        In no event shall we or our suppliers be liable for any damages (including, without limitation, damages for loss
        of data or profit, or due to business interruption) arising out of the use or inability to use the materials on
        our website.
      </p>
      <h2>5. Revisions and Errata</h2>
      <p>
        The materials appearing on our website could include technical, typographical, or photographic errors. We do not
        warrant that any of the materials on its website are accurate, complete or current.
      </p>
      <h2>6. Links</h2>
      <p>
        We have not reviewed all of the sites linked to its website and is not responsible for the contents of any such
        linked site. The inclusion of any link does not imply endorsement by us of the site. Use of any such linked
        website is at the user's own risk.
      </p>
      <h2>7. Modifications</h2>
      <p>
        We may revise these terms of service for its website at any time without notice. By using this website you are
        agreeing to be bound by the then current version of these terms of service.
      </p>
      <h2>8. Governing Law</h2>
      <p>
        These terms and conditions are governed by and construed in accordance with the laws of [Your Country] and you
        irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
      </p>
    </div>
  )
}

export default TermsOfService

