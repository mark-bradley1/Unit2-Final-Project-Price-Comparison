import { FaGithub } from "react-icons/fa"

const Footer = () => {
  let dateYear = new Date().getFullYear();

  return (
    <footer>
      <div id="foot">&copy; {dateYear} GPCMB. All Rights Reserved</div>
      <div id="github">
      <a href="https://github.com/mark-bradley1"
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: "black", fontSize: "40px" }}
      >
        <FaGithub />
      </a>
      </div>
    </footer>
  );
};

export default Footer;
