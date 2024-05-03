function NavbarLogo() {
  return (
    <>
      <img
        src="/images/logo-devlinks-large.svg"
        className="block max-[800px]:hidden"
        width={146}
        height={32}
        alt=""
      />
      <img
        src="/images/logo-devlinks-small.svg"
        className="hidden max-[800px]:block"
        width={32}
        height={32}
        alt=""
      />
    </>
  );
}

export default NavbarLogo;
