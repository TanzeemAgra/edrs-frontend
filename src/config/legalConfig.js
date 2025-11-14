/**
 * Legal Pages Configuration - Soft Coding Approach
 * This configuration file manages all legal content for EDRS platform
 * Allows easy updates without code changes
 */

export const companyInfo = {
  name: "EDRS",
  fullName: "Electronic Document Recording System",
  description: "A comprehensive platform for industrial document management, P&ID analysis, and engineering data recording",
  website: "https://edrs-platform.com",
  email: "legal@edrs-platform.com",
  address: "Rejlers AB, Sweden",
  lastUpdated: "November 14, 2025"
}

export const privacyPolicyConfig = {
  title: "Privacy Policy",
  lastUpdated: "November 14, 2025",
  effectiveDate: "November 14, 2025",
  sections: [
    {
      id: "introduction",
      title: "Introduction",
      content: `${companyInfo.name} ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our ${companyInfo.fullName} platform. This policy applies to all users of our industrial document management and P&ID analysis services.`
    },
    {
      id: "information_collection",
      title: "Information We Collect",
      subsections: [
        {
          title: "Personal Information",
          content: "We collect information you provide directly, including name, email address, company affiliation, professional certifications, and contact details when you register or use our services."
        },
        {
          title: "Technical Data",
          content: "We automatically collect device information, IP addresses, browser types, operating systems, and usage patterns to improve our P&ID analysis algorithms and document processing capabilities."
        },
        {
          title: "Document Data",
          content: "We process engineering documents, P&ID diagrams, technical specifications, and related industrial data you upload for analysis and storage purposes."
        },
        {
          title: "Usage Analytics",
          content: "We collect data on how you interact with our platform, including feature usage, analysis results, and system performance metrics to enhance our services."
        }
      ]
    },
    {
      id: "data_usage",
      title: "How We Use Your Information",
      items: [
        "Provide and maintain the EDRS platform services",
        "Process and analyze P&ID diagrams and engineering documents",
        "Generate compliance reports and safety assessments",
        "Improve our machine learning algorithms for document analysis",
        "Send service updates and technical notifications",
        "Provide customer support and technical assistance",
        "Ensure platform security and prevent unauthorized access",
        "Comply with legal and regulatory requirements"
      ]
    },
    {
      id: "data_sharing",
      title: "Information Sharing and Disclosure",
      content: `We do not sell, trade, or rent your personal information. We may share information in limited circumstances:
      
      • **Service Providers**: With trusted third-party vendors who assist in platform operations
      • **Legal Requirements**: When required by law or to protect our rights and safety
      • **Business Transfers**: In connection with mergers, acquisitions, or asset sales
      • **Consent**: With your explicit permission for specific purposes`
    },
    {
      id: "data_security",
      title: "Data Security",
      content: `We implement industry-standard security measures to protect your information:
      
      • **Encryption**: All data is encrypted in transit and at rest using AES-256 encryption
      • **Access Controls**: Role-based access with multi-factor authentication
      • **Regular Audits**: Continuous security monitoring and vulnerability assessments
      • **Compliance**: Adherence to ISO 27001, SOC 2 Type II, and GDPR standards
      • **Data Centers**: Secure, certified data centers with 24/7 monitoring`
    },
    {
      id: "data_retention",
      title: "Data Retention",
      content: "We retain your information for as long as necessary to provide services and comply with legal obligations. Document data is retained according to industry standards and your organization's retention policies. You may request data deletion subject to legal and contractual requirements."
    },
    {
      id: "user_rights",
      title: "Your Rights",
      items: [
        "Access your personal information and document data",
        "Correct inaccurate or incomplete information",
        "Request deletion of your data (subject to legal requirements)",
        "Object to processing for legitimate interests",
        "Data portability for your engineering documents",
        "Withdraw consent where applicable"
      ]
    },
    {
      id: "international_transfers",
      title: "International Data Transfers",
      content: "Your data may be processed in countries outside your residence. We ensure appropriate safeguards are in place, including Standard Contractual Clauses and adequacy decisions where applicable."
    },
    {
      id: "cookies",
      title: "Cookies and Tracking",
      content: "We use essential cookies for platform functionality, analytics cookies to improve services, and preference cookies to remember your settings. You can manage cookie preferences through your browser settings."
    },
    {
      id: "contact",
      title: "Contact Information",
      content: `For privacy-related questions or to exercise your rights, contact us at:
      
      Email: ${companyInfo.email}
      Address: ${companyInfo.address}
      
      We will respond to your inquiries within 30 days.`
    }
  ]
}

