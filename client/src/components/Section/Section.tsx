interface Props extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  children: React.ReactNode;
}

const Section = ({ title, description, children, ...sectionProps }: Props) => {
  return (
    <section {...sectionProps} className="w-full rounded-[12px] bg-white p-5 sm:p-10">
      {title && (
        <div className="mb-10 flex flex-col gap-2">
          <h1>{title}</h1>
          {description && <p className="text-base text-grey">{description}</p>}
        </div>
      )}
      {children}
    </section>
  );
};

export default Section;
