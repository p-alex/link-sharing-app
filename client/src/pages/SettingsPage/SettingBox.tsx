interface Props {
  title: string;
  description?: string;
  children: React.ReactNode;
}

const SettingBox = ({ title, description, children }: Props) => {
  return (
    <div className="mb-4 flex flex-col gap-2 border-t border-t-gray-200 py-8 last-of-type:pb-0">
      <div className="mb-4">
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>

      <div>{children}</div>
    </div>
  );
};

export default SettingBox;