export const termsOfServiceConfig = {
  title: "Terms of Service",
  lastUpdated: "November 14, 2025",
  effectiveDate: "November 14, 2025",
  sections: [
    {
      id: "acceptance",
      title: "Acceptance of Terms",
      content: `By accessing and using the ${companyInfo.fullName} platform, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services. These terms apply to all users, including engineers, project managers, and administrative personnel.`
    },
    {
      id: "service_description",
      title: "Service Description",
      content: `EDRS provides a comprehensive platform for:
      
      • Industrial document management and version control
      • P&ID diagram analysis and compliance checking
      • Engineering data processing and storage
      • Automated compliance reporting (ISA-5.1, IEC-62424, ANSI standards)
      • Machine learning-powered document analysis
      • Collaboration tools for engineering teams
      • API access for system integration`
    },
    {
      id: "user_accounts",
      title: "User Accounts and Responsibilities",
      subsections: [
        {
          title: "Account Creation",
          content: "You must provide accurate, complete information when creating an account. You are responsible for maintaining the confidentiality of your credentials and for all activities under your account."
        },
        {
          title: "Authorized Use",
          content: "You must be authorized by your organization to use EDRS services and upload engineering documents. You represent that you have the necessary rights to the content you upload."
        },
        {
          title: "Professional Use",
          content: "EDRS is designed for professional engineering and industrial applications. Users must have appropriate technical knowledge and qualifications for their intended use."
        }
      ]
    },
    {
      id: "acceptable_use",
      title: "Acceptable Use Policy",
      prohibited: [
        "Upload malicious software or harmful code",
        "Attempt to reverse engineer our algorithms",
        "Share access credentials with unauthorized persons",
        "Use the service for illegal or unauthorized purposes",
        "Interfere with platform security or other users' access",
        "Upload copyrighted material without authorization",
        "Misrepresent engineering data or analysis results",
        "Use the platform to create false compliance reports"
      ],
      required: [
        "Comply with all applicable laws and regulations",
        "Maintain accuracy of uploaded engineering documents",
        "Use appropriate professional judgment in interpreting results",
        "Protect confidential and proprietary information",
        "Report security vulnerabilities responsibly"
      ]
    },
    {
      id: "intellectual_property",
      title: "Intellectual Property Rights",
      content: `• **Your Content**: You retain ownership of engineering documents and data you upload. You grant us necessary licenses to provide our services.
      
      • **Our Platform**: EDRS platform, algorithms, and analysis tools are our proprietary technology protected by intellectual property laws.
      
      • **Analysis Results**: Generated reports and analysis results are provided under license for your professional use.
      
      • **Third-Party Content**: Some features may incorporate third-party libraries or standards, subject to their respective licenses.`
    },
    {
      id: "data_processing",
      title: "Data Processing and Analysis",
      content: `• **Document Analysis**: We use machine learning algorithms to analyze P&ID diagrams and engineering documents for compliance and optimization.
      
      • **Quality Assurance**: While our analysis tools are highly accurate, professional engineering judgment is required for critical decisions.
      
      • **Compliance Checking**: Our platform checks against industry standards but does not replace professional engineering review and approval.
      
      • **Data Accuracy**: You are responsible for the accuracy and completeness of uploaded documents and data.`
    },
    {
      id: "service_availability",
      title: "Service Availability and Performance",
      content: `• **Uptime**: We strive for 99.9% uptime but do not guarantee uninterrupted service availability.
      
      • **Maintenance**: Scheduled maintenance will be announced in advance when possible.
      
      • **Performance**: Analysis processing times depend on document complexity and system load.
      
      • **Support**: Technical support is available during business hours with emergency support for critical issues.`
    },
    {
      id: "payment_terms",
      title: "Payment and Subscription Terms",
      content: `• **Billing**: Subscription fees are billed in advance according to your selected plan.
      
      • **Usage Limits**: Plans include specific limits for document processing, storage, and API calls.
      
      • **Refunds**: Refunds are provided according to our refund policy for unused subscription periods.
      
      • **Price Changes**: We reserve the right to modify pricing with 30 days' notice to existing subscribers.`
    },
    {
      id: "limitation_liability",
      title: "Limitation of Liability",
      content: `EDRS is provided "as is" without warranties of any kind. We are not liable for:
      
      • Engineering decisions based on platform analysis
      • Compliance violations or regulatory issues
      • Data loss due to user error or system failures
      • Business interruption or consequential damages
      • Third-party integrations or external system failures
      
      Our liability is limited to the amount paid for services in the preceding 12 months.`
    },
    {
      id: "indemnification",
      title: "Indemnification",
      content: "You agree to indemnify and hold harmless EDRS from claims arising from your use of the platform, violation of these terms, or infringement of third-party rights related to your uploaded content."
    },
    {
      id: "termination",
      title: "Termination",
      content: `• **By You**: You may terminate your account at any time with 30 days' notice.
      
      • **By Us**: We may terminate accounts for terms violations, non-payment, or illegal activities.
      
      • **Data Export**: Upon termination, you may export your data within 30 days, after which it will be deleted according to our retention policy.
      
      • **Survival**: Provisions regarding intellectual property, liability, and indemnification survive termination.`
    },
    {
      id: "governing_law",
      title: "Governing Law and Disputes",
      content: `These terms are governed by Swedish law. Disputes will be resolved through:
      
      1. Direct negotiation
      2. Mediation through Swedish Arbitration Institute
      3. Binding arbitration if mediation fails
      
      Emergency injunctive relief may be sought in appropriate courts.`
    },
    {
      id: "changes_terms",
      title: "Changes to Terms",
      content: "We may update these terms to reflect service changes or legal requirements. Material changes will be communicated 30 days in advance. Continued use constitutes acceptance of updated terms."
    },
    {
      id: "contact_legal",
      title: "Legal Contact",
      content: `For legal questions or terms-related issues:
      
      Email: ${companyInfo.email}
      Address: ${companyInfo.address}
      
      Response time: 5-10 business days for legal inquiries.`
    }
  ]
}

export const legalPageStyles = {
  container: "max-w-4xl mx-auto px-4 py-12",
  header: "mb-12 text-center",
  title: "text-4xl font-bold text-gray-900 mb-4",
  subtitle: "text-lg text-gray-600",
  lastUpdated: "text-sm text-gray-500 mt-4",
  section: "mb-12",
  sectionTitle: "text-2xl font-semibold text-gray-900 mb-6",
  subsectionTitle: "text-xl font-medium text-gray-800 mb-4",
  content: "text-gray-700 leading-relaxed mb-6",
  list: "list-disc list-inside space-y-2 text-gray-700 ml-4",
  prohibitedList: "list-disc list-inside space-y-2 text-red-600 ml-4",
  requiredList: "list-disc list-inside space-y-2 text-green-600 ml-4",
  highlight: "bg-blue-50 border-l-4 border-blue-500 p-4 my-6",
  warning: "bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6",
  contact: "bg-gray-50 rounded-lg p-6 mt-8"
}

// Export navigation items for easy management
export const legalNavigation = [
  { path: "/privacy-policy", label: "Privacy Policy" },
  { path: "/terms-of-service", label: "Terms of Service" }
]