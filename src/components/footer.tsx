const links = [
  {
    title: "Product",
    items: [
      "Overview",
      "Features",
      "Solutions",
      "Tutorials",
      "Pricing",
      "Releases",
    ],
  },
  {
    title: "Company",
    items: ["About us", "Careers", "Press", "News", "Media kit", "Contact"],
  },
  {
    title: "Resource",
    items: [
      "Blog",
      "Newsletter",
      "Events",
      "Help center",
      "Tutorials",
      "Support",
    ],
  },
];

const currentYear = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="mt-10 px-8 pt-20">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 justify-between gap-4 md:grid-cols-2">
          <h4 className="text-2xl font-bold mb-6">
            MedLex AI
          </h4>
          <div className="grid grid-cols-3 justify-between gap-4">
            {links.map(({ title, items }) => (
              <ul key={title}>
                <h5 className="text-sm text-gray-500 mb-3 font-medium opacity-40">
                  {title}
                </h5>
                {items.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-800 py-1.5 font-normal transition-colors hover:text-gray-900"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
        <div className="mt-16 flex flex-wrap items-end justify-center gap-y-4 gap-x-8 border-t border-gray-200 py-6 md:justify-between">
          <div className="text-center md:text-start">
            <h4 className="text-2xl text-gray-600 mb-2">
              Your AI-Powered Medical Assistant
            </h4>
            <p className="text-gray-500 font-normal">
              Get accurate medical information and assistance at your fingertips.
            </p>
          </div>
          <p className="text-gray-800 text-center font-normal">
            &copy; {currentYear} MedLex AI, All rights reserved.
          </p>
          <p className="font-italics">developed by stephen Onchieku </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;