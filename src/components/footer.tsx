function Footer(): JSX.Element {
  return (
    <footer>
      <div className="mb-2 flex justify-center text-xs">
        &copy; Copyright {new Date().getFullYear()} by Yam
      </div>
    </footer>
  );
}

export default Footer;
