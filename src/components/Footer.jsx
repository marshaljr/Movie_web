const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 text-center py-6 mt-10">
      <p className="text-sm">
        © {new Date().getFullYear()} Movie Site by{" "}
        <a
          href="https://vercel.com/marshal-rams-projects"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white font-semibold hover:underline">
          <span className="text-gradient hover:scale-105 inline-block transition-transform duration-300">
            Marshal
          </span>
        </a>
        <span className="text-gradient"> •</span> All rights reserved.
      </p>
      <div className="flex justify-center gap-4 mt-2 text-sm">
        <a
          href="https://github.com/marshaljr"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white">
          About
        </a>

        <a
          href="https://3-d-portfolio-kappa-snowy.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white">
          Contact
        </a>
        <a href="#" className="hover:text-white">
          Privacy
        </a>
      </div>
    </footer>
  );
};

export default Footer;
