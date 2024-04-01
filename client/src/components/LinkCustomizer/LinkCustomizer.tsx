import Button from "../Button";
import useLinkCustomizer from "./useLinkCustomizer";
import LinkItem from "./LinkItem";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const LinkCustomizer = () => {
  const {
    links,
    fieldErrors,
    isLinkListModified,
    handleAddLink,
    handleRemoveLink,
    handleChangeLinkPlatform,
    handleChangeLinkHref,
    handleSubmit,
    handleReorderLinks,
    isLoading,
  } = useLinkCustomizer();

  if (isLoading) <p>Loading...</p>;

  return (
    <section className="flex w-full flex-col gap-10 rounded-lg bg-white p-10 max-[800px]:p-6">
      <header className="flex flex-col gap-2">
        <h1>Customize your links</h1>
        <p>Add/edit/remove links below and then share all your profiles with the world!</p>
      </header>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <Button variant="outline" type="button" onClick={handleAddLink}>
          + Add new link
        </Button>
        {links.length === 0 && (
          <div className="flex min-h-[426px] flex-col items-center justify-center gap-10 rounded-lg bg-lightGray p-5">
            <img src="/images/illustration-empty.svg" width="" height="" alt="" />
            <div className="flex flex-col items-center">
              <div className="flex flex-col gap-6 text-center">
                <h2>Let's get you started</h2>
                <p className="max-w-[490px]">
                  Use the “Add new link” button to get started. Once you have more than one link,
                  you can reorder and edit them. We’re here to help you share your profiles with
                  everyone!
                </p>
              </div>
            </div>
          </div>
        )}
        {links.length > 0 && (
          <DragDropContext onDragEnd={(result) => handleReorderLinks(result)}>
            <Droppable droppableId="links">
              {(provided) => (
                <ul
                  ref={provided.innerRef}
                  className="flex flex-col gap-6"
                  {...provided.droppableProps}
                >
                  {links.map((link, index) => {
                    return (
                      <Draggable key={link.id} draggableId={link.id} index={index}>
                        {(provided) => (
                          <li {...provided.draggableProps} ref={provided.innerRef}>
                            <LinkItem
                              link={link}
                              links={links}
                              fieldErrors={fieldErrors}
                              handleChangeLinkPlatform={handleChangeLinkPlatform}
                              handleChangeLinkHref={handleChangeLinkHref}
                              handleRemoveLink={handleRemoveLink}
                              dragHandleProps={provided.dragHandleProps}
                            />
                          </li>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        )}
        {links.length > 0 && (
          <div className="border-grey mt-4 flex justify-end border-t pt-6">
            <Button
              variant="fill"
              type="submit"
              disabled={links.length === 0 || !isLinkListModified}
            >
              {isLoading ? "Loading..." : "Save"}
            </Button>
          </div>
        )}
      </form>
    </section>
  );
};

export default LinkCustomizer;
