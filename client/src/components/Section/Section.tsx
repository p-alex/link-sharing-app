interface Props extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  children: React.ReactNode;
}

const Section = ({ title, description, children }: Props) => {
  return (
    <section className={"flex w-full flex-col rounded-[12px] bg-white p-5 sm:p-10"}>
      {title && (
        <div className="mb-10 flex flex-col gap-2">
          <h1>{title}</h1>
          {description && <p className="text-grey text-base">{description}</p>}
        </div>
      )}
      <div>{children}</div>
    </section>
  );
};

export default Section;
