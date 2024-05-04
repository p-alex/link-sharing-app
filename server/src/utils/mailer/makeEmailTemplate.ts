function makeEmailTemplate({
  title,
  description,
  linkButton,
}: {
  title: string;
  description: string;
  linkButton: { href: string; value: string };
}) {
  return `
  <div style="width:100%; position:relative;">
  <div
  style="
  position: absolute;
      left: 0;
      right: 0;
      margin: auto;
      box-sizing: border-box;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
        Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
        sans-serif;
      width: 100%;
      max-width: 767px;
      padding: 48px 56px;
      background-color: #fafafa;
      padding: 72px;
      border-radius: 8px;
      text-align: center;
  "
>
  <div
    style="
    width: 100%;
    box-sizing: border-box;
    border-radius: 8px;
    background-color: white;
    padding: 48px 56px;
    "
  >
    <img
      src="https://devlinks.pistolalex.com/images/logo-devlinks-large.svg"
      width="146"
      height="32"
      alt=""
      style="margin-bottom: 32px"
    />
    <div>
      <div style="margin-bottom: 40px; box-sizing: border-box;">
        <h1 style="font-weight: 700">${title}</h1>
        <p style="color: #737373">
          ${description}
        </p>
      </div>
      <a
        href=${linkButton.href}
        style="
        padding: 11px 27px;
        background-color: #633cff;
        font-weight: 600;
        cursor: pointer;
        color: white;
        border-radius: 8px;
        border: none;
        width: max-content;
        margin: auto;
        box-sizing: border-box;
        text-decoration: none;
        "
                    >
                    ${linkButton.value}
                    </a>
                </div>
            </div>
        </div>
    </div>
    `;
}

export default makeEmailTemplate;
