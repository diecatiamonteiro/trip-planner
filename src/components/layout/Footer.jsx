import "../../styles/Footer.css";

export default function Footer() {
  return (
    <footer>
      <p>&copy; {new Date().getFullYear()} Trip Planner</p>{" "}
      <p>Contact us: <a href="mailto:support@tripplanner.com">support@tripplanner.com</a></p>

    </footer>
  );
}
